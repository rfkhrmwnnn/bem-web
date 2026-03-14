'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const quickLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/about', label: 'Tentang Kami' },
  { href: '/filosofi', label: 'Filosofi' },
  { href: '/kegiatan', label: 'Kegiatan' },
  { href: '/layanan', label: 'Layanan' },
  { href: '/hubungi', label: 'Hubungi' },
]

const ormawaLinks = [
  { href: '/ormawa/dpm', label: 'DPM' },
  { href: '/ormawa/ldk', label: 'LDK' },
  { href: '/ormawa/himsi', label: 'HIMSI' },
  { href: '/ormawa/himatif', label: 'HIMATIF' },
  { href: '/ormawa/himareka', label: 'HIMAREKA' },
  { href: '/ormawa/adcom', label: 'ADCOM' },
  { href: '/ormawa/icgd', label: 'ICGD' },
  { href: '/ormawa/icrt', label: 'ICRT' },
  { href: '/ormawa/futsal', label: 'Futsal' },
  { href: '/ormawa/gematika', label: 'Gematika' },
  { href: '/ormawa/senaya', label: 'Senaya' },
]

export default function Footer() {
  return (
    <footer className="mt-16 md:mt-20 border-t border-ocean-100 dark:border-ocean-900/50 glass relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo.png"
                alt="Logo BEM"
                width={56}
                height={56}
                className="rounded-full border-2 border-ocean-400 opacity-90"
              />
              <div>
                <p className="font-bold text-ocean-700 dark:text-ocean-300 text-lg leading-tight">BEM IKMI</p>
                <p className="text-xs text-ocean-600/70 dark:text-ocean-400/70 font-medium tracking-wide">Parta Pandita</p>
              </div>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Badan Eksekutif Mahasiswa STMIK IKMI Cirebon – Kabinet Parta Pandita. Inovatif, Kolaboratif, dan Solutif.
            </p>
            <div className="flex gap-3">
              <motion.a
                href="https://instagram.com/bemstmikikmi"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold shadow-md hover:shadow-pink-500/30 transition-shadow"
                title="Instagram"
              >
                IG
              </motion.a>
              <motion.a
                href="https://wa.me/6283163587945"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-9 h-9 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-sm font-bold shadow-md hover:shadow-green-500/30 transition-shadow"
                title="WhatsApp"
              >
                WA
              </motion.a>
              <motion.a
                href="mailto:sekretariatbemikmi@gmail.com"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-9 h-9 rounded-lg bg-gradient-to-br from-ocean-500 to-ocean-700 flex items-center justify-center text-white text-sm font-bold shadow-md hover:shadow-ocean-500/30 transition-shadow"
                title="Email"
              >
                ✉
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 text-sm uppercase tracking-widest">
              Navigasi
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-ocean-600 dark:hover:text-ocean-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-ocean-400 group-hover:w-3 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ormawa Links */}
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 text-sm uppercase tracking-widest">
              Ormawa
            </h3>
            <ul className="space-y-2">
              {ormawaLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-ocean-600 dark:hover:text-ocean-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-ocean-400 group-hover:w-3 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 text-sm uppercase tracking-widest">
              Kontak
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-slate-500 dark:text-slate-400">
                <span className="mt-0.5 text-ocean-500">📍</span>
                <span>Jl. Perjuangan No.10B, Karyamulya, Kesambi, Cirebon</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <span className="text-ocean-500">📧</span>
                <span>sekretariatbemikmi@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <span className="text-ocean-500">📱</span>
                <span>+62 831-6358-7945</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <span className="text-ocean-500">📸</span>
                <span>@bemstmikikmi</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-ocean-100 dark:border-ocean-900/50 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-sm text-slate-400 dark:text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()} BEM STMIK IKMI Cirebon – Kabinet Parta Pandita
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-600 text-center">
            Made with ❤️ by Tim Kominfo BEM IKMI
          </p>
        </div>
      </div>
    </footer>
  )
}
