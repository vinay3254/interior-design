# Nivasa Living

A React + Vite landing page for an Indian home interiors brand.

The site is positioned like a premium interiors company focused on:

- 2BHK and 3BHK apartments
- Villas and duplex homes
- Modular kitchens
- Wardrobes and TV units
- Full-home design and installation

The current hero is built around a local 3D walkthrough video:

- `src/D_Interior_Design_Render_Video.mp4`

## Stack

- React
- Vite
- Tailwind CSS via `@tailwindcss/vite`
- Framer Motion
- `@phosphor-icons/react`

## Run Locally

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```text
src/
  App.jsx                         Main landing page content
  index.css                       Global styles and visual system
  main.jsx                        React entry point
  D_Interior_Design_Render_Video.mp4
  components/
    MagneticButton.jsx            Hero and CTA button interaction
```

## What Lives Where

### Brand copy

Most editable text content lives in:

- `src/App.jsx`

That includes:

- brand name
- hero messaging
- services
- project cards
- process notes
- testimonial
- enquiry form labels and placeholder text
- footer cities and email

### Styling

Global visual styling lives in:

- `src/index.css`

That file controls:

- background palette
- card/glass surface look
- marquee styling
- motion keyframes
- general typography helpers

### Hero asset

The homepage video is imported directly in:

- `src/App.jsx`

If you replace the hero video, keep the file in `src/` and update the import path if the filename changes.

## Current Design Direction

The page currently follows this direction:

- white, premium landing-page background
- minimal, retail-friendly Indian interiors branding
- compact spacing on mobile
- interior-only imagery
- autoplaying muted hero video
- clean modular-home positioning instead of editorial studio language

## Notes

### Build behavior in this environment

In this workspace, `vite build` may fail inside the restricted sandbox because Tailwind/Vite tries to resolve native Windows tooling. Running the same build with elevated permissions works.

### Images

The current section imagery uses remote interior photos. If you want a more stable production setup, move those assets into the repo and import them locally.

## Suggested Next Improvements

- Add local image assets instead of remote URLs
- Add category sections such as kitchens, wardrobes, and bedrooms
- Add pricing or package bands
- Add city-specific pages or lead forms
- Add a product/catalog browsing experience closer to a furniture retailer
