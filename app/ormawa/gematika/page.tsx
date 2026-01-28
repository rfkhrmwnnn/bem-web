'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function GematikaPage() {
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
              className="w-48 h-48 relative rounded-2xl shadow-2xl overflow-hidden border-4 border-gradient-to-r from-green-700 to-emerald-500"
            >
              <Image
                src="/images/logo-gematika.png"
                alt="Logo Gematika"
                fill
                className="object-contain p-4"
              />
            </motion.div>
          </div>
          
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-700 to-emerald-500 bg-clip-text text-transparent">
            GEMATIKA
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-400 mb-4">
            Gerakan Mahasiswa Informatika Alam
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-500 italic">
            Informatics Outdoor Adventure Student Movement
          </p>
        </motion.div>

        {/* Vision Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 glass p-8 rounded-2xl border border-green-700/30 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-700 to-emerald-500 flex items-center justify-center">
              <span className="text-2xl">👁️</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Visi</h2>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed pl-15">
            Menjadikan Gematika sebagai organisasi mahasiswa informatika yang unggul dalam kegiatan 
            petualangan alam, pendakian gunung, dan konservasi lingkungan, serta membentuk mahasiswa 
            yang tangguh, peduli lingkungan, dan memiliki jiwa petualang yang tinggi.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12 glass p-8 rounded-2xl border border-emerald-500/30 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-green-700 flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Misi</h2>
          </div>
          <ul className="space-y-4 pl-15">
            <li className="flex gap-3 text-lg text-gray-700 dark:text-gray-300">
              <span className="text-green-700 font-bold">1.</span>
              <span>Menyelenggarakan kegiatan pendakian gunung, camping, hiking, dan ekspedisi alam secara rutin</span>
            </li>
            <li className="flex gap-3 text-lg text-gray-700 dark:text-gray-300">
              <span className="text-green-700 font-bold">2.</span>
              <span>Memberikan pelatihan survival skills, navigasi alam, dan mountaineering kepada anggota</span>
            </li>
            <li className="flex gap-3 text-lg text-gray-700 dark:text-gray-300">
              <span className="text-green-700 font-bold">3.</span>
              <span>Menggalakkan program konservasi lingkungan dan kepedulian terhadap alam</span>
            </li>
            <li className="flex gap-3 text-lg text-gray-700 dark:text-gray-300">
              <span className="text-green-700 font-bold">4.</span>
              <span>Membangun karakter tangguh, disiplin, dan teamwork melalui petualangan alam</span>
            </li>
          </ul>
        </motion.div>

        {/* Objectives Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="glass p-8 rounded-2xl border border-green-700/30 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-800 to-emerald-600 flex items-center justify-center">
              <span className="text-2xl">🚀</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Tujuan</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 pl-15">
            <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800">
              <h3 className="font-bold text-xl mb-3 text-green-700 dark:text-green-400">🏔️ Mountain Expedition</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Melakukan pendakian berbagai gunung di Indonesia dan meningkatkan 
                kemampuan mountaineering anggota.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-800">
              <h3 className="font-bold text-xl mb-3 text-emerald-600 dark:text-emerald-400">🎒 Survival Skills</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Mengajarkan keterampilan bertahan hidup di alam, navigasi, P3K, 
                dan pengetahuan flora-fauna.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800">
              <h3 className="font-bold text-xl mb-3 text-green-700 dark:text-green-400">🌱 Conservation</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Melakukan kegiatan konservasi alam, penanaman pohon, dan 
                kampanye cinta lingkungan.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-800">
              <h3 className="font-bold text-xl mb-3 text-emerald-600 dark:text-emerald-400">🤝 Brotherhood</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Membangun solidaritas dan persaudaraan yang kuat melalui 
                pengalaman petualangan bersama.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
