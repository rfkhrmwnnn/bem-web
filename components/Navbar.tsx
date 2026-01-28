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

const ormawaLinks = [
  { href: '/ormawa/himsi', label: 'HIMSI', icon: '💻', color: 'from-blue-500 to-cyan-500' },
  { href: '/ormawa/himatif', label: 'HIMATIF', icon: '⚡', color: 'from-green-500 to-teal-500' },
  { href: '/ormawa/himareka', label: 'HIMAREKA', icon: '⚙️', color: 'from-orange-500 to-red-500' },
  { href: '/ormawa/adcom', label: 'ADCOM', icon: '📢', color: 'from-purple-500 to-pink-500' },
  { href: '/ormawa/icrt', label: 'ICRT', icon: '🛡️', color: 'from-blue-700 to-blue-500' },
  { href: '/ormawa/futsal', label: 'Futsal', icon: '⚽', color: 'from-yellow-500 to-amber-500' },
  { href: '/ormawa/gematika', label: 'Gematika', icon: '🏔️', color: 'from-green-700 to-emerald-500' },
  { href: '/ormawa/senaya', label: 'Senaya', icon: '🎨', color: 'from-red-800 to-yellow-600' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [ormawaOpen, setOrmawaOpen] = useState(false)

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 glass border-b border-ocean-100 dark:border-ocean-900/50"
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
                className="rounded-full border-2 border-ocean-400 group-hover:border-ocean-300 transition-colors shadow-lg shadow-ocean-500/20" 
              />
            </motion.div>
            <div className="hidden sm:block">
              <span className="font-bold text-lg bg-gradient-to-r from-ocean-700 to-ocean-500 dark:from-ocean-400 dark:to-ocean-200 bg-clip-text text-transparent">
                BEM IKMI
              </span>
              <p className="text-xs text-ocean-600/80 dark:text-ocean-300/80 font-medium tracking-wide">Parta Pandita</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-1 items-center">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="px-4 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-ocean-600 dark:hover:text-ocean-300 hover:bg-ocean-50 dark:hover:bg-ocean-900/40 transition-all font-medium group"
                >
                  <span className="mr-1 group-hover:scale-110 inline-block transition-transform">{l.icon}</span>
                  {l.label}
                </Link>
              </li>
            ))}
            
            {/* Ormawa Dropdown */}
            <li 
              className="relative"
              onMouseEnter={() => setOrmawaOpen(true)}
              onMouseLeave={() => setOrmawaOpen(false)}
            >
              <button
                className="px-4 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-ocean-600 dark:hover:text-ocean-300 hover:bg-ocean-50 dark:hover:bg-ocean-900/40 transition-all font-medium group flex items-center gap-1"
              >
                <span className="mr-1 group-hover:scale-110 inline-block transition-transform">🎓</span>
                Ormawa
                <motion.span
                  animate={{ rotate: ormawaOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs"
                >
                  ▼
                </motion.span>
              </button>
              
              <AnimatePresence>
                {ormawaOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-64 glass border border-ocean-100 dark:border-ocean-800 rounded-xl shadow-2xl shadow-ocean-900/10 overflow-hidden"
                  >
                    <div className="p-2">
                      {ormawaLinks.map((org) => (
                        <Link
                          key={org.href}
                          href={org.href}
                          className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-ocean-50 dark:hover:bg-ocean-900/50 transition-all font-medium group"
                          style={{
                            // @ts-ignore
                            '--tw-gradient-from': org.color.split(' ')[0],
                            '--tw-gradient-to': org.color.split(' ')[1],
                          }}
                        >
                          <span className="text-xl group-hover:scale-110 transition-transform">{org.icon}</span>
                          <span>{org.label}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 rounded-lg bg-ocean-50 text-ocean-600 dark:bg-ocean-900/50 dark:text-ocean-300"
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
              className="fixed right-0 top-0 h-screen w-80 glass border-l border-ocean-100 dark:border-ocean-900 shadow-2xl z-50 md:hidden overflow-y-auto"
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
                      className="rounded-full border-2 border-ocean-400" 
                    />
                    <div>
                      <span className="font-bold text-lg bg-gradient-to-r from-ocean-700 to-ocean-500 dark:from-ocean-400 dark:to-ocean-200 bg-clip-text text-transparent">
                        BEM IKMI
                      </span>
                      <p className="text-xs text-ocean-600/80 dark:text-ocean-300/80 font-medium">Parta Pandita</p>
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
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-ocean-50 dark:hover:bg-ocean-900/50 hover:text-ocean-600 dark:hover:text-ocean-300 transition-all font-medium group"
                    >
                      <span className="text-2xl group-hover:scale-110 transition-transform">{l.icon}</span>
                      <span>{l.label}</span>
                    </Link>
                  </motion.li>
                ))}
                
                {/* Mobile Ormawa Section */}
                <motion.li
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: links.length * 0.05 }}
                >
                  <button
                    onClick={() => setOrmawaOpen(!ormawaOpen)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-ocean-50 dark:hover:bg-ocean-900/50 hover:text-ocean-600 dark:hover:text-ocean-300 transition-all font-medium group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl group-hover:scale-110 transition-transform">🎓</span>
                      <span>Ormawa</span>
                    </div>
                    <motion.span
                      animate={{ rotate: ormawaOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-xs"
                    >
                      ▼
                    </motion.span>
                  </button>
                  
                  <AnimatePresence>
                    {ormawaOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden mt-2 ml-4 space-y-1"
                      >
                        {ormawaLinks.map((org, idx) => (
                          <Link
                            key={org.href}
                            href={org.href}
                            onClick={() => setOpen(false)}
                            className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-ocean-50 dark:hover:bg-ocean-900/30 transition-all font-medium bg-gradient-to-r ${org.color}`}
                            style={{ backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}
                          >
                            <span className="text-lg">{org.icon}</span>
                            <span style={{ color: 'inherit' }}>{org.label}</span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              </ul>

              {/* Mobile Menu Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
                <p className="text-center text-sm text-slate-500 dark:text-slate-400">
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
