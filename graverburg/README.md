# GraverBurg 🔺 — Gen Z Social Space & Feed

A high-performance Gen Z social platform built with **React 19**, **Vite**, and **Tailwind CSS**. Features X/Twitter-style social feed and real-time chat combined with rich Discord/MySpace-style profile rooms.

---

## 🚀 Deploy to Vercel (One-Click Ready)

This repository includes a production-ready `vercel.json` and build pipeline preconfigured for Vercel.

### Option A: Via GitHub (Recommended)
1. Push this project to your GitHub repository.
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Import your **Project GraverBurg** repository.
4. **Configuration**:
   - **Framework Preset**: Vite
   - **Root Directory**: `graverburg` (or leave default `./` as root `package.json` delegates the build)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**!

### Option B: Via Vercel CLI
```bash
cd graverburg
npx vercel
```
For production:
```bash
npx vercel --prod
```

---

## 🛠️ Local Development

```bash
# In the graverburg directory
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Preview
```bash
npm run build
npm run preview
```
