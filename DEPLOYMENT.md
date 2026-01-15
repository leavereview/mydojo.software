# MyDojo Static Site - Deployment Guide

## Prerequisites

- GitHub account
- Node.js 18+ (for local development)
- Hosting account (Vercel, Netlify, or any static hosting)

---

## Option 1: Vercel (Recommended for simplicity)

### Step 1: Push to GitHub

```bash
# Initialize git repo
cd mydojo-static
git init
git add .
git commit -m "Initial commit - MyDojo static site"

# Create new repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/mydojo-static.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New** → **Project**
3. Import your `mydojo-static` repository
4. Vercel auto-detects Astro - settings are automatic:
   - **Framework Preset**: Astro
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**

### Step 3: Add Custom Domain

1. In project settings, go to **Domains**
2. Add `mydojo.software`
3. Update your domain's DNS:
   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Or use Vercel nameservers for full DNS management

---

## Option 2: Netlify

### Connect to Netlify

1. Go to [netlify.com](https://netlify.com) and sign in
2. Click **Add new site** → **Import an existing project**
3. Connect GitHub and select your repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click **Deploy site**

### Custom Domain on Netlify

1. Go to **Domain settings**
2. Add custom domain `mydojo.software`
3. Follow DNS configuration instructions

---

## Option 3: Any Static Hosting

### Build Locally

```bash
cd mydojo-static
npm install
npm run build
```

### Upload `dist` Folder

Upload the entire `dist` folder contents to any static hosting:
- AWS S3 + CloudFront
- DigitalOcean Spaces
- GitHub Pages
- Any web server (Apache, Nginx)

---

## Scheduled Blog Posts

For scheduled/future posts to auto-publish, add a daily rebuild workflow.

### GitHub Actions Daily Rebuild

Create `.github/workflows/scheduled-build.yml`:

```yaml
name: Scheduled Rebuild

on:
  schedule:
    # Run daily at 6am UTC
    - cron: '0 6 * * *'
  workflow_dispatch: # Allow manual trigger

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      # Add your deployment step here based on hosting
```

This triggers a rebuild daily, which will include any posts whose date has passed.

---

## Environment Variables (Optional)

No environment variables required for basic deployment.

For analytics or forms, you may add:
- `PUBLIC_ANALYTICS_ID` - Analytics tracking ID
- `PUBLIC_FORM_ENDPOINT` - Form submission endpoint

---

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test navigation and links
- [ ] Check mobile responsiveness
- [ ] Verify images load
- [ ] Test contact form (if configured)
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Cloudflare Analytics

---

## Updating Content

### Blog Posts

1. Create new `.md` file in `src/content/blog/`
2. Push to GitHub
3. Cloudflare Pages auto-deploys

### Pages

1. Edit `.astro` files in `src/pages/`
2. Push to GitHub
3. Auto-deploys

---

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf node_modules dist .astro
npm install
npm run build
```

### Styles Not Loading

Check that `tailwind.config.mjs` content paths include all your files:

```js
content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}']
```

### Images Not Found

Ensure images are in `public/images/` and referenced with leading slash:
```html
<img src="/images/your-image.jpg" />
```

---

## Support

For issues, contact support@mydojo.software
