import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'

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

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const judul = formData.get('judul') as string
    const deskripsi = formData.get('deskripsi') as string
    const tanggal = formData.get('tanggal') as string
    const gambarFile = formData.get('gambar') as File | null

    if (!judul || !deskripsi || !tanggal) {
      return NextResponse.json({ error: 'Lengkapi semua data!' }, { status: 400 })
    }

    let gambarPath = '/images/logo.png'

    if (gambarFile && gambarFile.size > 0) {
      if (!existsSync(UPLOAD_DIR)) {
        mkdirSync(UPLOAD_DIR, { recursive: true })
      }
      const ext = gambarFile.name.split('.').pop() || 'jpg'
      const fileName = `${Date.now()}.${ext}`
      const bytes = await gambarFile.arrayBuffer()
      writeFileSync(join(UPLOAD_DIR, fileName), Buffer.from(bytes))
      gambarPath = `/images/kegiatan/${fileName}`
    }

    const data = readData()
    const nextId = data.length > 0 ? Math.max(...data.map((k: any) => k.id)) + 1 : 1
    const newItem = {
      id: nextId,
      judul,
      deskripsi,
      tanggal,
      gambar: gambarPath,
    }
    data.push(newItem)
    writeData(data)

    return NextResponse.json(newItem, { status: 201 })
  } catch (err) {
    console.error('POST /api/kegiatan error:', err)
    return NextResponse.json({ error: 'Gagal menyimpan kegiatan.' }, { status: 500 })
  }
}
