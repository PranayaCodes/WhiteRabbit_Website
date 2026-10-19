import localFont from "next/font/local";

export const displayFont = localFont({
  src: [
    { path: "../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
});

export const sansFont = localFont({
  src: [
    { path: "../node_modules/@fontsource/dm-sans/files/dm-sans-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../node_modules/@fontsource/dm-sans/files/dm-sans-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});
