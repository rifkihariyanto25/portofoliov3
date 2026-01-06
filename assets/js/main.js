// Initialize AOS (Animate On Scroll)
AOS.init({
  once: true,
  duration: 1000,
  easing: "ease-out-cubic",
});

// Initialize Typed.js for typing animation
new Typed(".typing", {
  strings: ["Tech Enthusiast", "Backend Developer", "Project Management"],
  typeSpeed: 80,
  backSpeed: 50,
  loop: true,
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const nav = document.getElementById("navbar");
  if (window.scrollY > 50) {
    nav.classList.add("shadow-2xl");
  } else {
    nav.classList.remove("shadow-2xl");
  }
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Close mobile menu when clicking on a link
document.querySelectorAll("#mobile-menu a, #nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });
});

// Project filter functionality
const filterButtons = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".project-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    projectItems.forEach((item) => {
      if (filter === "all" || item.classList.contains(filter)) {
        item.style.display = "block";
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "scale(1)";
        }, 10);
      } else {
        item.style.opacity = "0";
        item.style.transform = "scale(0.9)";
        setTimeout(() => {
          item.style.display = "none";
        }, 300);
      }
    });
  });
});

// Add transition to project items
projectItems.forEach((item) => {
  item.style.transition = "opacity 0.3s, transform 0.3s";
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
