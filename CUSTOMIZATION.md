# Edizone Careers - Assets & Customization Quick Guide

## 📁 Project Structure

```
EDIZONE/
├── index.html                 # Main landing page
├── contact.html               # Contact form page
├── README.md                  # Project documentation
├── DEPLOYMENT.md              # Deployment guide
├── CUSTOMIZATION.md           # This file
├── config.json                # Configuration reference
│
├── assets/                    # Create this folder
│   ├── images/
│   │   ├── hero-bg.jpg       # Hero background image
│   │   ├── director-shahla.jpg
│   │   ├── director-junaid.jpg
│   │   ├── logo.png          # DCore logo
│   │   └── icons/
│   │
│   ├── videos/
│   │   ├── hero-bg-video.mp4 # Muted hero background video
│   │   ├── testimonial-student-1.mp4
│   │   ├── testimonial-student-2.mp4
│   │   ├── testimonial-student-3.mp4
│   │   ├── testimonial-parent-1.mp4
│   │   ├── testimonial-parent-2.mp4
│   │   └── testimonial-parent-3.mp4
│   │
│   └── documents/
│       ├── privacy-policy.pdf
│       └── terms-conditions.pdf
│
└── .gitignore                 # Git ignore file
```

---

## 🎨 Easy Customizations

### 1. **Change Brand Colors**

In `index.html`, find the `:root` CSS section (around line 20):

```css
:root {
    --color-burgundy: #800000;    /* Main burgundy - change here */
    --color-gold: #D4AF37;        /* Accent gold - change here */
    --color-parchment: #FDF5E6;   /* Light background - change here */
    --color-dark: #1a1a1a;        /* Dark text - change here */
}
```

**Try these color combinations:**

**Option 1: Navy & Gold (Professional)**
```css
--color-burgundy: #001F3F;        /* Navy Blue */
--color-gold: #D4AF37;            /* Keep gold */
--color-parchment: #F8F9FA;       /* Light gray */
```

**Option 2: Teal & Rose (Modern)**
```css
--color-burgundy: #008080;        /* Teal */
--color-gold: #E75480;            /* Rose */
--color-parchment: #F0F8F8;       /* Light teal */
```

**Option 3: Purple & Silver (Premium)**
```css
--color-burgundy: #4B0082;        /* Indigo Purple */
--color-gold: #C0C0C0;            /* Silver */
--color-parchment: #F5F0FF;       /* Light purple */
```

---

### 2. **Update Text Content**

#### Hero Section
Find line ~290 and update:
```html
<h1>Career by Design, Not by Chance</h1>
<p class="hero-subheading">
    Your custom headline here...
</p>
```

#### Section Headings
Replace all `<h2>` and `<h3>` tags with your content.

#### Director Names (Line ~680)
```html
<div class="director-name">Shahla Z.S.</div>
<div class="director-title">Founder & Director</div>
```

#### Timeline (Line ~550)
```html
<div class="timeline-month">Months 16-15</div>
<h4>Your phase name</h4>
<p>Your description</p>
```

---

### 3. **Update Contact Information**

Search for these strings and replace:

```html
<!-- Phone -->
+91 8850651192

<!-- Email -->
info@edizonecareers.com

<!-- WhatsApp Link -->
https://wa.me/918850651192

<!-- Address -->
13, Shreeji Pride, Ashoka Marg, Nashik 422011

<!-- Company -->
DCore Systems LLP
LLPIN: ACT-9625
PAN: AAZFD2232J
```

---

### 4. **Add Your Images**

#### Replace Director Photos
Find `<div class="director-image">` (~line 680) and replace:
```html
<!-- FROM THIS: -->
<div class="director-image">
    <i class="fas fa-user-circle"></i>
</div>

<!-- TO THIS: -->
<div class="director-image" style="background: url('assets/images/director-shahla.jpg') center/cover;">
</div>
```

