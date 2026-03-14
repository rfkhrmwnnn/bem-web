'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import ProtectedRoute from '@/components/ProtectedRoute'
import Image from 'next/image'
import { ALLOWED_IMAGE_TYPES, ALLOWED_IMAGE_EXTS, ALLOWED_IMAGE_ERROR } from '@/lib/imageValidation'

interface Kegiatan {
  id: number
  judul: string
  deskripsi: string
  tanggal: string
  gambar?: string
  dokumentasi?: string[]
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
  const [gambarFile, setGambarFile] = useState<File | null>(null)
  const [dokumentasiFiles, setDokumentasiFiles] = useState<File[]>([])
  const [dokumentasiPreviews, setDokumentasiPreviews] = useState<string[]>([])
  const [existingDokumentasi, setExistingDokumentasi] = useState<string[]>([])
  const [removeDokumentasi, setRemoveDokumentasi] = useState<string[]>([])
  const [editId, setEditId] = useState<number | null>(null)
  const [search, setSearch] = useState('')
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard')
  const [showForm, setShowForm] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Load kegiatan from server API
  const loadKegiatan = () => {
    fetch('/api/kegiatan')
      .then(res => res.json())
      .then(data => setKegiatan(data))
  }

  useEffect(() => {
    loadKegiatan()
  }, [])

