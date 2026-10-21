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

// Zgoda na cookies (Google Consent Mode v2 + Meta Pixel)
const cookieBanner = document.getElementById("cookieBanner");

const showCookieBanner = (show) => {
  if (!cookieBanner) return;
  cookieBanner.hidden = !show;
  document.body.classList.toggle("cookie-open", show);
};

const setConsent = (value) => {
  try { localStorage.setItem("sm_consent", value); } catch {}
  if (typeof gtag === "function") {
    gtag("consent", "update", {
      ad_storage: value,
      ad_user_data: value,
      ad_personalization: value,
      analytics_storage: value,
    });
  }
  if (value === "granted" && typeof smLoadPixel === "function") smLoadPixel();
  if (value === "denied" && window.fbq) fbq("consent", "revoke");
  showCookieBanner(false);
};

if (cookieBanner) {
  let stored = null;
  try { stored = localStorage.getItem("sm_consent"); } catch {}
  if (!stored) showCookieBanner(true);

  cookieBanner.querySelectorAll("[data-consent]").forEach((button) => {
    button.addEventListener("click", () => setConsent(button.dataset.consent));
  });

  document.querySelectorAll("[data-cookie-settings]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      showCookieBanner(true);
    });
  });
}

// Pasek „Zadzwoń” poza godzinami (pn–pt 8–18, czas polski) prowadzi do formularza
const callBarPhone = document.querySelector(".call-bar-phone");

if (callBarPhone) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Warsaw", weekday: "short", hour: "numeric", hourCycle: "h23" })
      .formatToParts(new Date())
      .map((p) => [p.type, p.value])
  );
  const hour = Number(parts.hour);
  const isOpen = !["Sat", "Sun"].includes(parts.weekday) && hour >= 8 && hour < 18;

  if (!isOpen) {
    callBarPhone.href = document.getElementById("kontakt") ? "#kontakt" : "/#kontakt";
    callBarPhone.removeAttribute("data-track");
    callBarPhone.setAttribute("aria-label", "Zostaw numer — oddzwonię w godzinach pracy");
    callBarPhone.querySelector(".call-bar-label").textContent = "Zostaw numer — oddzwonię";
  }
}

// Pomiar: kliknięcia w telefon i WhatsApp
const trackEvent = (gaEvent, params, metaEvent) => {
  if (typeof gtag === "function") gtag("event", gaEvent, params);
  if (metaEvent && window.fbq) fbq("track", metaEvent, params);
};

document.addEventListener("click", (e) => {
  const link = e.target.closest("a[href^='tel:'], a[href*='wa.me/']");
  if (!link) return;
  const isWhatsApp = link.href.includes("wa.me/");
  trackEvent(isWhatsApp ? "click_whatsapp" : "click_phone", { page_path: location.pathname }, "Contact");
});

// Pomiar: zgłoszenie z formularza (tylko po faktycznym wysłaniu, nie przy samym wejściu na /dziekuje/)
if (location.pathname.startsWith("/dziekuje")) {
  let leadSource = null;
  try {
    leadSource = sessionStorage.getItem("sm_lead");
    sessionStorage.removeItem("sm_lead");
  } catch {}
  if (leadSource) trackEvent("generate_lead", { lead_source: leadSource }, "Lead");
}

// Pomiar: kliknięcia w linki afiliacyjne (który produkt i sklep, z którego wpisu)
document.addEventListener("click", (e) => {
  const link = e.target.closest("a[data-afiliacja]");
  if (!link) return;
  trackEvent("click_affiliate", {
    produkt: link.dataset.afiliacja,
    sklep: link.dataset.sklep,
    page_path: location.pathname,
  });
});

// Pomiar: kliknięcia w zachętę do montażu w treści wpisu (_includes/zacheta.html)
document.addEventListener("click", (e) => {
  const link = e.target.closest("a[data-cta]");
  if (!link) return;
  trackEvent("click_cta_montaz", { miejsce: link.dataset.cta, page_path: location.pathname });
});

// Formularz kontaktowy (Formspree)
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  const formStatus = document.getElementById("formStatus");

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    // Formspree nie przyjmuje zgłoszeń z pustą wiadomością
    const message = contactForm.elements.message;
    if (message && !message.value.trim()) message.value = message.dataset.default || "Proszę o kontakt.";
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
        try { sessionStorage.setItem("sm_lead", contactForm.elements.zrodlo?.value || "formularz"); } catch {}
        window.location.href = "/dziekuje/";
        return;
      } else {
        formStatus.textContent = "Coś poszło nie tak. Spróbuj ponownie lub zadzwoń: 604 447 928.";
        formStatus.classList.add("form-status-error");
      }
    } catch {
      formStatus.textContent = "Brak połączenia. Spróbuj ponownie lub zadzwoń: 604 447 928.";
      formStatus.classList.add("form-status-error");
    } finally {
      submitButton.disabled = false;
    }
  });
}

// Powiększanie grafik we wpisach — kliknięcie otwiera obraz na całym ekranie
const postImages = [...document.querySelectorAll(".post-content img")].filter((img) => !img.closest(".produkt"));

if (postImages.length) {
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.hidden = true;
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", "Powiększona grafika");
  lightbox.innerHTML = '<button type="button" class="lightbox-close" aria-label="Zamknij powiększenie">×</button><img alt="">';
  document.body.appendChild(lightbox);

  const bigImage = lightbox.querySelector("img");
  const closeButton = lightbox.querySelector(".lightbox-close");
  let opener = null;

  const closeLightbox = () => {
    lightbox.hidden = true;
    document.documentElement.classList.remove("lightbox-open");
    if (opener) opener.focus();
  };

  const openLightbox = (img) => {
    opener = img;
    bigImage.src = img.currentSrc || img.src;
    bigImage.alt = img.alt;
    lightbox.hidden = false;
    document.documentElement.classList.add("lightbox-open");
    closeButton.focus();
  };

  postImages.forEach((img) => {
    const wrap = document.createElement("span");
    wrap.className = "zoom-wrap";
    img.parentNode.insertBefore(wrap, img);
    wrap.appendChild(img);
    wrap.insertAdjacentHTML("beforeend", '<span class="zoom-badge" aria-hidden="true">🔍 Powiększ</span>');
    wrap.querySelector(".zoom-badge").addEventListener("click", () => openLightbox(img));
    img.classList.add("zoomable");
    img.tabIndex = 0;
    img.title = "Kliknij, aby powiększyć";
    img.addEventListener("click", () => openLightbox(img));
    img.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(img);
      }
    });
  });

  lightbox.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", (e) => {
    if (!lightbox.hidden && e.key === "Escape") closeLightbox();
  });
}
