# Deployment Guide - Ngetech Solusi Indonesia

## Quick Deploy to Vercel

### Method 1: GitHub Integration (Recommended)
1. Push code to GitHub repository
2. Visit [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository `Ngetech-Solusi-Indonesia/ngetech_web`
5. Vercel will auto-detect Vite and configure build settings
6. Click "Deploy"
7. Your site will be live at `https://ngetech-web.vercel.app` (or custom domain)

### Method 2: Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd /path/to/ngetech_web
vercel

# For production
vercel --prod
```

## Deploy to VPS/Custom Server

### Requirements
- Node.js 18+ installed
- Web server (nginx/apache) configured
- Domain pointed to server IP

### Steps

1. **Build the project**
```bash
npm install
npm run build
```

2. **Upload dist folder to server**
```bash
# Using SCP
scp -r dist/* user@your-server:/var/www/ngetech

# Or using rsync
rsync -avz dist/ user@your-server:/var/www/ngetech/
```

3. **Configure Nginx**
```nginx
server {
    listen 80;
    server_name ngetech.co.id www.ngetech.co.id;
    
    root /var/www/ngetech;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

4. **Reload Nginx**
```bash
sudo nginx -t
sudo systemctl reload nginx
```

5. **Setup SSL (Optional but Recommended)**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d ngetech.co.id -d www.ngetech.co.id
```

## Deploy to Netlify

1. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **Build and deploy**
```bash
npm run build
netlify deploy --prod --dir=dist
```

Or connect via GitHub for automatic deployments.

## Environment Variables

No environment variables required for the base deployment. If you add API integrations later, create a `.env` file:

```bash
VITE_API_URL=https://api.ngetech.co.id
VITE_CONTACT_EMAIL=info@ngetech.co.id
```

## Build Configuration

The project uses Vite with the following configuration:
- **Build output**: `dist/`
- **Build command**: `npm run build`
- **Dev command**: `npm run dev`
- **Node version**: 18+

## Post-Deployment Checklist

- [ ] Verify all pages load correctly (Home, About, Projects, Contact)
- [ ] Test navigation and smooth scrolling
- [ ] Check 3D animations render properly
- [ ] Test contact form (add backend later)
- [ ] Verify responsive design on mobile devices
- [ ] Check page load speed with Lighthouse
- [ ] Setup analytics (Google Analytics, etc.)
- [ ] Configure custom domain
- [ ] Setup SSL certificate
- [ ] Add social media meta tags (Open Graph, Twitter Cards)

## Performance Optimization Tips

1. **Enable compression** in your web server
2. **Use CDN** for static assets (Vercel includes this)
3. **Lazy load** 3D components on scroll if needed
4. **Optimize images** in the public folder
5. **Consider code splitting** for larger components

## Monitoring

After deployment, monitor:
- Page load times
- Error rates
- 3D rendering performance on different devices
- User interactions

## Support

For deployment issues:
- Check Vercel/Netlify logs
- Review browser console for errors
- Ensure all dependencies are installed
- Verify build completes successfully locally

## Updating the Site

```bash
# Make changes locally
# Test changes
npm run dev

# Build and verify
npm run build
npm run preview

# Commit and push (triggers auto-deploy on Vercel)
git add .
git commit -m "Your update message"
git push origin main
```
