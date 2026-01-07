# Ngetech Solusi Indonesia - Landing Page

Interactive landing page untuk **Ngetech Solusi Indonesia** - software house yang fokus pada solusi teknologi inovatif.

![Landing Page Preview](https://github.com/user-attachments/assets/058bf01d-2d23-4c38-8095-66fbd50162ff)

## 🚀 Features

- ✨ **3D Interactive Graphics** - Tea cup model dengan particle effects menggunakan Three.js
- 🎨 **Modern Design** - Responsive design dengan tema hijau teh/nature
- 📱 **Multi-page Navigation** - React Router dengan smooth scrolling
- 🌐 **Sections**: Hero, About, Projects, Team, Contact
- ⚡ **Fast & Optimized** - Built with Vite
- 🎯 **Vercel Ready** - Production-ready deployment configuration

## 🛠️ Tech Stack

- **React** - UI Library
- **Vite** - Build tool & dev server
- **Three.js** - 3D graphics via react-three-fiber
- **Tailwind CSS v4** - Styling
- **React Router** - Navigation

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import repository in Vercel
3. Deploy automatically

atau gunakan Vercel CLI:

```bash
npm install -g vercel
vercel
```

### VPS/Custom Server

```bash
# Build project
npm run build

# Serve dist folder dengan web server (nginx, apache, dll)
# Atau gunakan serve
npx serve dist
```

## 📁 Project Structure

```
src/
├── components/
│   ├── 3d/              # 3D components (TeaCup, TeaLeaf, WaterParticles)
│   ├── layout/          # Layout components (Navbar, Footer)
│   └── sections/        # Section components (Hero, About, Projects, Team, Contact)
├── pages/               # Page components (Home, About, Projects, Contact)
├── App.jsx             # Main app with routing
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## 🎨 Customization

### Colors
Edit tea-themed colors in `src/index.css`:
- Tea Green: Used for primary actions and highlights
- Tea Brown: Used for tea liquid and accents
- Gradient backgrounds for dark/light modes

### Content
Update content in:
- **About**: `src/components/sections/About.jsx`
- **Projects**: `src/components/sections/Projects.jsx`
- **Team**: `src/components/sections/Team.jsx`
- **Contact**: `src/components/sections/Contact.jsx`

### 3D Elements
Modify 3D components in `src/components/3d/`:
- `TeaCup.jsx` - Adjust cup geometry and colors
- `TeaLeaf.jsx` - Modify leaf animation
- `WaterParticles.jsx` - Change particle count and behavior

## 📝 License

© 2026 Ngetech Solusi Indonesia. All rights reserved.

## 📧 Contact

- Email: info@ngetech.co.id
- GitHub: [Ngetech-Solusi-Indonesia](https://github.com/Ngetech-Solusi-Indonesia)

