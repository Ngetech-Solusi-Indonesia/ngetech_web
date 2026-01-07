export default function About() {
  return (
    <section id="about" className="section-container bg-slate-900/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-tea-green-400 to-tea-green-600 bg-clip-text text-transparent">
          Tentang Kami
        </h2>
        <p className="text-xl text-gray-400 text-center mb-12">
          Profil Ngetech Solusi Indonesia
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Company Profile */}
          <div className="card">
            <div className="w-12 h-12 bg-tea-green-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Software House</h3>
            <p className="text-gray-400">
              Kami adalah software house yang berdedikasi mengerjakan berbagai proyek klien 
              dengan menggunakan teknologi modern dan pendekatan yang inovatif.
            </p>
          </div>

          {/* MVP Development */}
          <div className="card">
            <div className="w-12 h-12 bg-tea-green-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">MVP Development</h3>
            <p className="text-gray-400">
              Sedang mengembangkan MVP (Minimum Viable Product) untuk sistem integrasi sekolah 
              yang memanfaatkan teknologi IoT untuk solusi pendidikan yang lebih smart.
            </p>
          </div>
        </div>

        {/* Services */}
        <div className="card">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Services</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-tea-green-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-tea-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <p className="text-gray-300 font-medium">Web Development</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-tea-green-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-tea-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-gray-300 font-medium">Mobile App</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-tea-green-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-tea-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-gray-300 font-medium">IoT Solutions</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-tea-green-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-tea-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <p className="text-gray-300 font-medium">System Integration</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
