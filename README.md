# The White Rabbit

Restaurant website built with Next.js App Router, TypeScript, Tailwind CSS and Framer Motion dependencies. The supplied short promo video runs muted in the hero with an image poster; prefers-reduced-motion users get the poster. Restaurant copy and configuration live in `data/restaurant.ts`.

## Run locally

1. Install Node.js 20.9 or later.
2. Run `npm install`.
3. Run `npm run dev`, then open http://localhost:3000.
4. Run `npm run build` before deployment. Deploy the repository to Vercel.

## Five-minute menu update

1. Put straight-on, evenly lit menu page photos in `public/images/menu/raw/` as `menu-1.jpg`, `menu-2.jpg`, etc. Keep all four corners visible and use at least 2000 px on the long side.
2. Run `npm run images:menu`. The script auto-rotates, normalizes brightness and contrast, sharpens lightly, and exports WebP widths 800, 1400 and 2000. Review every output: glare, shadows, clipped edges and perspective distortion need a new photo; the script cannot restore missing information.
3. Add each page to `menuImages` in `data/restaurant.ts` with its responsive `/images/menu/menu-1-800.webp` path, descriptive alt text and page number. Update `menuLastUpdated` and add typed menu item names, descriptions and prices to `signatureDishes`.
4. Build and deploy. Keep the original files so you can process revised prices later.

The current upload includes two food promo graphics and a restaurant video, but no physical menu pages or typed dish prices. The menu page therefore clearly explains how to call for current details rather than showing invented items or prices. Replace the notice with the image viewer once menu scans are supplied.

## Content

Edit only `data/restaurant.ts` for restaurant name, tagline, hours, contact, social links, amenities, signature dishes, menu pages, colors, and feature flags. Add approved food and venue photos under `public/images/` and update the gallery array. Replace the generic map search URL with the restaurant's exact Google Maps pin when available. Set `NEXT_PUBLIC_SITE_URL` to the confirmed public website URL before deployment; metadata, sitemap, robots and JSON-LD use this value rather than inventing a domain.
