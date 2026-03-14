'use client'
import { motion } from 'framer-motion'

interface Props {
  judul: string
  deskripsi: string
  tanggal: string
}

export default function ActivityCard({ judul, deskripsi, tanggal }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ duration: 0.3 }}
      className="glass-card border border-ocean-100 dark:border-ocean-800 hover:border-ocean-300 dark:hover:border-ocean-600 hover:shadow-ocean-500/10"
    >
      <h2 className="text-xl font-semibold text-ocean-600 dark:text-ocean-400">{judul}</h2>
      <p className="text-slate-600 dark:text-slate-300 mt-2">{deskripsi}</p>
      <p className="text-sm text-slate-400 dark:text-slate-500 mt-2">📅 {tanggal}</p>
    </motion.div>
  )
}
