# ☁️ CloudBase — Admin Panel & SaaS Dashboard HTML Template

A premium, framework-free HTML/CSS/vanilla-JS admin panel template for SaaS products and web applications. Clean card-based layout with a horizontal top navbar — no sidebar — built around a bright, focused workspace aesthetic.

**Live preview:** `index.html` (open in browser)
**Stack:** HTML5 · CSS3 (custom properties, Grid, Flex) · Vanilla JS (no build step)
**Fonts:** Plus Jakarta Sans (headings, 600/700/800) · DM Sans (body, 400/500) — via Google Fonts

---

## Pages

| Page | Description | Link |
|------|-------------|------|
| **Dashboard** | Good-morning greeting, 4-card KPI row (revenue, projects, team, uptime), recent projects table with status badges + progress bars, live activity feed, quick-access cards | [index.html](index.html) |
| **Analytics** | Deeper metrics — MRR/active users/conversion/AOV KPI row, revenue trend bar chart, top traffic sources, workspace usage and performance snapshot | [dashboard.html](dashboard.html) |
| **Projects** | Project-management card grid — cover image, client, due date, team avatars, progress bar and status badge per card, plus a new-project CTA banner | [projects.html](projects.html) |
| **Team** | Team member cards (avatar, role, skills, social links) plus a team snapshot KPI band (members, capacity, open roles, time zones) | [team.html](team.html) |
| **Settings** | Form-based settings — profile, workspace, notification toggles and security sections with client-side validation feedback | [settings.html](settings.html) |
| **404** | On-brand not-found page with gradient error code and back-to-dashboard action | [404.html](404.html) |

---

## 📸 Screenshot

![Homepage Preview](screenshot.png)

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--dark` | `#0F172A` | Headings, primary text |
| `--primary` | `#6366F1` | Brand accent, buttons, active nav, KPI icons |
| `--purple` | `#8B5CF6` | Secondary accent, gradients, progress fills |
| `--success` | `#22C55E` | Positive trends, completed states, active badges |
| `--gray` | `#64748B` | Body copy, muted labels |
| `--bg` | `#F8FAFC` | Page background |
| `--white` | `#FFFFFF` | Cards, header, surfaces |
| `--border` | `#E2E8F0` | Card and input borders, dividers |

- **Layout** — horizontal sticky top navbar (logo + search + avatar dropdown) with a main content area. No sidebar.
- **Cards** — white surfaces with `1px` borders, soft hover elevation (`--shadow-md`) and a `-2px` lift.
- **KPI cards** — icon chip (primary/success/purple/dark variants) + value + label + trend pill (`▲` up / `▼` down).
- **Tables** — responsive with `min-width`, sticky header-row treatment, progress bars and status badges.
- **Responsive** — `980px` (2-col grids) and `720px` (single column, mobile nav drawer, hidden search).

---

## Tech Stack

- **HTML5** — semantic structure, ARIA attributes on nav toggle and dropdowns
- **CSS3** — custom properties, Grid, Flexbox, `clamp()` fluid type, `aspect-ratio`-safe images
- **Vanilla JS** — IntersectionObserver scroll reveals (`threshold 0.12`), mobile nav toggle, avatar dropdown, active-nav highlighting, smooth scrolling, footer year, form validation feedback, back-to-top
- **No frameworks, no build step** — open the HTML files directly in a browser

---

## Images

All imagery lives in `assets/img/` (original source assets, no external placeholders):

| File | Used for |
|------|----------|
| `bootstrap-admin-template-free.jpg` | Project card covers, product-tour video thumbnail |
| `user.jpg` | Avatar — navbar dropdown, team cards, project avatars |
| `testimonial-1.jpg` / `testimonial-2.jpg` | Team member avatars, project avatars |
| `owl.video.play.png` | Play button on the product-tour video thumbnail |

---

## Quick Start

```bash
# No install, no build — just open
open index.html
# or serve locally
npx serve .
```

---

## File Structure

```
admin-panel-html-template/
├── index.html          # Dashboard — KPIs, recent projects, activity
├── dashboard.html      # Analytics — detailed metrics & charts
├── projects.html       # Project management cards
├── team.html           # Team grid & member cards
├── settings.html       # Profile & notification forms
├── 404.html            # Not-found page
├── assets/
│   ├── css/
│   │   └── style.css   # Design system (~600 lines)
│   ├── js/
│   │   └── main.js     # Reveals, nav, dropdown, forms
│   └── img/            # 5 original source images
└── README.md           # This file
```

---

## Customization

- **Colors:** Edit `:root` tokens at the top of `assets/css/style.css`
- **Fonts:** Swap the Google Fonts `<link>` in each HTML `<head>` and update the font-family declarations
- **KPI cards:** Add/remove `.kpi-card` items inside a `.kpi-grid`
- **Projects:** Duplicate `.project-card` articles; update cover image, progress width and status badge class
- **Team members:** Edit `.team-card` articles — name, role, skills, social links
- **Forms:** Fields and validation messages are plain HTML inside `[data-form]` forms

---

## Browser Support

Modern evergreen browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+). Graceful degradation for CSS Grid, Flex, `clamp()` and `IntersectionObserver`.

---

## Credits

- **Images:** Original source assets (included in `assets/img/`)
- **Fonts:** Plus Jakarta Sans (Tokotype), DM Sans (Colophon Foundry) — SIL OFL via Google Fonts
- **Icons:** Inline emoji — no icon font dependency

---

**Template by uiuxlabz** — framework-free, responsive, production-ready.

---

### Let's Build Something Together 🚀

[https://tally.so/r/q4q1L9](https://tally.so/r/q4q1L9)
