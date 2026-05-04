# 🧱 TileGallery

A premium tile gallery website to discover and explore beautiful tiles from artisans around the world.

## 🌐 Live URL

> Deploy to Vercel and add your live URL here: `https://tiles-gallery.vercel.app`

---

## 🎯 Project Purpose

TileGallery is a curated platform showcasing premium tiles from global artisans. Users can browse, search, and explore detailed tile information — with secure authentication and personalized profiles.

---

## ✨ Key Features

- 🏠 **Home Page** — Hero banner, animated marquee, and featured tiles
- 🖼️ **Tile Gallery** — Search and filter tiles by name and category
- 🔍 **Tile Details** — High-res preview with full specs (private route)
- 🔐 **Authentication** — Email/password + Google OAuth via BetterAuth
- 👤 **User Profile** — View and update name & profile photo
- 📱 **Fully Responsive** — Mobile, tablet, and desktop

---

## 🛠️ Tech Stack & npm Packages

| Package | Purpose |
|---|---|
| `next` | React framework (App Router) |
| `better-auth` | Authentication (MongoDB adapter) |
| `mongoose` / `mongodb` | MongoDB integration |
| `react-hot-toast` | Toast notifications |
| `react-fast-marquee` | Scrolling marquee on home page |
| `swiper` | Tile image slider |
| `animate.css` | CSS animations |
| `daisyui` | UI component library |
| `tailwindcss` | Utility-first CSS |
| `json-server` | Local REST API for tile data |

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/tiles-gallery.git
cd tiles-gallery
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.example .env.local
# Fill in your MongoDB URI, Better Auth secret, and Google OAuth credentials
```

### 4. Run JSON server (in a separate terminal)
```bash
npm run json-server
```

### 5. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Environment Variables

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## 🚦 Route Permissions

| Route | Access |
|---|---|
| `/` | Public |
| `/all-tiles` | Public |
| `/login` | Public |
| `/register` | Public |
| `/tile/[id]` | **Private** (login required) |
| `/my-profile` | **Private** (login required) |
| `/update-profile` | **Private** (login required) |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.js              # Home
│   ├── all-tiles/           # Gallery
│   ├── tile/[id]/           # Tile detail (private)
│   ├── login/               # Login
│   ├── register/            # Register
│   ├── my-profile/          # Profile (private)
│   ├── update-profile/      # Update info (private)
│   └── api/auth/[...all]/   # BetterAuth handler
├── components/
│   ├── Navbar.js
│   ├── Footer.js
│   ├── TileCard.js
│   └── LoadingSpinner.js
└── lib/
    ├── auth.js              # BetterAuth server config
    └── auth-client.js       # BetterAuth client config
```
 
