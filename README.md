# AfriHeadshot Studio

**AfriHeadshot Studio** is a full-stack, production-ready AI headshot web application tailored specifically for African professionals and executives. Built with Next.js 15, TypeScript, Tailwind CSS, and Replicate AI engine, the app features an authentic System Prompt Injector that enforces dark, deep, rich melanin skin tones, natural afro hair textures, and professional corporate lighting without artificial skin lightening or European feature distortion.

---

## Key Features

### 1. 10-Photo Head & Shoulders Batch Uploader
- Supports uploading **up to 10 original photos** of head and shoulders where facial features are clearly visible.
- Automated client-side quality inspector measuring facial clarity, contrast, lighting, and angle diversity (`Frontal`, `3/4 Left`, `3/4 Right`, `Slight Tilt`).
- Interactive Primary Crop Anchor selector.

### 2. Dual Aspect Ratio Cropper
- Client-side crop controls supporting **`1:1 Square`** (standard profile) and **`4:5 Portrait`** (recommended LinkedIn feed ratio).
- Rule-of-thirds grid overlay with smooth scale and pan controls.

### 3. Selection Matrix (3 Facets & Melanin Target)
- **50 Background Presets** across 6 curated categories:
  - *Modern Executive Suites* (10 options)
  - *Lagos, Nairobi & Johannesburg Corporate Skylines* (10 options)
  - *Tech Hub Glass Workspaces* (8 options)
  - *Neutral Minimal Studio Gradients* (8 options)
  - *Warm Architectural Terracotta & Wood* (7 options)
  - *African Boardrooms & Marble Halls* (7 options)
- **11 Curated African Hairstyles**: Low Fade, 360 Waves, Tapered Afro, Locs/Dreadlocks, Clean Bald/Shaved, Box Braids, Senegalese Twists, Cornrows, Afro Puff, Sleek Low Bun, Bantu Knot transition.
- **6 Formal & Cultural Outfits**: Bespoke Navy/Charcoal Two-piece Suit, Tailored Blazer & Crisp White Shirt, Senator Suit / Agbada Corporate Fusion, Smart Casual Turtleneck & Blazer, Tailored Ankara Accent Blazer, Modern Dashiki Executive.
- **Melanin Undertone Preserving Targets**: Deep Ebony, Rich Warm Cocoa, Golden Bronze, Natural Deep Brown.

### 4. Generation Queue & Results Gallery
- Live pipeline status showing stage-by-stage execution.
- Interactive side-by-side **Before/After split comparison slider**.
- **Prompt & Authenticity Inspector** displaying positive prompt tokens, negative guardrail rules, seed, and reference photo count.
- Ultra high-resolution **2048x2048 PNG/JPG download modal** with automated LinkedIn EXIF metadata simulation.

---

## Authentic System Prompt Injector Engine

Every generation request passes through `lib/prompt-injector.ts`, enforcing strict rules:
- **Positive Guardrails**: Enforces rich melanin complexions, warm skin undertones, natural micro skin pores, authentic African facial anatomy, and 4C hair textures.
- **Negative Guardrails**: Strictly blocks artificial skin lightening, bleached skin, pale skin, whitewashed features, caucasian facial structural warping, plastic airbrushed skin, and 3D renders.

---

## Tech Stack
- **Framework**: Next.js 15 (App Router), TypeScript, React 19
- **Styling**: Tailwind CSS v4, Lucide React icons, Framer Motion
- **AI Backend**: Next.js Serverless Route Handlers + Replicate API (FLUX.1 / PhotoMaker)
- **Export & Canvas**: HTML5 Canvas 2048x2048 rendering engine with Canvas-Confetti

---

## Getting Started

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd scepter-nexus
npm install
```

### 2. Environment Variables Setup
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Configure your credentials:
```env
REPLICATE_API_TOKEN=r8_your_replicate_api_token_here
```
> *Note: If `REPLICATE_API_TOKEN` is not set, the app automatically runs in offline demo mode using dynamic studio synthesis so you can test all features immediately.*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deployment to Vercel

```bash
git add .
git commit -m "Deploy AfriHeadshot Studio"
git push origin main
```
Or deploy directly via the Vercel CLI / Dashboard.
