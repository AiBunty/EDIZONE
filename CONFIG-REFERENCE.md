# ⚙️ Edizone Careers - Configuration & Customization Reference

## 🎨 Color Scheme Variables

Located in `<style>` section (Lines 16-22 of index-anti-gravity.html)

```css
:root {
    --color-burgundy: #800000;      /* Primary: Headlines, buttons, borders */
    --color-gold: #D4AF37;          /* Accent: Icons, highlights, badges */
    --color-parchment: #FDF5E6;     /* Light bg: Service sections */
    --color-dark: #0a0a0a;          /* Darkest: Body text on light, hero */
}
```

### **Quick Color Palette Options:**

**Option A: Professional Navy**
```css
--color-burgundy: #1a3a52;  /* Deep Navy */
--color-gold: #4a7c9e;      /* Steel Blue Accent */
--color-parchment: #f0f4f8; /* Light Blue */
```

**Option B: Modern Green**
```css
--color-burgundy: #2d5016;  /* Forest Green */
--color-gold: #7cb342;      /* Lighter Green */
--color-parchment: #f1f8e9; /* Pale Green */
```

**Option C: Corporate Gray**
```css
--color-burgundy: #424242;  /* Charcoal */
--color-gold: #fbc02d;      /* Vibrant Yellow */
--color-parchment: #fafafa; /* Off-White */
```

---

## 🎬 Animation Configuration

### **1. Hero Card Floating Speed**

```css
.anti-gravity-card {
    animation: float 8s cubic-bezier(0.4, 0.0, 0.2, 1) infinite;
    /* Change 8s to: 6s (fast), 10s (slow), 12s (very smooth) */
}
```

### **2. Glow Pulse Animation**

```css
.glow-bg-1 {
    animation: glow-pulse 8s ease-in-out infinite;
    /* Options: 6s (quick), 10s (gentle), 15s (very subtle) */
}

.glow-bg-2 {
    animation: glow-pulse 10s ease-in-out infinite 1s;
    /* The "1s" is the delay before starting */
}
```

### **3. Scroll Parallax Speed**

```javascript
gsap.to(element, {
    scrollTrigger: {
        scrub: 1,  /* Change values: */
                   /* 0 = instant (no smoothing) */
                   /* 0.5 = fast scroll sync */
                   /* 1 = recommended (smooth) */
                   /* 2 = slow (very trailing) */
    }
});
```

### **4. Section Entrance Animations**

```css
.bento-item {
    animation: fadeInUp 0.6s ease-out both;
    /* Change 0.6s to: */
    /* 0.3s = sudden entrance */
    /* 0.6s = recommended default */
    /* 1s = slow, dramatic entrance */
}
```

### **5. Magnetic Button Response**

```javascript
btn.addEventListener('mousemove', (e) => {
    const multiplier = 0.3;  /* Change to: */
                             /* 0.1 = subtle movement */
                             /* 0.3 = recommended balance */
                             /* 0.5 = strong magnetic pull */
                             /* 0.1 * (x/y) = movement factor */
    btn.style.transform = `translate(${x * multiplier}px, ${y * multiplier}px)`;
});
```

---

## 📐 Responsive Breakpoints

Edit in media queries (Lines 550-600):

```css
@media (max-width: 1024px) {
    /* Tablet view */
    .hero-content {
        grid-template-columns: 1fr;  /* Single column */
    }
}

@media (max-width: 768px) {
    /* Mobile view */
    .btn-magnetic { 
        width: 100%;  /* Full width buttons */
    }
}
```

### **Custom Breakpoints:**

Add your own:
```css
/* iPad Landscape */
@media (max-width: 1200px) {
    /* iPad-specific styles */
}

/* Large Screens */
@media (min-width: 1440px) {
    h1 { font-size: 5rem; }  /* Larger text */
}
```

---

## 🔤 Typography Settings

### **Font Families**

Currently loaded from Google Fonts (Line 13):
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Source+Sans+Pro:wght@400;600;700&display=swap">
```

**To change fonts:**

1. Visit [Google Fonts](https://fonts.google.com)
2. Select fonts and copy link
3. Replace line 13 with new link
4. Update CSS font-family:

```css
h1, h2 {
    font-family: 'Your Font Name', serif;
}

