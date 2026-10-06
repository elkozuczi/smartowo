document.getElementById("year").textContent = new Date().getFullYear();

// Nagłówek — tło po przewinięciu
const header = document.getElementById("siteHeader");
const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Menu mobilne
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

const setNav = (open) => {
  nav.classList.toggle("open", open);
  document.body.classList.toggle("nav-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Zamknij menu" : "Otwórz menu");
};

navToggle.addEventListener("click", () => setNav(!nav.classList.contains("open")));

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setNav(false));
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && nav.classList.contains("open")) {
    setNav(false);
    navToggle.focus();
  }
});

// Animacje wejścia sekcji
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

// Podświetlenie aktywnej sekcji w nawigacji
const navLinks = [...nav.querySelectorAll('a[href^="/#"]:not(.btn)')];
const sections = navLinks
  .map((link) => document.getElementById(link.hash.slice(1)))
  .filter(Boolean);

if (sections.length && "IntersectionObserver" in window) {
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.hash === "#" + entry.target.id);
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => spy.observe(s));
}

// Formularz kontaktowy (Formspree)
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  const formStatus = document.getElementById("formStatus");

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitButton = contactForm.querySelector("button[type=submit]");
    submitButton.disabled = true;
    formStatus.textContent = "Wysyłanie…";
    formStatus.className = "form-status";

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        formStatus.textContent = "Dziękuję za wiadomość! Odpowiem najszybciej, jak to możliwe.";
        formStatus.classList.add("form-status-success");
        contactForm.reset();
      } else {
        formStatus.textContent = "Coś poszło nie tak. Spróbuj ponownie lub napisz bezpośrednio na e-mail.";
        formStatus.classList.add("form-status-error");
      }
    } catch {
      formStatus.textContent = "Brak połączenia. Spróbuj ponownie lub napisz bezpośrednio na e-mail.";
      formStatus.classList.add("form-status-error");
    } finally {
      submitButton.disabled = false;
    }
  });
}
