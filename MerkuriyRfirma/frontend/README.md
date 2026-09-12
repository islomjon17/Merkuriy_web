# Merkuriy-R Frontend Client

Modern, highly responsive, production-ready frontend for **"Merkuriy-R Xususiy qurilish firmasi"** built with React, Vite, Tailwind CSS, React Router DOM, Axios, and Lucide React.

---

## 🛠 Tech Stack

* **Framework:** React 18 (Vite 5)
* **Styling:** Tailwind CSS 3 (Deep corporate navy `#0B192C`, architectural slate, safety amber/gold accents `#F59E0B`)
* **Routing:** React Router DOM v6
* **HTTP Client:** Axios with relative media URL resolution for Django media assets
* **Icons:** Lucide React

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Ensure `VITE_API_BASE_URL` points to your active Django backend API:
```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

### 3. Start Development Server
```bash
npm run dev
```
The application will be available at `http://localhost:3000/`.

### 4. Build for Production
```bash
npm run build
```
Production assets will be output to `dist/`.

---

## 📄 Pages & Routes

1. **`Bosh sahifa` (`/`):**
   * **HeroSlider:** 100vh full-bleed visual experience with auto-rotation (5s), pause-on-hover, dot/arrow controls, and project status indicators.
   * **PromoBanner:** Dynamic seasonal promo message with quick consultation button.
   * **StatsSection:** 3-card metrics grid (years experience, completed projects, master craftsmen).
   * **FeaturedProjects:** Showcase of prominent projects with badges and quick links.
   * **Quick Consultation Form:** Inline lead submission box.
   * **Testimonials:** Client reviews, ratings, and company badges.

2. **`Loyihalar` (`/projects`):**
   * **Category Filter Bar:** Dynamic categories loaded from `/api/categories/`.
   * **Active / Ongoing Projects:** Cards with `status === 'in_progress'`.
   * **Completed Portfolio:** Cards with `status === 'completed'`.
   * **ProjectCard:** Thumbnail, category, volume, location, and details link.

3. **`Loyiha Tafsilotlari` (`/projects/:id`):**
   * Full project narrative and technical specs.
   * Interactive photo gallery with click-to-enlarge lightbox modal.
   * **BeforeAfterViewer:** Interactive comparison slider allowing users to drag between Before and After renovation photos.
   * **SatelliteSection:** Satellite map screenshot + external link to Google / Yandex Maps.
   * Bottom project calculation lead form.

4. **`Merkuriy-App` (`/merkuriy-app`):**
   * Modern digital ecosystem landing page.
   * 3 core value proposition cards (Omborlar & Skladlar, Yuk tashuvchilar & Gruzovoy, Kengaytirilgan Qidiruv).
   * Early-access waitlist signup form.

5. **`LeadModal` & `Toast` (Global):**
   * Universal lead consultation modal accessible via the Navbar "Ariza qoldirish" button.
   * Validates name and Uzbekistan telephone number (`+998`).
   * Submits asynchronously to `POST /api/leads/create/` and fires instant success toast notification.
