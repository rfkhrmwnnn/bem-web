import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, writeFileSync, unlinkSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'
import { isAllowedImageFile, isAllowedImageBuffer, ALLOWED_IMAGE_ERROR } from '@/lib/imageValidation'
import { isAdminRequest } from '@/lib/auth'

const DATA_PATH = join(process.cwd(), 'data', 'kegiatan.json')
const UPLOAD_DIR = join(process.cwd(), 'public', 'images', 'kegiatan')

function readData(): any[] {
  try {
    return JSON.parse(readFileSync(DATA_PATH, 'utf-8'))
  } catch {
    return []
  }
}

function writeData(data: any[]) {
  writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8')
}

function deleteUploadedImage(gambarPath: string | undefined) {
  if (!gambarPath || !gambarPath.startsWith('/images/kegiatan/')) return
  const fileName = gambarPath.replace('/images/kegiatan/', '')
  const filePath = join(UPLOAD_DIR, fileName)
  if (existsSync(filePath)) {
    try { unlinkSync(filePath) } catch { /* ignore */ }
  }
}

function deleteUploadedImages(paths: string[] | undefined) {
  if (!paths) return
  for (const p of paths) deleteUploadedImage(p)
}

async function saveImageFile(file: File): Promise<string> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  if (!isAllowedImageBuffer(buffer)) {
    throw new Error(ALLOWED_IMAGE_ERROR)
  }
  if (!existsSync(UPLOAD_DIR)) {
    mkdirSync(UPLOAD_DIR, { recursive: true })
  }
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase()
  const fileName = `${crypto.randomUUID()}.${ext}`
  writeFileSync(join(UPLOAD_DIR, fileName), buffer)
  return `/images/kegiatan/${fileName}`
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const id = Number(params.id)
    const formData = await request.formData()
    const judul = formData.get('judul') as string
    const deskripsi = formData.get('deskripsi') as string
    const tanggal = formData.get('tanggal') as string
    const gambarFile = formData.get('gambar') as File | null
    const dokumentasiFiles = formData.getAll('dokumentasi') as File[]
    const removeDokumentasi = formData.getAll('removeDokumentasi') as string[]

    const data = readData()
    const idx = data.findIndex(k => k.id === id)
    if (idx === -1) {
      return NextResponse.json({ error: 'Kegiatan tidak ditemukan.' }, { status: 404 })
    }

    let gambarPath = data[idx].gambar

    if (gambarFile && gambarFile.size > 0) {
      if (!isAllowedImageFile(gambarFile)) {
        return NextResponse.json({ error: ALLOWED_IMAGE_ERROR }, { status: 400 })
      }
      const newPath = await saveImageFile(gambarFile)
      // Remove old uploaded image if it exists
      deleteUploadedImage(data[idx].gambar)
      gambarPath = newPath
    }

    // Handle documentation: remove flagged ones, keep the rest, add new ones
    let currentDokumentasi: string[] = data[idx].dokumentasi || []
    if (removeDokumentasi.length > 0) {
      for (const p of removeDokumentasi) deleteUploadedImage(p)
      currentDokumentasi = currentDokumentasi.filter(p => !removeDokumentasi.includes(p))
    }
    for (const file of dokumentasiFiles) {
      if (file && file.size > 0) {
        if (!isAllowedImageFile(file)) {
          return NextResponse.json({ error: ALLOWED_IMAGE_ERROR }, { status: 400 })
        }
        const path = await saveImageFile(file)
        currentDokumentasi.push(path)
      }
    }

    data[idx] = { ...data[idx], judul, deskripsi, tanggal, gambar: gambarPath, dokumentasi: currentDokumentasi }
    writeData(data)

    return NextResponse.json(data[idx])
  } catch (err) {
    console.error('PUT /api/kegiatan/[id] error:', err)
    return NextResponse.json({ error: 'Gagal memperbarui kegiatan.' }, { status: 500 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAdminRequest(_request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const id = Number(params.id)
    const data = readData()
    const idx = data.findIndex(k => k.id === id)
    if (idx === -1) {
      return NextResponse.json({ error: 'Kegiatan tidak ditemukan.' }, { status: 404 })
    }

    deleteUploadedImage(data[idx].gambar)
    deleteUploadedImages(data[idx].dokumentasi)

    const updated = data.filter(k => k.id !== id)
    writeData(updated)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('DELETE /api/kegiatan/[id] error:', err)
    return NextResponse.json({ error: 'Gagal menghapus kegiatan.' }, { status: 500 })
  }
}
