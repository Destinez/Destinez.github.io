import { contact, hero, person } from "../data/content";
import { External } from "./ui";

export function Contact() {
  return (
    <div className="contact-scene">
      <p className="kicker">
        <span className="kicker-index">05</span>
        Contact
      </p>
      <h2 id="contact-title" className="scene-name">
        {person.fullName}
      </h2>
      <a className="contact-email" href={`mailto:${contact.email}`}>
        {contact.email}
      </a>
      <ul className="contact-links">
        <li>
          <External href={contact.github}>GitHub</External>
        </li>
        <li>
          <External href={contact.linkedin}>LinkedIn</External>
        </li>
      </ul>
      <p className="note">{hero.availabilityLine}</p>
    </div>
  );
}
