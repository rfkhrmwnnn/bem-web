'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

const strukturKabinet = [
  { jabatan: 'Presiden Mahasiswa', nama: 'Moh Ari Widoyono', foto: '/images/presma.png' },
  { jabatan: 'Wakil Presiden Mahasiswa', nama: 'Muhammad Zamil Farhan', foto: '/images/wapresma.png' },
  { jabatan: 'Sekretaris Jenderal', nama: 'Liva', foto: '/images/sekjen.jpg' },
  { jabatan: 'Kementerian Keuangan', nama: 'Imelda', foto: '/images/kemenkeu.jpg' },
  { jabatan: 'Kementerian PSDM', nama: 'Ramdan', foto: '/images/psdm.jpg' },
  { jabatan: 'Kementerian Dalam Negeri', nama: 'Irul', foto: '/images/dagri.jpg' },
  { jabatan: 'Kementerian Luar Negeri', nama: 'Ruli', foto: '/images/menlu.jpg' },
  { jabatan: 'Kementerian Kominfo', nama: 'Rafi', foto: '/images/kominfo.jpg' },
  { jabatan: 'Kementerian Ristek', nama: 'Rifki', foto: '/images/ristek.jpg' },
  { jabatan: 'Kementerian Agama', nama: 'Riza', foto: '/images/kemenag.jpg' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function About() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-12 md:space-y-16 pb-10"
    >
      {/* Page Header */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-ocean-50 dark:bg-ocean-900/30 border border-ocean-200 dark:border-ocean-800 rounded-full px-4 py-1.5 text-ocean-600 dark:text-ocean-400 text-sm font-medium mb-4"
        >
          👥 Profil Organisasi
        </motion.div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-ocean-700 to-ocean-500 dark:from-ocean-300 dark:to-ocean-500 bg-clip-text text-transparent mb-4">
          Tentang Kami
        </h1>
        <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
          <strong>Badan Eksekutif Mahasiswa STMIK IKMI Cirebon</strong> merupakan lembaga eksekutif mahasiswa
          yang menjadi wadah aspirasi, kreativitas, dan kolaborasi bagi seluruh mahasiswa.
          Kabinet <strong>Parta Pandita</strong> hadir untuk membangun sinergi antara mahasiswa, kampus,
          dan masyarakat dalam semangat kepemimpinan, integritas, dan pengabdian.
        </p>
      </div>

      {/* Foto Kabinet */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative flex justify-center"
      >
        <div className="relative w-full max-w-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-ocean-400/20 to-ocean-600/20 rounded-2xl blur-xl" />
          <Image
            src="/images/kabinet.jpg"
            alt="Kabinet Parta Pandita"
            width={900}
            height={550}
            className="relative rounded-2xl border border-ocean-200 dark:border-ocean-700 shadow-2xl shadow-ocean-500/10 object-cover w-full"
          />
          <div className="absolute bottom-4 left-4 right-4 bg-white/80 dark:bg-ocean-900/80 backdrop-blur-md rounded-xl px-4 py-2 text-center">
            <p className="text-sm font-semibold text-ocean-700 dark:text-ocean-300">Kabinet Parta Pandita – BEM STMIK IKMI Cirebon</p>
          </div>
        </div>
      </motion.div>

      {/* Visi Misi */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="glass-card border border-ocean-100 dark:border-ocean-800 shadow-xl"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-ocean-700 dark:text-ocean-300 mb-2">Visi &amp; Misi Kabinet</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-ocean-500 to-ocean-300 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-ocean-50/50 dark:bg-ocean-900/30 rounded-xl p-5 md:p-6 border border-ocean-100 dark:border-ocean-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-ocean-500 to-ocean-700 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">V</div>
              <h3 className="text-xl font-bold text-ocean-700 dark:text-ocean-300">Visi</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Mewujudkan BEM STMIK IKMI Cirebon yang <strong className="text-ocean-600 dark:text-ocean-400">inovatif, kolaboratif, dan solutif</strong> sebagai wadah aspirasi mahasiswa
              menuju kampus yang unggul dalam ilmu pengetahuan, teknologi, dan pengabdian masyarakat.
            </p>
          </div>

          <div className="bg-ocean-50/50 dark:bg-ocean-900/30 rounded-xl p-5 md:p-6 border border-ocean-100 dark:border-ocean-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-ocean-500 to-ocean-700 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">M</div>
              <h3 className="text-xl font-bold text-ocean-700 dark:text-ocean-300">Misi</h3>
            </div>
            <ul className="space-y-3 text-slate-600 dark:text-slate-300">
              {[
                'Menumbuhkan budaya organisasi yang profesional dan berintegritas.',
                'Mengembangkan potensi mahasiswa melalui kegiatan inovatif dan kolaboratif.',
                'Membangun komunikasi aktif antara mahasiswa, kampus, dan masyarakat.',
                'Menjadi agen perubahan dalam menciptakan lingkungan kampus yang inspiratif dan produktif.',
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  <span className="w-6 h-6 flex-shrink-0 rounded-full bg-ocean-100 dark:bg-ocean-800 text-ocean-600 dark:text-ocean-400 flex items-center justify-center text-xs font-bold mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Struktur Kabinet */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-ocean-700 dark:text-ocean-300 mb-2">
            Struktur Kabinet Parta Pandita
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-ocean-500 to-ocean-300 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 justify-items-center"
        >
          {strukturKabinet.map((person, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -6 }}
              className="group relative glass-card border border-ocean-100 dark:border-ocean-800 hover:border-ocean-300 dark:hover:border-ocean-600 w-full text-center p-3 md:p-4"
            >
              <div className="relative mx-auto mb-3 w-20 h-20 sm:w-24 sm:h-24">
                <Image
                  src={person.foto}
                  alt={person.nama}
                  fill
                  className="rounded-xl object-cover border-2 border-ocean-200 dark:border-ocean-700 group-hover:border-ocean-400 transition-colors shadow-md"
                />
              </div>
              <h3 className="text-sm font-bold text-ocean-700 dark:text-ocean-300 leading-tight">{person.nama}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-tight">{person.jabatan}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
