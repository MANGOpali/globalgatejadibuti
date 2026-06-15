# VISAWAY — Deep Design Analysis & System Documentation

---

## 1. DESIGN ANALYSIS

### Layout Structure
- **Grid:** 12-column implicit grid with ~80px horizontal padding on desktop
- **Max Width:** ~1400px container, centered
- **Section Rhythm:** Full-width alternating sections — white → blue hero → white → blue CTA → white → blue stats → white
- **Two-column splits:** 50/50 image+text layouts (About section), 40/60 text+visual (Visa section)
- **Full-bleed sections:** Hero, stats counter, video gallery, footer — all edge-to-edge
- **Sticky header:** Scrolls to compact version without the top utility bar

### Typography
- **Display/Headlines:** All-caps bold sans-serif (likely **Barlow Condensed** or **Bebas Neue** style) — extremely high weight, condensed
- **Body:** Clean regular-weight sans (likely **DM Sans** or **Nunito Sans**)
- **Sub-labels:** Small uppercase pill labels (e.g. "Global Education Simplified", "About Our Consultancy") in muted blue/red accent
- **Size Scale:**
  - Hero H1: ~72–80px, weight 900
  - Section H2: ~52–60px, weight 800
  - Service H3: ~24px, weight 700
  - Body: ~16–18px, weight 400
  - Caption/Label: ~12–13px, uppercase, tracked

### Spacing System
- **Base unit:** 8px
- **Section padding:** 100–120px vertical
- **Card gap:** 24–32px
- **Element gap within cards:** 12–16px
- **Inline label-to-headline gap:** 16px
- **Section label (pill) to headline:** 20px

### Color Palette
```
Primary Blue:     #1A3E8F  (deep royal blue — hero bg, footer, stats)
Accent Red:       #E8323C  (buttons, arrows, highlights, star ratings)
White:            #FFFFFF  (card backgrounds, text on dark)
Light Gray:       #F5F6F8  (section alternating backgrounds, card fills)
Text Dark:        #111827  (headings on white sections)
Text Muted:       #6B7280  (body copy, meta text)
Border Subtle:    #E5E7EB  (card borders, dividers)
Badge Blue:       #EEF2FF  (pill label backgrounds on white)
Badge Text:       #3B5BDB  (pill label text)
```

### Visual Hierarchy
1. **Pill/Badge Label** → attention anchor (small, colored)
2. **All-caps Bold Headline** → primary message (dominant size)
3. **Body paragraph** with left border accent → supporting context
4. **Icon + feature bullets** → scannable proof points
5. **CTA Button** → action driver

Red accent color used strategically on: buttons, arrow icons, star ratings, specific headline words ("DREAMS"), decorative dots — never overused.

### UI Patterns
- **Pill labels:** Rounded, 2px border, small uppercase text — used to introduce every section
- **Left-border blockquote:** Thin colored left border on body text paragraphs
- **Numbered service list:** 01/02/03 numbering with horizontal rule separators
- **Rotating globe/orbit:** SVG circle with country flag circles orbiting — interactive country selector
- **Counter stats:** Large animated number counters with "+" / "%" suffixes
- **Testimonial cards:** Image + stars + quote + name/country layout
- **Award icons:** Monochrome icon + title + year (red accent)
- **Blog cards:** Image + category badge + date + title
- **Partner logo strip:** Grayscale logos, horizontal scrolling strip

### Animation Style
- **Counter animation:** Numbers count up on scroll into view
- **Floating dot:** Single red pulsing orb that floats/drifts across sections
- **Orbit rotation:** Country flag circles rotate around a central circle
- **Slide reveal:** Sections fade-in and slide up on scroll
- **Hover states:** Buttons shift background, arrows animate rightward
- **Hero slideshow:** Numbered (03 → 05 visible) suggesting a dot/number pagination slider