  // Load layanan data
  useEffect(() => {
    const stored = localStorage.getItem('layananData')
    if (stored) setLayananData(JSON.parse(stored))

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
    setGambarFile(null)
    setDokumentasiFiles([])
    setDokumentasiPreviews([])
    setExistingDokumentasi([])
    setRemoveDokumentasi([])
    setEditId(null)
    setShowForm(false)
  }

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const ext = file.name.split('.').pop()?.toLowerCase() || ''
      if (!ALLOWED_IMAGE_TYPES.includes(file.type) || !ALLOWED_IMAGE_EXTS.includes(ext)) {
        alert(ALLOWED_IMAGE_ERROR)
        e.target.value = ''
        return
      }
      setGambarFile(file)
      const reader = new FileReader()
      reader.onload = (ev) => setGambar(ev.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleDokumentasiUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const valid: File[] = []
    for (const file of files) {
      const ext = file.name.split('.').pop()?.toLowerCase() || ''
      if (!ALLOWED_IMAGE_TYPES.includes(file.type) || !ALLOWED_IMAGE_EXTS.includes(ext)) {
        alert(ALLOWED_IMAGE_ERROR)
        continue
      }
      valid.push(file)
    }
    if (valid.length === 0) {
      e.target.value = ''
      return
    }
    setDokumentasiFiles(prev => [...prev, ...valid])
    valid.forEach(file => {
      const reader = new FileReader()
      reader.onload = (ev) => setDokumentasiPreviews(prev => [...prev, ev.target?.result as string])
      reader.readAsDataURL(file)
    })
    e.target.value = ''
  }

  const removeNewDokumentasi = (index: number) => {
    setDokumentasiFiles(prev => prev.filter((_, i) => i !== index))
    setDokumentasiPreviews(prev => prev.filter((_, i) => i !== index))
  }

  const toggleRemoveExistingDokumentasi = (path: string) => {
    setRemoveDokumentasi(prev =>
      prev.includes(path) ? prev.filter(p => p !== path) : [...prev, path]
    )
  }

  const tambahKegiatan = async () => {
    if (!judul || !deskripsi || !tanggal)
      return alert('Lengkapi semua data!')
    const fd = new FormData()
    fd.append('judul', judul)
    fd.append('deskripsi', deskripsi)
    fd.append('tanggal', tanggal)
    if (gambarFile) fd.append('gambar', gambarFile)
    for (const file of dokumentasiFiles) fd.append('dokumentasi', file)
    const res = await fetch('/api/kegiatan', { method: 'POST', body: fd })
    if (res.ok) {
      const newItem: Kegiatan = await res.json()
      setKegiatan(prev => [...prev, newItem])
      resetForm()
    } else {
      alert('Gagal menyimpan kegiatan.')
    }
  }

  const hapusKegiatan = async (id: number) => {
    if (confirm('Yakin ingin menghapus kegiatan ini?')) {
      const res = await fetch(`/api/kegiatan/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setKegiatan(prev => prev.filter(k => k.id !== id))
        if (editId === id) resetForm()
      } else {
        alert('Gagal menghapus kegiatan.')
      }
    }
  }

  const editKegiatan = (item: Kegiatan) => {
    setEditId(item.id)
    setJudul(item.judul)
    setDeskripsi(item.deskripsi)
    setTanggal(item.tanggal)
    setGambar(item.gambar || undefined)
    setGambarFile(null)
    setExistingDokumentasi(item.dokumentasi || [])
    setDokumentasiFiles([])
    setDokumentasiPreviews([])
    setRemoveDokumentasi([])
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const simpanEdit = async () => {
    if (!editId) return
    if (!judul || !deskripsi || !tanggal)
      return alert('Lengkapi semua data!')
    const fd = new FormData()
    fd.append('judul', judul)
    fd.append('deskripsi', deskripsi)
    fd.append('tanggal', tanggal)
    if (gambarFile) fd.append('gambar', gambarFile)
    for (const file of dokumentasiFiles) fd.append('dokumentasi', file)
    for (const path of removeDokumentasi) fd.append('removeDokumentasi', path)
    const res = await fetch(`/api/kegiatan/${editId}`, { method: 'PUT', body: fd })
    if (res.ok) {
      const updated: Kegiatan = await res.json()
      setKegiatan(prev => prev.map(k => k.id === editId ? updated : k))
      resetForm()
    } else {
      alert('Gagal memperbarui kegiatan.')
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    localStorage.removeItem('isLoggedIn')
    router.push('/login')
  }

  const filtered = kegiatan.filter(k =>
    k.judul.toLowerCase().includes(search.toLowerCase())
  )

  const totalKegiatan = kegiatan.length
  const kegiatanBulanIni = kegiatan.filter(k => {
    const date = new Date(k.tanggal)
    const now = new Date()
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
  }).length
  const kegiatanMendatang = kegiatan.filter(k => new Date(k.tanggal) > new Date()).length

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex relative">
        {/* Mobile Header Toggle */}
        <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-50 flex items-center px-4 justify-between shadow-sm">
             <div className="flex items-center gap-3">
                 <div className="w-8 h-8 relative">
                    <Image src="/images/logo.png" alt="Logo" fill className="object-contain" />
                 </div>
                 <span className="font-bold text-slate-800 dark:text-white">Admin Panel</span>
             </div>
             <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-slate-600 dark:text-slate-300">
                 {sidebarOpen ? '✕' : '☰'}
             </button>
        </div>

        {/* Sidebar */}
        <motion.aside
          initial={false}
          animate={{ x: sidebarOpen ? 0 : -300 }}
          // On desktop (md), always show (x: 0). On mobile, rely on state. 
          // However, with Tailwind classes we can control visibility better or use a resize listener.
          // Simplest approach: Use Tailwind 'md:translate-x-0' override if using CSS transform, 
          // but Framer Motion handles style directly.
          // Better approach: Use a media query hook or just CSS classes for desktop reset.
          // Let's stick to a conditional variant or simple className toggling for hybrid.
          className={`fixed md:static inset-y-0 left-0 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col z-40 shadow-xl md:shadow-none transition-transform duration-300 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} pt-16 md:pt-0`}
        >
          {/* Sidebar Content same as before but padding adjusted */}
          <div className="p-6 flex flex-col items-center border-b border-slate-100 dark:border-slate-800 hidden md:flex">
             {/* ... Logo ... */}
             <div className="w-16 h-16 relative mb-3">
              <Image src="/images/logo.png" alt="Logo" fill className="object-contain" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Admin Panel</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">BEM IKMI Cirebon</p>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
             {/* ... Nav Items ... */}
             {[
              { id: 'dashboard', icon: '📊', label: 'Dashboard' },
              { id: 'kegiatan', icon: '📅', label: 'Kelola Kegiatan' },
              { id: 'layanan', icon: '📝', label: 'Data Layanan' },
              { id: 'settings', icon: '⚙️', label: 'Pengaturan' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                    setViewMode(item.id as ViewMode)
                    setSidebarOpen(false) // Close on click mobile
                }}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all font-medium flex items-center gap-3 ${
                  viewMode === item.id
                    ? 'bg-ocean-50 dark:bg-ocean-900/20 text-ocean-600 dark:text-ocean-400'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <span className="text-lg">{item.icon}</span> {item.label}
              </button>
            ))}
          </nav>
          
          {/* ... Logout ... */}
           <div className="p-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/20 transition-all font-semibold text-sm"
            >
              🚪 Logout
            </button>
          </div>
        </motion.aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
            <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0 overflow-y-auto h-screen pt-16 md:pt-0">
          <div className="p-4 md:p-8 max-w-7xl mx-auto">
            {/* ... rest of content ... */}
            <AnimatePresence mode="wait">
              {/* Dashboard View */}
              {viewMode === 'dashboard' && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <header className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Dashboard Overview</h1>
                    <p className="text-slate-500 dark:text-slate-400">Selamat datang kembali, Administrator.</p>
                  </header>

                  {/* Stats Cards */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <StatCard 
                      title="Total Kegiatan" 
                      value={totalKegiatan} 
                      icon="📚" 
                      color="bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400" 
                    />
                    <StatCard 
                      title="Bulan Ini" 
                      value={kegiatanBulanIni} 
                      icon="📅" 
                      color="bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400" 
                    />
                    <StatCard 
                      title="Mendatang" 
                      value={kegiatanMendatang} 
                      icon="🚀" 
                      color="bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400" 
                    />
                    <StatCard 
                      title="Aspirasi" 
                      value={layananData.length} 
                      icon="📝" 
                      color="bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400" 
                    />
                  </div>

                  {/* Recent Activities */}
                  <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-slate-800 dark:text-white">Kegiatan Terbaru</h2>
                      <button onClick={() => setViewMode('kegiatan')} className="text-sm text-ocean-600 font-medium hover:underline">Lihat Semua</button>
                    </div>
                    <div className="space-y-4">
                      {kegiatan.length === 0 ? (
                         <p className="text-slate-500 text-center py-4">Belum ada kegiatan.</p>
                      ) : (
                        kegiatan.slice(0, 5).map((k) => (
                          <div key={k.id} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                            <div className="w-16 h-16 rounded-lg bg-slate-200 dark:bg-slate-800 overflow-hidden flex-shrink-0">
                                {k.gambar ? (
                                    <img src={k.gambar} alt={k.judul} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-2xl">📅</div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-slate-800 dark:text-slate-200 truncate">{k.judul}</h4>
                              <p className="text-sm text-slate-500 dark:text-slate-400">{k.tanggal}</p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Kegiatan Management View */}
              {viewMode === 'kegiatan' && (
                <motion.div
                  key="kegiatan"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Kelola Kegiatan</h1>
                        <p className="text-slate-500">Manajemen program kerja dan event.</p>
                    </div>
                    <button
                      onClick={() => showForm ? resetForm() : setShowForm(true)}
                      className="bg-ocean-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-ocean-700 transition shadow-lg shadow-ocean-500/20 flex items-center gap-2"
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
                        className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 mb-10 overflow-hidden shadow-sm"
                      >
                        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                          {editId ? '✏️ Edit Kegiatan' : '➕ Tambah Kegiatan Baru'}
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-5">
                            <div>
                              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Judul Kegiatan</label>
                              <input
                                type="text"
                                placeholder="Contoh: Seminar Nasional Teknologi"
                                className="w-full p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-ocean-500 transition"
                                value={judul}
                                onChange={(e) => setJudul(e.target.value)}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Deskripsi</label>
                              <textarea
                                className="w-full p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-ocean-500 transition"
                                placeholder="Deskripsi lengkap kegiatan..."
                                rows={4}
                                value={deskripsi}
                                onChange={(e) => setDeskripsi(e.target.value)}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Tanggal Pelaksanaan</label>
                              <input
                                type="date"
                                className="w-full p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-ocean-500 transition"
                                value={tanggal}
                                onChange={(e) => setTanggal(e.target.value)}
                              />
                            </div>
                          </div>

                          {/* Upload Gambar */}
                          <div className="flex flex-col">
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Poster / Gambar Utama</label>
                            <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer relative">
                              <input type="file" accept=".jpg,.jpeg,.png,image/jpeg,image/png" onChange={handleUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                              <div className="text-4xl mb-3 text-slate-400">📸</div>
                              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Klik atau drag gambar ke sini</p>
                              <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">JPG, JPEG, PNG</p>
                            </div>
                            {gambar && (
                              <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mt-4 relative h-48 rounded-xl overflow-hidden shadow-md"
                              >
                                <img src={gambar} alt="Preview" className="w-full h-full object-cover" />
                              </motion.div>
                            )}
                          </div>
                        </div>

                        {/* Upload Dokumentasi */}
                        <div className="mt-6">
                          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                            📷 Dokumentasi Kegiatan <span className="text-slate-400 font-normal">(bisa lebih dari satu foto)</span>
                          </label>
                          <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer relative">
                            <input
                              type="file"
                              accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                              multiple
                              onChange={handleDokumentasiUpload}
                              className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            <div className="text-4xl mb-3 text-slate-400">🖼️</div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Klik atau drag foto dokumentasi ke sini</p>
                            <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">JPG, JPEG, PNG — pilih beberapa file sekaligus</p>
                          </div>

                          {/* Existing dokumentasi (edit mode) */}
                          {existingDokumentasi.length > 0 && (
                            <div className="mt-4">
                              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">Foto Tersimpan</p>
                              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                {existingDokumentasi.map((src) => (
                                  <div key={src} className="relative group">
                                    <img src={src} alt="dokumentasi" className={`w-full h-24 object-cover rounded-lg border-2 transition ${removeDokumentasi.includes(src) ? 'opacity-30 border-red-400' : 'border-slate-200 dark:border-slate-700'}`} />
                                    <button
                                      type="button"
                                      onClick={() => toggleRemoveExistingDokumentasi(src)}
                                      className={`absolute top-1 right-1 rounded-full w-6 h-6 text-xs font-bold flex items-center justify-center shadow transition ${removeDokumentasi.includes(src) ? 'bg-red-500 text-white' : 'bg-white/80 text-red-500 hover:bg-red-500 hover:text-white'}`}
                                    >
                                      ✕
                                    </button>
                                    {removeDokumentasi.includes(src) && (
                                      <div className="absolute inset-0 flex items-center justify-center rounded-lg">
                                        <span className="text-xs text-red-600 font-bold bg-white/80 px-1 rounded">Akan dihapus</span>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* New dokumentasi previews */}
                          {dokumentasiPreviews.length > 0 && (
                            <div className="mt-4">
                              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">Foto Baru</p>
                              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                {dokumentasiPreviews.map((src, i) => (
                                  <div key={i} className="relative group">
                                    <img src={src} alt={`preview-${i}`} className="w-full h-24 object-cover rounded-lg border-2 border-ocean-300 dark:border-ocean-600" />
                                    <button
                                      type="button"
                                      onClick={() => removeNewDokumentasi(i)}
                                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs font-bold flex items-center justify-center shadow hover:bg-red-600 transition"
                                    >
                                      ✕
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-3 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                            <button
                                onClick={editId ? simpanEdit : tambahKegiatan}
                                className="bg-ocean-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-ocean-700 transition"
                            >
                                {editId ? '💾 Simpan Perubahan' : '🚀 Publish'}
                            </button>
                            <button
                                onClick={resetForm}
                                className="px-6 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                            >
                                Batal
                            </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Pencarian */}
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">Daftar Kegiatan</h2>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
                        <input
                            type="text"
                            placeholder="Cari kegiatan..."
                            className="pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-ocean-500 w-64"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                  </div>

                  {/* Daftar Kegiatan Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((k, i) => (
                      <motion.div
                        key={k.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ y: -5 }}
                        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all group"
                      >
                        <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                          {k.gambar ? (
                            <img
                              src={k.gambar}
                              alt={k.judul}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                             <div className="w-full h-full flex items-center justify-center text-4xl text-slate-300">🖼️</div> 
                          )}
                          <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-800 dark:text-white shadow-sm">
                            {k.tanggal}
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 line-clamp-1">{k.judul}</h3>
                          <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2 h-10">{k.deskripsi}</p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => editKegiatan(k)}
                              className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-2 rounded-lg text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => hapusKegiatan(k.id)}
                              className="flex-1 bg-red-50 dark:bg-red-900/20 text-red-600 px-3 py-2 rounded-lg text-sm font-semibold hover:bg-red-100 dark:hover:bg-red-900/40 transition"
                            >
                              Hapus
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {filtered.length === 0 && (
                    <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                      <div className="text-4xl mb-3">📭</div>
                      <p className="text-slate-500">Tidak ada kegiatan ditemukan</p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Layanan View */}
              {viewMode === 'layanan' && (
                <motion.div
                  key="layanan"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <header className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Data Layanan</h1>
                    <p className="text-slate-500">Aspirasi mahasiswa dan pengajuan kerjasama.</p>
                  </header>
                  
                  {/* Summary Cards */}
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30 shadow-sm flex items-center gap-6">
                      <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-3xl text-blue-600">📝</div>
                      <div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Total Aspirasi</p>
                        <h3 className="text-3xl font-bold text-slate-800 dark:text-white">
                          {layananData.filter(d => d.type === 'aspirasi').length}
                        </h3>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-900/30 shadow-sm flex items-center gap-6">
                      <div className="w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-3xl text-indigo-600">🤝</div>
                      <div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Total Kerjasama</p>
                        <h3 className="text-3xl font-bold text-slate-800 dark:text-white">
                          {layananData.filter(d => d.type === 'kerjasama').length}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Data List */}
                  <div className="space-y-4">
                    {layananData.length === 0 ? (
                      <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                        <div className="text-4xl mb-4">📭</div>
                        <p className="text-slate-500">Belum ada data layanan masuk</p>
                      </div>
                    ) : (
                      layananData.sort((a, b) => b.id - a.id).map((data, index) => (
                        <motion.div
                          key={data.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                              data.type === 'aspirasi' 
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' 
                                : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300'
                            }`}>
                              {data.type}
                            </span>
                            <span className="text-xs text-slate-400 font-medium">
                              {new Date(data.tanggal).toLocaleDateString('id-ID', {
                                day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                              })}
                            </span>
                          </div>
                          
                          <div className="mb-4">
                            <h3 className="text-lg font-bold text-slate-800 dark:text-white">{data.nama}</h3>
                            <p className="text-sm text-slate-500">{data.type === 'aspirasi' ? data.nim : data.organisasi}</p>
                          </div>
                          
                          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 mb-4">
                            <p className="text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">
                              {data.type === 'aspirasi' ? 'Isi Aspirasi' : 'Detail Proposal'}
                            </p>
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">{data.pesan}</p>
                          </div>

                          <div className="flex justify-between items-center text-xs text-slate-500 mb-4">
                            <div className="flex gap-4">
                                <span>📧 {data.email || '-'}</span>
                                <span>📱 {data.phone || '-'}</span>
                                {data.kategori && <span>🏷️ {data.kategori}</span>}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                if (confirm('Tandai sebagai selesai?')) {
                                  const updated = layananData.filter(d => d.id !== data.id)
                                  setLayananData(updated)
                                  localStorage.setItem('layananData', JSON.stringify(updated))
                                }
                              }}
                              className="px-4 py-2 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 rounded-lg text-sm font-semibold hover:bg-green-100 dark:hover:bg-green-900/30 transition"
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
                              className="px-4 py-2 bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 rounded-lg text-sm font-semibold hover:bg-red-100 dark:hover:bg-red-900/30 transition"
                            >
                              Hapus
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
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-8">Pengaturan Akun</h1>
                  <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-2xl">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                        <div className="w-16 h-16 rounded-full bg-ocean-100 dark:bg-ocean-900/30 flex items-center justify-center text-3xl">👤</div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Admin Utama</h2>
                            <p className="text-slate-500">Super Administrator</p>
                        </div>
                      </div>
                      
                      <div className="grid gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Username</label>
                          <input
                            type="text"
                            value="admin"
                            disabled
                            className="w-full p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Role Access</label>
                          <input
                            type="text"
                            value="Full Access"
                            disabled
                            className="w-full p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500"
                          />
                        </div>
                      </div>

                      <div className="pt-4 bg-orange-50 dark:bg-orange-900/10 p-4 rounded-xl border border-orange-100 dark:border-orange-900/20">
                        <p className="text-orange-800 dark:text-orange-300 text-sm flex gap-2">
                           💡 <span>Untuk alasan keamanan, perubahan password dan konfigurasi sistem inti hanya dapat dilakukan melalui database atau menghubungi developer.</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}

// Helper Component for Stats
function StatCard({ title, value, icon, color }: { title: string, value: number, icon: string, color: string }) {
    return (
        <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between"
        >
            <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{title}</p>
                <h3 className="text-3xl font-bold text-slate-800 dark:text-white">{value}</h3>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${color}`}>
                {icon}
            </div>
        </motion.div>
    )
}
