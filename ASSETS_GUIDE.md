# Assets Folder Structure Template

This guide helps you organize your images, videos, and documents for the Edizone Careers website.

## Create These Folders

```
EDIZONE/
├── assets/
│   ├── images/
│   │   ├── hero/
│   │   │   ├── hero-bg.jpg          (1920x1080, optimized)
│   │   │   ├── hero-student.jpg     (For overlay)
│   │   │   └── hero-parent.jpg      (Alternative)
│   │   │
│   │   ├── directors/
│   │   │   ├── shahla.jpg           (500x600px)
│   │   │   ├── junaid.jpg           (500x600px)
│   │   │   └── placeholder.jpg       (For testing)
│   │   │
│   │   ├── logos/
│   │   │   ├── dcore-logo.png       (300x100px)
│   │   │   ├── edizone-logo.png     (300x100px)
│   │   │   └── favicon.ico           (32x32px)
│   │   │
│   │   ├── icons/
│   │   │   ├── gpaths-aptitudes.svg
│   │   │   ├── gpaths-interests.svg
│   │   │   ├── gpaths-personality.svg
│   │   │   ├── gpaths-learning.svg
│   │   │   └── gpaths-motivators.svg
│   │   │
│   │   └── social/
│   │       ├── og-image.jpg         (For Facebook sharing)
│   │       └── twitter-card.jpg     (For Twitter sharing)
│   │
│   ├── videos/
│   │   ├── hero/
│   │   │   └── bg-video.mp4        (Muted, looping, ~10MB)
│   │   │
│   │   ├── testimonials/
│   │   │   ├── student/
│   │   │   │   ├── testimonial-1.mp4
│   │   │   │   ├── testimonial-2.mp4
│   │   │   │   └── testimonial-3.mp4
│   │   │   │
│   │   │   └── parent/
│   │   │       ├── testimonial-1.mp4
│   │   │       ├── testimonial-2.mp4
│   │   │       └── testimonial-3.mp4
│   │   │
│   │   └── guides/
│   │       └── visa-guide.mp4       (Optional, for future)
│   │
│   ├── documents/
│   │   ├── privacy-policy.pdf
│   │   ├── terms-conditions.pdf
│   │   ├── gst-certificate.pdf      (Optional)
│   │   └── pan-certificate.pdf      (Optional)
│   │
│   └── fonts/
│       ├── playfair-display.woff2   (Custom fonts if needed)
│       └── source-sans-pro.woff2
```

---

## Image Optimization Guidelines

### Hero Background Image
- **Size**: 1920x1080 pixels minimum
- **Format**: JPG or WebP
- **File Size**: < 500KB (use tinypng.com)
- **Content**: Student success/counseling session
- **Link in HTML**: Replace `assets/images/hero/hero-bg.jpg`

### Director Photos
- **Size**: 500x600 pixels
- **Format**: JPG or WebP
- **File Size**: < 100KB per image
- **Content**: Professional headshots or casual professional
- **Link in HTML**: 
  ```html
  style="background: url('assets/images/directors/shahla.jpg') center/cover;"
  ```

### Logo Images
- **Size**: 300x100 pixels or 200x200 for square
- **Format**: PNG (for transparency)
- **File Size**: < 50KB
- **Content**: Company logo, possibly with transparent background
- **Link in HTML**: 
  ```html
  <img src="assets/images/logos/edizone-logo.png" height="40">
  ```

### Social Media Images (OG Tags)
- **Size**: 1200x630 pixels
- **Format**: JPG
- **File Size**: < 200KB
- **Use**: Facebook, LinkedIn sharing
- **Link in HTML**:
  ```html
  <meta property="og:image" content="assets/images/social/og-image.jpg">
  ```

---

## Video Optimization Guidelines

### Hero Background Video
- **Resolution**: 1080p or 720p
- **Format**: MP4 (H.264 codec)
- **Duration**: 15-30 seconds (looping)
- **Audio**: Muted (no sound)
- **File Size**: 5-15MB
- **Frame Rate**: 24-30 fps
- **Aspect Ratio**: 16:9 or 4:3

### Testimonial Videos (YouTube Embedded)
- **Platform**: Upload to YouTube (free)
- **Resolution**: 1080p minimum
- **Duration**: 30 seconds - 2 minutes
- **Audio**: Good quality microphone
- **Subtitles**: Recommended for captions
- **Privacy**: Public or Unlisted
- **Link in HTML**:
  ```html
  <iframe width="100%" height="315" 
    src="https://www.youtube.com/embed/VIDEO_ID" 
    frameborder="0" allowfullscreen></iframe>
  ```

### How to Record Testimonials:
1. **Use smartphone camera** (iPhone/Android)
2. **Good lighting** - Face a window or use ring light
3. **Clear audio** - Quiet room, close to microphone
4. **Steady shot** - Use phone stand or tripod
5. **15-45 seconds** - Keep it concise
6. **Upload to YouTube** then embed

---

## Folder Structure Code

If you want to create these folders via terminal:

### Windows (PowerShell):
```powershell
mkdir assets/images/hero
mkdir assets/images/directors
mkdir assets/images/logos
mkdir assets/images/icons
mkdir assets/images/social
mkdir assets/videos/hero
mkdir assets/videos/testimonials/student
mkdir assets/videos/testimonials/parent
mkdir assets/videos/guides
mkdir assets/documents
mkdir assets/fonts
```

### Mac/Linux:
```bash
mkdir -p assets/{images/{hero,directors,logos,icons,social},videos/{hero,testimonials/{student,parent},guides},documents,fonts}
```

---

## Image Hosting Alternatives

If you don't want to store files locally:

