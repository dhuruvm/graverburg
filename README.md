# GraverBurg 🔺 — Gen Z Social Media Platform

> **"X-style posting and chat, but your profile is your own personal space."**

GraverBurg combines fast microblogging, real-time messaging, and nostalgic high-customization personal spaces (inspired by MySpace, Tumblr, Discord Nitro, and modern Gen Z aesthetics).

Built with **React 19**, **Vite**, and **Tailwind CSS**, designed following the exact **Dribbble Mobile UI Template** and the **Gen Z Social Platform: Profiles + Chat Plan**.

---

## 🚀 Ready to Deploy on Vercel

### Option 1: Vercel Dashboard (GitHub)
1. Push this repository to GitHub.
2. In [Vercel](https://vercel.com/new), select **Import Git Repository**.
3. Set **Root Directory** to `graverburg` (or keep `./` — root `package.json` auto-delegates).
4. Verify:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**.

### Option 2: Deploy via Vercel CLI
```bash
cd graverburg
npx vercel
```
For production:
```bash
npx vercel --prod
```

---

## 🎨 Visual Design System (From UI Template)

- **Charcoal Matte Dark Canvas**: `#0D0E12` & `#16171E` (Zero glassmorphism)
- **Pistachio Lime Accent Card**: `#D6F174` (black text `#111827`)
- **Honey Amber Accent Card**: `#F7C948` (black text `#111827`)
- **Coral Tangerine Accent Card & Sheet**: `#FA5D54` (white text)
- **Soft Cream Off-White Card**: `#ECEEE8` (dark text)
- **Floating Bottom Pill Dock**: Sleek floating navigation dock with glowing active pill.
- **Top Status Capsule**: `● 7h 15m remaining`
- **Circular Share Action**: Translucent round buttons on cards with instant link copying & feedback toasts.

---

## 🚀 Core Features

### 1. Fully Customizable Profiles (The Hook)
- **Theme Customizer**: Instant switching between presets (*Pistachio Lime*, *Honey Amber*, *Coral Tangerine*, *Deep Midnight Slate*, and *Cyber Neon*).
- **Interactive "Now Playing" Widget**: Real-time equalizer soundwave bars, play/pause state, and track details.
- **Top Friends (Top 4)**: MySpace-style friend showcase with friendship status and avatars.
- **Anonymous Q&A (NGL Style)**: Visitors can submit anonymous questions; answers post directly to the user's space.
- **Photo Wall & Aesthetic Moodboard**: 4-block visual grid.
- **Profile Visitor Counter**: `👁️ 1,429 space visits`.
- **Remix Engine**: One-click "Remix Theme" button that copies and adapts theme layouts.
- **📭 Empty Profile State Support**: Dedicated empty state experience showing the GraverBurg triangle mascot avatar, onboarding starter blocks, and a one-click *"Claim Your Aesthetic"* setup button.

### 2. X-Style Communication (Feed)
- **Disappearing Stories Carousel**: Top 24-hour stories with vibrant gradient rings and an interactive full-screen story viewer with auto-advancing progress timers and keyboard controls.
- **Filter Pills**: `All`, `For You`, `Following`, `Explore` (with topic chips `Vibes`, `Anime`, `Gamer`, `Music`, `Thoughts`, `Meme`).
- **Card Stream**: Lime, Yellow, Coral, and Slate cards styled identically to Screen 1 & Screen 2 of the UI template.
- **Interactions**: Animated like counts, repost counters, comment drawers, and bookmarking.

### 3. Composer / Create Post Modal
- Styled identically to **Screen 3 of the UI template**: Full coral red sheet, title hook, short message textarea, category pills, assignee friend tags, attachments, and black rounded CTA (`POST TO GRAVERBURG 🔺`).

### 4. Realtime DMs & Chats
- Direct message list with active indicators and unread badges.
- Voice note message previews with playable waveform.
- Real-time simulated responses with automatic scroll-to-bottom.

### 5. 3-Screen Mobile UI Template Mockup View
- A dedicated showroom displaying the 3 phone frames side-by-side matching the template image:
  1. **Screen 1**: Feed with stacked cards and floating dock
  2. **Screen 2**: Topic / Detail view with segmented cards
  3. **Screen 3**: Coral Red Create Sheet

---

## 🛠️ How to Run Locally

```bash
cd graverburg
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.
