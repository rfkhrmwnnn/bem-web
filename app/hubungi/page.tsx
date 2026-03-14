'use client'
import { motion } from 'framer-motion'

const contactInfo = [
  {
    icon: '📧',
    label: 'Email',
    value: 'sekretariatbemikmi@gmail.com',
    href: 'mailto:sekretariatbemikmi@gmail.com',
    color: 'from-blue-500 to-ocean-500',
  },
  {
    icon: '📱',
    label: 'WhatsApp',
    value: '+62 831-6358-7945',
    href: 'https://wa.me/6283163587945',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: '📍',
    label: 'Alamat',
    value: 'Jl. Perjuangan No.10B, Karyamulya, Kesambi, Cirebon',
    href: 'https://maps.google.com/?q=STMIK+IKMI+Cirebon',
    color: 'from-red-500 to-pink-500',
  },
  {
    icon: '📸',
    label: 'Instagram',
    value: '@bemstmikikmi',
    href: 'https://instagram.com/bemstmikikmi',
    color: 'from-purple-500 to-pink-500',
  },
]

export default function Hubungi() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="pb-16 md:pb-20"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 md:mb-14"
      >
        <div className="inline-flex items-center gap-2 bg-ocean-50 dark:bg-ocean-900/30 border border-ocean-200 dark:border-ocean-800 rounded-full px-4 py-1.5 text-ocean-600 dark:text-ocean-400 text-sm font-medium mb-4">
          📞 Kontak Kami
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-ocean-700 to-ocean-500 dark:from-ocean-300 dark:to-ocean-500 bg-clip-text text-transparent mb-4">
          Hubungi Kami
        </h1>
        <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Ada pertanyaan, masukan, atau ingin berkolaborasi? Jangan ragu untuk menghubungi kami melalui salah satu saluran di bawah ini.
        </p>
      </motion.div>

      {/* Contact Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-14 max-w-5xl mx-auto">
        {contactInfo.map((contact, i) => (
          <motion.a
            key={i}
            href={contact.href}
            target={contact.href.startsWith('http') ? '_blank' : undefined}
            rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.04, y: -6 }}
            whileTap={{ scale: 0.98 }}
            className="glass-card border border-ocean-100 dark:border-ocean-800 hover:border-ocean-300 dark:hover:border-ocean-600 group text-center block"
          >
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${contact.color} flex items-center justify-center text-2xl mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              {contact.icon}
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1">{contact.label}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 break-words leading-relaxed">{contact.value}</p>
          </motion.a>
        ))}
      </div>

      {/* Map Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-5xl mx-auto"
      >
        <div className="glass-card border border-ocean-100 dark:border-ocean-800 overflow-hidden p-0">
          <div className="p-4 md:p-6 border-b border-ocean-100 dark:border-ocean-800">
            <h2 className="text-xl font-bold text-ocean-700 dark:text-ocean-300 flex items-center gap-2">
              <span>🗺️</span>
              Lokasi STMIK IKMI Cirebon
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Jl. Perjuangan No.10B, Karyamulya, Kesambi, Kota Cirebon, Jawa Barat 45144
            </p>
          </div>
          <div className="relative w-full h-64 sm:h-80 md:h-96">
            <iframe
              src="https://www.google.com/maps?q=STMIK%20IKMI%20Cirebon&output=embed"
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center mt-10 md:mt-14"
      >
        <div className="glass-card border border-ocean-100 dark:border-ocean-800 max-w-xl mx-auto">
          <div className="text-4xl mb-4">💬</div>
          <h3 className="text-xl font-bold text-ocean-700 dark:text-ocean-300 mb-2">Respon Cepat</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-5">
            Tim kami siap merespons pertanyaan Anda dalam waktu 1×24 jam.
          </p>
          <motion.a
            href="https://wa.me/6283163587945"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 btn-primary"
          >
            💬 Chat via WhatsApp
          </motion.a>
        </div>
      </motion.div>
    </motion.section>
  )
}