#### Add Hero Background Image
Find `.hero` in CSS and update:
```css
.hero {
    background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%),
                url('assets/images/hero-bg.jpg') center/cover;
    background-blend-mode: overlay;
}
```

#### Add Logo to Navbar
Find navbar-brand (~line ~230) and replace:
```html
<!-- FROM -->
<i class="fas fa-graduation-cap"></i> Edizone Careers

<!-- TO -->
<img src="assets/images/logo.png" height="40"> Edizone Careers
```

---

### 5. **Add Video Testimonials**

Find video placeholder (~line ~700):

```html
<!-- FROM THIS: -->
<div class="video-testimonial">
    <div class="video-placeholder">
        <i class="fas fa-play-circle"></i>
    </div>
</div>

<!-- TO THIS (YouTube): -->
<iframe 
    width="100%" 
    height="315" 
    src="https://www.youtube.com/embed/VIDEO_ID" 
    frameborder="0" 
    allowfullscreen>
</iframe>

<!-- OR THIS (Custom video): -->
<video width="100%" controls style="border-radius: 12px;">
    <source src="assets/videos/testimonial-1.mp4" type="video/mp4">
    Your browser does not support the video tag.
</video>
```

---

### 6. **Update Timeline**

Replace with your actual dates:

```html
<!-- EXAMPLE: -->
<div class="timeline-item">
    <div class="timeline-dot"></div>
    <div class="timeline-content">
        <div class="timeline-month">January 2024</div>
        <h4>Your milestone</h4>
        <p>Your description of what happens this month</p>
    </div>
</div>
```

---

### 7. **Add Social Media Links**

Find footer section (~line ~800) and update:

```html
<ul style="display: flex; gap: 15px;">
    <li><a href="https://facebook.com/edizonecareers" target="_blank">
        <i class="fab fa-facebook"></i></a></li>
    <li><a href="https://instagram.com/edizonecareers" target="_blank">
        <i class="fab fa-instagram"></i></a></li>
    <li><a href="https://linkedin.com/company/edizonecareers" target="_blank">
        <i class="fab fa-linkedin"></i></a></li>
    <li><a href="https://youtube.com/@edizonecareers" target="_blank">
        <i class="fab fa-youtube"></i></a></li>
</ul>
```

---

## 📱 Icon Reference (Font Awesome)

The site uses **Font Awesome 6.4** icons. Here are common ones you might want to change:

```html
<!-- Navigation & General -->
<i class="fas fa-graduation-cap"></i>      <!-- Logo -->
<i class="fas fa-calendar-alt"></i>        <!-- Calendar/Book -->
<i class="fas fa-globe"></i>               <!-- Globe -->
<i class="fas fa-phone"></i>               <!-- Phone -->
<i class="fas fa-envelope"></i>            <!-- Email -->
<i class="fas fa-map-marker-alt"></i>      <!-- Address -->
<i class="fab fa-whatsapp"></i>            <!-- WhatsApp -->

<!-- GPATHS Framework -->
<i class="fas fa-lightbulb"></i>           <!-- Aptitudes -->
<i class="fas fa-compass"></i>             <!-- Interests -->
<i class="fas fa-brain"></i>               <!-- Personality -->
<i class="fas fa-book"></i>                <!-- Learning -->
<i class="fas fa-rocket"></i>              <!-- Career -->

<!-- Services -->
<i class="fas fa-globe-americas"></i>      <!-- Countries -->
<i class="fas fa-university"></i>          <!-- University -->
<i class="fas fa-book-open"></i>           <!-- Education -->
<i class="fas fa-dollar-sign"></i>         <!-- Financial -->
<i class="fas fa-passport"></i>            <!-- Visa -->
<i class="fas fa-handshake"></i>           <!-- Partnership -->
<i class="fas fa-star"></i>                <!-- Network -->
<i class="fas fa-briefcase"></i>           <!-- Jobs -->
<i class="fas fa-chart-line"></i>          <!-- Growth -->
<i class="fas fa-laptop"></i>              <!-- Virtual -->
<i class="fas fa-calendar-check"></i>      <!-- Timeline -->
<i class="fas fa-shield-alt"></i>          <!-- Shield/Safety -->
```

