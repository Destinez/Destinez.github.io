import { useEffect, useRef, useState } from "react";
import { contact, navItems, person } from "../data/content";
import { useActiveSection } from "../hooks/useActiveSection";

const observed = ["top", ...navItems.map((item) => item.id)] as const;

export function Nav() {
  const active = useActiveSection(observed);
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !open) return;
    if (!dialog.open) dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => setOpen(false);
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a className="logo" href="#top">
          <span className="logo-mark" aria-hidden="true">
            OD
          </span>
          <span className="logo-name">
            {person.shortName} <span className="logo-rest">Destiny Udurie</span>
          </span>
        </a>
        <nav className="nav-desktop" aria-label="Primary">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} aria-current={active === item.id ? "true" : undefined}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a className="btn btn-primary btn-small" href={`mailto:${contact.email}`}>
            Email
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(true)}
          >
            Menu
          </button>
        </div>
      </div>
      <dialog ref={dialogRef} id="mobile-nav" className="nav-dialog" aria-label="Mobile">
        <div className="dialog-bar">
          <span>{person.fullName}</span>
          <button type="button" className="nav-toggle" onClick={() => setOpen(false)}>
            Close
          </button>
        </div>
        <nav className="dialog-links">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? "true" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a className="dialog-mail" href={`mailto:${contact.email}`}>
          {contact.email}
        </a>
      </dialog>
    </header>
  );
}
