'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Kegiatan {
  id: number
  judul: string
  deskripsi: string
  tanggal: string
  gambar?: string
  dokumentasi?: string[]
}

export default function KegiatanPage() {
  const [kegiatan, setKegiatan] = useState<Kegiatan[]>([])
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null)

  useEffect(() => {
    fetch('/api/kegiatan')
      .then(res => res.json())
      .then(data => setKegiatan(data))
      .catch(err => console.error('Failed to load kegiatan:', err))
  }, [])

  const openLightbox = (images: string[], index: number) => setLightbox({ images, index })
  const closeLightbox = () => setLightbox(null)
  const prevImage = () => setLightbox(prev => prev ? { ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length } : null)
  const nextImage = () => setLightbox(prev => prev ? { ...prev, index: (prev.index + 1) % prev.images.length } : null)

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevImage()
      else if (e.key === 'ArrowRight') nextImage()
      else if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

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

              {/* Dokumentasi Gallery */}
              {item.dokumentasi && item.dokumentasi.length > 0 && (
                <div className="mt-4 border-t border-ocean-50 dark:border-ocean-900 pt-4">
                  <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1">
                    📷 Dokumentasi <span className="font-normal">({item.dokumentasi.length} foto)</span>
                  </p>
                  <div className="grid grid-cols-3 gap-1.5">
                    {item.dokumentasi.slice(0, 6).map((src, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => openLightbox(item.dokumentasi!, idx)}
                        className="relative h-20 rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-ocean-500"
                      >
                        <img src={src} alt={`dokumentasi-${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                        {idx === 5 && item.dokumentasi!.length > 6 && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-sm font-bold">
                            +{item.dokumentasi!.length - 6}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prevImage() }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold transition z-10"
              aria-label="Foto sebelumnya"
            >
              ‹
            </button>
            <motion.img
              key={lightbox.index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              src={lightbox.images[lightbox.index]}
              alt={`dokumentasi-${lightbox.index + 1}`}
              className="max-h-[85vh] max-w-full rounded-xl shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); nextImage() }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold transition z-10"
              aria-label="Foto berikutnya"
            >
              ›
            </button>
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold transition"
              aria-label="Tutup"
            >
              ✕
            </button>
            <div className="absolute bottom-4 text-white/60 text-sm">
              {lightbox.index + 1} / {lightbox.images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}
