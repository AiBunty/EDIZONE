# 🚀 Edizone Careers - Deployment & Setup Guide

## Quick Start (5 Minutes)

### Step 1: Verify Files
You should have:
- ✅ `index.html` - Main landing page
- ✅ `contact.html` - Contact form page
- ✅ `README.md` - Project documentation
- ✅ `config.json` - Configuration reference
- ✅ `DEPLOYMENT.md` - This file

### Step 2: Test Locally
Open `index.html` directly in your browser:
```
File → Open → Select index.html
```
Website should load instantly with all styles applied.

---

## 🌐 Deployment Options

### Option A: NETLIFY (Recommended - 1 Click Deployment)

**Perfect for**: Quick MVP launch, optimal performance

#### Steps:
1. **Sign up**: https://www.netlify.com (free tier available)
2. **Connect Git**:
   - Push repo to GitHub
   - Go to Netlify → "New site from Git"
   - Select your repository
3. **Deploy**: Click "Deploy" - Done! ✨

**Automatic Benefits**:
- SSL certificate (HTTPS)
- Global CDN
- Auto-deploy on Git push
- Free tier: Enough for growing business

#### Cost: $0/month (free tier) or $19+/month (professional)

---

### Option B: VERCEL (Alternative - Optimized for Frontend)

**Perfect for**: Better performance, especially for images/videos

#### Steps:
1. **Sign up**: https://www.vercel.com (free tier)
2. **Import Project**: 
   - Connect GitHub repo
   - Click "Import"
3. **Deploy**: Auto-deployed instantly

**Benefits**:
- Lightning-fast global CDN
- Image optimization
- Analytics included
- Free SSL

#### Cost: $0/month (free) or $20+/month (pro)

---

### Option C: GITHUB PAGES (Free Hosting)

**Perfect for**: Minimal budget, learning purposes

#### Steps:
1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Edizone Careers website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/edizone-careers.git
   git push -u origin main
   ```

2. **Enable Pages**:
   - Go to repo → Settings → Pages
   - Source: Set to `main` branch
   - Save

3. **Access**: `https://YOUR_USERNAME.github.io/edizone-careers`

**Benefits**:
- Completely free
- Simple setup
- Direct Git integration

**Limitations**:
- Slower than Netlify/Vercel
- No free SSL with custom domain (paid GitHub Pro)

#### Cost: $0/month

---

### Option D: AWS S3 + CloudFront (Scalable)

**Perfect for**: High traffic, professional setup

#### Steps:
1. **Create S3 bucket**:
   - AWS Console → S3
   - Create bucket (e.g., `edizone-careers`)
   - Enable static website hosting
   - Upload files

2. **Configure CloudFront**:
   - Create distribution pointing to S3
   - Enable HTTPS
   - Set domain routing

3. **Point Domain**: Update DNS to CloudFront URL

**Benefits**:
- Extreme scalability
- Best performance
- Custom domain support
- Analytics

#### Cost: $0.50-2/month (depending on traffic)

---

### Option E: Traditional Web Host

**Services**: Godaddy, Bluehost, HostGator, Namecheap, etc.

#### Steps:
1. **Buy hosting plan** (~$2-10/month)
2. **FTP Upload**: 
   - Get FTP credentials
   - Upload HTML files via FileZilla
   - Done!

**Benefits**:
- Simple, traditional approach
- Email hosting often included
- Support available

**Limitations**:
- Slower than modern CDNs
- Manual uploads

#### Cost: $2-10/month

---

## 🎯 Recommended Deployment Path

### For MVP (First Launch):
```
GitHub → Netlify → Custom Domain (edizonecareers.com)
```

### For Production:
```
GitHub → Vercel/Netlify → CloudFlare → Custom Domain
```

---

## 🔗 Custom Domain Setup

### Once deployed, connect your domain:

1. **Buy Domain**:
   - Namecheap, Godaddy, Route53, etc.
   - Cost: ~$10-15/year

2. **Connect to Netlify** (if using Netlify):
   - Go to Site Settings → Domain Management
   - Add custom domain
   - Follow DNS instructions
   - Usually resolves in 24 hours

3. **Verify SSL**:
   - Wait for Let's Encrypt certificate (auto, ~48 hours)
   - Check "HTTPS enabled" in settings

---

## 📋 Pre-Deployment Checklist

Before going live, complete:

- [ ] Replace all placeholder text with real content
- [ ] Update contact details (phone, email)
- [ ] Add real images (hero, directors, etc.)
- [ ] Embed actual video testimonials
- [ ] Test all links (WhatsApp, Email, internal)
- [ ] Test on mobile devices
- [ ] Test form submission (if backend integrated)
- [ ] Check Lighthouse score (target: 85+)
- [ ] Test in multiple browsers
- [ ] Update SEO meta tags
- [ ] Add Google Analytics (optional but recommended)

---

## 🎨 Customization After Deployment

