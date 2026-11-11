import { useState } from "react";
import { contact, hero, person } from "../data/content";
import { External, SectionHeading } from "./ui";

export function Contact() {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
    window.setTimeout(() => setCopyState("idle"), 2200);
  }

  const copyLabel = copyState === "copied" ? "Copied" : copyState === "failed" ? "Copy failed" : "Copy email";

  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <div className="shell">
        <SectionHeading id="contact-title" index="08" kicker="Hire" title="Contact" lede={hero.availabilityLine} />
        <div className="contact-panel">
          <p className="contact-kicker">{person.fullName}</p>
          <a className="contact-email" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
          <div className="hero-actions">
            <button type="button" className="btn btn-ghost" onClick={() => void copyEmail()}>
              {copyLabel}
            </button>
          </div>
          <ul className="contact-links">
            <li>
              <External href={contact.github}>GitHub · {contact.github.replace("https://", "")}</External>
            </li>
            <li>
              <External href={contact.linkedin}>LinkedIn · {contact.linkedin.replace("https://", "")}</External>
            </li>
          </ul>
          <p className="note">{person.location}</p>
        </div>
      </div>
    </section>
  );
}
