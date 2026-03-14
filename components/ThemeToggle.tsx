'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.add('dark')
      setDark(true)
    }
  }, [])

  const toggleTheme = () => {
    setDark(!dark)
    document.documentElement.classList.toggle('dark')
    localStorage.setItem('theme', !dark ? 'dark' : 'light')
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        onClick={toggleTheme}
        onHoverStart={() => setShowTooltip(true)}
        onHoverEnd={() => setShowTooltip(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative bg-gradient-to-r from-ocean-600 to-ocean-400 p-4 rounded-full shadow-2xl hover:shadow-ocean-500/50 transition-all group"
      >
        <motion.div
          initial={false}
          animate={{ rotate: dark ? 180 : 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="text-2xl"
        >
          {dark ? '☀️' : '🌙'}
        </motion.div>

        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap shadow-lg"
            >
              {dark ? 'Mode Terang' : 'Mode Gelap'}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-gray-800 dark:bg-gray-200" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-ocean-600 to-ocean-400 opacity-0 group-hover:opacity-50 blur-xl transition-opacity" />
      </motion.button>
    </div>
  )
}
