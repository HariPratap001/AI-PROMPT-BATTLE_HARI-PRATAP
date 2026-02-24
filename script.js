// Smooth scroll for CTA and nav links using data-target or href anchors
const scrollButtons = document.querySelectorAll(".js-scroll-to, .nav__link[href^='#']");

function smoothScrollTo(targetSelector) {
  const target = document.querySelector(targetSelector);
  if (!target) return;

  const rect = target.getBoundingClientRect();
  const offset = window.scrollY + rect.top - 80; // account for sticky nav

  window.scrollTo({
    top: offset,
    behavior: "smooth",
  });
}

scrollButtons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    const datasetTarget = btn.getAttribute("data-target");
    const hrefTarget = btn.getAttribute("href");
    const targetSelector = datasetTarget || hrefTarget;

    if (!targetSelector || !targetSelector.startsWith("#")) return;

    event.preventDefault();
    smoothScrollTo(targetSelector);
  });
});

// Mobile navigation toggle
const nav = document.querySelector(".nav");
const burger = document.querySelector(".nav__burger");

if (burger && nav) {
  burger.addEventListener("click", () => {
    const isOpen = burger.classList.toggle("nav__burger--open");
    nav.classList.toggle("nav--open", isOpen);
  });

  // Close nav when clicking a link (on mobile)
  nav.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", () => {
      burger.classList.remove("nav__burger--open");
      nav.classList.remove("nav--open");
    });
  });
}

// Scroll reveal animations using IntersectionObserver
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealElements.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal--visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealElements.forEach((el) => observer.observe(el));
} else {
  // Fallback for very old browsers
  revealElements.forEach((el) => el.classList.add("reveal--visible"));
}

// Subtle 3D hologram-style motion for hero cards
const heroVisual = document.querySelector(".hero__visual");

if (heroVisual && window.matchMedia("(pointer: fine)").matches) {
  heroVisual.addEventListener("mousemove", (event) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    const mainCard = heroVisual.querySelector(".hero-card--main");
    const pizzaCard = heroVisual.querySelector(".hero-card--pizza");
    const drinkCard = heroVisual.querySelector(".hero-card--drink");

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
    const offsetX = clamp(x * 12, -10, 10);
    const offsetY = clamp(y * 12, -10, 10);

    if (mainCard) {
      const rotateX = clamp(-offsetY * 1.4, -10, 10);
      const rotateY = clamp(offsetX * 1.4, -10, 10);
      mainCard.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
    if (pizzaCard) {
      pizzaCard.style.transform = `translate(${offsetX * -0.5}px, ${offsetY * -0.5}px)`;
    }
    if (drinkCard) {
      drinkCard.style.transform = `translate(${offsetX * 0.5}px, ${offsetY * 0.5}px)`;
    }
  });

  heroVisual.addEventListener("mouseleave", () => {
    heroVisual
      .querySelectorAll(".hero-card")
      .forEach((card) => (card.style.transform = ""));
  });
}

// Set current year in footer
const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

