'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function HimarekaPage() {
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
              className="w-48 h-48 relative rounded-2xl shadow-2xl overflow-hidden border-4 border-gradient-to-r from-orange-500 to-red-500"
            >
              <Image
                src="/images/logo-himareka.png"
                alt="Logo HIMAREKA"
                fill
                className="object-contain p-4"
              />
            </motion.div>
          </div>
          
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            HIMAREKA
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-400 mb-4">
            Himpunan Mahasiswa Rekayasa
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-500 italic">
            Engineering Student Association
          </p>
        </motion.div>

        {/* Vision Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 glass p-8 rounded-2xl border border-orange-500/30 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
              <span className="text-2xl">👁️</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Visi</h2>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed pl-15">
            Menjadikan HIMAREKA sebagai wadah yang profesional dalam mengembangkan kompetensi mahasiswa 
            di bidang rekayasa perangkat lunak, teknologi informasi, dan engineering, serta membentuk 
            mahasiswa yang berkarakter, inovatif, dan berdaya saing global.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12 glass p-8 rounded-2xl border border-red-500/30 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Misi</h2>
          </div>
          <ul className="space-y-4 pl-15">
            <li className="flex gap-3 text-lg text-gray-700 dark:text-gray-300">
              <span className="text-orange-500 font-bold">1.</span>
              <span>Menyelenggarakan program pelatihan dan workshop di bidang software engineering dan system design</span>
            </li>
            <li className="flex gap-3 text-lg text-gray-700 dark:text-gray-300">
              <span className="text-orange-500 font-bold">2.</span>
              <span>Memfasilitasi mahasiswa dalam pengembangan proyek rekayasa yang inovatif dan berkelanjutan</span>
            </li>
            <li className="flex gap-3 text-lg text-gray-700 dark:text-gray-300">
              <span className="text-orange-500 font-bold">3.</span>
              <span>Membangun kemitraan dengan industri untuk meningkatkan pengalaman praktis mahasiswa</span>
            </li>
            <li className="flex gap-3 text-lg text-gray-700 dark:text-gray-300">
              <span className="text-orange-500 font-bold">4.</span>
              <span>Mengembangkan jiwa kepemimpinan dan teamwork melalui project-based learning</span>
            </li>
          </ul>
        </motion.div>

        {/* Objectives Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="glass p-8 rounded-2xl border border-orange-500/30 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-600 to-red-600 flex items-center justify-center">
              <span className="text-2xl">🚀</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Tujuan</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 pl-15">
            <div className="p-6 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-800">
              <h3 className="font-bold text-xl mb-3 text-orange-600 dark:text-orange-400">⚙️ System Design</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Mengembangkan kemampuan mahasiswa dalam merancang dan membangun sistem 
                yang scalable dan efficient.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border border-red-200 dark:border-red-800">
              <h3 className="font-bold text-xl mb-3 text-red-600 dark:text-red-400">🔧 Engineering Practice</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Memberikan pengalaman praktis dalam software engineering dan best practices 
                industri teknologi.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-800">
              <h3 className="font-bold text-xl mb-3 text-orange-600 dark:text-orange-400">🏗️ Project Development</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Mendorong mahasiswa untuk mengembangkan proyek nyata yang memberikan 
                dampak positif bagi masyarakat.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border border-red-200 dark:border-red-800">
              <h3 className="font-bold text-xl mb-3 text-red-600 dark:text-red-400">📊 Quality Assurance</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Mengajarkan pentingnya testing, documentation, dan quality assurance 
                dalam pengembangan software.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
