document.getElementById("year").textContent = new Date().getFullYear();

const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

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
