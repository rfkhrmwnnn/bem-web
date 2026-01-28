'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function AdcomPage() {
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
              className="w-48 h-48 relative rounded-2xl shadow-2xl overflow-hidden border-4 border-gradient-to-r from-purple-500 to-pink-500"
            >
              <Image
                src="/images/logo-adcom.png"
                alt="Logo ADCOM"
                fill
                className="object-contain p-4"
              />
            </motion.div>
          </div>
          
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            ADCOM
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-400 mb-4">
            Advertising and Communication
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-500 italic">
            Media, Communication & Creative Division
          </p>
        </motion.div>

        {/* Vision Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 glass p-8 rounded-2xl border border-purple-500/30 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-2xl">👁️</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Visi</h2>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed pl-15">
            Menjadikan ADCOM sebagai divisi yang profesional dan kreatif dalam mengelola strategi komunikasi, 
            publikasi, dan branding BEM IKMI, serta mengembangkan kemampuan mahasiswa di bidang media, 
            desain grafis, dan public relations.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12 glass p-8 rounded-2xl border border-pink-500/30 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Misi</h2>
          </div>
          <ul className="space-y-4 pl-15">
            <li className="flex gap-3 text-lg text-gray-700 dark:text-gray-300">
              <span className="text-purple-500 font-bold">1.</span>
              <span>Mengelola seluruh media komunikasi dan publikasi kegiatan BEM IKMI secara efektif dan kreatif</span>
            </li>
            <li className="flex gap-3 text-lg text-gray-700 dark:text-gray-300">
              <span className="text-purple-500 font-bold">2.</span>
              <span>Mengembangkan brand identity dan visual communication yang konsisten dan menarik</span>
            </li>
            <li className="flex gap-3 text-lg text-gray-700 dark:text-gray-300">
              <span className="text-purple-500 font-bold">3.</span>
              <span>Meningkatkan engagement dan interaksi dengan mahasiswa melalui konten yang relevan</span>
            </li>
            <li className="flex gap-3 text-lg text-gray-700 dark:text-gray-300">
              <span className="text-purple-500 font-bold">4.</span>
              <span>Memberikan pelatihan di bidang desain grafis, fotografi, videografi, dan copywriting</span>
            </li>
          </ul>
        </motion.div>

        {/* Objectives Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="glass p-8 rounded-2xl border border-purple-500/30 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
              <span className="text-2xl">🚀</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Tujuan</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 pl-15">
            <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800">
              <h3 className="font-bold text-xl mb-3 text-purple-600 dark:text-purple-400">📢 Komunikasi Efektif</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Membangun sistem komunikasi yang efektif antara BEM IKMI dengan seluruh 
                mahasiswa dan stakeholder.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 border border-pink-200 dark:border-pink-800">
              <h3 className="font-bold text-xl mb-3 text-pink-600 dark:text-pink-400">🎨 Creative Content</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Menghasilkan konten kreatif dan menarik di berbagai platform media sosial 
                untuk meningkatkan awareness.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800">
              <h3 className="font-bold text-xl mb-3 text-purple-600 dark:text-purple-400">📸 Documentation</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Mendokumentasikan seluruh kegiatan BEM IKMI dengan standar profesional 
                melalui foto dan video berkualitas.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 border border-pink-200 dark:border-pink-800">
              <h3 className="font-bold text-xl mb-3 text-pink-600 dark:text-pink-400">💡 Skill Development</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Mengembangkan skill anggota di bidang multimedia, public speaking, 
                dan strategic communication.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
