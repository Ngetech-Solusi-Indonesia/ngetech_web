import { Link } from 'react-router-dom';

export default function ProjectsPage() {
  const allProjects = [
    {
      title: "Smart School System",
      category: "IoT & System Integration",
      description: "Sistem integrasi sekolah pintar yang menggabungkan IoT untuk monitoring kelas, absensi otomatis, dan manajemen fasilitas real-time. Menggunakan sensor-sensor IoT untuk mengumpulkan data yang kemudian divisualisasikan dalam dashboard yang user-friendly.",
      tags: ["IoT", "React", "Node.js", "MQTT", "PostgreSQL", "ESP32"],
      status: "In Development",
      features: [
        "Absensi otomatis dengan RFID",
        "Monitoring suhu dan kelembaban ruangan",
        "Dashboard real-time untuk admin",
        "Notifikasi push untuk orang tua",
        "Integrasi dengan sistem akademik"
      ]
    },
    {
      title: "E-Commerce Platform",
      category: "Web Application",
      description: "Platform e-commerce modern dengan fitur lengkap termasuk payment gateway, inventory management, dan analytics dashboard. Dilengkapi dengan sistem rekomendasi produk menggunakan machine learning.",
      tags: ["React", "Next.js", "Stripe", "MongoDB", "TailwindCSS", "ML"],
      status: "Completed",
      features: [
        "Multi-vendor marketplace",
        "Payment gateway terintegrasi",
        "Real-time inventory tracking",
        "Customer analytics dashboard",
        "Mobile-responsive design"
      ]
    },
    {
      title: "Corporate Management System",
      category: "Enterprise Solution",
      description: "Sistem manajemen perusahaan terintegrasi dengan modul HR, finance, project management, dan reporting. Membantu perusahaan dalam mengelola operasional secara efisien.",
      tags: ["Vue.js", "Laravel", "MySQL", "Docker", "Redis"],
      status: "Completed",
      features: [
        "HR Management (payroll, leave, attendance)",
        "Financial management dan accounting",
        "Project tracking dan time management",
        "Advanced reporting dan analytics",
        "Role-based access control"
      ]
    },
    {
      title: "Mobile Banking App",
      category: "Mobile Application",
      description: "Aplikasi mobile banking dengan fitur transfer, payment, investment, dan biometric authentication. Didesain dengan security-first approach untuk melindungi data pengguna.",
      tags: ["React Native", "Firebase", "Redux", "Biometric API", "Encryption"],
      status: "Completed",
      features: [
        "Transfer antar bank real-time",
        "Bill payment dan top-up",
        "Investment portfolio management",
        "Biometric login (fingerprint/face)",
        "Transaction history dan reporting"
      ]
    },
    {
      title: "IoT Energy Monitoring",
      category: "IoT Solution",
      description: "Sistem monitoring konsumsi energi real-time menggunakan sensor IoT dengan dashboard analytics dan alert system. Membantu perusahaan untuk mengoptimalkan penggunaan energi.",
      tags: ["IoT", "Python", "InfluxDB", "Grafana", "MQTT", "ESP32"],
      status: "In Development",
      features: [
        "Real-time energy consumption monitoring",
        "Historical data analytics",
        "Anomaly detection dan alerting",
        "Cost calculation dan forecasting",
        "Custom dashboard dengan Grafana"
      ]
    },
    {
      title: "Healthcare Portal",
      category: "Web Application",
      description: "Portal kesehatan untuk booking appointment, telemedicine, medical records, dan pharmacy integration. Memudahkan pasien untuk mengakses layanan kesehatan secara online.",
      tags: ["React", "Express", "PostgreSQL", "WebRTC", "Socket.io"],
      status: "Completed",
      features: [
        "Online appointment booking",
        "Video consultation (telemedicine)",
        "Electronic medical records",
        "Prescription management",
        "Pharmacy delivery integration"
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="section-container">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center bg-gradient-to-r from-tea-green-400 to-tea-green-600 bg-clip-text text-transparent">
            Our Projects
          </h1>
          <p className="text-xl text-gray-400 text-center mb-12 max-w-3xl mx-auto">
            Portfolio proyek yang telah kami kerjakan dengan berbagai teknologi dan solusi inovatif
          </p>

          <div className="space-y-8">
            {allProjects.map((project, index) => (
              <div key={index} className="card">
                <div className="flex flex-wrap items-center justify-between mb-4">
                  <div>
                    <span className="text-sm text-tea-green-400 mb-2 block">{project.category}</span>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">{project.title}</h2>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    project.status === 'In Development' 
                      ? 'bg-yellow-500/20 text-yellow-400' 
                      : 'bg-tea-green-500/20 text-tea-green-400'
                  }`}>
                    {project.status}
                  </span>
                </div>

                <p className="text-gray-400 mb-6">{project.description}</p>

                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-3">Key Features:</h3>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {project.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-gray-400">
                        <svg className="w-5 h-5 text-tea-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-3 py-1 bg-slate-700/50 text-gray-300 text-sm rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/" className="btn-primary mr-4">
              Kembali ke Home
            </Link>
            <button
              onClick={() => window.location.href = '/#contact'}
              className="btn-secondary"
            >
              Diskusi Proyek Anda
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