body {
    font-family: 'Your Font Name', sans-serif;
}
```

### **Font Sizes**

| Element | Size | Where |
|---------|------|-------|
| h1 | 3.5rem | Line 33 |
| h2 | 2.5rem | Line 40 |
| Hero h1 | 4rem | Line 361 |
| Subheading | 1.3rem | Line 370 |
| Section text | 1.2rem | Line 538 |

**To resize:** Change `rem` values (1rem = 16px base)

---

## 📍 Contact Information

Update all instances:

```html
<!-- WhatsApp Link (appears in 3 places) -->
<a href="https://wa.me/918850651192">
    <!-- Change 918850651192 to your number -->
</a>

<!-- Email Links (appears in 2 places) -->
<a href="mailto:info@edizonecareers.com">
    <!-- Change to your email -->
</a>

<!-- Address (footer) -->
<li><i class="fas fa-map-marker-alt"></i> 
    13, Shreeji Pride, Nashik 422011
    <!-- Update address -->
</li>

<!-- Phone (footer) -->
<li><i class="fas fa-phone"></i> 
    <a href="tel:+918850651192">+91 8850651192</a>
    <!-- Update phone -->
</li>
```

---

## 🏢 DCore Systems Verification

**Trust Dock Configuration** (Lines 630-650):

```html
<div class="trust-dock">
    <div class="trust-dock-header">
        <i class="fas fa-shield-alt"></i> Verified Partner
    </div>
    <div class="trust-dock-item">
        <span class="trust-dock-label">Organization:</span>
        <span class="trust-dock-value">DCore Systems</span>
        <!-- Change organization name -->
    </div>
    <div class="trust-dock-item">
        <span class="trust-dock-label">LLPIN:</span>
        <span class="trust-dock-value">ACT-9625</span>
        <!-- Update LLPIN -->
    </div>
</div>
```

**Also update in footer:**
- Line ~1385: "Powered by DCore Systems LLP"
- Line ~1386: "LLPIN: ACT-9625 | PAN: AAZFD2232J"

---

## 🎯 Service Boxes (12-Grid Layout)

The service grid (Lines 475-555) uses CSS Grid:

```html
<div class="bento-grid">
    <!-- Each service-box auto-fills grid -->
    <div class="service-box">
        <div class="service-icon">
            <i class="fas fa-globe-americas"></i>
        </div>
        <h4>Country & Course Selection</h4>
        <p>Find the perfect destination matching your goals</p>
    </div>
    <!-- Repeat 12 times -->
</div>
```

**To customize:**
1. Change icon: Replace `fas fa-globe-americas` with [FontAwesome icon](https://fontawesome.com/icons)
2. Change title: Edit `<h4>` text
3. Change description: Edit `<p>` text
4. Add/remove boxes: Duplicate or delete entire `<div class="service-box">` block

---

## 📹 Video Testimonials

Current setup uses video placeholders:

```html
<div class="video-testimonial">
    <div class="video-play-icon">
        <i class="fas fa-play-circle"></i>
    </div>
</div>
```

**To add real videos:**

### **Option 1: YouTube Embed**
```html
<div class="video-testimonial">
    <iframe width="100%" height="100%" 
        src="https://www.youtube.com/embed/VIDEO_ID" 
        frameborder="0" allow="autoplay; encrypted-media" 
        allowfullscreen>
    </iframe>
</div>
```

### **Option 2: Self-hosted Video**
```html
<div class="video-testimonial">
    <video controls width="100%" height="100%">
        <source src="/path/to/testimonial.mp4" type="video/mp4">
    </video>
</div>
```

### **Option 3: Video Thumbnail + Modal**
```html
<div class="video-testimonial" onclick="openModal('video-id')">
    <img src="thumbnail.jpg" style="width: 100%; height: 100%; object-fit: cover;">
    <div class="video-play-icon" style="position: absolute; top: 50%; left: 50%;">
        <i class="fas fa-play-circle"></i>
    </div>
</div>
```

---

## 🎨 Section Background Colors

Each section can have custom background:

```html
<section class="section" style="background-color: var(--color-parchment);">
    <!-- Light background -->
</section>

<section class="section" style="background: linear-gradient(135deg, var(--color-burgundy), #600000);">
    <!-- Gradient background -->