### Easy Edits (No Developer Needed):
1. Edit `index.html` in text editor
2. Update text, links, colors
3. Save file
4. Re-upload to host OR auto-sync via Git

### Content to Update:
- **Director Names** (Line ~680)
- **Timeline Months** (Line ~550)
- **Service Descriptions** (Line ~450)
- **Testimonial Names** (Line ~700)
- **Footer Contact** (Line ~850)

### Colors to Change:
Find in CSS section (Line ~1):
```css
--color-burgundy: #800000;    /* Change primary color */
--color-gold: #D4AF37;         /* Change accent color */
--color-parchment: #FDF5E6;    /* Change light background */
```

---

## 📧 Contact Form Backend Integration

### Option 1: Netlify Forms (Easiest)

Add to contact form:
```html
<form name="contact" method="POST" netlify>
  <!-- Form fields -->
</form>
```

Netlify captures submissions → Email notifications.

### Option 2: EmailJS (No Backend)

1. Sign up: https://www.emailjs.com
2. Add 2 lines of code to contact.html
3. Forms send emails directly

### Option 3: Custom Backend

```javascript
fetch('/api/contact', {
  method: 'POST',
  body: JSON.stringify(formData)
})
.then(res => res.json())
.then(data => sendEmail(data))
```

---

## 🔍 Post-Deployment Checklist

After going live:

- [ ] Test all CTAs work (WhatsApp, Email)
- [ ] Verify mobile responsiveness
- [ ] Check lighthouse performance
- [ ] Set up Google Analytics
- [ ] Submit to Google Search Console
- [ ] Add to Google My Business
- [ ] Set up redirects (404 page)
- [ ] Monitor uptime with UptimeRobot
- [ ] Create sitemap.xml
- [ ] Add robots.txt

---

## 📊 Analytics Setup (Optional)

### Google Analytics 4:
1. Create account: https://analytics.google.com
2. Add tracking code to `<head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### Track These Events:
- Book Consultation clicks
- WhatsApp engagements
- Email inquiries
- Page scrolls
- Form submissions

---

## 🚨 Troubleshooting

### Hero Section not displaying:
- Check browser console (F12)
- Verify Tailwind CDN is loading
- Clear browser cache

### Links not working:
- Verify phone: `+919876543210` format
- Verify email: `email@domain.com` format
- Check WhatsApp URL syntax

### Slow loading:
- Compress images (tinypng.com)
- Minimize CSS/JS
- Enable gzip compression
- Use CDN (included with Netlify)

### Mobile layout broken:
- Test in DevTools (F12 → Responsive)
- Check media queries in CSS
- Verify viewport meta tag

---

## 🆘 Support Resources

### For Netlify:
- Docs: https://docs.netlify.com/
- Support: support@netlify.com

### For Vercel:
- Docs: https://vercel.com/docs
- Support: support@vercel.com

### For GitHub Pages:
- Docs: https://pages.github.com/
- Guides: https://docs.github.com/en/pages

### For AWS:
- Docs: https://docs.aws.amazon.com/s3/
- Support: https://aws.amazon.com/support/

---

## 💡 Next Steps

### Week 1:
- [ ] Deploy to Netlify (5 min)
- [ ] Connect custom domain (24 hr)
- [ ] Add real images
- [ ] Update content

### Week 2:
- [ ] Set up analytics
- [ ] Integrate contact form
- [ ] Test all functionality
- [ ] Share with team for feedback

### Week 3:
- [ ] Launch marketing campaign
- [ ] Monitor analytics
- [ ] Gather feedback
- [ ] Plan Phase 2 features

### Month 2:
- [ ] Add blog section
- [ ] Implement GPaths quiz
- [ ] Expand team page
- [ ] Add testimonial videos

---

## 📞 Questions?

**Edizone Careers Support**:
- Email: info@edizonecareers.com
- Phone: +91 8850651192
- WhatsApp: https://wa.me/918850651192

**Website Hosting Support**:
- Netlify: support@netlify.com
- GitHub: https://github.com/support

---

## ✅ Final Deployment Checklist

```
BEFORE DEPLOYMENT:
☐ All content updated
☐ Links tested (WhatsApp, Email, Internal)
☐ Images optimized & uploaded
☐ Mobile layout verified
☐ Performance tested (Lighthouse 85+)
☐ Browser compatibility verified
☐ SSL certificate ready
☐ Analytics configured
☐ Backup created

AFTER DEPLOYMENT:
☐ Live site verified
☐ Forms tested
☐ Domain verified
☐ SSL working (https://)
☐ Analytics tracking
☐ Monitoring active
☐ Backup verified
☐ Team notified

ONGOING:
☐ Weekly monitoring
☐ Monthly analytics review
☐ Content updates as needed
☐ Performance optimization
☐ Security patches
☐ Analytics insights
```

---

**Deployment Status**: 🟢 READY TO LAUNCH

**Estimated Time to Live**: < 1 hour with Netlify

**Questions?** Reach out anytime! 🚀

---

*Document Version: 1.0 | Last Updated: March 2026*
