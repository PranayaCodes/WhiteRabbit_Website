import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap { const site = process.env.NEXT_PUBLIC_SITE_URL; return site ? [{ url: site, lastModified: new Date() }, { url: `${site}/menu`, lastModified: new Date() }] : []; }
