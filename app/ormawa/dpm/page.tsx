'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function DpmPage() {
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
              className="w-48 h-48 relative rounded-2xl shadow-2xl overflow-hidden border-4 border-gradient-to-r from-amber-500 to-yellow-500"
            >
              <Image
                src="/images/logo-dpm.png"
                alt="Logo DPM"
                fill
                className="object-contain p-4"
              />
            </motion.div>
          </div>
          
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
            DPM
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-400 mb-4">
            Dewan Perwakilan Mahasiswa
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-500 italic">
            Legislative, Aspiration & Supervision
          </p>
        </motion.div>

        {/* Vision Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 glass p-8 rounded-2xl border border-amber-500/30 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center">
              <span className="text-2xl">🏛️</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Visi</h2>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed pl-4 md:pl-16">
            Mewujudkan DPM IKMI sebagai lembaga legislatif yang aspiratif, profesional, dan berintegritas 
            dalam memperjuangkan hak-hak mahasiswa serta bersinergi demi kemajuan kampus STMIK IKMI Cirebon.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12 glass p-8 rounded-2xl border border-yellow-500/30 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 flex items-center justify-center">
              <span className="text-2xl">📜</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Misi</h2>
          </div>
          <ul className="space-y-4 pl-4 md:pl-16">
            <li className="flex gap-3 text-lg text-gray-700 dark:text-gray-300">
              <span className="text-amber-500 font-bold">1.</span>
              <span>Menampung dan menindaklanjuti aspirasi mahasiswa secara responsif</span>
            </li>
            <li className="flex gap-3 text-lg text-gray-700 dark:text-gray-300">
              <span className="text-amber-500 font-bold">2.</span>
              <span>Melakukan fungsi pengawasan terhadap kinerja BEM dan Ormawa lainnya</span>
            </li>
            <li className="flex gap-3 text-lg text-gray-700 dark:text-gray-300">
              <span className="text-amber-500 font-bold">3.</span>
              <span>Merancang dan menetapkan peraturan yang mendukung iklim organisasi yang sehat</span>
            </li>
            <li className="flex gap-3 text-lg text-gray-700 dark:text-gray-300">
              <span className="text-amber-500 font-bold">4.</span>
              <span>Membangun sinergitas dengan seluruh elemen kampus</span>
            </li>
          </ul>
        </motion.div>

        {/* Objectives Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="glass p-8 rounded-2xl border border-amber-500/30 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-600 to-yellow-600 flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Fungsi Utama</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 pl-4 md:pl-16">
            <div className="p-6 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border border-amber-200 dark:border-amber-800">
              <h3 className="font-bold text-xl mb-3 text-amber-600 dark:text-amber-400">📝 Legislasi</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Pembuatan undang-undang dan peraturan untuk ketertiban organisasi.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-bold text-xl mb-3 text-yellow-600 dark:text-yellow-400">🗣️ Aspirasi</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Wadah penyampaian kritik dan saran dari mahasiswa untuk kemajuan bersama.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border border-amber-200 dark:border-amber-800">
              <h3 className="font-bold text-xl mb-3 text-amber-600 dark:text-amber-400">👁️ Pengawasan</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Memastikan program kerja eksekutif berjalan sesuai dengan rencana.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-bold text-xl mb-3 text-yellow-600 dark:text-yellow-400">💰 Budgeting</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Pengawasan dan persetujuan anggaran kegiatan organisasi mahasiswa.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}