### CDN Services (Recommended):
- **Cloudinary**: https://cloudinary.com (FREE tier)
- **imgix**: https://www.imgix.com
- **AWS S3**: https://aws.amazon.com/s3/
- **Firebase Storage**: https://firebase.google.com/

### Simple Usage:
```html
<!-- Instead of local file: -->
<img src="assets/images/director.jpg">

<!-- Use hosted image: -->
<img src="https://res.cloudinary.com/your-account/image/upload/v123/director.jpg">
```

---

## Image Compression Tools

Before uploading, compress your images:

- **TinyPNG/TinyJPG**: https://tinypng.com (AWESOME)
- **Imagify**: https://imagify.io
- **Compressor.io**: https://compressor.io
- **ImageOptim**: https://imageoptim.com (Mac)
- **FileOptimizer**: https://nikkhokkho.sourceforge.io/ (Windows)

### TinyPNG Savings Example:
- Original: 2.5MB → Compressed: 450KB (82% reduction!)
- Quality: Visually identical, much faster loading

---

## File Naming Conventions

Use clear, descriptive names (no spaces):

```
✅ GOOD:
- hero-bg.jpg
- director-shahla.jpg
- testimonial-student-1.mp4
- gpaths-aptitudes.svg
- og-image-1200x630.jpg

❌ AVOID:
- image1.jpg
- photo new.jpg
- myimage-final-v2-REAL.jpg
- director (1).jpg
- testimonial copy.mp4
```

---

## Where to Get Free Stock Images/Videos

If you need placeholder content:

### Free Stock Images:
- **Unsplash**: https://unsplash.com (Education, students)
- **Pexels**: https://pexels.com
- **Pixabay**: https://pixabay.com
- **Pixels**: https://pixels.com
- **Freepik**: https://freepik.com

### Free Stock Videos:
- **Pexels Videos**: https://www.pexels.com/videos/
- **Pixabay Videos**: https://pixabay.com/videos/
- **YouTube**: Royalty-free music channels

### Education-Specific:
- **Unsplash** (search "education", "students", "graduation")
- **Pexels** (search "office", "teamwork", "success")
- **Freepik** (search "career", "learning", "counseling")

---

## Using Images in HTML

### Updating Hero Background:

```html
<!-- OLD (CSS/placeholder): -->
background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%);

<!-- NEW (with image): -->
background: linear-gradient(135deg, rgba(26,26,26,0.6), rgba(51,51,51,0.6)),
            url('assets/images/hero/hero-bg.jpg') center/cover;
```

### Updating Director Photos:

```html
<!-- OLD (icon placeholder): -->
<div class="director-image">
    <i class="fas fa-user-circle"></i>
</div>

<!-- NEW (with photo): -->
<div class="director-image" 
     style="background: url('assets/images/directors/shahla.jpg') center/cover;">
</div>
```

### Embedding Videos:

```html
<!-- YouTube (EASY): -->
<iframe 
  width="100%" 
  height="315" 
  src="https://www.youtube.com/embed/VIDEO_ID"
  frameborder="0" 
  allowfullscreen>
</iframe>

<!-- Self-hosted MP4 (LOCAL): -->
<video width="100%" controls style="border-radius: 12px;">
  <source src="assets/videos/testimonials/student/testimonial-1.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

<!-- High-quality embed (RECOMMENDED): -->
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
  <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
          src="https://www.youtube.com/embed/VIDEO_ID" 
          frameborder="0" 
          allowfullscreen>
  </iframe>
</div>
```

---

## Performance Tips

### For Faster Loading:

1. **Compress all images** (use TinyPNG)
2. **Use WebP format** when possible (newer format, smaller file size)
3. **Host images on CDN** (Cloudinary, imgix)
4. **Use lazy loading** (images load as user scrolls)
5. **Optimize video** (use MP4, H.264 codec)
6. **Choose right dimensions** (don't upload 4K photo for 300px display)

### Before/After Optimization:
```
BEFORE (loading slow):
- hero.jpg: 2.5MB
- director1.jpg: 800KB
- director2.jpg: 750KB
- Total: 4.05MB (5-10 seconds to load)

AFTER (lightning fast):
- hero.jpg: 350KB (TinyPNG)
- director1.jpg: 85KB (WebP)
- director2.jpg: 78KB (WebP)
- Total: 513KB (< 1 second)
```

---

## Testing Your Assets

### Before Uploading:

1. **Image dimensions** - Correct size for the layout
2. **File format** - JPG for photos, PNG for logos
3. **File size** - Compressed < target size
4. **Quality** - Looks good at actual size
5. **Aspect ratio** - Matches the HTML layout

### Tools:

- **FileSize Checker**: https://www.filesize.io
- **Image Dimension Tool**: https://www.imagesize.org
- **Lighthouse Audit**: https://pagespeed.web.dev

---

## Folder Structure Upload

When uploading to Netlify:

1. **Create `assets` folder** locally
2. **Add all subfolders** and image files
3. **Drag entire project to Netlify**
4. **Done!** Files automatically uploaded

---

## Quick Reference

| Asset Type | Format | Size | Location |
|-----------|--------|------|----------|
| Hero BG | JPG | 1920x1080 | assets/images/hero/ |
| Director | JPG | 500x600 | assets/images/directors/ |
| Logo | PNG | 300x100 | assets/images/logos/ |
| OG Share | JPG | 1200x630 | assets/images/social/ |
| Icon | SVG | 256x256 | assets/images/icons/ |
| Video | MP4 | 1080p | assets/videos/ |
| Document | PDF | - | assets/documents/ |

---

**Ready to get started?**

1. Create the folder structure above
2. Compress your images with TinyPNG
3. Upload to correct folders
4. Link in HTML files
5. Test and deploy!

For any questions, see **CUSTOMIZATION.md** or **README.md**

---

**Document Version**: 1.0 | **Last Updated**: March 2026
