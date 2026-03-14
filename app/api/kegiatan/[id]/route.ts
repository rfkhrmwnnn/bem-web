import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, writeFileSync, unlinkSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'
import { isAllowedImageFile, isAllowedImageBuffer, ALLOWED_IMAGE_ERROR } from '@/lib/imageValidation'

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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id)
    const formData = await request.formData()
    const judul = formData.get('judul') as string
    const deskripsi = formData.get('deskripsi') as string
    const tanggal = formData.get('tanggal') as string
    const gambarFile = formData.get('gambar') as File | null

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
      const bytes = await gambarFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      if (!isAllowedImageBuffer(buffer)) {
        return NextResponse.json({ error: ALLOWED_IMAGE_ERROR }, { status: 400 })
      }
      // Remove old uploaded image if it exists
      deleteUploadedImage(data[idx].gambar)

      if (!existsSync(UPLOAD_DIR)) {
        mkdirSync(UPLOAD_DIR, { recursive: true })
      }
      const ext = (gambarFile.name.split('.').pop() || 'jpg').toLowerCase()
      const fileName = `${Date.now()}.${ext}`
      writeFileSync(join(UPLOAD_DIR, fileName), buffer)
      gambarPath = `/images/kegiatan/${fileName}`
    }

    data[idx] = { ...data[idx], judul, deskripsi, tanggal, gambar: gambarPath }
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
  try {
    const id = Number(params.id)
    const data = readData()
    const idx = data.findIndex(k => k.id === id)
    if (idx === -1) {
      return NextResponse.json({ error: 'Kegiatan tidak ditemukan.' }, { status: 404 })
    }

    deleteUploadedImage(data[idx].gambar)

    const updated = data.filter(k => k.id !== id)
    writeData(updated)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('DELETE /api/kegiatan/[id] error:', err)
    return NextResponse.json({ error: 'Gagal menghapus kegiatan.' }, { status: 500 })
  }
}
