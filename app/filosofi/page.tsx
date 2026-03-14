'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

const filosofiLogo = [
  {
    judul: 'Tiga Lingkaran yang Saling Terikat',
    deskripsi: 'Keharmonisan dan kolaborasi antar anggota. Bentuk ini mencerminkan koneksi, kerja sama, dan persatuan.',
    gambar: '/images/filosofi_lingkaran.png',
    icon: '⭕',
  },
  {
    judul: 'Warna Merah',
    deskripsi: 'Warna merah melambangkan keberanian dalam kabinet ini.',
    gambar: '/images/filosofi_merah.png',
    icon: '🔴',
  },
  {
    judul: 'Timbangan',
    deskripsi: 'Timbangan melambangkan keadilan dan moralitas.',
    gambar: '/images/filosofi_timbangan.png',
    icon: '⚖️',
  },
  {
    judul: 'Simbol Api di Atas',
    deskripsi: 'Memiliki makna keberanian dan semangat yang menyala.',
    gambar: '/images/filosofi_api.png',
    icon: '🔥',
  },
  {
    judul: 'Dua Kepala Wayang Arjuna',
    deskripsi:
      'Kedua kepala ini adalah Kembang Kacang dan Golek. Kembang Kacang melambangkan sifat Arjuna yang cerdik, pandai, dan bijaksana. Sedangkan Golek menggambarkan sisi Arjuna yang gagah berani, tampan, dan memiliki daya tarik yang kuat.',
    gambar: '/images/filosofi_arjuna.png',
    icon: '🎭',
  },
  {
    judul: 'Warna Emas Kekuningan',
    deskripsi: 'Warna emas kekuningan melambangkan kebijaksanaan yang ada di dalam kabinet ini.',
    gambar: '/images/filosofi_emas.png',
    icon: '✨',
  },
  {
    judul: 'Pena',
    deskripsi: 'Pena melambangkan nilai intelektual dan kejujuran.',
    gambar: '/images/filosofi_pena.png',
    icon: '✒️',
  },
  {
    judul: 'Warna Hijau',
    deskripsi: 'Warna hijau melambangkan keharmonisan dan keseimbangan di dalam kabinet ini.',
    gambar: '/images/filosofi_hijau.png',
    icon: '🟢',
  },
]

export default function Filosofi() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="pb-16 md:pb-20"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 md:mb-14"
      >
        <div className="inline-flex items-center gap-2 bg-ocean-50 dark:bg-ocean-900/30 border border-ocean-200 dark:border-ocean-800 rounded-full px-4 py-1.5 text-ocean-600 dark:text-ocean-400 text-sm font-medium mb-4">
          💡 Makna Logo
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-ocean-700 to-ocean-500 dark:from-ocean-300 dark:to-ocean-500 bg-clip-text text-transparent mb-4">
          Filosofi Logo Kabinet
        </h1>
        <p className="text-base md:text-lg text-slate-500 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Setiap elemen pada logo Kabinet <strong className="text-ocean-600 dark:text-ocean-400">Parta Pandita</strong> memiliki makna mendalam yang mencerminkan nilai-nilai
          kepemimpinan, kebijaksanaan, keberanian, dan keharmonisan antar anggota BEM STMIK IKMI Cirebon.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
        {filosofiLogo.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="glass-card border border-ocean-100 dark:border-ocean-800 hover:border-ocean-300 dark:hover:border-ocean-600 overflow-hidden group"
          >
            <div className="relative w-full aspect-video mb-4 overflow-hidden rounded-xl">
              <Image
                src={item.gambar}
                alt={item.judul}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute top-3 left-3 text-2xl bg-white/90 dark:bg-ocean-900/90 rounded-lg w-10 h-10 flex items-center justify-center shadow-md">
                {item.icon}
              </div>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-ocean-700 dark:text-ocean-300 mb-2">{item.judul}</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.deskripsi}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
