import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-tea-green-400 to-tea-green-600 bg-clip-text text-transparent">
            Tentang Ngetech Solusi Indonesia
          </h1>
          
          <div className="card mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Profil Perusahaan</h2>
            <p className="text-gray-400 mb-4">
              Ngetech Solusi Indonesia adalah software house yang berdedikasi untuk memberikan 
              solusi teknologi inovatif kepada klien dari berbagai industri. Kami percaya bahwa 
              teknologi adalah kunci untuk meningkatkan efisiensi, produktivitas, dan inovasi bisnis.
            </p>
            <p className="text-gray-400 mb-4">
              Dengan tim developer berpengalaman dan passionate, kami telah mengerjakan berbagai 
              proyek mulai dari web application, mobile app, hingga solusi IoT yang kompleks.
            </p>
          </div>

          <div className="card mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Visi & Misi</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-tea-green-400 mb-2">Visi</h3>
                <p className="text-gray-400">
                  Menjadi software house terdepan di Indonesia yang menghadirkan solusi 
                  teknologi inovatif dan berkualitas tinggi untuk meningkatkan kehidupan masyarakat.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-tea-green-400 mb-2">Misi</h3>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                  <li>Memberikan solusi teknologi yang tepat guna dan efisien</li>
                  <li>Mengembangkan produk inovatif yang berdampak positif</li>
                  <li>Membangun tim developer yang kompeten dan profesional</li>
                  <li>Menjalin kemitraan jangka panjang dengan klien</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Smart School System - MVP</h2>
            <p className="text-gray-400 mb-4">
              Saat ini kami sedang mengembangkan MVP (Minimum Viable Product) untuk Smart School System, 
              sebuah platform system integration untuk sekolah yang memanfaatkan teknologi IoT.
            </p>
            <p className="text-gray-400 mb-4">
              Sistem ini dirancang untuk membantu sekolah dalam:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 mb-4">
              <li>Monitoring kehadiran siswa secara otomatis</li>
              <li>Pengelolaan fasilitas sekolah dengan sensor IoT</li>
              <li>Monitoring suhu dan kualitas udara di kelas</li>
              <li>Integrasi dengan sistem akademik existing</li>
              <li>Dashboard real-time untuk manajemen sekolah</li>
            </ul>
            <p className="text-gray-400">
              MVP ini merupakan bagian dari komitmen kami untuk memberikan solusi teknologi 
              yang dapat meningkatkan kualitas pendidikan di Indonesia.
            </p>
          </div>

          <div className="text-center">
            <Link to="/" className="btn-primary">
              Kembali ke Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
