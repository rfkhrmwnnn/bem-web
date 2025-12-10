'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

const strukturKabinet = [
  { jabatan: 'Presiden Mahasiswa', nama: 'Moh Ari Widoyono', foto: '/images/presma.png' },
  { jabatan: 'Wakil Presiden Mahasiswa', nama: 'Muhammad Zamil Farhan', foto: '/images/wapresma.png' },
  { jabatan: 'Sekretaris Jenderal', nama: 'Liva', foto: '/images/sekjen.jpg' },
  { jabatan: 'Kementerian Keuangan', nama: 'Imelda', foto: '/images/kemenkeu.jpg' },
  { jabatan: 'Kementerian PSDM', nama: 'Ramdan', foto: '/images/psdm.jpg' },
  { jabatan: 'Kementerian Dalam Negeri', nama: 'Irul', foto: '/images/dagri.jpg' },
  { jabatan: 'Kementerian Luar Negeri', nama: 'Ruli', foto: '/images/menlu.jpg' },
  { jabatan: 'Kementerian Kominfo', nama: 'Rafi', foto: '/images/kominfo.jpg' },
  { jabatan: 'Kementerian Ristek', nama: 'Rifki', foto: '/images/ristek.jpg' },
  { jabatan: 'Kementerian Agama', nama: 'Riza', foto: '/images/kemenag.jpg' },
]

export default function About() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-16"
    >
      {/* Bagian Profil */}
      <div className="text-center">
        <h1 className="text-5xl font-bold text-orangeBright mb-4">Tentang Kami</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          <strong>Badan Eksekutif Mahasiswa STMIK IKMI Cirebon</strong> merupakan lembaga eksekutif mahasiswa
          yang menjadi wadah aspirasi, kreativitas, dan kolaborasi bagi seluruh mahasiswa.
          Kabinet <strong>Parta Pandita</strong> hadir untuk membangun sinergi antara mahasiswa, kampus,
          dan masyarakat dalam semangat kepemimpinan, integritas, dan pengabdian.
        </p>
      </div>

      {/* Foto Kabinet */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative flex justify-center"
      >
        <Image
          src="/images/kabinet.jpg"
          alt="Kabinet Parta Pandita"
          width={800}
          height={500}
          className="rounded-xl border border-neon shadow-lg object-cover"
        />
      </motion.div>

      {/* Visi Misi */}
      <div className="bg-white/10 dark:bg-black/30 p-8 rounded-xl border border-orangeBright backdrop-blur-md">
        <h2 className="text-3xl font-semibold text-center text-orangeBright mb-6">Visi & Misi Kabinet</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold text-neon mb-3">Visi</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Mewujudkan BEM STMIK IKMI Cirebon yang <strong>inovatif, kolaboratif, dan solutif</strong> sebagai wadah aspirasi mahasiswa
              menuju kampus yang unggul dalam ilmu pengetahuan, teknologi, dan pengabdian masyarakat.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-neon mb-3">Misi</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li>Menumbuhkan budaya organisasi yang profesional dan berintegritas.</li>
              <li>Mengembangkan potensi mahasiswa melalui kegiatan inovatif dan kolaboratif.</li>
              <li>Membangun komunikasi aktif antara mahasiswa, kampus, dan masyarakat.</li>
              <li>Menjadi agen perubahan dalam menciptakan lingkungan kampus yang inspiratif dan produktif.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Struktur Kabinet */}
      <div>
        <h2 className="text-4xl font-bold text-center text-orangeBright mb-10">Struktur Kabinet Parta Pandita</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
          {strukturKabinet.map((person, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="group relative bg-white/10 dark:bg-black/40 border border-neon rounded-xl p-4 w-60 text-center hover:scale-105 transition-transform duration-300 backdrop-blur-md"
            >
              <Image
                src={person.foto}
                alt={person.nama}
                width={200}
                height={200}
                className="rounded-lg mx-auto object-cover border border-neon shadow-lg group-hover:shadow-[0_0_15px_#00ffff]"
              />
              <h3 className="text-lg font-semibold mt-3 text-orangeBright">{person.nama}</h3>
              <p className="text-sm text-gray-400">{person.jabatan}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
