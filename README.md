# 🚀 Rifki Aditya Hariyanto - Portfolio Website

Portfolio website modern dengan animasi scroll yang smooth dan SEO-optimized. Dibangun dengan HTML, CSS (Tailwind CSS), dan JavaScript vanilla.

## ✨ Fitur

- ✅ **Fully Responsive** - Mobile, tablet, dan desktop friendly
- ✅ **SEO Optimized** - Meta tags lengkap, structured data (JSON-LD), sitemap
- ✅ **Smooth Scroll Animations** - Parallax effects, fade-in, zoom, slide animations
- ✅ **Dynamic Content** - Portfolio projects dari Supabase
- ✅ **Modern UI/UX** - Gradient effects, glass morphism, hover animations
- ✅ **Fast Loading** - Optimized assets dan CDN ready
- ✅ **Admin Dashboard** - Manage portfolio projects dengan Supabase

## 🎨 Animasi yang Tersedia

1. **Scroll Animations**
   - Fade Up, Left, Right
   - Zoom In
   - Rotate
   - Stagger Effects

2. **Parallax Effects**
   - Background blobs
   - Hero section

3. **Hover Animations**
   - Lift effect pada cards
   - Icon scaling
   - Gradient borders

## 📦 Struktur Project

```
portofoliov3/
├── index.html              # Homepage
├── admin.html              # Admin dashboard (Total Projects only)
├── assets/
│   └── js/
│       ├── portfolio-dynamic.js    # Portfolio loader
│       └── supabase-config.js      # Supabase configuration
├── Rifki Aditya Hariyanto_Foto.jpg
├── blob-scene-haikei.svg
├── netlify.toml            # Netlify configuration
├── _redirects              # Netlify redirects
├── robots.txt              # SEO robots file
└── sitemap.xml             # SEO sitemap
```

## 🚀 Deploy ke Netlify

### Metode 1: Drag & Drop (Paling Mudah)

1. Buka [Netlify Drop](https://app.netlify.com/drop)
2. Drag folder project ke area upload
3. Tunggu proses deploy selesai
4. Domain otomatis: `random-name-123.netlify.app`

### Metode 2: Git Deploy (Recommended)

1. **Push ke GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPO-NAME.git
   git push -u origin main
   ```

2. **Connect ke Netlify**
   - Login ke [Netlify](https://app.netlify.com)
   - Klik "Add new site" → "Import an existing project"
   - Pilih GitHub dan authorize
   - Pilih repository kamu
   - Settings:
     - Build command: (kosongkan)
     - Publish directory: `.`
   - Klik "Deploy site"

3. **Custom Domain (Opsional)**
   - Di Netlify dashboard → Domain Settings
   - Klik "Add custom domain"
   - Follow instruksi untuk setup DNS

### Metode 3: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
cd portofoliov3
netlify deploy --prod
```

## 🔧 Setelah Deploy - Update URLs

Setelah mendapat domain dari Netlify, ganti URL di file-file berikut:

### 1. index.html (Line 18-43)
```html
<!-- Ganti semua http://127.0.0.1:5501 dengan domain baru -->
<link rel="canonical" href="https://DOMAIN-KAMU.netlify.app/">
<meta property="og:url" content="https://DOMAIN-KAMU.netlify.app/">
<meta property="og:image" content="https://DOMAIN-KAMU.netlify.app/Rifki%20Aditya%20Hariyanto_Foto.jpg">
<!-- dst... -->
```

### 2. robots.txt
```
Sitemap: https://DOMAIN-KAMU.netlify.app/sitemap.xml
```

### 3. sitemap.xml
```xml
<!-- Ganti semua GANTI-DOMAIN-KAMU dengan domain baru -->
<loc>https://DOMAIN-KAMU.netlify.app/</loc>
```

## 📊 SEO Checklist

- ✅ Meta tags (title, description, keywords)
- ✅ Open Graph tags (Facebook/LinkedIn sharing)
- ✅ Twitter Card tags
- ✅ JSON-LD structured data
- ✅ Canonical URLs
- ✅ robots.txt
- ✅ sitemap.xml
- ✅ Alt text pada images
- ✅ Semantic HTML5
- ✅ Mobile responsive
- ✅ Fast loading (CDN)

## 🔐 Security Headers (Sudah dikonfigurasi di netlify.toml)

- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

## 📈 Submit ke Search Engines

### Google Search Console
1. Buka [Google Search Console](https://search.google.com/search-console)
2. Tambahkan property dengan domain kamu
3. Verify ownership (via HTML tag atau DNS)
4. Submit sitemap: `https://DOMAIN-KAMU.netlify.app/sitemap.xml`

### Bing Webmaster Tools
1. Buka [Bing Webmaster](https://www.bing.com/webmasters)
2. Add site
3. Submit sitemap

## 🎯 Performance Tips

1. **Images**: Compress images sebelum upload (gunakan TinyPNG)
2. **CDN**: Netlify sudah include global CDN
3. **Caching**: Sudah dikonfigurasi di netlify.toml
4. **Lazy Loading**: Implementasi native lazy loading untuk images

## 🛠️ Tech Stack

- HTML5
- CSS3 (Tailwind CSS via CDN)
- JavaScript (Vanilla)
- Supabase (Backend as a Service)
- Font Awesome Icons
- Google Fonts (Inter)

## 📱 Browser Support

- Chrome ✅
- Firefox ✅
- Safari ✅
- Edge ✅
- Opera ✅

## 📝 Custom Domain Setup (Opsional)

Jika punya domain sendiri (misal: rifkiaditya.com):

1. **Di Netlify**:
   - Domain settings → Add custom domain
   - Tambahkan domain kamu

2. **Di Domain Provider** (Niagahoster, Namecheap, dll):
   - Tambah DNS Record:
     ```
     Type: A
     Name: @
     Value: 75.2.60.5 (Netlify IP)
     
     Type: CNAME
     Name: www
     Value: your-site.netlify.app
     ```

3. **Enable HTTPS**: Netlify otomatis provide SSL certificate gratis

## 🎨 Customization

### Warna
Edit di Tailwind config atau CSS variables untuk ganti color scheme.

### Animasi
Semua animasi ada di CSS section "SCROLL ANIMATIONS" (line ~287-370 di index.html)

### Content
Portfolio projects diambil dari Supabase. Update via admin dashboard di `/admin.html`

## 📞 Support

Jika ada masalah atau pertanyaan:
- Email: hariyantorifki25@gmail.com
- LinkedIn: [Rifki Aditya Hariyanto](https://www.linkedin.com/in/rifki-aditya-hariyanto-2662821a7/)

## 📄 License

© 2026 Rifki Aditya Hariyanto. All rights reserved.

---

**Happy Deploying! 🚀**
