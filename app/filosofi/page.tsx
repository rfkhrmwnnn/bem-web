'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

const filosofiLogo = [
  {
    judul: 'Tiga Lingkaran yang Saling Terikat',
    deskripsi: 'Keharmonisan dan kolaborasi antar anggota. Bentuk ini mencerminkan koneksi, kerja sama, dan persatuan.',
    gambar: '/images/filosofi_lingkaran.png',
  },
  {
    judul: 'Warna Merah',
    deskripsi: 'Warna merah melambangkan keberanian dalam kabinet ini.',
    gambar: '/images/filosofi_merah.png',
  },
  {
    judul: 'Timbangan',
    deskripsi: 'Timbangan melambangkan keadilan dan moralitas.',
    gambar: '/images/filosofi_timbangan.png',
  },
  {
    judul: 'Simbol Api di Atas',
    deskripsi: 'Memiliki makna keberanian dan semangat yang menyala.',
    gambar: '/images/filosofi_api.png',
  },
  {
    judul: 'Dua Kepala Wayang Arjuna',
    deskripsi:
      'Kedua kepala ini adalah Kembang Kacang dan Golek. Kembang Kacang melambangkan sifat Arjuna yang cerdik, pandai, dan bijaksana. Sedangkan Golek menggambarkan sisi Arjuna yang gagah berani, tampan, dan memiliki daya tarik yang kuat.',
    gambar: '/images/filosofi_arjuna.png',
  },
  {
    judul: 'Warna Emas Kekuningan',
    deskripsi: 'Warna emas kekuningan melambangkan kebijaksanaan yang ada di dalam kabinet ini.',
    gambar: '/images/filosofi_emas.png',
  },
  {
    judul: 'Pena',
    deskripsi: 'Pena melambangkan nilai intelektual dan kejujuran.',
    gambar: '/images/filosofi_pena.png',
  },
  {
    judul: 'Warna Hijau',
    deskripsi: 'Warna hijau melambangkan keharmonisan dan keseimbangan di dalam kabinet ini.',
    gambar: '/images/filosofi_hijau.png',
  },
]

export default function Filosofi() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="pb-20"
    >
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-orangeBright mb-4">Filosofi Logo Kabinet</h1>
        <p className="text-gray-500 dark:text-gray-300 max-w-2xl mx-auto">
          Setiap elemen pada logo Kabinet <strong>Parta Pandita</strong> memiliki makna mendalam yang mencerminkan nilai-nilai
          kepemimpinan, kebijaksanaan, keberanian, dan keharmonisan antar anggota BEM STMIK IKMI Cirebon.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {filosofiLogo.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="glass border border-neon rounded-xl p-4 hover:shadow-[0_0_20px_#00ffff] transition-shadow"
          >
            <Image
              src={item.gambar}
              alt={item.judul}
              width={600}
              height={400}
              className="rounded-lg border border-orangeBright mb-4 object-cover"
            />
            <h2 className="text-2xl font-bold text-orangeBright mb-2 text-center">{item.judul}</h2>
            <p className="text-gray-300 text-center">{item.deskripsi}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
