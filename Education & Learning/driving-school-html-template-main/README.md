# Driving School HTML Template — DRIVIN

A premium, framework-free HTML template for driving schools. Built with pure HTML, CSS, and vanilla JavaScript — no dependencies, no build tools, no frameworks. Road-themed design with a sky-blue and yellow palette, speedometer-style stat counters, and dashed-line lane dividers.

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero with CTA, about section, speedometer stats, course cards, instructor team, testimonial carousel, booking CTA |
| About | `about.html` | School story, features grid, instructor team, stats bar |
| Courses | `courses.html` | Course cards with pricing, what's-included feature grid |
| Contact | `contact.html` | Contact info, general inquiry form, appointment booking form with date/time picker |

## Design Distinction — 6 Axis

| Axis | What Sets It Apart |
|------|--------------------|
| **Identity** | Driving-school-specific branding: sky-blue #0D6EFD + road-yellow #F5B100 on charcoal #1A1B2C. Road-themed visual language throughout. |
| **Section Dividers** | Dashed-line lane markings mimicking road center lines — yellow dashed pattern separates every major section. |
| **Stat Counters** | Speedometer-style circular progress rings with animated number counters (IntersectionObserver-driven). |
| **Typography** | DM Sans for headings, Inter for body — clean, modern, high readability at all sizes. |
| **Imagery** | All 14 original source images mapped to relevant sections. No placeholder/picsum images. |
| **Interactions** | IntersectionObserver reveal animations, testimonial carousel with auto-advance, burger nav, form validation with .form-ok/.form-err states. |

## Features

- **Pure HTML/CSS/Vanilla JS** — zero frameworks, zero build tools
- **CSS Custom Properties** — consistent theming via `:root` tokens
- **CSS Grid + Flexbox** — modern layout without float hacks
- **`clamp()` responsive sizing** — fluid typography and spacing
- **IntersectionObserver** — scroll-triggered reveal animations (threshold 0.12)
- **Speedometer stat counters** — animated circular progress + counting numbers
- **Road-themed dividers** — dashed lane-marking pattern between sections
- **Testimonial carousel** — auto-advancing with dot navigation and prev/next buttons
- **Burger menu** — smooth slide-in mobile navigation with overlay
- **Form validation** — `data-form` attribute, `.form-ok` / `.form-err` feedback
- **Active nav state** — highlights current page in navigation
- **Dynamic year** — `data-year` attribute auto-fills copyright year
- **Responsive breakpoints** — 980px (2-col), 720px (1-col + burger)
- **Back to top** — smooth-scroll button appears after scrolling
- **No picsum** — only the 14 original source images used

## File Structure

```
driving-school-html-template/
├── index.html              # Home page
├── about.html              # About page
├── courses.html            # Courses page
├── contact.html            # Contact + booking page
├── README.md               # This file
├── assets/
│   ├── css/
│   │   └── style.css       # Full custom stylesheet (custom properties, grid, flex, clamp)
│   ├── js/
│   │   └── main.js         # Vanilla JS (IntersectionObserver, burger, carousel, forms)
│   └── img/
│       ├── about-1.jpg
│       ├── about-2.jpg
│       ├── carousel-1.jpg
│       ├── carousel-2.jpg
│       ├── courses-1.jpg
│       ├── courses-2.jpg
│       ├── courses-3.jpg
│       ├── team-1.jpg
│       ├── team-2.jpg
│       ├── team-3.jpg
│       ├── team-4.jpg
│       ├── testimonial-1.jpg
│       ├── testimonial-2.jpg
│       └── testimonial-3.jpg
```

## 📸 Screenshot

![Homepage Preview](screenshot.png)

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--sky` | `#0D6EFD` | Primary actions, links, accents |
| `--yellow` | `#F5B100` | Road theme, highlights, badges |
| `--charcoal` | `#1A1B2C` | Headings, dark backgrounds |
| `--light` | `#F0F4F8` | Section backgrounds |
| `--white` | `#FFFFFF` | Cards, forms, content areas |
| `--heading` | DM Sans | All headings and buttons |
| `--body` | Inter | Body text and form inputs |
| `--radius` | `12px` | Card and section corners |
| `--shadow` | `0 4px 24px rgba(...)` | Card elevation |

## Usage

1. Open any `.html` file in a browser — no server required
2. Customize colors by editing CSS custom properties in `:root`
3. Replace images in `assets/img/` with your own
4. Update contact info, pricing, and course details in the HTML files

---

**Let's Build Something Together** — https://tally.so/r/q4q1L9
