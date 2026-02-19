# Zadanie pre AI developera — Portfolio web pre thumbnail designéra

## Referenčný web (hlavná inšpirácia)

**https://www.zeedznn.com** — preštuduj tento web do detailu. Cieľom je vytvoriť takmer identický build čo sa týka štruktúry, animácií a celkového feelu. Farby a obsah budú vlastné.

### Kľúčové vlastnosti zeedznn.com:
- Dark theme (#0c0c0e základ)
- Framer-style animácie (smooth scroll reveals, fade-in, parallax)
- Na mobile vyzerá takmer ako na desktope — zoom-outnuté, veľa obsahu viditeľného naraz
- Auto-scrollujúce riadky thumbnailov
- Scrollujúci stats marquee
- Veľké showcase sekcie s reálnymi thumbnailmi

---

## Technický stack

- **Framework:** Framer / Next.js 14+ (App Router) / alebo čistý HTML+CSS+JS
- **Styling:** CSS custom properties (dark theme)
- **Font:** `Be Vietnam Pro` z Google Fonts (weights: 300–900)
- **Animácie:** CSS animations + Intersection Observer (scroll reveal)
- **Mobile:** Žiadny klasický responsive — web má na mobile vyzerať **zoom-outnuté** ako desktop, aby bolo vidieť veľa obsahu naraz (viewport meta bez scaling obmedzení, alebo scale transform)

---

## Barevné schéma

| Token | Hodnota | Použitie |
|-------|---------|----------|
| `--bg` | `#0c0c0e` | Pozadie celej stránky |
| `--card` | `#141416` | Pozadie kariet |
| `--white` | `#ffffff` | Hlavný text |
| `--gray` | `#94929d` | Sekundárny text |
| `--gray-dark` | `#5a5862` | Terciárny text |
| `--border` | `#222228` | Bordery |
| `--accent` | `#10b981` | Emerald zelená — CTA, tagy, badge |
| `--green` | `#22c55e` | "Available Now" dot |

---

## Štruktúra stránky (presný poradie sekcií)

### 1. Navigácia (fixed, blur backdrop)
- Logo: text "Zee Dznn." → nahradiť menom klienta
- Linky: Home, Thumbnails, About Me, Testimonials, FAQ, Socials
- CTA button: "Get Started" (emerald)
- Backdrop blur + polopriesvitné pozadie
- Na mobile: hamburger menu alebo zmenšené

### 2. Hero sekcia
- **"Available Now" badge** — zelená pulse bodka + text, border pill
- **Headline:** `Crafting Instant Clicks.` (veľký, bold, 900 weight)
- **Subtext:** "My work isn't just good-looking — it's about making visuals that pull people in and get real engagement"
- **2x CTA:** "Get Started" (filled emerald) + "View Portfolio" (ghost)
- **Pod CTA:** Scrollujúci pás s avatar obrázkami klientov (kruhové, auto-scroll)
- **Pod avatarmi:** "Trusted by 200+ creators" label

### 3. UKÁŽKA #1 — Thumbnail showcase (2 riadky)
**Toto je prvá ukážka prác — hneď po hero sekcii.**

Layout:
- **2 riadky** auto-scrollujúcich thumbnailov
- Riadok 1: scroll doľava, rýchlosť ~60s
- Riadok 2: scroll doprava, rýchlosť ~50s
- Každý thumbnail: **16:9 pomer** (cca 320×180px alebo väčšie)
- Každý thumbnail v **rámčeku** (border-radius, border)
- **Pri každom thumbnaily:** malá profilka (avatar kruh) + názov videa pod ním
- Hover: scale 1.04, border accent, shadow
- Pause on hover

**Príklad štruktúry jedného thumbnailového itemu:**
```
┌──────────────────────┐
│    THUMBNAIL IMAGE    │
│      (16:9)           │
├──────────────────────┤
│ 🟢 Channel Name      │
│ Video Title Here...   │
└──────────────────────┘
```

### 4. Stats Marquee (scrollujúci pás)
Nekonečne scrollujúci horizontálny pás so štatistikami:
- **200M+** Views Generated
- **1500+** Thumbnails Made
- **200+** Happy Creators
- Opakuje sa dookola (3x duplikovaný pre seamless loop)
- Font: veľký, bold
- Oddeľovač: bodka alebo hviezdička medzi položkami

### 5. Process sekcia
- Tag: "Process"
- Headline: "Our Thumbnail Design Process in 3 Simple Steps"
- Subtext: "From idea to impact, every thumbnail crafted with purpose, precision, and performance in mind."
- **Veľký obrázok** pod textom — infografika/diagram 3 krokov procesu
- Obrázok klient dodá (placeholder: gradient karta s 3 krokmi textovo)

**3 kroky (pre placeholder):**
1. **Brief & Research** — Pochopenie kanálu, cieľovky a štýlu
2. **Design & Iteration** — Tvorba thumbnailov + A/B varianty
3. **Delivery & Optimization** — Finálne dodanie + CTR tracking

### 6. UKÁŽKA #2 — Veľký thumbnail showcase (5-6 riadkov)
**Toto je hlavná showcase sekcia — pod procesom.**

- Tag: "Showcase"
- Headline: "Thumbnails That Speak for Themselves"
- Subtext: "Every design here is built to capture attention and convert views."
- **5-6 riadkov** auto-scrollujúcich thumbnailov
- Každý riadok iná rýchlosť a smer (striedavo L/R)
- Riadok 1: →, 55s
- Riadok 2: ←, 45s
- Riadok 3: →, 65s
- Riadok 4: ←, 50s
- Riadok 5: →, 70s
- Riadok 6 (optional): ←, 40s
- Thumbnaily: 16:9, border-radius 10px, border
- **BEZ profilky/názvu** — len čisté thumbnail obrázky
- Hover: scale, glow
- Veľký obrázok pod headline (ako na zeedznn.com)

### 7. About Me sekcia
- Tag: "About Me"
- Headline: "Built for Creators"
- Veľký obrázok/grafika (klient dodá)
- Text o designérovi, jeho skúsenostiach, prístupu
- Placeholder: gradient karta s emoji 👨‍🎨 a popisom

### 8. Testimonials
- Tag: "Testimonials"
- Headline: "Here's What Our Amazing Clients Think"
- Subtext: "Trusted by leading creators."
- **Karty** s:
  - Citácia (italic)
  - 5 hviezdičiek
  - Avatar klienta + meno + @ handle
  - Hviezdičkové hodnotenie
- 4-6 testimonial kariet
- Na mobile: horizontálny scroll alebo stack

**Placeholder testimonials:**
1. "Absolutely incredible work. CTR jumped 340% the first month." — @MartinK (1.2M subs)
2. "Finally someone who understands not just design but YouTube itself." — @TerezaP (580K subs)
3. "Fast delivery, amazing communication, results speak for themselves." — @JanN (340K subs)
4. "Best investment in our brand. New identity helped us land dream clients." — @LucieS (210K subs)

### 9. FAQ sekcia
- Tag: "FAQ"
- Accordion štýl (klik = expand/collapse)
- Max 1 otvorená naraz
- Toggle ikona: + → × (rotácia 45°)

**Otázky:**
1. How fast do you deliver? → 24-48h standard, 12h express
2. What are your prices? → Thumbnails from $50, monthly packages from $300, full branding from $800
3. How many revisions included? → 2-3 rounds
4. Do you do A/B testing? → Yes, 2-3 variants for premium packages
5. Do you work with international creators? → Yes, CZ/EN/DE

### 10. Socials + CTA
- Headline: "Let's Work Together" alebo "Get in Touch"
- Social media linky (Instagram, Twitter/X, Behance, YouTube)
- Veľký CTA button

### 11. Footer
- Logo + copyright
- Navigačné linky
- Social ikony

---

## Animácie (kľúčové)

| Element | Efekt | Detail |
|---------|-------|--------|
| Hero elementy | Fade up | Staggered delay 0.2s, 0.4s, 0.6s |
| Available badge | Fade down + pulse dot | Zelená bodka pulse 2s infinite |
| Avatar strip | Auto scroll | Nekonečný horizontálny scroll |
| Thumbnail riadky | Auto scroll | Rôzne rýchlosti a smery |
| Stats marquee | Auto scroll | Nekonečný, veľký text |
| Scroll reveal | Fade up + slight scale | Intersection Observer, threshold 0.08 |
| Thumbnail hover | Scale + glow border | 1.04 scale, accent border |
| FAQ accordion | Max-height transition | Smooth expand/collapse |
| CTA buttons | Lift + shadow | translateY(-3px) + glow shadow |
| Section tags | Fade in | Malé tag pills nad headlines |

---

## Mobile správanie — DÔLEŽITÉ

**Web má na mobile vyzerať zoom-outnutý** — skoro rovnako ako na desktope, len zmenšený. Používateľ vidí veľa obsahu naraz, nie je to klasický responsive kde sa veci stackujú pod seba.

Implementácia:
```html
<meta name="viewport" content="width=1400">
```
ALEBO CSS transform scale na body pre malé viewporty.

Toto je kľúčová požiadavka — pozri zeedznn.com na mobile pre referenciu.

---

## Čo klient musí dodať

1. **30+ thumbnail obrázkov** (1920×1080 alebo 1280×720) pre obe showcase sekcie
2. **Process infografiku** (1 veľký obrázok)
3. **About Me obrázok/grafiku**
4. **Showcase veľký obrázok** (kompozícia viacerých thumbnailov)
5. **Avatar obrázky klientov** (pre trusted-by strip a testimonials)
6. **Reálne testimonials** — meno, handle, citácia
7. **Logo** alebo textová verzia mena
8. **Kontaktné údaje** — Instagram, Twitter, email
9. **Ceník** pre FAQ

---

## Poznámky pre developera

- Všetky obrázky `loading="lazy"`
- Gallery scroll seamless — obsah 2× duplikovaný
- Na mobile: viewport width 1400px (zoom-out efekt)
- Testovať: Chrome, Firefox, Safari, iOS Safari, Android Chrome
- Tmavý theme VŽDY — žiadny light mode
- Showcase #1 (2 riadky) má thumbnaily S profilkou a názvom videa
- Showcase #2 (5-6 riadkov) má thumbnaily BEZ profilky — len čisté obrázky
- Stats marquee: veľký bold text, scrollujúci neustále
- Framer-level smooth animácie — žiadne trhané prechody

---

## Referenčný HTML súbor

Priložený `landing-final.html` obsahuje predchádzajúcu verziu designu s inline placeholder obsahom (gradient thumbnaily s emoji ikonami). Použij ako štartovací bod pre farebné schéma a CSS štýly, ale **štruktúru prebuduj podľa tohto zadania** (zeedznn.com štýl).
