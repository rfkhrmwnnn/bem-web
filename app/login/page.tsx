'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Login() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    setTimeout(() => {
      if (username === 'admin' && password === 'parta2025') {
        localStorage.setItem('isLoggedIn', 'true')
        router.push('/admin')
      } else {
        setError('Username atau password salah')
        setLoading(false)
      }
    }, 800)
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-orangeBright/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image 
              src="/images/logo.png" 
              alt="Logo BEM" 
              width={120} 
              height={120} 
              className="rounded-full border-4 border-orangeBright shadow-lg shadow-orangeBright/50"
            />
          </motion.div>
          <h1 className="text-4xl font-bold mt-6 bg-gradient-to-r from-orangeBright to-neon bg-clip-text text-transparent">
            Admin Login
          </h1>
          <p className="text-gray-400 mt-2">BEM IKMI Cirebon</p>
        </div>

        {/* Login Form */}
        <motion.form
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleLogin}
          className="glass p-8 rounded-2xl w-96 backdrop-blur-xl border border-orangeBright/30 shadow-2xl"
        >
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                👤 Username
              </label>
              <input
                className="w-full p-3 rounded-lg bg-black/30 border border-orangeBright text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon transition"
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                🔒 Password
              </label>
              <input
                className="w-full p-3 rounded-lg bg-black/30 border border-orangeBright text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon transition"
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-orangeBright to-neon text-white p-3 rounded-lg font-semibold shadow-lg transition-all ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-orangeBright/50'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Loading...
                </span>
              ) : (
                '🚀 Login'
              )}
            </motion.button>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500 text-red-400 p-3 rounded-lg text-sm text-center"
              >
                ❌ {error}
              </motion.div>
            )}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-gray-400 text-xs text-center">
              💡 Hubungi administrator jika lupa password
            </p>
          </div>
        </motion.form>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center text-gray-500 text-sm"
        >
          <p>Kabinet Parta Pandita © 2025</p>
        </motion.div>
      </motion.div>
    </div>
  )
}
