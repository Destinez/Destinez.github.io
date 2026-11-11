import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import { contact, education, hero, person, seo, skills } from "./src/data/content.ts";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function seoPlugin(): Plugin {
  const school = education[0];
  const languages = skills.find((group) => group.group === "Languages");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.fullName,
    jobTitle: hero.role,
    description: seo.description,
    email: `mailto:${contact.email}`,
    url: seo.url,
    image: seo.image,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lagos",
      addressCountry: "NG",
    },
    ...(school
      ? {
          alumniOf: {
            "@type": "CollegeOrUniversity",
            name: school.institution,
          },
        }
      : {}),
    sameAs: [contact.github, contact.linkedin],
    knowsAbout: languages ? [...languages.items] : [],
  };

  const json = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

  return {
    name: "portfolio-seo",
    transformIndexHtml(html) {
      return html
        .replaceAll("__TITLE__", escapeHtml(seo.title))
        .replaceAll("__DESCRIPTION__", escapeHtml(seo.description))
        .replaceAll("__URL__", escapeHtml(seo.url))
        .replaceAll("__IMAGE__", escapeHtml(seo.image))
        .replaceAll("__EMAIL__", escapeHtml(contact.email))
        .replaceAll("__JSONLD__", json);
    },
  };
}

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss(), seoPlugin()],
  build: {
    target: "es2022",
  },
});
