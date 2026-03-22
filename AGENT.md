# AGENT.md

This file is for future coding agents and contributors working on this repo.

## Project Goal

This site is a premium Indian home interiors landing page for **Nivasa Living**.

It should feel closer to:

- a polished Indian interiors/furniture brand
- a modular home solution company
- a landing page that can convert enquiries

It should feel less like:

- an abstract global design studio
- a portfolio full of unrelated art direction
- a generic AI-generated interiors page

## Core Brand Positioning

Keep the site focused on Indian residential interiors:

- 2BHK apartments
- 3BHK apartments
- villas
- duplex homes
- modular kitchens
- wardrobes
- TV units
- pooja units
- full-home interiors

Use Indian market language where appropriate:

- Bengaluru, Hyderabad, Chennai, Pune
- handover timelines
- modular execution
- site installation
- factory production
- apartment and villa planning

## Content Rules

- Prefer Indian names, places, and examples
- Keep copy practical and conversion-friendly
- Avoid vague “luxury brand” filler language
- Avoid generic startup phrasing
- Avoid turning the brand back into a pure architecture studio
- Do not add random non-interior imagery
- Do not use irrelevant stock photos with flowers, portraits, or abstract lifestyle shots

## Visual Rules

- Keep the white premium landing-page background
- Preserve the clean, bright product-stage hero
- Treat the hero video as the main visual asset
- Use compact spacing, especially on mobile
- Avoid overly tall sections with empty white gaps
- In two-column sections, prefer top alignment when one side is shorter
- Keep the look premium but retail-friendly

## Technical Rules

- Main page content lives in `src/App.jsx`
- Global styling lives in `src/index.css`
- Hero video is `src/D_Interior_Design_Render_Video.mp4`
- CTA interaction lives in `src/components/MagneticButton.jsx`

When editing:

- use local imports for major media when possible
- preserve autoplay + muted + loop behavior for the hero video unless intentionally changed
- avoid adding new dependencies unless necessary
- check `package.json` before introducing any package

## Build Note

In this environment, `npm run build` may fail in the restricted sandbox because Vite/Tailwind needs native Windows tooling. Re-running the build with elevated permissions succeeds.

## Good Future Directions

- Add local interior assets
- Add category sections for kitchen, wardrobe, bedroom, and living room
- Add pricing/package cards
- Add a stronger catalog or retailer flow
- Add city-specific enquiry variations

## Avoid

- generic card spam
- giant empty spacing blocks
- unrelated imagery
- purple/neon visual themes
- turning the site into a SaaS dashboard
- changing the brand back away from Indian interiors