Browse more: https://fontawesome.com/icons

---

## 🔧 Advanced Customizations

### Add Google Analytics

Add this in `<head>` section:

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

**Get your G-ID from**: https://analytics.google.com

### Add Google Search Console

Add to `<head>`:

```html
<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
```

**Get verification code from**: https://search.google.com/search-console

### Add Meta Descriptions

Update in `<head>`:

```html
<meta name="description" content="Your custom description (160 chars)">
<meta name="keywords" content="keyword1, keyword2, keyword3">
<meta property="og:title" content="Page Title">
<meta property="og:description" content="Description">
<meta property="og:image" content="assets/images/og-image.jpg">
```

---

## 🎯 SEO Optimization Checklist

- [ ] Update page title to include keywords
- [ ] Write compelling meta description (155-160 chars)
- [ ] Add H1 tags (one per page)
- [ ] Use descriptive alt text for images
- [ ] Add internal links between pages
- [ ] Create sitemap.xml
- [ ] Add robots.txt
- [ ] Ensure mobile responsiveness
- [ ] Test with Google PageSpeed
- [ ] Submit to Google Search Console

---

## 📊 Common Customization Points

| Content | File | Line | How to Find |
|---------|------|------|------------|
| Hero Headline | index.html | ~290 | "Career by Design" |
| Hero Subheading | index.html | ~293 | "Led by experts..." |
| Director #1 Name | index.html | ~685 | "Shahla Z.S." |
| Director #2 Name | index.html | ~705 | "Junaid K." |
| Timeline Phase 1 | index.html | ~560 | "Months 16-15" |
| Phone Number | index.html | Multiple | "+91 8850651192" |
| Email | index.html | Multiple | "info@edizonecareers.com" |
| Address | index.html | Multiple | "13, Shreeji Pride..." |

---

## 🎨 Ready-Made Color Schemes

### Professional Palette
```css
--color-burgundy: #1e3a8a;     /* Deep blue */
--color-gold: #f59e0b;         /* Amber */
--color-parchment: #f3f4f6;    /* Light gray */
```

### Green Eco Theme
```css
--color-burgundy: #065f46;     /* Deep green */
--color-gold: #10b981;         /* Bright green */
--color-parchment: #f0fdf4;    /* Light green */
```

### Tech Startup Theme
```css
--color-burgundy: #1f2937;     /* Dark gray */
--color-gold: #3b82f6;         /* Blue */
--color-parchment: #f9fafb;    /* Off white */
```

---

## 💡 Tips & Tricks

1. **Test on mobile** - Always check responsive layout
2. **Compress images** - Use tinypng.com (faster loading)
3. **Use placeholders** - While waiting for real content
4. **Test links** - Verify all CTAs before launch
5. **Browser test** - Check Chrome, Firefox, Safari
6. **Lighthouse audit** - Aim for 85+ score
7. **Keep backups** - Save versions before major changes
8. **Version control** - Use Git to track changes

---

## 🚀 Next Steps

1. ✅ Customize text (30 min)
2. ✅ Add your images (30 min)
3. ✅ Update contact info (5 min)
4. ✅ Test locally (10 min)
5. ✅ Deploy to Netlify (5 min)
6. ✅ Connect domain (24 hr)
7. ✅ Add testimonial videos (1-2 hrs)
8. ✅ Set up analytics (15 min)

**Total time to launch: 3-4 hours**

---

## 📞 Help & Support

- **Question about code?** Check the README.md
- **Need deployment help?** See DEPLOYMENT.md
- **Have an idea?** Edit the HTML files directly
- **Need a backup?** Keep a copy of original files

---

**Last Updated**: March 2026 | **Version**: 1.0

Happy customizing! 🎉
