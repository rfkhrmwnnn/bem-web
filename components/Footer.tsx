import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="mt-20 py-10 text-center border-t border-orangeBright glass relative">
      <Image
        src="/images/logo.png"
        alt="Logo"
        width={120}
        height={120}
        className="mx-auto opacity-70"
      />
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} BEM STMIK IKMI Cirebon – Kabinet Parta Pandita
      </p>
    </footer>
  )
}
