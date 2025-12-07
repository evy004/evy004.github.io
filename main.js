/* =============================
  LIGHT/DARK MODE SWITCHER
============================= */
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }
});

function myFunction() {
  var element = document.body;
  element.classList.toggle("dark-mode");
  if (element.classList.contains("dark-mode")) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
}

/* =============================
  TIMELINE SCROLL OBSERVER
============================= */
const timelineItems = document.querySelectorAll(".timeline-container");

const timelineObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});

timelineItems.forEach(item => timelineObserver.observe(item));

/* =============================
  HAMBURGER NAVBAR BUTTON
============================= */

const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

/* =============================
  CASE STUDY CAROUSEL
============================= */
const caseSlides = document.querySelectorAll(".case-slide");
const caseNext = document.querySelector(".case-next");
const casePrev = document.querySelector(".case-prev");
let caseIndex = 0;

function showCaseSlide(i) {
  caseIndex = (i + caseSlides.length) % caseSlides.length;
  caseSlides.forEach((slide, n) => slide.classList.toggle("active", n === caseIndex));
}

caseNext?.addEventListener("click", () => showCaseSlide(caseIndex + 1));
casePrev?.addEventListener("click", () => showCaseSlide(caseIndex - 1));

setInterval(() => showCaseSlide(caseIndex + 1), 5000);

/* =============================
  PROJECT CAROUSEL
============================= */
const slidesContainer = document.querySelector(".slides");
const transformSlides = document.querySelectorAll(".slide");
let transformIndex = 0;

function showTransformSlide(i) {
  if (!slidesContainer) return;
  transformIndex = (i + transformSlides.length) % transformSlides.length;
  slidesContainer.style.transform = `translateX(${-transformIndex * 100}%)`;
}

document.querySelector(".next")?.addEventListener("click", () => showTransformSlide(transformIndex + 1));
document.querySelector(".prev")?.addEventListener("click", () => showTransformSlide(transformIndex - 1));

setInterval(() => showTransformSlide(transformIndex + 1), 5000);

/* =============================
  REVEAL ELEMENTS ON SCROLL
============================= */
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  for (let el of reveals) {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("visible");
    }
  }
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* =============================
  PROJECT CARD 3D TILT EFFECT
============================= */
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 40;
    const rotateY = (x - centerX) / 40;

    card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) rotateX(0) rotateY(0)";
  });
});
