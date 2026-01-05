# 📝 Deployment Guide - Portfolio Rifki Aditya Hariyanto

## 🎯 Quick Start Deploy

### Option 1: Deploy ke Netlify (5 Menit) ⚡

**Cara Tercepat - Drag & Drop:**

1. Buka browser, ke: https://app.netlify.com/drop
2. Login/Sign up (bisa pakai GitHub)
3. Drag & drop folder `portofoliov3` ke area upload
4. Tunggu ~30 detik
5. ✅ **DONE!** Dapat domain: `random-name-123.netlify.app`

**Setelah Deploy:**
- Custom domain name: Site settings → Domain management → Options → Edit site name
- Contoh: `rifki-portfolio.netlify.app`

---

### Option 2: Deploy ke Vercel (5 Menit) ⚡

**Via GitHub:**

1. Push project ke GitHub dulu
2. Buka: https://vercel.com
3. Login dengan GitHub
4. Klik "Add New Project"
5. Import repository kamu
6. Settings:
   - Framework Preset: **Other**
   - Build Command: (kosongkan)
   - Output Directory: `.`
7. Klik "Deploy"
8. ✅ **DONE!** Dapat domain: `portofolio-xyz.vercel.app`

---

## 🔄 Update URLs Setelah Deploy

Setelah dapat domain production, **WAJIB** update file-file ini:

### 1️⃣ File: `index.html`

Cari & Replace semua `http://127.0.0.1:5501` dengan domain baru kamu.

**Lokasi yang perlu diganti (Lines 18-43):**
```html
<!-- Line 18 -->
<link rel="canonical" href="https://rifki-portfolio.netlify.app/">

<!-- Line 22 -->
<meta property="og:url" content="https://rifki-portfolio.netlify.app/">

<!-- Line 25 -->
<meta property="og:image" content="https://rifki-portfolio.netlify.app/Rifki%20Aditya%20Hariyanto_Foto.jpg">

<!-- Line 31 -->
<meta name="twitter:url" content="https://rifki-portfolio.netlify.app/">

<!-- Line 33 -->
<meta name="twitter:image" content="https://rifki-portfolio.netlify.app/Rifki%20Aditya%20Hariyanto_Foto.jpg">

<!-- Line 42 (JSON-LD) -->
"url": "https://rifki-portfolio.netlify.app/",

<!-- Line 43 (JSON-LD) -->
"image": "https://rifki-portfolio.netlify.app/Rifki%20Aditya%20Hariyanto_Foto.jpg",
```

**Cara cepat di VS Code:**
1. Tekan `Ctrl + H` (Windows) atau `Cmd + H` (Mac)
2. Find: `http://127.0.0.1:5501`
3. Replace: `https://rifki-portfolio.netlify.app` (ganti dengan domain kamu)
4. Klik "Replace All"

### 2️⃣ File: `robots.txt`

```txt
Sitemap: https://rifki-portfolio.netlify.app/sitemap.xml
```

### 3️⃣ File: `sitemap.xml`

Ganti semua `GANTI-DOMAIN-KAMU` dengan domain production kamu.

**Cara cepat di VS Code:**
1. Tekan `Ctrl + H`
2. Find: `GANTI-DOMAIN-KAMU.netlify.app`
3. Replace: `rifki-portfolio.netlify.app` (atau domain kamu)
4. Klik "Replace All"

### 4️⃣ Commit & Push Update

```bash
git add .
git commit -m "Update URLs to production domain"
git push
```

Netlify/Vercel akan otomatis re-deploy dengan URL yang benar! 🚀

---

## 🌐 Custom Domain (Opsional)

Punya domain sendiri? (misal: rifkiaditya.com)

### Setup di Netlify:

1. **Di Netlify Dashboard:**
   - Site settings → Domain management
   - Klik "Add custom domain"
   - Masukkan domain: `rifkiaditya.com`
   - Klik "Verify"

2. **Di Domain Provider** (Niagahoster, Namecheap, dll):
   
   Tambahkan DNS Records:
   
   ```
   Type: A
   Name: @
   Value: 75.2.60.5
   TTL: Automatic
   
   Type: CNAME  
   Name: www
   Value: rifki-portfolio.netlify.app
   TTL: Automatic
   ```

3. **Tunggu DNS Propagation** (5-48 jam)

4. **HTTPS Otomatis** ✅ (Netlify provide SSL certificate gratis)

### Setup di Vercel:

