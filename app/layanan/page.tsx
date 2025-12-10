'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface Aspirasi {
  id: number
  type: 'aspirasi' | 'kerjasama'
  nama: string
  nim?: string
  email?: string
  phone?: string
  kategori: string
  pesan: string
  organisasi?: string
  jenisKerjasama?: string
  tanggal: string
}

export default function Layanan() {
  const [showForm, setShowForm] = useState<'aspirasi' | 'kerjasama' | null>(null)
  const [nama, setNama] = useState('')
  const [nim, setNim] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [kategori, setKategori] = useState('')
  const [pesan, setPesan] = useState('')
  const [organisasi, setOrganisasi] = useState('')
  const [jenisKerjasama, setJenisKerjasama] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const layananList: Array<{
    icon: string
    title: string
    description: string
    color: string
    action?: () => void
    link?: string
  }> = [
    {
      icon: '📝',
      title: 'Aspirasi Mahasiswa',
      description: 'Sampaikan aspirasi, kritik, dan saran untuk kemajuan kampus',
      color: 'from-blue-500 to-cyan-500',
      action: () => setShowForm('aspirasi'),
    },
    {
      icon: '🤝',
      title: 'Kerjasama & Sponsorship',
      description: 'Pengajuan kerjasama dan sponsorship untuk acara',
      color: 'from-indigo-500 to-blue-500',
      action: () => setShowForm('kerjasama'),
    },
  ]

  const kategoriAspirasi = [
    'Akademik',
    'Fasilitas',
    'Kegiatan Mahasiswa',
    'Administrasi',
    'Kemahasiswaan',
    'Lainnya',
  ]

  const jenisKerjasamaList = [
    'Sponsorship Acara',
    'Media Partner',
    'Kerjasama Akademik',
    'Kerjasama Organisasi',
    'Donasi',
    'Lainnya',
  ]

  const resetForm = () => {
    setNama('')
    setNim('')
    setEmail('')
    setPhone('')
    setKategori('')
    setPesan('')
    setOrganisasi('')
    setJenisKerjasama('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (showForm === 'aspirasi') {
      if (!nama || !nim || !kategori || !pesan) {
        alert('Mohon lengkapi semua field!')
        return
      }
    } else if (showForm === 'kerjasama') {
      if (!nama || !organisasi || !email || !phone || !jenisKerjasama || !pesan) {
        alert('Mohon lengkapi semua field!')
        return
      }
    }

    // Simpan ke localStorage
    const data: Aspirasi = {
      id: Date.now(),
      type: showForm!,
      nama,
      ...(showForm === 'aspirasi' ? { nim, kategori } : { organisasi, email, phone, jenisKerjasama, kategori: jenisKerjasama }),
      pesan,
      tanggal: new Date().toISOString(),
    }

    const existing = localStorage.getItem('layananData')
    const dataList = existing ? JSON.parse(existing) : []
    dataList.push(data)
    localStorage.setItem('layananData', JSON.stringify(dataList))

    // Trigger storage event untuk update admin dashboard
    window.dispatchEvent(new StorageEvent('storage', { 
      key: 'layananData', 
      newValue: JSON.stringify(dataList) 
    }))

    resetForm()
    setSubmitted(true)

    // Hide success message after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setShowForm(null)
    }, 3000)
  }

  return (
    <div className="relative min-h-screen pb-20">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-orangeBright to-neon bg-clip-text text-transparent">
          Layanan BEM IKMI
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Berbagai layanan untuk mendukung kegiatan dan aspirasi mahasiswa STMIK IKMI Cirebon
        </p>
      </motion.div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
        {layananList.map((layanan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.03, y: -5 }}
            className="glass p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-orangeBright dark:hover:border-neon transition-all shadow-lg hover:shadow-2xl backdrop-blur-xl group cursor-pointer"
            onClick={() => {
              if (layanan.action) {
                layanan.action()
              } else if (layanan.link) {
                window.open(layanan.link, '_blank')
              }
            }}
          >
            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${layanan.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
              {layanan.icon}
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white group-hover:text-orangeBright dark:group-hover:text-neon transition-colors">
              {layanan.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              {layanan.description}
            </p>
            <div className="flex items-center text-orangeBright dark:text-neon font-semibold text-sm group-hover:translate-x-2 transition-transform">
              {layanan.action ? 'Buka Form' : 'Akses Layanan'} →
            </div>
          </motion.div>
        ))}
      </div>

      {/* Aspirasi Form Modal */}
      <AnimatePresence>
        {showForm && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !submitted && setShowForm(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            {/* Form Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700">
                {/* Form Header */}
                <div className="sticky top-0 bg-gradient-to-r from-orangeBright to-neon p-6 rounded-t-3xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">📝</div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">Form Aspirasi Mahasiswa</h2>
                        <p className="text-white/80 text-sm">Sampaikan aspirasi Anda untuk kemajuan kampus</p>
                      </div>
                    </div>
                    {!submitted && (
                      <button
                        onClick={() => setShowForm(null)}
                        className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                      >
                        <span className="text-white text-2xl">✕</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Success Message */}
                {submitted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="p-12 text-center"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5, repeat: 2 }}
                      className="text-8xl mb-6"
                    >
                      ✅
                    </motion.div>
                    <h3 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">
                      Aspirasi Terkirim!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Terima kasih atas aspirasi Anda. Kami akan menindaklanjuti segera.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Form Aspirasi */}
                    {showForm === 'aspirasi' && (
                      <>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            👤 Nama Lengkap <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            placeholder="Masukkan nama lengkap Anda"
                            className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orangeBright dark:focus:ring-neon transition"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            🎓 NIM <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={nim}
                            onChange={(e) => setNim(e.target.value)}
                            placeholder="Masukkan NIM Anda"
                            className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orangeBright dark:focus:ring-neon transition"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            📂 Kategori Aspirasi <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={kategori}
                            onChange={(e) => setKategori(e.target.value)}
                            className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orangeBright dark:focus:ring-neon transition"
                            required
                          >
                            <option value="">Pilih kategori...</option>
                            {kategoriAspirasi.map((kat) => (
                              <option key={kat} value={kat}>{kat}</option>
                            ))}
                          </select>
                        </div>
                      </>
                    )}

                    {/* Form Kerjasama */}
                    {showForm === 'kerjasama' && (
                      <>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            � Nama Lengkap <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            placeholder="Masukkan nama lengkap Anda"
                            className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orangeBright dark:focus:ring-neon transition"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            🏢 Nama Organisasi/Perusahaan <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={organisasi}
                            onChange={(e) => setOrganisasi(e.target.value)}
                            placeholder="Masukkan nama organisasi/perusahaan"
                            className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orangeBright dark:focus:ring-neon transition"
                            required
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                              📧 Email <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="email@example.com"
                              className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orangeBright dark:focus:ring-neon transition"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                              📱 No. Telepon <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="08xxxxxxxxxx"
                              className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orangeBright dark:focus:ring-neon transition"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            📂 Jenis Kerjasama <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={jenisKerjasama}
                            onChange={(e) => setJenisKerjasama(e.target.value)}
                            className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orangeBright dark:focus:ring-neon transition"
                            required
                          >
                            <option value="">Pilih jenis kerjasama...</option>
                            {jenisKerjasamaList.map((jenis) => (
                              <option key={jenis} value={jenis}>{jenis}</option>
                            ))}
                          </select>
                        </div>
                      </>
                    )}

                    {/* Pesan (Common for both) */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        💬 {showForm === 'aspirasi' ? 'Aspirasi / Pesan' : 'Detail Proposal'} <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={pesan}
                        onChange={(e) => setPesan(e.target.value)}
                        placeholder={showForm === 'aspirasi' 
                          ? 'Sampaikan aspirasi, kritik, atau saran Anda...'
                          : 'Jelaskan detail proposal kerjasama atau sponsorship Anda...'}
                        rows={6}
                        className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orangeBright dark:focus:ring-neon transition resize-none"
                        required
                      />
                    </div>

                    {/* Info */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                      <p className="text-sm text-blue-800 dark:text-blue-300">
                        💡 <strong>Catatan:</strong> {showForm === 'aspirasi' 
                          ? 'Aspirasi Anda akan ditinjau oleh pengurus BEM dan akan ditindaklanjuti sesuai dengan kewenangannya.'
                          : 'Proposal Anda akan ditinjau oleh tim BEM. Kami akan menghubungi Anda melalui email/telepon yang tercantum.'}
                      </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 bg-gradient-to-r from-orangeBright to-neon text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                      >
                        📤 Kirim {showForm === 'aspirasi' ? 'Aspirasi' : 'Proposal'}
                      </motion.button>
                      <motion.button
                        type="button"
                        onClick={() => setShowForm(null)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                      >
                        Batal
                      </motion.button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="glass p-8 rounded-2xl border border-orangeBright/30 dark:border-neon/30 shadow-xl backdrop-blur-xl"
      >
        <div className="flex items-start gap-4">
          <div className="text-4xl">ℹ️</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              Informasi Layanan
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-orangeBright dark:text-neon mt-1">•</span>
                <span>Semua layanan dapat diakses oleh seluruh mahasiswa STMIK IKMI Cirebon</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orangeBright dark:text-neon mt-1">•</span>
                <span>Aspirasi akan ditinjau dalam waktu maksimal 3x24 jam</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orangeBright dark:text-neon mt-1">•</span>
                <span>Untuk pertanyaan lebih lanjut, hubungi kami melalui halaman Hubungi</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orangeBright dark:text-neon mt-1">•</span>
                <span>Identitas pelapor akan dijaga kerahasiaannya</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
