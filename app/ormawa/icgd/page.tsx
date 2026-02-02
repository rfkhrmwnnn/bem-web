'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function IcgdPage() {
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
              className="w-48 h-48 relative rounded-2xl shadow-2xl overflow-hidden border-4 border-gradient-to-r from-cyan-500 to-blue-500"
            >
              <Image
                src="/images/logo-icgd.png"
                alt="Logo ICGD"
                fill
                className="object-contain p-4"
              />
            </motion.div>
          </div>
          
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
            ICGD
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-400 mb-4">
            IKMI Computer Graphic Design
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-500 italic">
            Creativity, Design & Multimedia
          </p>
        </motion.div>

        {/* Vision Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 glass p-8 rounded-2xl border border-cyan-500/30 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
              <span className="text-2xl">🎨</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Visi</h2>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed pl-4 md:pl-16">
            Menjadikan ICGD sebagai wadah pengembangan minat dan bakat mahasiswa dalam bidang desain grafis 
            dan multimedia yang kompetitif, kreatif, dan inovatif di era digital di lingkungan STMIK IKMI Cirebon.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12 glass p-8 rounded-2xl border border-blue-500/30 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
              <span className="text-2xl">🖌️</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Misi</h2>
          </div>
          <ul className="space-y-4 pl-4 md:pl-16">
            <li className="flex gap-3 text-lg text-gray-700 dark:text-gray-300">
              <span className="text-cyan-500 font-bold">1.</span>
              <span>Menyelenggarakan pelatihan rutin software desain (Photoshop, Illustrator, dll)</span>
            </li>
            <li className="flex gap-3 text-lg text-gray-700 dark:text-gray-300">
              <span className="text-cyan-500 font-bold">2.</span>
              <span>Mengadakan pameran dan kompetisi desain internal maupun eksternal</span>
            </li>
            <li className="flex gap-3 text-lg text-gray-700 dark:text-gray-300">
              <span className="text-cyan-500 font-bold">3.</span>
              <span>Menghasilkan karya visual yang mendukung branding kampus</span>
            </li>
            <li className="flex gap-3 text-lg text-gray-700 dark:text-gray-300">
              <span className="text-cyan-500 font-bold">4.</span>
              <span>Membangun komunitas sharing knowledge antar desainer muda</span>
            </li>
          </ul>
        </motion.div>

        {/* Objectives Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="glass p-8 rounded-2xl border border-cyan-500/30 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Program Unggulan</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 pl-4 md:pl-16">
            <div className="p-6 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border border-cyan-200 dark:border-cyan-800">
              <h3 className="font-bold text-xl mb-3 text-cyan-600 dark:text-cyan-400">💻 Workshop Desain</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Pelatihan intensif penggunaan tools desain grafis standar industri.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800">
              <h3 className="font-bold text-xl mb-3 text-blue-600 dark:text-blue-400">🏆 Design Battle</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Kompetisi adu kreativitas desain antar mahasiswa.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border border-cyan-200 dark:border-cyan-800">
              <h3 className="font-bold text-xl mb-3 text-cyan-600 dark:text-cyan-400">🧥 Merchandise</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Pembuatan merchandise kreatif sebagai sarana wirausaha dan branding.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800">
              <h3 className="font-bold text-xl mb-3 text-blue-600 dark:text-blue-400">🤝 Collaboration</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Kolaborasi visual dengan ormawa lain untuk event kampus.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}