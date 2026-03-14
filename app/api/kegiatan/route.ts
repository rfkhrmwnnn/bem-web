import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
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

export async function GET() {
  const data = readData()
  return NextResponse.json(data)
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

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const judul = formData.get('judul') as string
    const deskripsi = formData.get('deskripsi') as string
    const tanggal = formData.get('tanggal') as string
    const gambarFile = formData.get('gambar') as File | null
    const dokumentasiFiles = formData.getAll('dokumentasi') as File[]

    if (!judul || !deskripsi || !tanggal) {
      return NextResponse.json({ error: 'Lengkapi semua data!' }, { status: 400 })
    }

    let gambarPath = '/images/logo.png'

    if (gambarFile && gambarFile.size > 0) {
      if (!isAllowedImageFile(gambarFile)) {
        return NextResponse.json({ error: ALLOWED_IMAGE_ERROR }, { status: 400 })
      }
      gambarPath = await saveImageFile(gambarFile)
    }

    const dokumentasiPaths: string[] = []
    for (const file of dokumentasiFiles) {
      if (file && file.size > 0) {
        if (!isAllowedImageFile(file)) {
          return NextResponse.json({ error: ALLOWED_IMAGE_ERROR }, { status: 400 })
        }
        const path = await saveImageFile(file)
        dokumentasiPaths.push(path)
      }
    }

    const data = readData()
    const nextId = data.length > 0 ? Math.max(...data.map((k: any) => k.id)) + 1 : 1
    const newItem = {
      id: nextId,
      judul,
      deskripsi,
      tanggal,
      gambar: gambarPath,
      dokumentasi: dokumentasiPaths,
    }
    data.push(newItem)
    writeData(data)

    return NextResponse.json(newItem, { status: 201 })
  } catch (err) {
    console.error('POST /api/kegiatan error:', err)
    if (err instanceof Error && err.message === ALLOWED_IMAGE_ERROR) {
      return NextResponse.json({ error: err.message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Gagal menyimpan kegiatan.' }, { status: 500 })
  }
}
