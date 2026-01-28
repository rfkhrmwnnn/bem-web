'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Kegiatan {
  id: number
  judul: string
  deskripsi: string
  tanggal: string
  gambar?: string // tambahkan properti gambar
}

export default function KegiatanPage() {
  const [kegiatan, setKegiatan] = useState<Kegiatan[]>([])

  useEffect(() => {
    // Ambil data dari localStorage terlebih dahulu
    const stored = localStorage.getItem('kegiatan')
    if (stored) {
      setKegiatan(JSON.parse(stored))
    } else {
      // Jika belum ada, fallback ke file JSON default
      fetch('/data/kegiatan.json')
        .then(res => res.json())
        .then(data => setKegiatan(data))
    }

    // Event listener untuk real-time sync dari dashboard
    const updateHandler = (e: any) => {
      if (e.key === 'kegiatan') {
        const data = JSON.parse(e.newValue || '[]')
        setKegiatan(data)
      }
    }
    window.addEventListener('storage', updateHandler)
    return () => window.removeEventListener('storage', updateHandler)
  }, [])

  return (
    <motion.section
      className="pt-24 max-w-6xl mx-auto px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold text-orangeBright mb-6 text-center">
        Informasi Kegiatan BEM IKMI
      </h1>
      <p className="text-center text-gray-400 mb-12">
        Semua kegiatan yang sedang dan telah berjalan ditampilkan secara real-time.
      </p>

      {kegiatan.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada kegiatan.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {kegiatan.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass border border-neon p-6 rounded-lg hover:shadow-[0_0_20px_#00ffff] transition"
            >
              {item.gambar && (
                <img
                  src={item.gambar}
                  alt={item.judul}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h2 className="text-2xl font-bold text-orangeBright mb-2">{item.judul}</h2>
              <p className="text-gray-300 mb-2">{item.deskripsi}</p>
              <p className="text-sm text-gray-400">📅 {item.tanggal}</p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.section>
  )
}
