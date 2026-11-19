import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest { return { name: "E-CON Internationals", short_name: "E-CON", start_url: "/", display: "standalone", background_color: "#ffffff", theme_color: "#0E5A8A", icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }] }; }
