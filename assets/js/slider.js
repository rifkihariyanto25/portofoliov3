// Logo Slider Configuration
const logoSliderConfig = {
  logos: [
    // Backend Core
    { src: "https://cdn.simpleicons.org/laravel/FF2D20", alt: "Laravel" },
    { src: "https://cdn.simpleicons.org/php/777BB4", alt: "PHP" },
    { src: "https://cdn.simpleicons.org/mysql/4479A1", alt: "MySQL" },
    { src: "https://cdn.simpleicons.org/postman/FF6C37", alt: "Postman" },

    // Version Control
    { src: "https://cdn.simpleicons.org/git/F05032", alt: "Git" },
    { src: "https://cdn.simpleicons.org/github/181717", alt: "GitHub" },

    // Documentation (INI NILAI JUAL LU)
    {
      src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microsoftword.svg",
      alt: "Microsoft Word",
    },
    { src: "https://cdn.simpleicons.org/notion/000000", alt: "Notion" },

    // Dev Tools
    {
      src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/visualstudiocode.svg",
      alt: "VS Code",
    },

    // Supporting
    { src: "https://cdn.simpleicons.org/javascript/F7DF1E", alt: "JavaScript" },
    {
      src: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
      alt: "Tailwind CSS",
    },
  ],
};

// Initialize Logo Slider
function initLogoSlider() {
  const sliderContainer = document.querySelector(".logo-slider");

  if (!sliderContainer) {
    console.warn("Logo slider container not found");
    return;
  }

  // Clear existing content
  sliderContainer.innerHTML = "";

  // Create logo items - render twice for seamless loop
  const createLogoItems = () => {
    return logoSliderConfig.logos
      .map(
        (logo) => `
      <div class="logo-item">
        <img src="${logo.src}" alt="${logo.alt}" loading="lazy" />
      </div>
    `
      )
      .join("");
  };

  // Render logos twice for seamless infinite scroll
  sliderContainer.innerHTML = createLogoItems() + createLogoItems();

  console.log(
    "Logo slider initialized with",
    logoSliderConfig.logos.length,
    "logos"
  );
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLogoSlider);
} else {
  initLogoSlider();
}
