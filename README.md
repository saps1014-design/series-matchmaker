# 🎬 Series Finder

A modern, intelligent TV series recommendation app that helps you discover your next favorite show based on your streaming platforms, favorite genres, and current mood.

**🌐 Live Demo:** [https://series-matchmaker.lovable.app](https://series-matchmaker.lovable.app)

---

## 📖 Project Overview

**Series Finder** is a clean, responsive web application designed to make discovering TV shows effortless. Instead of endlessly scrolling through streaming catalogs, users can filter by platform, genre, and mood — or hit **Surprise Me** to get an instant recommendation. Sign in to save shows to your personal Watchlist and track your viewing progress.

---

## ✨ Main Features

- 🎯 **Smart Filtering** — Filter by platform, genre, mood, search query, and minimum rating
- 🎲 **Surprise Me** — Get a random recommendation matching your filters
- 😄 **Mood-Based Recommendations** — Funny, Relaxing, Exciting, Suspenseful, Mind-blowing
- 🔥 **Trending Now** — Curated popular shows
- ⭐ **Quick Picks Tonight** — Highlighted top-rated suggestions
- ❤️ **Favorites** — Save shows locally (no account required)
- 📺 **Watchlist** — Cloud-synced watchlist with status tracking (*Plan to Watch*, *Watching*, *Completed*)
- 🌗 **Dark / Light Mode** — Persisted across sessions
- 💡 **Intelligent Recommendation Text** — Explains *why* each show is suggested
- 🌟 **Visual star ratings, modern cards, smooth animations**

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 5 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v3 + semantic design tokens |
| UI Components | shadcn/ui + Radix UI |
| Icons | lucide-react |
| Backend | Lovable Cloud (Supabase) |
| Database | PostgreSQL with Row-Level Security |
| Auth | Supabase Auth (email + password) |
| Routing | React Router |
| State | React hooks + localStorage |

---

## ☁️ Backend Integration Summary

The app uses **Lovable Cloud** (powered by Supabase) for backend services.

### Database Schema — `watchlist` table
| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `user_id` | uuid | FK to authenticated user |
| `series_title` | text | Series name |
| `platform` | text | Streaming platform |
| `genre` | text | Primary genre |
| `mood` | text | Mood category |
| `rating` | numeric | Show rating |
| `description` | text | Short summary |
| `poster_color` | text | Poster gradient/color |
| `watch_status` | text | `Plan to Watch` \| `Watching` \| `Completed` |
| `created_at` | timestamptz | Auto-set on insert |
| `updated_at` | timestamptz | Auto-updated via trigger |

- `UNIQUE(user_id, series_title)` prevents duplicates
- A trigger validates `watch_status` values
- `updated_at` is auto-maintained on update

---

## 🔐 Authentication & CRUD

### Authentication
- Email + password sign-up and sign-in via Supabase Auth
- Sessions persisted automatically in `localStorage`
- Protected actions (Watchlist) require authentication
- Friendly toast messages guide users to sign in

### CRUD Operations on Watchlist
| Operation | Description |
|---|---|
| **Create** | Add a series with default `Plan to Watch` status |
| **Read** | Fetch the signed-in user's watchlist on load |
| **Update** | Change `watch_status` via in-card status pills (optimistic UI) |
| **Delete** | Remove a series from the watchlist |

### Security (Row-Level Security)
All policies use `auth.uid() = user_id`:
- Users can only **SELECT**, **INSERT**, **UPDATE**, and **DELETE** their own watchlist rows.
- Favorites are stored in `localStorage` only (no server data).

---

## 🐙 GitHub Integration

This project is connected to GitHub through Lovable. Every change made in the Lovable editor is automatically committed to the connected repository, and any change pushed to GitHub is reflected in Lovable. This enables a smooth two-way development workflow with your preferred IDE.

---

## 🚀 Local Setup

### Prerequisites
- **Node.js 18+** and **npm** ([install via nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

### 1. Clone the repository
```sh
git clone <YOUR_GIT_URL>
cd series-finder
```

### 2. Install dependencies
```sh
npm install
```

### 3. Configure environment variables
Create a `.env` file at the project root:
```env
VITE_SUPABASE_PROJECT_ID="your-project-id"
VITE_SUPABASE_URL="https://your-project-id.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="your-anon-key"
```
> When working in Lovable, the `.env` file is auto-generated and managed for you.

### 4. Start the dev server
```sh
npm run dev
```
The app runs at **http://localhost:8080**.

---

## 📱 Responsive Design & UX

- **Mobile-first layout** with stacked filters and touch-friendly buttons
- **Responsive cards** that gracefully adapt across breakpoints
- **Smooth hover animations** and transitions
- **Accessible** — `aria-label`, `aria-pressed`, focus-visible rings
- **Skeleton loading states** for perceived performance
- **Persisted preferences** — dark mode and filters survive refreshes
- **Empty states** with friendly messages and a *Surprise Me Instead* fallback
- **Consistent semantic design tokens** across light and dark themes

---

## 🔮 Future Improvements

- 🎬 Real poster images via TMDB API integration
- 🤖 AI-powered personalized recommendations (Lovable AI Gateway)
- 👥 Social features — share watchlists with friends
- 📊 Viewing statistics and progress dashboard
- 🔔 New episode / season notifications
- 🌍 Multi-language support (i18n)
- 📺 Episode-level tracking
- 🔗 OAuth providers (Google, GitHub)
- 📤 Export watchlist to CSV / JSON
- 🧠 "Because you watched..." recommendation engine

---

## 📄 License

MIT — feel free to use, modify, and share.

---

Built with ❤️ using [Lovable](https://lovable.dev).
