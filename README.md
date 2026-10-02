# Microsoft Learn Student Community - KBTCOE

An immersive, premium "scrollytelling" web experience built for the Microsoft Learn Student Community at KBTCOE. The site acts as a modern, interactive manifesto and portfolio, showcasing community statistics, events, projects, and the core team.

## ✨ Key Features

- **Immersive Scrollytelling:** Uses vertical scrolling to trigger horizontal translations, parallax effects, and typography reveals.
- **Smooth Momentum Scrolling:** Implemented using **Lenis** to provide a buttery-smooth scrolling experience that overrides the browser's default jagged scrolling.
- **Dynamic Custom Cursor:** A global custom cursor that follows the mouse, changing to a massive image projector or a text label depending on context (e.g., hovering over events or projects). Managed globally via React Context API.
- **Advanced Animations:** Powered by **Framer Motion**, utilizing `useScroll` and `useTransform` for complex, high-performance scroll-linked animations.
- **Animated Preloader:** A 0-100% simulated loading screen that builds anticipation and ensures assets are ready before the experience begins.
- **Multi-Page Routing:** Seamless client-side routing handled by **React Router DOM**, complete with animated page transitions and an interactive fullscreen overlay menu.
- **Responsive "Brutalist" Design:** A raw, tech-forward aesthetic heavily relying on massive typography (`vw` scaling), dark mode, and high-contrast elements, optimized for both desktop and mobile views.

## 🏗️ Architecture

The application is structured into a modular component architecture for high maintainability:
- **`src/context/`**: Global state management (e.g., `CursorContext.tsx`).
- **`src/components/`**: Reusable UI elements (`Cursor.tsx`, `Navigation.tsx`, `Preloader.tsx`).
- **`src/pages/`**: Main page views (`Home.tsx`, `GenericPage.tsx`).
- **`src/data/`**: Centralized mock data storage (`mockData.ts`) simulating a CMS backend.

## 🚀 Performance Stats & Optimizations

This application is built with performance in mind, ensuring 60fps animations despite heavy graphical effects:

- **Hardware Acceleration:** All Framer Motion animations use `transform` (`x`, `y`, `scale`) and `opacity` rather than `top`/`left`, pushing rendering to the GPU and preventing layout thrashing.
- **Efficient Scroll Tracking:** Uses `requestAnimationFrame` inherently via Lenis and Framer Motion, preventing scroll-event jank.
- **CSS `mix-blend-mode`:** Utilized heavily for the custom cursor to dynamically invert colors against dark/light backgrounds without needing expensive JS calculations.
- **Responsive Asset Scaling:** Typography and layouts use fluid typography (`clamp()`, `vw`, `vh`) which recalculates natively in CSS, minimizing JavaScript resize listeners.
- **Expected Lighthouse Score Metrics:**
  - **Performance:** 90+ (Due to GPU accelerated transforms and efficient React rendering).
  - **Accessibility:** 95+ (High contrast, semantic HTML).
  - **Best Practices:** 100

## 💻 Tech Stack

- **Framework:** React 18 (Vite) + TypeScript
- **Styling:** Vanilla CSS (`index.css`)
- **Routing:** React Router v6
- **Animations:** Framer Motion
- **Scroll Hijacking:** @studio-freight/lenis

## 🛠️ Getting Started

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run the Development Server:**
   ```bash
   npm run dev
   ```
3. **Open:** Navigate to `http://localhost:5173` in your browser.
