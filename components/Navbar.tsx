'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/about', label: 'About', icon: '👥' },
  { href: '/filosofi', label: 'Filosofi', icon: '💡' },
  { href: '/kegiatan', label: 'Kegiatan', icon: '📅' },
  { href: '/layanan', label: 'Layanan', icon: '🤝' },
  { href: '/hubungi', label: 'Hubungi', icon: '📞' },
  { href: '/login', label: 'Admin', icon: '🔐' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-200 dark:border-gray-800 backdrop-blur-xl shadow-lg"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Image 
                src="/images/logo.png" 
                alt="Logo" 
                width={50} 
                height={50} 
                className="rounded-full border-2 border-orangeBright group-hover:border-neon transition-colors shadow-lg" 
              />
            </motion.div>
            <div className="hidden sm:block">
              <span className="font-bold text-lg bg-gradient-to-r from-orangeBright to-neon bg-clip-text text-transparent">
                BEM IKMI
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400">Parta Pandita</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-1 items-center">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-orangeBright dark:hover:text-neon hover:bg-gray-100 dark:hover:bg-gray-800 transition-all font-medium group"
                >
                  <span className="mr-1 group-hover:scale-110 inline-block transition-transform">{l.icon}</span>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 rounded-lg bg-gradient-to-r from-orangeBright to-neon text-white shadow-lg"
            onClick={() => setOpen(!open)}
          >
            <motion.div
              animate={{ rotate: open ? 90 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-2xl"
            >
              {open ? '✕' : '☰'}
            </motion.div>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed right-0 top-0 h-screen w-80 bg-white dark:bg-gray-900 shadow-2xl z-50 md:hidden overflow-y-auto"
            >
              {/* Mobile Menu Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Image 
                      src="/images/logo.png" 
                      alt="Logo" 
                      width={50} 
                      height={50} 
                      className="rounded-full border-2 border-orangeBright" 
                    />
                    <div>
                      <span className="font-bold text-lg bg-gradient-to-r from-orangeBright to-neon bg-clip-text text-transparent">
                        BEM IKMI
                      </span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Parta Pandita</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <span className="text-2xl">✕</span>
                  </button>
                </div>
              </div>

              {/* Mobile Menu Links */}
              <ul className="p-4 space-y-2">
                {links.map((l, index) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-orangeBright hover:to-neon hover:text-white transition-all font-medium group"
                    >
                      <span className="text-2xl group-hover:scale-110 transition-transform">{l.icon}</span>
                      <span>{l.label}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Mobile Menu Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  © 2025 Kabinet Parta Pandita
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
