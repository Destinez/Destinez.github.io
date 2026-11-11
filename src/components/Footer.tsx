import { contact, person } from "../data/content";
import { External } from "./ui";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <div>
          <p className="footer-name">{person.fullName}</p>
          <p className="note">{person.location}</p>
        </div>
        <ul className="footer-links">
          <li>
            <a href={`mailto:${contact.email}`}>Email</a>
          </li>
          <li>
            <External href={contact.github}>GitHub</External>
          </li>
          <li>
            <External href={contact.linkedin}>LinkedIn</External>
          </li>
          <li>
            <a href="#top">Back to top</a>
          </li>
        </ul>
        <p className="note">© {new Date().getFullYear()} {person.fullName}</p>
      </div>
    </footer>
  );
}