1. **Di Vercel Dashboard:**
   - Project settings → Domains
   - Klik "Add"
   - Masukkan domain: `rifkiaditya.com`

2. **Di Domain Provider:**
   
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

---

## 📊 Submit ke Google (Penting untuk SEO!)

### Google Search Console

1. Buka: https://search.google.com/search-console
2. Klik "Add Property"
3. Pilih "URL prefix"
4. Masukkan URL: `https://rifki-portfolio.netlify.app`
5. Verify (pilih metode HTML tag):
   - Copy meta tag yang diberikan
   - Paste di `<head>` index.html (bawah meta charset)
   - Push ke Git
   - Klik "Verify"
6. **Submit Sitemap:**
   - Di sidebar → Sitemaps
   - Masukkan: `sitemap.xml`
   - Klik "Submit"

### Google Analytics (Track Visitors)

1. Buka: https://analytics.google.com
2. Create property
3. Copy Tracking ID: `G-XXXXXXXXXX`
4. Tambahkan di `<head>` index.html:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🎨 Bonus: Optimize Images

Sebelum deploy, compress foto untuk loading lebih cepat:

1. **Online Tool:**
   - TinyPNG: https://tinypng.com
   - Compressor.io: https://compressor.io

2. **Upload foto:**
   - Drag foto `Rifki Aditya Hariyanto_Foto.jpg`
   - Download hasil compress
   - Replace file original

**Expected hasil:** 70-80% lebih kecil, tanpa loss quality!

---

## 🐛 Troubleshooting

### Problem: "Redirect loop" atau 404

**Solution:**
- Check file `_redirects` ada di root folder
- Content harus persis:
  ```
  /admin    /admin.html    200
  /*    /index.html   200
  ```

### Problem: Meta tags tidak muncul saat share di social media

**Solution:**
- Clear cache social media:
  - **Facebook:** https://developers.facebook.com/tools/debug/
  - **LinkedIn:** https://www.linkedin.com/post-inspector/
  - **Twitter:** https://cards-dev.twitter.com/validator
- Paste URL kamu, klik "Scrape Again"

### Problem: SEO tidak jalan

**Solution:**
1. ✅ Pastikan sudah update URLs di index.html
2. ✅ Submit sitemap ke Google Search Console
3. ✅ Tunggu 2-7 hari untuk indexing
4. ✅ Check `robots.txt` accessible: `https://domain.com/robots.txt`

---

## 📈 Performance Tips

### Netlify (sudah optimal via netlify.toml):
- ✅ Global CDN
- ✅ Auto caching
- ✅ Gzip compression
- ✅ Security headers

### Additional Optimization:
1. Enable **Netlify Analytics** (Site settings → Analytics)
2. Add **Preload** untuk critical resources:
   ```html
   <link rel="preload" href="Rifki Aditya Hariyanto_Foto.jpg" as="image">
   ```
3. Lazy load images:
   ```html
   <img src="..." loading="lazy">
   ```

---

## ✅ Post-Deploy Checklist

Setelah deploy, check:

- [ ] Website bisa diakses
- [ ] Semua animasi jalan smooth
- [ ] Mobile responsive OK
- [ ] Images loading
- [ ] Admin page accessible di `/admin`
- [ ] Social sharing preview OK (test di LinkedIn/Facebook)
- [ ] URLs sudah production (bukan localhost)
- [ ] Sitemap accessible: `https://domain.com/sitemap.xml`
- [ ] Robots.txt accessible: `https://domain.com/robots.txt`
- [ ] Google Search Console sudah submit
- [ ] Test di PageSpeed Insights: https://pagespeed.web.dev/

---

## 🚀 Deploy Updates (Setelah Edit Code)

**Netlify/Vercel dengan Git:**
```bash
git add .
git commit -m "Update portfolio content"
git push
```
Auto deploy dalam 1-2 menit! ⚡

**Manual Upload (Drag & Drop):**
- Upload ulang folder ke Netlify Drop
- Will replace previous deployment

---

## 📞 Need Help?

**Contact:**
- Email: hariyantorifki25@gmail.com
- LinkedIn: linkedin.com/in/rifki-aditya-hariyanto-2662821a7

**Resources:**
- Netlify Docs: https://docs.netlify.com
- Vercel Docs: https://vercel.com/docs
- Google Search Console: https://support.google.com/webmasters

---

**Good luck dengan deployment! 🎉**

Setelah deploy, share link portfolio kamu! 🚀
