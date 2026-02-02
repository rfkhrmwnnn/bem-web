'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function LdkPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
            style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }}>
        </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="w-40 h-40 mx-auto relative mb-8 drop-shadow-2xl">
              <Image
                src="/images/logo-ldk.png"
                alt="Logo LDK"
                fill
                className="object-contain"
              />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight text-slate-800 dark:text-slate-100">
            LDK
          </h1>
          <p className="text-xl md:text-2xl font-medium text-emerald-700 dark:text-emerald-500 mb-2 uppercase tracking-wide">
            Lembaga Dakwah Kampus
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-700 to-green-600 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
            Spirituality, Brotherhood & Integrity
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 relative overflow-hidden group hover:border-emerald-500/30 transition-all"
            >
                <div className="absolute top-0 left-0 w-2 h-full bg-emerald-600"></div>
                <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl">🕌</span>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Visi Organisasi</h2>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-loose text-lg">
                    Menjadikan LDK STMIK IKMI Cirebon sebagai pusat dakwah yang <span className="font-semibold text-emerald-700">prestatif</span>, <span className="font-semibold text-emerald-700">kontributif</span>, dan <span className="font-semibold text-emerald-700">solutif</span> dalam membina mahasiswa yang berkarakter Islami.
                </p>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 relative overflow-hidden group hover:border-green-500/30 transition-all"
            >
                <div className="absolute top-0 left-0 w-2 h-full bg-green-600"></div>
                <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl p-3 bg-green-50 dark:bg-green-900/20 rounded-2xl">📖</span>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Misi Utama</h2>
                </div>
                <ul className="space-y-4">
                    {[
                        "Mengokohkan pemahaman Islam yang syamil dan mutakamil",
                        "Membangun ukhuwah islamiyah yang solid di lingkungan kampus",
                        "Meningkatkan potensi minat dan bakat mahasiswa muslim",
                        "Menjadi teladan utama dalam akhlak dan prestasi akademik"
                    ].map((item, idx) => (
                        <li key={idx} className="flex gap-4 text-slate-600 dark:text-slate-300 items-start">
                            <span className="w-6 h-6 flex-shrink-0 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-bold mt-1">{idx + 1}</span>
                            <span className="text-lg leading-relaxed">{item}</span>
                        </li>
                    ))}
                </ul>
            </motion.div>
        </div>

        {/* Features / Functions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
            <h2 className="text-3xl font-bold text-center mb-12 text-slate-800 dark:text-white tracking-tight">Program Unggulan</h2>
            <div className="grid md:grid-cols-4 gap-6">
                {[
                    { title: "Mentoring", icon: "👳", desc: "Pembinaan Karakter" },
                    { title: "Kajian Rutin", icon: "🕌", desc: "Diskusi Keislaman" },
                    { title: "Baksos", icon: "🤝", desc: "Kepedulian Sosial" },
                    { title: "Rihlah", icon: "🏞️", desc: "Tadabbur Alam" }
                ].map((item, idx) => (
                    <motion.div 
                        key={idx}
                        whileHover={{ y: -10 }}
                        className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 text-center hover:border-emerald-500/50 transition-colors group"
                    >
                        <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{item.title}</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
      </div>
    </div>
  )
}
