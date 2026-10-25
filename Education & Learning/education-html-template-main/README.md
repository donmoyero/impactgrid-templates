# Education HTML Template — EDUKATE

A premium, framework-free education platform template built with semantic HTML, modern CSS custom properties, and vanilla JavaScript. EDUKATE is designed for online learning platforms, bootcamps, and educational institutions seeking a clean, professional web presence.

**Live Template:** Education-themed design system with blue/red accent palette, Poppins + Open Sans typography, scroll-reveal animations, form validation, and responsive layout.

---

## 📸 Screenshot

![Homepage Preview](screenshot.png)

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | [index.html](index.html) | Hero with education imagery, 4 course cards, team grid (4), testimonials, CTA, footer |
| About | [about.html](about.html) | Page header, story section with about.jpg, values, stats, team grid, CTA, footer |
| Courses | [courses.html](courses.html) | Course listing (3 courses with images), enrollment form CTA, footer |
| Contact | [contact.html](contact.html) | Contact form (data-form, .form-ok/.form-err) + info cards, footer |

---

## Design Distinction

| Axis | Implementation |
|------|----------------|
| **Color System** | Blue (#2878EB) / Red (#F14D5D) dual-accent palette with dark (#120F2D) foundations, 8 neutral gray steps, and CSS custom properties for every token |
| **Typography** | Poppins (headings/UI) + Open Sans (body) at 7 fluid `clamp()` scales from `--fs-xs` to `--fs-hero` |
| **Component Library** | BEM-named components: topbar, navbar, hero, page-header, course-card, team-card, testimonial-card, feature-card, stat-box, CTA banner, footer — all with hover states and transitions |
| **Motion** | IntersectionObserver scroll-reveal (`.reveal`), animated counters (`data-count`), progress bar animations, card hover lifts, and back-to-top visibility toggle |
| **Forms** | `data-form` attribute-driven validation with `.form-ok` / `.form-err` border states, live blur validation, and animated submit feedback |
| **Responsive** | Three breakpoints (980px, 720px) with mobile burger menu, grid collapse, and `prefers-reduced-motion` support |

---

## Features

- Zero framework dependencies — pure HTML, CSS, vanilla JS
- CSS custom properties for easy theming and token management
- BEM methodology for scalable, maintainable class naming
- Sticky navbar with scroll shadow detection
- Animated counters with IntersectionObserver (no jQuery)
- Form validation with visual feedback states
- Responsive grid layouts (4-col, 3-col, 2-col, 1-col)
- Back-to-top button with scroll visibility
- Newsletter input in footer
- `data-year` auto-fill for copyright
- `prefers-reduced-motion` media query respected
- Semantic HTML5 with ARIA labels
- Font Awesome 5 icon set (CDN)

---

## File Structure

```
education-html-template/
├── index.html
├── about.html
├── courses.html
├── contact.html
├── README.md
└── assets/
    ├── css/
    │   └── main.css
    ├── js/
    │   └── main.js
    └── img/
        ├── about.jpg
        ├── bg-image.jpg
        ├── courses-1.jpg
        ├── courses-2.jpg
        ├── courses-3.jpg
        ├── courses-4.jpg
        ├── courses-5.jpg
        ├── courses-6.jpg
        ├── courses-80x80.jpg
        ├── feature.jpg
        ├── header.jpg
        ├── overlay-bottom.png
        ├── overlay-top.png
        ├── page-header.jpg
        ├── team-1.jpg
        ├── team-2.jpg
        ├── team-3.jpg
        ├── team-4.jpg
        ├── testimonial-1.jpg
        └── testimonial-2.jpg
```

---

## Getting Started

1. Open `index.html` in any modern browser — no build step required.
2. Replace placeholder content with your own copy, images, and links.
3. Customize the color palette by editing CSS custom properties in `:root` within `assets/css/main.css`.

---

## Let's Build Something Together 🚀

Have a template idea, redesign brief, or custom project in mind?

**[Submit Your Brief on Tally](https://tally.so/r/q4q1L9)**