</section>
```

### **Predefined options:**

- `background-color: white;` → Clean white
- `background-color: var(--color-parchment);` → Light cream
- `background-color: #f5f5f5;` → Light gray
- `background: linear-gradient(135deg, #1a1a1a, #333333);` → Dark gradient
- `background: url('pattern.jpg');` → Image background

---

## 🔗 Navigation Links

Update hero CTA section (Lines 320-340):

```html
<a href="#gpaths" class="btn-magnetic btn-secondary">
    <i class="fas fa-globe"></i> Explore Study Abroad
</a>
```

Change `#gpaths` to any section ID:
- `#gpaths` → GPaths section
- `#reviews` → Reviews section
- `#contact` → Footer contact
- Add custom IDs to any section: `<section id="custom-section">`

---

## 📊 Third-Party Services to Integrate

### **1. WhatsApp Business API**
```javascript
// Current: Simple link
// Future: Add chatbot
const whatsappAPI = "https://api.whatsapp.com/send?phone=918850651192&text=...";
```

### **2. Email Service (EmailJS)**
```javascript
emailjs.init("YOUR_PUBLIC_KEY");
document.querySelector('form').addEventListener('submit', (e) => {
    emailjs.sendForm('service_id', 'template_id', e.target);
});
```

### **3. Payment Gateway (Razorpay)**
```html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
<button onclick="startPayment()">Book Session</button>
```

### **4. Calendar Booking (Calendly)**
```html
<iframe src="https://calendly.com/your-url" width="100%" height="700"></iframe>
```

---

## 🔐 Security Best Practices

### **1. Add Content Security Policy**
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline' cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline';">
```

### **2. Hide DCore verification in production (optional)**
```html
<!-- Comment out trust-dock for public releases -->
<!-- 
<div class="trust-dock">
    ...
</div>
-->
```

### **3. Add HTTPS headers (server-side)**
```
Strict-Transport-Security: max-age=31536000
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
```

---

## 📋 Quick Customization Checklist

- [ ] Update all contact numbers (WhatsApp, phone)
- [ ] Update email address (info@edizonecareers.com)
- [ ] Update address (13, Shreeji Pride, Nashik)
- [ ] Change color scheme if desired
- [ ] Update founder/team names and bio
- [ ] Add real video testimonials
- [ ] Update service descriptions
- [ ] Customize animations speed
- [ ] Add Google Analytics ID
- [ ] Test on mobile devices
- [ ] Deploy to live server
- [ ] Submit to Google Search Console
- [ ] Set up email form backend

---

## 🧪 Testing Checklist

**Desktop (1920px+):**
- [ ] All animations smooth
- [ ] Text readable
- [ ] Hover effects work
- [ ] Buttons responsive

**Tablet (768px-1024px):**
- [ ] Layout switches to responsive
- [ ] Touch targets are big enough
- [ ] No horizontal scroll

**Mobile (< 768px):**
- [ ] Single column layout
- [ ] Readable font sizes
- [ ] Touch-friendly buttons
- [ ] Fast load time

**Browser Compatibility:**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

---

## 📞 DCore Systems Support

**For technical assistance:**
- LLPIN: ACT-9625
- PAN: AAZFD2232J
- Email: info@dcore-systems.com (placeholder)

**Common Issues & Solutions:**

| Issue | Solution |
|-------|----------|
| Animations lag | Reduce animation complexity or disable on mobile |
| Buttons not working | Check href attributes and console for JS errors |
| Colors not changing | Clear browser cache (Ctrl+Shift+Delete) |
| Videos not loading | Verify video URLs and CORS headers |
| Mobile viewed incorrectly | Check viewport meta tag (Line 7) |

---

## 📈 Performance Metrics Target

- **Page Load:** < 2 seconds
- **First Contentful Paint:** < 1.5 seconds
- **Largest Contentful Paint:** < 2.5 seconds
- **Cumulative Layout Shift:** < 0.1
- **Lighthouse Score:** > 90

**Check performance:**
1. Go to [PageSpeed Insights](https://pagespeed.web.dev)
2. Enter your URL
3. View recommendations

---

**Last Updated:** March 2026
**Version:** 1.0 Configuration Reference
