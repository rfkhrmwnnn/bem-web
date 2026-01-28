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
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="border border-neon p-5 rounded-lg bg-white/10 dark:bg-black/40 hover:shadow-[0_0_15px_#00ffff] transition"
    >
      <h2 className="text-xl font-semibold text-orangeBright">{judul}</h2>
      <p className="text-gray-300 mt-2">{deskripsi}</p>
      <p className="text-sm text-gray-500 mt-2">{tanggal}</p>
    </motion.div>
  )
}
