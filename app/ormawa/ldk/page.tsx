'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function LdkPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-8">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.3 }}
              className="w-48 h-48 relative rounded-2xl shadow-2xl overflow-hidden border-4 border-gradient-to-r from-emerald-500 to-green-500"
            >
              <Image
                src="/images/logo-ldk.png"
                alt="Logo LDK"
                fill
                className="object-contain p-4"
              />
            </motion.div>
          </div>
          
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
            LDK
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-400 mb-4">
            Lembaga Dakwah Kampus
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-500 italic">
            Spirituality, Brotherhood & Integrity
          </p>
        </motion.div>

        {/* Vision Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 glass p-8 rounded-2xl border border-emerald-500/30 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center">
              <span className="text-2xl">🕌</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Visi</h2>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed pl-4 md:pl-16">
            Menjadikan LDK STMIK IKMI Cirebon sebagai pusat dakwah yang prestatif, kontributif, dan solutif 
            dalam membina mahasiswa yang berkarakter Islami serta unggul dalam IPTEK dan IMTAQ.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12 glass p-8 rounded-2xl border border-green-500/30 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
              <span className="text-2xl">📖</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Misi</h2>
          </div>
          <ul className="space-y-4 pl-4 md:pl-16">
            <li className="flex gap-3 text-lg text-gray-700 dark:text-gray-300">
              <span className="text-emerald-500 font-bold">1.</span>
              <span>Mengokohkan pemahaman Islam yang syamil dan mutakamil di kalangan mahasiswa</span>
            </li>
            <li className="flex gap-3 text-lg text-gray-700 dark:text-gray-300">
              <span className="text-emerald-500 font-bold">2.</span>
              <span>Membangun ukhuwah islamiyah yang solid di lingkungan kampus</span>
            </li>
            <li className="flex gap-3 text-lg text-gray-700 dark:text-gray-300">
              <span className="text-emerald-500 font-bold">3.</span>
              <span>Meningkatkan potensi minat dan bakat mahasiswa muslim dalam kebaikan</span>
            </li>
            <li className="flex gap-3 text-lg text-gray-700 dark:text-gray-300">
              <span className="text-emerald-500 font-bold">4.</span>
              <span>Menjadi teladan utama dalam akhlak dan prestasi akademik</span>
            </li>
          </ul>
        </motion.div>

        {/* Objectives Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="glass p-8 rounded-2xl border border-emerald-500/30 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 flex items-center justify-center">
              <span className="text-2xl">✨</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Program Unggulan</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 pl-4 md:pl-16">
            <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-800">
              <h3 className="font-bold text-xl mb-3 text-emerald-600 dark:text-emerald-400">👳 Mentoring</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Pembinaan Islam intensif dalam kelompok kecil untuk membentuk karakter Rabbani.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800">
              <h3 className="font-bold text-xl mb-3 text-green-600 dark:text-green-400">🕌 Kajian Rutin</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Diskusi dan bedah isu terkini dari perspektif Islam bersama pemateri ahli.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-800">
              <h3 className="font-bold text-xl mb-3 text-emerald-600 dark:text-emerald-400">🤝 Baksos</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Aksi sosial kemasyarakatan sebagai wujud kepedulian terhadap sesama.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800">
              <h3 className="font-bold text-xl mb-3 text-green-600 dark:text-green-400">🏞️ Rihlah</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Tadabbur alam dan kegiatan outdoor untuk mempererat ukhuwah antar anggota.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