### Card Style
- **Testimonial cards:** White bg, subtle shadow, rounded corners (~12px), inner padding ~32px
- **Blog cards:** Image top, content bottom, thin border, rounded ~8px, hover lift
- **Service items:** Borderless, just number + title + description — very editorial
- **Stats cards:** Dark blue bg, white text, large numbers, centered alignment — no border

### Button Design
- **Primary CTA:** Pill/rounded (border-radius ~50px), white background with dark text + red arrow circle on right side
- **Secondary/Outlined:** Same pill shape but transparent/outlined with white text + arrow
- **Arrow decoration:** Separate circular element containing → icon, in solid red (#E8323C)
- **Hover:** Background fills, text/arrow color inverts
- **Size:** ~56px height, ~180–200px wide for primary

### Responsiveness
- Mobile: Single column, hamburger menu (≡ icon visible), reduced font sizes
- Tablet: 2-column where desktop shows 2, single where desktop shows 3+
- Desktop: Full 3–4 column layouts
- Top utility bar (phone/address/email) collapses on scroll/mobile

### Section Flow (Top → Bottom)
```
01 Utility Bar (contact info + social + language)
02 Navigation (sticky, logo + links + apply button)
03 Hero Slider (full-bleed, dark blue bg, CTA + image)
04 About Section (2-col: image collage | text + features)
05 Services List (numbered editorial list, 2-col text layout)
06 Visa Destinations (dark blue, globe orbit + country list)
07 Testimonials (3-col: video thumbnail | 2 review cards)
08 Video Gallery (full-bleed image with overlay text)
09 FAQ Accordion (2-col: headline | expandable Q&A)
10 Stats Counter (dark blue, 4-col animated numbers)
11 Awards Strip (4 icon+title awards, white bg)
12 Partner Logos (grayscale logo strip)
13 Blog/Insights (3-col article cards)
14 Pre-footer CTA (dark blue, phone + address)
15 Footer (logo + nav links + social icons)
16 Copyright bar (white bg)
```

### Premium Aesthetic Style
- **Category:** Corporate Premium / Professional Services
- **Tone:** Trustworthy, aspirational, globally-minded
- **Feel:** Authoritative but approachable — not cold/corporate
- **Signature elements:** 
  - High-contrast dark blue / bright white sections
  - Bold condensed typography creates visual authority
  - Red accent conveys urgency and action
  - Photographic imagery (real people) builds trust
  - Generous whitespace in service/text sections prevents overwhelm

### Frontend Stack (Likely)
- **HTML5 + CSS3** (custom build, not likely React — structure suggests static HTML template)
- **Bootstrap 5** or custom grid (col patterns suggest Bootstrap-like classes)
- **jQuery** for DOM manipulation and slider
- **Swiper.js** or **Owl Carousel** for hero and testimonial sliders
- **CountUp.js** or similar for animated number counters
- **AOS (Animate On Scroll)** for scroll reveal effects
- **Google Fonts** (Barlow Condensed + DM Sans or similar pairing)
- **Font Awesome** or custom SVG icons
- **GSAP** possibly for the floating dot and orbit animations

---

## 2. DESIGN SYSTEM

### Tokens

```css
/* Colors */
--color-primary:        #1A3E8F;
--color-primary-dark:   #122C6B;
--color-accent:         #E8323C;
--color-accent-dark:    #C4262F;
--color-white:          #FFFFFF;
--color-gray-50:        #F5F6F8;
--color-gray-200:       #E5E7EB;
--color-gray-500:       #6B7280;
--color-text:           #111827;
--color-badge-bg:       #EEF2FF;
--color-badge-text:     #3B5BDB;

/* Typography */
--font-display:  'Barlow Condensed', sans-serif;   /* Weight: 700, 800, 900 */
--font-body:     'DM Sans', sans-serif;             /* Weight: 400, 500, 600 */

--text-xs:    0.75rem;    /* 12px  — captions, dates */
--text-sm:    0.875rem;   /* 14px  — meta, labels */
--text-base:  1rem;       /* 16px  — body */
--text-lg:    1.125rem;   /* 18px  — lead body */
--text-xl:    1.25rem;    /* 20px  — card headings */
--text-2xl:   1.5rem;     /* 24px  — sub-headings */
--text-3xl:   1.875rem;   /* 30px  — section sub-titles */
--text-4xl:   2.25rem;    /* 36px  — section titles */
--text-5xl:   3rem;       /* 48px  — hero sub-title */
--text-6xl:   3.75rem;    /* 60px  — hero title */
--text-7xl:   4.5rem;     /* 72px  — hero max */

/* Spacing */
--space-1:   4px;
--space-2:   8px;
--space-3:   12px;
--space-4:   16px;
--space-5:   20px;
--space-6:   24px;
--space-8:   32px;
--space-10:  40px;
--space-12:  48px;
--space-16:  64px;
--space-20:  80px;
--space-24:  96px;
--space-32:  128px;

/* Border Radius */
--radius-sm:   4px;
--radius-md:   8px;
--radius-lg:   12px;
--radius-xl:   16px;
--radius-full: 9999px;

/* Shadows */
--shadow-card:  0 4px 24px rgba(0,0,0,0.07);
--shadow-hover: 0 8px 40px rgba(0,0,0,0.12);
--shadow-btn:   0 4px 16px rgba(232,50,60,0.30);

/* Transitions */
--transition-fast:   150ms ease;
--transition-base:   250ms ease;
--transition-slow:   400ms ease;
```

### Component Specs

**Pill Badge**
```
Background: var(--color-badge-bg) or transparent with 1px border
Color: var(--color-badge-text) or var(--color-accent)
Padding: 6px 14px
Border-radius: var(--radius-full)
Font: var(--font-body), 12px, uppercase, letter-spacing: 0.08em, weight 600
```

**Primary Button**
```
Background: white (on dark) / dark (on white)
Color: contrasting
Padding: 14px 28px 14px 36px
Border-radius: var(--radius-full)
Arrow: separate circle element, 42px, bg: var(--color-accent), color: white
Font: var(--font-body), 15px, weight 600, uppercase, letter-spacing: 0.05em
Hover: background shifts, arrow rotates 45deg or slides
```

**Service Item Row**
```
Layout: flex, align-items: baseline, gap: 24px
Number: 02px font, color: var(--color-text), opacity: 0.15, font: var(--font-display)
Title: var(--font-body), 22px, weight 700
Separator: 1px solid var(--color-gray-200), margin: 24px 0
Description: right column, var(--font-body), 16px, color: var(--color-gray-500)
```

**Testimonial Card**
```
Background: white
Border: 1px solid var(--color-gray-200)
Border-radius: var(--radius-lg)
Padding: 36px
Stars: 20px, color: var(--color-accent), gap: 4px
Quote: 16px, italic, line-height: 1.7
Author: flex, 48px avatar circle, name 15px weight 700, location 13px gray
```

**Stat Block**
```
Background: transparent (inherits dark blue section)
Number: var(--font-display), 64px, weight 800, white
Label: var(--font-body), 16px, weight 700, white
Description: 14px, white, opacity: 0.7, text-align: center, margin-top: 16px
```

---

## 3. FULL WEBSITE STRUCTURE

```
visaway-style-site/
├── index.html
├── css/
│   ├── tokens.css          ← design tokens
│   ├── base.css            ← reset, typography, globals
│   ├── layout.css          ← grid, container, section patterns
│   ├── components.css      ← buttons, badges, cards, forms
│   └── animations.css      ← scroll reveals, counters, hover
├── js/
│   ├── main.js             ← init, nav scroll, mobile menu
│   ├── slider.js           ← hero + testimonial carousels
│   ├── counter.js          ← animated number counters
│   ├── orbit.js            ← rotating country orbit
│   └── aos-init.js         ← scroll animation triggers
├── images/
│   ├── hero/               ← slide images
│   ├── about/              ← team/collage images
│   ├── flags/              ← country flag circles
│   ├── blog/               ← article thumbnails
│   └── logos/              ← partner logos (grayscale)
└── fonts/                  ← self-hosted if needed

SECTION BREAKDOWN:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[HEADER]
  ├── Utility bar: phone | address | email | language switcher | social icons
  └── Main nav: logo | menu links | search icon | "Apply Now" pill button

[SECTION 1 — HERO]
  ├── Full-viewport dark blue background
  ├── Left: pill badge → H1 all-caps → body text → 2 CTA buttons
  ├── Right: cutout person image with diploma/achievement prop
  └── Slide counter (03/05 style), pagination dots

[SECTION 2 — ABOUT]
  ├── Left: overlapping image collage (3 photos, 1 info card, floating elements)
  └── Right: pill → H2 → blockquote body → 2 feature items → CTA button

[SECTION 3 — SERVICES]
  ├── Centered: pill → H2
  └── 4 rows: number | title (left) || description (right), separated by lines

[SECTION 4 — VISA DESTINATIONS]
  ├── Dark blue full-bleed
  ├── Left: pill → H2 → body → 6 visa type bullets → CTA
  └── Right: circular orbit diagram with rotating country flags

[SECTION 5 — TESTIMONIALS]
  ├── Centered: pill → H2
  └── 3 col: [video thumbnail card] [review card 1] [review card 2]

[SECTION 6 — VIDEO GALLERY]
  └── Full-bleed dark overlay image with left-bordered H2

[SECTION 7 — FAQ]
  ├── Left: pill → H2 → body → "Contact Us" button
  └── Right: accordion with expand/collapse arrows

[SECTION 8 — STATS COUNTER]
  ├── Dark blue full-bleed, centered pill → H2
  └── 4 col: animated number + label + description

[SECTION 9 — AWARDS]
  └── 4 col: icon + title + year (red)

[SECTION 10 — PARTNER LOGOS]
  └── Horizontal strip, 5 grayscale logos

[SECTION 11 — BLOG]
  ├── pill → H2 → "View All" button (right aligned)
  └── 3 col cards: image + category badge + meta + title

[PRE-FOOTER CTA]
  └── Dark blue: large phone number + address, centered

[FOOTER]
  └── Logo | nav links | social icons

[COPYRIGHT]
  └── White bar: copyright text | terms | privacy | contact
```

---

## 4. AI PROMPT — RECREATE SIMILAR PREMIUM STYLE

Use this prompt with Claude (or any capable AI) to generate a similar premium immigration/education consultancy website:

---

```
Create a full, single-file HTML website for a premium education visa 
consultancy firm called [BRAND NAME]. The design should feel globally 
authoritative, trustworthy, and aspirational — like a world-class 
immigration advisory firm.

VISUAL DIRECTION:
- Dark royal blue (#1A3E8F) as primary background for hero, stats, and 
  footer sections, alternating with clean white (#FFFFFF) sections
- Bold red (#E8323C) used exclusively as accent: CTA buttons, arrow 
  icons, star ratings, and one highlighted word per headline — never 
  overused
- Light gray (#F5F6F8) for subtle section alternation on white areas

TYPOGRAPHY:
- Import Google Fonts: 'Barlow Condensed' (weights 700, 800, 900) for 
  all headings and display text
- Import 'DM Sans' (weights 400, 500, 600) for body copy and UI elements
- Headlines: all-caps, condensed, bold — commanding and large (52–72px)
- Section labels: small uppercase pill badges (12px, letter-spaced)
- Body: 16–18px, comfortable line-height ~1.7, muted gray color

LAYOUT ARCHITECTURE:
Build these sections in order, each with ~100px vertical padding:
1. Utility bar (dark bg, contact info left, social icons right)
2. Sticky nav (logo left, links center, "Apply Now" pill button right)
3. Hero: full-viewport dark blue, left text + right person image cutout, 
   slide counter, two CTA buttons (pill-shaped with red arrow circle)
4. About: 2-column — left stacked image collage, right text with 
   left-border blockquote and icon feature list
5. Services: centered heading, then 4 numbered rows (01–04) with title 
   left and description right, separated by thin lines
6. Destinations: dark blue section, left text + visa type bullets, right 
   circular orbit diagram with SVG circles representing countries/flags
7. Testimonials: 3 columns — video thumbnail card + 2 review cards 
   (stars, quote, avatar, name, country)
8. FAQ: 2-column — left heading+subtext+button, right CSS accordion with 
   smooth height transitions
9. Stats: dark blue, 4 animated counter blocks (1K+, 43+, 82%, 19+) with 
   labels and descriptions
10. Awards: 4 icon+title+year blocks, white section
11. Blog: 3-column article cards with image, category badge, date, title
12. Pre-footer: dark blue CTA with large phone number centered
13. Footer: logo + horizontal nav + social icons
14. Copyright bar: minimal white strip

BUTTON DESIGN:
- All CTAs use pill/capsule shape (border-radius: 50px)
- Right side has a separate red circle (42px) with white → arrow icon
- On hover: red circle expands slightly, arrow slides right
- Never use standard box buttons

UI DETAILS:
- Add a single small floating red dot that drifts slowly across the page 
  using CSS keyframes (position: absolute, no interaction)
- Service rows have large ghost numbers (opacity: 0.08) behind the titles
- Left thin red/blue border on blockquote body paragraphs
- Pill badge labels use very light blue background with blue text on white 
  sections; white text with subtle border on dark sections
- Cards: white background, 1px border, 12px border-radius, 32px padding, 
  box-shadow: 0 4px 24px rgba(0,0,0,0.07)
- On hover: cards lift with shadow: 0 8px 40px rgba(0,0,0,0.12), 
  transform: translateY(-4px)

ANIMATIONS:
- Implement IntersectionObserver for scroll-triggered count-up animations 
  on the stats section
- Use CSS animation-delay staggering on service rows and blog cards for 
  a cascade reveal on scroll
- Orbit animation: rotate a container of flag-circle elements using 
  @keyframes rotate continuously at 20s infinite linear
- Hero text: staggered fade-in-up with 0.15s delays between elements

CONTENT TO USE:
- Brand: [YOUR BRAND NAME]
- Tagline: "[YOUR TAGLINE — e.g. 'From Application to Visa — We've Got 
  You Covered']"
- Services: Student Visa Guidance / Language Exam Prep / University 
  Selection / Work Visa Assistance
- Destination countries: USA, Canada, UK, Australia, Germany, Japan
- Stats: 1K+ Students / 40+ Countries / 85% Success Rate / 15+ Years
- FAQ questions about visa timeline, scholarships, interview prep, 
  post-arrival support
- Blog topics: Student visa guide / Financial document tips / 
  Post-arrival guide

TECHNICAL REQUIREMENTS:
- Single self-contained HTML file with embedded CSS and JS
- No frameworks — pure HTML5, CSS3 (custom properties), vanilla JS
- CSS Grid and Flexbox for all layouts
- Mobile-responsive with a hamburger menu (≡) that toggles a slide-down 
  mobile nav
- Sticky header that reduces in height after 80px scroll
- Smooth scroll behavior throughout
- Counter animation triggers on viewport entry
- All colors, fonts, spacing via CSS custom properties for easy theming
- Performance: lazy-load images, minimal JS, CSS-only animations where 
  possible

The result should feel like a professionally designed template worth 
$200+ on Envato Elements — polished, global, premium, and instantly 
credible in the immigration/education consulting space.
```

---

*Analysis and system generated from 11 screenshots of the VISAWAY template.*
*Template source: ex-coders.com/html/visaway (Envato Elements)*
