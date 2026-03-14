'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Kegiatan {
  id: number
  judul: string
  deskripsi: string
  tanggal: string
  gambar?: string
}

export default function KegiatanPage() {
  const [kegiatan, setKegiatan] = useState<Kegiatan[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('kegiatan')
    if (stored) {
      setKegiatan(JSON.parse(stored))
    } else {
      fetch('/data/kegiatan.json')
        .then(res => res.json())
        .then(data => setKegiatan(data))
    }

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
      className="pb-16 md:pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 md:mb-14"
      >
        <div className="inline-flex items-center gap-2 bg-ocean-50 dark:bg-ocean-900/30 border border-ocean-200 dark:border-ocean-800 rounded-full px-4 py-1.5 text-ocean-600 dark:text-ocean-400 text-sm font-medium mb-4">
          📅 Program Kerja
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-ocean-700 to-ocean-500 dark:from-ocean-300 dark:to-ocean-500 bg-clip-text text-transparent mb-4">
          Informasi Kegiatan BEM IKMI
        </h1>
        <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Semua kegiatan yang sedang dan telah berjalan ditampilkan secara real-time.
        </p>
      </motion.div>

      {kegiatan.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="text-6xl mb-4">📋</div>
          <p className="text-slate-500 dark:text-slate-400 text-lg">Belum ada kegiatan yang tersedia.</p>
          <p className="text-slate-400 dark:text-slate-500 text-sm mt-2">Periksa kembali nanti.</p>
        </motion.div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {kegiatan.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="glass-card border border-ocean-100 dark:border-ocean-800 hover:border-ocean-300 dark:hover:border-ocean-600 overflow-hidden group"
            >
              {item.gambar && (
                <div className="relative w-full h-44 mb-4 rounded-xl overflow-hidden -mt-2 -mx-2 w-[calc(100%+1rem)]">
                  <img
                    src={item.gambar}
                    alt={item.judul}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              )}
              <h2 className="text-lg sm:text-xl font-bold text-ocean-700 dark:text-ocean-300 mb-2">{item.judul}</h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm mb-3 leading-relaxed">{item.deskripsi}</p>
              <div className="flex items-center gap-2 text-sm text-slate-400 dark:text-slate-500 border-t border-ocean-50 dark:border-ocean-900 pt-3 mt-auto">
                <span>📅</span>
                <span>{item.tanggal}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.section>
  )
}
