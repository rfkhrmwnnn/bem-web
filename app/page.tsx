'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Home() {
  const [stats, setStats] = useState({
    mahasiswa: 0,
    kegiatan: 0,
    kementerian: 0,
  })

  // Animated counter effect
  useEffect(() => {
    const duration = 2000
    const steps = 60
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      setStats({
        mahasiswa: Math.floor((1200 / steps) * step),
        kegiatan: Math.floor((30 / steps) * step),
        kementerian: Math.floor((8 / steps) * step),
      })
      if (step >= steps) clearInterval(timer)
    }, interval)

    return () => clearInterval(timer)
  }, [])

  const features = [
    {
      icon: '🎯',
      title: 'Visi & Misi',
      description: 'Mewujudkan BEM yang inovatif, kolaboratif, dan solutif',
      link: '/about',
    },
    {
      icon: '📚',
      title: 'Kegiatan',
      description: 'Program kerja dan kegiatan mahasiswa yang inspiratif',
      link: '/kegiatan',
    },
    {
      icon: '🤝',
      title: 'Layanan',
      description: 'Berbagai layanan untuk mendukung mahasiswa',
      link: '/layanan',
    },
    {
      icon: '💡',
      title: 'Filosofi',
      description: 'Makna mendalam di balik logo kabinet',
      link: '/filosofi',
    },
  ]

  return (
    <div className="relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-ocean-300 to-cloud-100 rounded-full blur-3xl opacity-60"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-ocean-400 to-ocean-200 rounded-full blur-3xl opacity-60"
        />
      </div>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative text-center py-20 px-4"
      >
        {/* Logo with Glow Effect */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring" }}
          className="relative inline-block mb-8"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-ocean-400 to-ocean-200 rounded-full blur-2xl opacity-40 animate-pulse" />
          <Image 
            src="/images/logo.png" 
            alt="Logo BEM" 
            width={180} 
            height={180} 
            className="relative rounded-full border-4 border-ocean-200 dark:border-ocean-600 shadow-2xl shadow-ocean-500/20"
          />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-4"
        >
          <span className="bg-gradient-to-r from-ocean-700 via-ocean-500 to-ocean-700 dark:from-ocean-300 dark:via-ocean-100 dark:to-ocean-300 bg-clip-text text-transparent animate-gradient">
            Kabinet Parta Pandita
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-4 font-light tracking-wide"
        >
          Badan Eksekutif Mahasiswa
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-12"
        >
          STMIK IKMI Cirebon
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          <Link href="/about">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px rgba(14, 165, 233, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-ocean-600 to-ocean-500 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-ocean-500/30 transition-all border border-ocean-400/20"
            >
              🎯 Tentang Kami
            </motion.button>
          </Link>
          <Link href="/kegiatan">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px rgba(56, 189, 248, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="glass border border-ocean-200 dark:border-ocean-700 px-8 py-4 rounded-xl text-ocean-700 dark:text-ocean-300 font-semibold hover:bg-ocean-50 dark:hover:bg-ocean-900/50 transition-all"
            >
              📅 Lihat Kegiatan
            </motion.button>
          </Link>
        </motion.div>

        {/* Statistics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass-card border border-ocean-100 dark:border-ocean-800"
          >
            <div className="text-5xl mb-3">👥</div>
            <div className="text-4xl font-bold bg-gradient-to-r from-ocean-600 to-ocean-400 bg-clip-text text-transparent mb-2">
              {stats.mahasiswa}+
            </div>
            <div className="text-slate-600 dark:text-slate-400 font-medium">Mahasiswa Aktif</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass-card border border-ocean-100 dark:border-ocean-800"
          >
            <div className="text-5xl mb-3">🎉</div>
            <div className="text-4xl font-bold bg-gradient-to-r from-ocean-500 to-sky-400 bg-clip-text text-transparent mb-2">
              {stats.kegiatan}+
            </div>
            <div className="text-slate-600 dark:text-slate-400 font-medium">Kegiatan Tahunan</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass-card border border-ocean-100 dark:border-ocean-800"
          >
            <div className="text-5xl mb-3">🏛️</div>
            <div className="text-4xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent mb-2">
              {stats.kementerian}
            </div>
            <div className="text-slate-600 dark:text-slate-400 font-medium">Kementerian</div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative py-20 px-4"
      >
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-ocean-700 to-ocean-500 dark:from-ocean-300 dark:to-ocean-500 bg-clip-text text-transparent"
          >
            Jelajahi BEM IKMI
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 dark:text-slate-400 text-lg"
          >
            Temukan berbagai program dan layanan kami
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <Link href={feature.link}>
                <div className="glass-card hover:border-ocean-300 dark:hover:border-ocean-600 transition-all h-full group">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white group-hover:text-ocean-600 dark:group-hover:text-ocean-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    {feature.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative py-20 px-4"
      >
        <div className="max-w-4xl mx-auto text-center glass-card border border-ocean-200 dark:border-ocean-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-ocean-400 to-ocean-600" />
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 0.8 }}
            className="text-6xl mb-6"
          >
            🚀
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-ocean-700 to-ocean-500 dark:from-ocean-300 dark:to-ocean-500 bg-clip-text text-transparent">
            Mari Bergabung Bersama Kami!
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-lg mb-8">
            Jadilah bagian dari perubahan positif di kampus. Hubungi kami untuk informasi lebih lanjut.
          </p>
          <Link href="/hubungi">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-lg"
            >
              📞 Hubungi Kami
            </motion.button>
          </Link>
        </div>
      </motion.section>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-ocean-300/10 dark:bg-ocean-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-ocean-400/10 dark:bg-ocean-600/10 rounded-full blur-3xl -z-10" />
    </div>
  )
}
