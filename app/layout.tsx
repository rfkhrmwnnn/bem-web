import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ThemeToggle from '@/components/ThemeToggle'

export const metadata = {
  title: 'BEM STMIK IKMI Cirebon – Kabinet Parta Pandita',
  description: 'Website resmi BEM STMIK IKMI Cirebon – Kabinet Parta Pandita',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-500">
        <Navbar />
        <ThemeToggle />
        <main className="pt-20 sm:pt-24 px-4 sm:px-6 max-w-7xl mx-auto">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
