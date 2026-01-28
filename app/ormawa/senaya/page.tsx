'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function SenayaPage() {
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
              className="w-48 h-48 relative rounded-2xl shadow-2xl overflow-hidden border-4 border-gradient-to-r from-red-800 to-yellow-600"
            >
              <Image
                src="/images/logo-senaya.png"
                alt="Logo Senaya"
                fill
                className="object-contain p-4"
              />
            </motion.div>
          </div>
          
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-800 to-yellow-600 bg-clip-text text-transparent">
            SENAYA
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-400 mb-4">
            Seni dan Budaya
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-500 italic">
            Arts and Culture Student Organization
          </p>
        </motion.div>

        {/* Vision Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 glass p-8 rounded-2xl border border-red-800/30 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-800 to-yellow-600 flex items-center justify-center">
              <span className="text-2xl">👁️</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Visi</h2>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed pl-15">
            Menjadikan Senaya sebagai wadah kreativitas mahasiswa dalam bidang seni dan budaya, 
            melestarikan warisan budaya Indonesia, serta mengembangkan talenta seni mahasiswa 
            di bidang musik, tari, teater, dan seni rupa.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12 glass p-8 rounded-2xl border border-yellow-600/30 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-600 to-red-800 flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Misi</h2>
          </div>
          <ul className="space-y-4 pl-15">
            <li className="flex gap-3 text-lg text-gray-700 dark:text-gray-300">
              <span className="text-red-800 font-bold">1.</span>
              <span>Menyelenggarakan pertunjukan seni dan budaya seperti musik, tari, teater, dan pameran seni</span>
            </li>
            <li className="flex gap-3 text-lg text-gray-700 dark:text-gray-300">
              <span className="text-red-800 font-bold">2.</span>
              <span>Mengadakan workshop dan pelatihan di berbagai bidang seni untuk mengembangkan talenta mahasiswa</span>
            </li>
            <li className="flex gap-3 text-lg text-gray-700 dark:text-gray-300">
              <span className="text-red-800 font-bold">3.</span>
              <span>Melestarikan dan mempromosikan budaya Indonesia melalui kegiatan seni yang kreatif</span>
            </li>
            <li className="flex gap-3 text-lg text-gray-700 dark:text-gray-300">
              <span className="text-red-800 font-bold">4.</span>
              <span>Membangun apresiasi seni dan budaya di kalangan mahasiswa dan masyarakat</span>
            </li>
          </ul>
        </motion.div>

        {/* Objectives Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="glass p-8 rounded-2xl border border-red-800/30 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-900 to-yellow-700 flex items-center justify-center">
              <span className="text-2xl">🚀</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Tujuan</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 pl-15">
            <div className="p-6 rounded-xl bg-gradient-to-br from-red-50 to-yellow-50 dark:from-red-900/20 dark:to-yellow-900/20 border border-red-200 dark:border-red-800">
              <h3 className="font-bold text-xl mb-3 text-red-800 dark:text-red-400">🎭 Performing Arts</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Mengembangkan kemampuan mahasiswa dalam seni pertunjukan seperti 
                teater, tari tradisional, dan drama.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-yellow-50 to-red-50 dark:from-yellow-900/20 dark:to-red-900/20 border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-bold text-xl mb-3 text-yellow-700 dark:text-yellow-400">🎵 Music & Song</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Memfasilitasi mahasiswa dalam berkarya dan tampil di bidang musik 
                tradisional maupun modern.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-red-50 to-yellow-50 dark:from-red-900/20 dark:to-yellow-900/20 border border-red-200 dark:border-red-800">
              <h3 className="font-bold text-xl mb-3 text-red-800 dark:text-red-400">🎨 Visual Arts</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Mendorong kreativitas dalam seni rupa, lukis, grafis, dan other 
                visual art forms.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-yellow-50 to-red-50 dark:from-yellow-900/20 dark:to-red-900/20 border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-bold text-xl mb-3 text-yellow-700 dark:text-yellow-400">🏛️ Cultural Heritage</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Menjaga dan melestarikan warisan budaya Indonesia melalui 
                dokumentasi dan revitalisasi seni.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
