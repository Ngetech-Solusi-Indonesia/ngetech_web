export default function Projects() {
  const projects = [
    {
      title: "Smart School System",
      category: "IoT & System Integration",
      description: "Sistem integrasi sekolah pintar yang menggabungkan IoT untuk monitoring kelas, absensi otomatis, dan manajemen fasilitas real-time.",
      tags: ["IoT", "React", "Node.js", "MQTT", "PostgreSQL"],
      status: "In Development",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      title: "E-Commerce Platform",
      category: "Web Application",
      description: "Platform e-commerce modern dengan fitur lengkap termasuk payment gateway, inventory management, dan analytics dashboard.",
      tags: ["React", "Next.js", "Stripe", "MongoDB", "TailwindCSS"],
      status: "Completed",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    },
    {
      title: "Corporate Management System",
      category: "Enterprise Solution",
      description: "Sistem manajemen perusahaan terintegrasi dengan modul HR, finance, project management, dan reporting.",
      tags: ["Vue.js", "Laravel", "MySQL", "Docker"],
      status: "Completed",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      title: "Mobile Banking App",
      category: "Mobile Application",
      description: "Aplikasi mobile banking dengan fitur transfer, payment, investment, dan biometric authentication.",
      tags: ["React Native", "Firebase", "Redux", "Biometric API"],
      status: "Completed",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "IoT Energy Monitoring",
      category: "IoT Solution",
      description: "Sistem monitoring konsumsi energi real-time menggunakan sensor IoT dengan dashboard analytics dan alert system.",
      tags: ["IoT", "Python", "InfluxDB", "Grafana", "MQTT"],
      status: "In Development",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Healthcare Portal",
      category: "Web Application",
      description: "Portal kesehatan untuk booking appointment, telemedicine, medical records, dan pharmacy integration.",
      tags: ["React", "Express", "PostgreSQL", "WebRTC", "Socket.io"],
      status: "Completed",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    }
  ];

  return (
    <section id="projects" className="section-container bg-slate-800/30">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-tea-green-400 to-tea-green-600 bg-clip-text text-transparent">
          Our Projects
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Showcase proyek-proyek yang telah kami kerjakan dengan berbagai teknologi modern
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div key={index} className="card group hover:scale-105 transition-transform duration-300">
            {/* Icon & Status */}
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-tea-green-600/20 rounded-lg flex items-center justify-center text-tea-green-400 group-hover:bg-tea-green-600 group-hover:text-white transition-colors">
                {project.icon}
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                project.status === 'In Development' 
                  ? 'bg-yellow-500/20 text-yellow-400' 
                  : 'bg-tea-green-500/20 text-tea-green-400'
              }`}>
                {project.status}
              </span>
            </div>

            {/* Content */}
            <p className="text-sm text-tea-green-400 mb-2">{project.category}</p>
            <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
            <p className="text-gray-400 mb-4">{project.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, tagIndex) => (
                <span 
                  key={tagIndex}
                  className="px-2 py-1 bg-slate-700/50 text-gray-300 text-xs rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <p className="text-gray-400 mb-6">
          Tertarik untuk memulai proyek bersama kami?
        </p>
        <button
          onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
          className="btn-primary"
        >
          Diskusi Proyek Anda
        </button>
      </div>
    </section>
  );
}
