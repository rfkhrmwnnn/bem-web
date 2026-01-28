'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function IcrtPage() {
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
              className="w-48 h-48 relative rounded-2xl shadow-2xl overflow-hidden border-4 border-gradient-to-r from-blue-700 to-blue-500"
            >
              <Image
                src="/images/logo-icrt.png"
                alt="Logo ICRT"
                fill
                className="object-contain p-4"
              />
            </motion.div>
          </div>
          
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
            ICRT
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-400 mb-4">
            IKMI Cyber Security Research Team
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-500 italic">
            Cybersecurity Research & Defense Division
          </p>
        </motion.div>

        {/* Vision Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 glass p-8 rounded-2xl border border-blue-700/30 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 flex items-center justify-center">
              <span className="text-2xl">👁️</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Visi</h2>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed pl-15">
            Menjadikan ICRT sebagai tim riset dan praktisi keamanan siber terdepan di IKMI, yang 
            berkomitmen untuk mengembangkan pengetahuan dan keterampilan mahasiswa di bidang cybersecurity, 
            ethical hacking, dan digital forensics dengan standar internasional.
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
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Misi</h2>
          </div>
          <ul className="space-y-4 pl-15">
            <li className="flex gap-3 text-lg text-gray-700 dark:text-gray-300">
              <span className="text-blue-700 font-bold">1.</span>
              <span>Menyelenggarakan workshop dan training berkala tentang cybersecurity dan ethical hacking</span>
            </li>
            <li className="flex gap-3 text-lg text-gray-700 dark:text-gray-300">
              <span className="text-blue-700 font-bold">2.</span>
              <span>Melakukan riset dan penelitian di bidang keamanan jaringan, aplikasi, dan sistem</span>
            </li>
            <li className="flex gap-3 text-lg text-gray-700 dark:text-gray-300">
              <span className="text-blue-700 font-bold">3.</span>
              <span>Memfasilitasi mahasiswa untuk berpartisipasi dalam CTF (Capture The Flag) competitions</span>
            </li>
            <li className="flex gap-3 text-lg text-gray-700 dark:text-gray-300">
              <span className="text-blue-700 font-bold">4.</span>
              <span>Memberikan awareness tentang pentingnya keamanan digital di era modern</span>
            </li>
          </ul>
        </motion.div>

        {/* Objectives Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="glass p-8 rounded-2xl border border-blue-700/30 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-800 to-blue-600 flex items-center justify-center">
              <span className="text-2xl">🚀</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Tujuan</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 pl-15">
            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800">
              <h3 className="font-bold text-xl mb-3 text-blue-700 dark:text-blue-400">🛡️ Security Expertise</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Mengembangkan expertise mahasiswa dalam penetration testing, vulnerability 
                assessment, dan security auditing.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-800/20 dark:to-blue-900/20 border border-blue-200 dark:border-blue-800">
              <h3 className="font-bold text-xl mb-3 text-blue-600 dark:text-blue-400">🔐 Ethical Hacking</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Melatih mahasiswa dalam teknik ethical hacking dan defensive security 
                dengan mengikuti code of ethics.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800">
              <h3 className="font-bold text-xl mb-3 text-blue-700 dark:text-blue-400">🏴 CTF Champion</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Mempersiapkan tim untuk kompetisi CTF tingkat nasional dan internasional 
                dengan training intensif.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-800/20 dark:to-blue-900/20 border border-blue-200 dark:border-blue-800">
              <h3 className="font-bold text-xl mb-3 text-blue-600 dark:text-blue-400">🔍 Digital Forensics</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Mengajarkan teknik investigasi digital dan incident response untuk 
                menghadapi cyber threats.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
