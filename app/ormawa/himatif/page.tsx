'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function HimatifPage() {
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
              className="w-48 h-48 relative rounded-2xl shadow-2xl overflow-hidden border-4 border-gradient-to-r from-green-500 to-teal-500"
            >
              <Image
                src="/images/logo-himatif.png"
                alt="Logo HIMATIF"
                fill
                className="object-contain p-4"
              />
            </motion.div>
          </div>
          
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
            HIMATIF
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-400 mb-4">
            Himpunan Mahasiswa Teknik Informatika
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-500 italic">
            Informatics Engineering Student Association
          </p>
        </motion.div>

        {/* Vision Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 glass p-8 rounded-2xl border border-green-500/30 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
              <span className="text-2xl">👁️</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Visi</h2>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed pl-15">
            Menjadikan HIMATIF sebagai organisasi yang unggul dalam mengembangkan kemampuan mahasiswa 
            di bidang pemrograman, teknologi informasi, dan rekayasa perangkat lunak, serta membentuk 
            karakter mahasiswa yang inovatif, kreatif, dan berjiwa teknologi.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12 glass p-8 rounded-2xl border border-teal-500/30 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-green-500 flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Misi</h2>
          </div>
          <ul className="space-y-4 pl-15">
            <li className="flex gap-3 text-lg text-gray-700 dark:text-gray-300">
              <span className="text-green-500 font-bold">1.</span>
              <span>Menyelenggarakan workshop dan pelatihan berkala di bidang pemrograman dan teknologi terkini</span>
            </li>
            <li className="flex gap-3 text-lg text-gray-700 dark:text-gray-300">
              <span className="text-green-500 font-bold">2.</span>
              <span>Memfasilitasi mahasiswa untuk berpartisipasi dalam hackathon dan kompetisi coding</span>
            </li>
            <li className="flex gap-3 text-lg text-gray-700 dark:text-gray-300">
              <span className="text-green-500 font-bold">3.</span>
              <span>Mengembangkan proyek-proyek teknologi yang bermanfaat untuk kampus dan masyarakat</span>
            </li>
            <li className="flex gap-3 text-lg text-gray-700 dark:text-gray-300">
              <span className="text-green-500 font-bold">4.</span>
              <span>Membangun kolaborasi dengan perusahaan teknologi untuk program magang dan rekrutmen</span>
            </li>
          </ul>
        </motion.div>

        {/* Objectives Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="glass p-8 rounded-2xl border border-green-500/30 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-600 to-teal-600 flex items-center justify-center">
              <span className="text-2xl">🚀</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Tujuan</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 pl-15">
            <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border border-green-200 dark:border-green-800">
              <h3 className="font-bold text-xl mb-3 text-green-600 dark:text-green-400">💻 Coding Excellence</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Meningkatkan kemampuan coding mahasiswa dalam berbagai bahasa pemrograman 
                dan framework modern.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-teal-50 to-green-50 dark:from-teal-900/20 dark:to-green-900/20 border border-teal-200 dark:border-teal-800">
              <h3 className="font-bold text-xl mb-3 text-teal-600 dark:text-teal-400">🔧 Problem Solving</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Mengasah kemampuan analitis dan problem solving melalui studi kasus 
                dan project-based learning.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border border-green-200 dark:border-green-800">
              <h3 className="font-bold text-xl mb-3 text-green-600 dark:text-green-400">🏆 Kompetisi</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Mendorong partisipasi aktif dalam kompetisi pemrograman tingkat regional, 
                nasional, dan internasional.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-teal-50 to-green-50 dark:from-teal-900/20 dark:to-green-900/20 border border-teal-200 dark:border-teal-800">
              <h3 className="font-bold text-xl mb-3 text-teal-600 dark:text-teal-400">🌐 Open Source</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Mendorong kontribusi mahasiswa dalam proyek open source dan membangun 
                portofolio yang kuat.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
