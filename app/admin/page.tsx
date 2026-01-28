'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import ProtectedRoute from '@/components/ProtectedRoute'
import Image from 'next/image'

interface Kegiatan {
  id: number
  judul: string
  deskripsi: string
  tanggal: string
  gambar?: string
}

interface LayananData {
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

type ViewMode = 'dashboard' | 'kegiatan' | 'layanan' | 'settings'

export default function AdminDashboard() {
  const router = useRouter()
  const [kegiatan, setKegiatan] = useState<Kegiatan[]>([])
  const [layananData, setLayananData] = useState<LayananData[]>([])
  const [judul, setJudul] = useState('')
  const [deskripsi, setDeskripsi] = useState('')
  const [tanggal, setTanggal] = useState('')
  const [gambar, setGambar] = useState<string | undefined>(undefined)
  const [editId, setEditId] = useState<number | null>(null)
  const [search, setSearch] = useState('')
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard')
  const [showForm, setShowForm] = useState(false)

  // Load data awal dari localStorage atau file JSON
  useEffect(() => {
    const stored = localStorage.getItem('kegiatan')
    if (stored) setKegiatan(JSON.parse(stored))
    else {
      fetch('/data/kegiatan.json')
        .then(res => res.json())
        .then(data => setKegiatan(data))
    }
  }, [])

  // Simpan otomatis ke localStorage
  useEffect(() => {
    localStorage.setItem('kegiatan', JSON.stringify(kegiatan))
  }, [kegiatan])

  // Load layanan data
  useEffect(() => {
    const stored = localStorage.getItem('layananData')
    if (stored) setLayananData(JSON.parse(stored))
    
    // Listen for storage changes
    const handleStorage = () => {
      const data = localStorage.getItem('layananData')
      if (data) setLayananData(JSON.parse(data))
    }
    
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const resetForm = () => {
    setJudul('')
    setDeskripsi('')
    setTanggal('')
    setGambar(undefined)
    setEditId(null)
    setShowForm(false)
  }

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setGambar(url)
    }
  }

  const tambahKegiatan = () => {
    if (!judul || !deskripsi || !tanggal)
      return alert('Lengkapi semua data!')
    const newItem: Kegiatan = {
      id: Date.now(),
      judul,
      deskripsi,
      tanggal,
      gambar: gambar || '/images/logo.png',
    }
    const updated = [...kegiatan, newItem]
    setKegiatan(updated)
    localStorage.setItem('kegiatan', JSON.stringify(updated))
    window.dispatchEvent(new StorageEvent('storage', { key: 'kegiatan', newValue: JSON.stringify(updated) }))
    resetForm()
  }

  const hapusKegiatan = (id: number) => {
    if (confirm('Yakin ingin menghapus kegiatan ini?')) {
      const updated = kegiatan.filter(k => k.id !== id)
      setKegiatan(updated)
      localStorage.setItem('kegiatan', JSON.stringify(updated))
      window.dispatchEvent(new StorageEvent('storage', { key: 'kegiatan', newValue: JSON.stringify(updated) }))
    }
  }

  const editKegiatan = (item: Kegiatan) => {
    setEditId(item.id)
    setJudul(item.judul)
    setDeskripsi(item.deskripsi)
    setTanggal(item.tanggal)
    setGambar(item.gambar || undefined)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const simpanEdit = () => {
    if (!editId) return
    const updated = kegiatan.map(k =>
      k.id === editId ? { ...k, judul, deskripsi, tanggal, gambar: gambar || undefined } : k
    )
    setKegiatan(updated)
    localStorage.setItem('kegiatan', JSON.stringify(updated))
    window.dispatchEvent(new StorageEvent('storage', { key: 'kegiatan', newValue: JSON.stringify(updated) }))
    resetForm()
  }

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    router.push('/login')
  }

  const filtered = kegiatan.filter(k =>
    k.judul.toLowerCase().includes(search.toLowerCase())
  )

  // Statistik
  const totalKegiatan = kegiatan.length
  const kegiatanBulanIni = kegiatan.filter(k => {
    const date = new Date(k.tanggal)
    const now = new Date()
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
  }).length
  const kegiatanMendatang = kegiatan.filter(k => new Date(k.tanggal) > new Date()).length

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="fixed left-0 top-0 h-screen w-64 glass border-r border-orangeBright/30 pt-20 px-4 z-40"
        >
          <div className="flex flex-col items-center mb-8">
            <Image src="/images/logo.png" alt="Logo" width={80} height={80} className="rounded-full mb-3" />
            <h3 className="text-xl font-bold text-orangeBright">Admin Panel</h3>
            <p className="text-sm text-gray-400">BEM IKMI Cirebon</p>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setViewMode('dashboard')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                viewMode === 'dashboard'
                  ? 'bg-orangeBright text-white shadow-lg'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              <span className="text-lg mr-2">📊</span> Dashboard
            </button>
            <button
              onClick={() => setViewMode('kegiatan')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                viewMode === 'kegiatan'
                  ? 'bg-orangeBright text-white shadow-lg'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              <span className="text-lg mr-2">📅</span> Kelola Kegiatan
            </button>
            <button
              onClick={() => setViewMode('layanan')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                viewMode === 'layanan'
                  ? 'bg-orangeBright text-white shadow-lg'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              <span className="text-lg mr-2">📝</span> Data Layanan
            </button>
            <button
              onClick={() => setViewMode('settings')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                viewMode === 'settings'
                  ? 'bg-orangeBright text-white shadow-lg'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              <span className="text-lg mr-2">⚙️</span> Pengaturan
            </button>
          </nav>

          <button
            onClick={handleLogout}
            className="absolute bottom-8 left-4 right-4 bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition font-semibold"
          >
            <span className="text-lg mr-2">🚪</span> Logout
          </button>
        </motion.aside>

        {/* Main Content */}
        <div className="ml-64 pt-20 px-8 pb-10">
          <AnimatePresence mode="wait">
            {/* Dashboard View */}
            {viewMode === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-4xl font-bold text-orangeBright mb-8">
                  Dashboard Overview
                </h1>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="glass p-6 rounded-xl border border-neon shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Total Kegiatan</p>
                        <h3 className="text-4xl font-bold text-neon">{totalKegiatan}</h3>
                      </div>
                      <div className="text-5xl">📚</div>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="glass p-6 rounded-xl border border-orangeBright shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Bulan Ini</p>
                        <h3 className="text-4xl font-bold text-orangeBright">{kegiatanBulanIni}</h3>
                      </div>
                      <div className="text-5xl">📅</div>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="glass p-6 rounded-xl border border-green-500 shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Mendatang</p>
                        <h3 className="text-4xl font-bold text-green-500">{kegiatanMendatang}</h3>
                      </div>
                      <div className="text-5xl">🚀</div>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="glass p-6 rounded-xl border border-purple-500 shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Aspirasi & Kerjasama</p>
                        <h3 className="text-4xl font-bold text-purple-500">{layananData.length}</h3>
                      </div>
                      <div className="text-5xl">📝</div>
                    </div>
                  </motion.div>
                </div>

                {/* Recent Activities */}
                <div className="glass p-6 rounded-xl border border-orangeBright/30">
                  <h2 className="text-2xl font-bold text-orangeBright mb-4">Kegiatan Terbaru</h2>
                  <div className="space-y-3">
                    {kegiatan.slice(0, 5).map((k) => (
                      <div key={k.id} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition">
                        {k.gambar && (
                          <img src={k.gambar} alt={k.judul} className="w-16 h-16 object-cover rounded-lg" />
                        )}
                        <div className="flex-1">
                          <h4 className="font-semibold text-white">{k.judul}</h4>
                          <p className="text-sm text-gray-400">{k.tanggal}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Kegiatan Management View */}
            {viewMode === 'kegiatan' && (
              <motion.div
                key="kegiatan"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-4xl font-bold text-orangeBright">Kelola Kegiatan</h1>
                  <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-neon text-black px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition shadow-lg"
                  >
                    {showForm ? '❌ Tutup Form' : '➕ Tambah Kegiatan'}
                  </button>
                </div>

                {/* Form Tambah / Edit */}
                <AnimatePresence>
                  {showForm && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="glass p-8 rounded-xl border border-neon mb-10 overflow-hidden"
                    >
                      <h2 className="text-2xl font-semibold text-neon mb-6">
                        {editId ? '✏️ Edit Kegiatan' : '➕ Tambah Kegiatan Baru'}
                      </h2>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">Judul Kegiatan</label>
                            <input
                              type="text"
                              placeholder="Masukkan judul kegiatan..."
                              className="w-full p-3 rounded-lg bg-black/30 border border-orangeBright text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon transition"
                              value={judul}
                              onChange={(e) => setJudul(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">Deskripsi</label>
                            <textarea
                              className="w-full p-3 rounded-lg bg-black/30 border border-orangeBright text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon transition"
                              placeholder="Deskripsi kegiatan..."
                              rows={4}
                              value={deskripsi}
                              onChange={(e) => setDeskripsi(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">Tanggal</label>
                            <input
                              type="date"
                              className="w-full p-3 rounded-lg bg-black/30 border border-orangeBright text-white focus:outline-none focus:ring-2 focus:ring-neon transition"
                              value={tanggal}
                              onChange={(e) => setTanggal(e.target.value)}
                            />
                          </div>
                        </div>

                        {/* Upload Gambar */}
                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-orangeBright rounded-xl p-6 bg-black/20">
                          <label className="cursor-pointer text-center">
                            <div className="text-5xl mb-3">📸</div>
                            <p className="text-gray-400 mb-2">Klik untuk upload gambar</p>
                            <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                          </label>
                          {gambar && (
                            <motion.img
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              src={gambar}
                              alt="Preview"
                              className="mt-4 w-full h-48 object-cover rounded-lg border-2 border-neon shadow-lg"
                            />
                          )}
                        </div>
                      </div>

                      <div className="flex gap-3 mt-6">
                        {editId ? (
                          <>
                            <button
                              onClick={simpanEdit}
                              className="bg-neon text-black px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition shadow-lg"
                            >
                              💾 Simpan Perubahan
                            </button>
                            <button
                              onClick={resetForm}
                              className="border border-orangeBright px-6 py-3 rounded-lg text-orangeBright hover:bg-orangeBright hover:text-white transition"
                            >
                              ❌ Batal
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={tambahKegiatan}
                            className="bg-orangeBright text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition shadow-lg"
                          >
                            ➕ Tambah Kegiatan
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Pencarian */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-white">Daftar Kegiatan ({filtered.length})</h2>
                  <input
                    type="text"
                    placeholder="🔍 Cari kegiatan..."
                    className="p-3 rounded-lg bg-black/30 border border-neon text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon w-64"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                {/* Daftar Kegiatan */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((k, i) => (
                    <motion.div
                      key={k.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ scale: 1.03 }}
                      className="glass border border-orangeBright/50 rounded-xl overflow-hidden hover:shadow-[0_0_20px_#00ffff] transition-all"
                    >
                      {k.gambar && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={k.gambar}
                            alt={k.judul}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="text-xl font-bold text-orangeBright mb-2">{k.judul}</h3>
                        <p className="text-gray-300 text-sm mb-3 line-clamp-2">{k.deskripsi}</p>
                        <p className="text-sm text-neon mb-4">📅 {k.tanggal}</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => editKegiatan(k)}
                            className="flex-1 bg-neon text-black px-3 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => hapusKegiatan(k.id)}
                            className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition"
                          >
                            🗑️ Hapus
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {filtered.length === 0 && (
                  <div className="text-center py-20">
                    <div className="text-6xl mb-4">📭</div>
                    <p className="text-gray-400 text-lg">Tidak ada kegiatan ditemukan</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Layanan View */}
            {viewMode === 'layanan' && (
              <motion.div
                key="layanan"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-4xl font-bold text-orangeBright mb-8">Data Layanan Mahasiswa</h1>
                
                {/* Summary Cards */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="glass p-6 rounded-xl border border-blue-500/50">
                    <div className="flex items-center gap-4">
                      <div className="text-5xl">📝</div>
                      <div>
                        <p className="text-gray-400 text-sm">Total Aspirasi</p>
                        <h3 className="text-3xl font-bold text-blue-500">
                          {layananData.filter(d => d.type === 'aspirasi').length}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="glass p-6 rounded-xl border border-indigo-500/50">
                    <div className="flex items-center gap-4">
                      <div className="text-5xl">🤝</div>
                      <div>
                        <p className="text-gray-400 text-sm">Total Kerjasama</p>
                        <h3 className="text-3xl font-bold text-indigo-500">
                          {layananData.filter(d => d.type === 'kerjasama').length}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Data List */}
                <div className="space-y-4">
                  {layananData.length === 0 ? (
                    <div className="text-center py-20 glass rounded-xl border border-gray-700">
                      <div className="text-6xl mb-4">📭</div>
                      <p className="text-gray-400 text-lg">Belum ada data layanan</p>
                    </div>
                  ) : (
                    layananData.sort((a, b) => b.id - a.id).map((data, index) => (
                      <motion.div
                        key={data.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="glass p-6 rounded-xl border border-gray-700 hover:border-orangeBright transition-all"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              data.type === 'aspirasi' 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-indigo-500 text-white'
                            }`}>
                              {data.type === 'aspirasi' ? '📝 Aspirasi' : '🤝 Kerjasama'}
                            </span>
                          </div>
                          <span className="text-sm text-gray-400">
                            {new Date(data.tanggal).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-3">{data.nama}</h3>
                        
                        {data.type === 'aspirasi' ? (
                          <div className="grid md:grid-cols-2 gap-4 mb-4 text-sm">
                            <div className="bg-white/5 p-3 rounded-lg">
                              <p className="text-gray-400 mb-1">NIM</p>
                              <p className="text-white font-semibold">{data.nim}</p>
                            </div>
                            <div className="bg-white/5 p-3 rounded-lg">
                              <p className="text-gray-400 mb-1">Kategori</p>
                              <p className="text-white font-semibold">{data.kategori}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="grid md:grid-cols-2 gap-4 mb-4 text-sm">
                            <div className="bg-white/5 p-3 rounded-lg">
                              <p className="text-gray-400 mb-1">Organisasi</p>
                              <p className="text-white font-semibold">{data.organisasi}</p>
                            </div>
                            <div className="bg-white/5 p-3 rounded-lg">
                              <p className="text-gray-400 mb-1">Email</p>
                              <p className="text-white font-semibold">{data.email}</p>
                            </div>
                            <div className="bg-white/5 p-3 rounded-lg">
                              <p className="text-gray-400 mb-1">Telepon</p>
                              <p className="text-white font-semibold">{data.phone}</p>
                            </div>
                            <div className="bg-white/5 p-3 rounded-lg">
                              <p className="text-gray-400 mb-1">Jenis Kerjasama</p>
                              <p className="text-white font-semibold">{data.jenisKerjasama}</p>
                            </div>
                          </div>
                        )}
                        
                        <div className="bg-white/5 p-4 rounded-lg">
                          <p className="text-gray-400 text-sm mb-2">
                            {data.type === 'aspirasi' ? 'Pesan Aspirasi:' : 'Detail Proposal:'}
                          </p>
                          <p className="text-gray-300">{data.pesan}</p>
                        </div>

                        <div className="mt-4 flex gap-2">
                          <button
                            onClick={() => {
                              if (confirm('Tandai sebagai selesai ditindaklanjuti?')) {
                                const updated = layananData.filter(d => d.id !== data.id)
                                setLayananData(updated)
                                localStorage.setItem('layananData', JSON.stringify(updated))
                              }
                            }}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition"
                          >
                            ✓ Selesai
                          </button>
                          <button
                            onClick={() => {
                              if (confirm('Hapus data ini?')) {
                                const updated = layananData.filter(d => d.id !== data.id)
                                setLayananData(updated)
                                localStorage.setItem('layananData', JSON.stringify(updated))
                              }
                            }}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition"
                          >
                            🗑️ Hapus
                          </button>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.div>
            )}

            {/* Settings View */}
            {viewMode === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-4xl font-bold text-orangeBright mb-8">Pengaturan</h1>
                <div className="glass p-8 rounded-xl border border-orangeBright/30">
                  <h2 className="text-2xl font-semibold text-white mb-4">Informasi Admin</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Username</label>
                      <input
                        type="text"
                        value="admin"
                        disabled
                        className="w-full p-3 rounded-lg bg-black/30 border border-gray-600 text-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Role</label>
                      <input
                        type="text"
                        value="Administrator"
                        disabled
                        className="w-full p-3 rounded-lg bg-black/30 border border-gray-600 text-gray-400"
                      />
                    </div>
                    <div className="pt-4">
                      <p className="text-gray-400 text-sm">
                        💡 Untuk mengubah password atau pengaturan lainnya, hubungi developer.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ProtectedRoute>
  )
}
