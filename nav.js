const menuToggle = document.getElementById("menuToggle");
const mytopnav = document.getElementById("mytopnav");
const themeButtons = document.querySelectorAll(".theme-btn");

if (menuToggle && mytopnav) {
  menuToggle.addEventListener("click", () => {
    mytopnav.classList.toggle("open");
  });
}

const THEME_STORAGE_KEY = "msp-theme";
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

const normalizeThemeChoice = (value) => {
  if (!value) {
    return "sistema";
  }

  const normalized = value.toLowerCase();
  if (normalized === "light" || normalized === "dark") {
    return normalized;
  }

  return "sistema";
};

const getSystemTheme = () => (mediaQuery.matches ? "dark" : "light");

const applyTheme = (choice) => {
  const normalizedChoice = normalizeThemeChoice(choice);
  const effectiveTheme =
    normalizedChoice === "sistema" ? getSystemTheme() : normalizedChoice;

  document.documentElement.setAttribute("data-theme", effectiveTheme);

  themeButtons.forEach((button) => {
    const isActive = button.dataset.themeChoice === normalizedChoice;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
};

const savedChoice = normalizeThemeChoice(
  localStorage.getItem(THEME_STORAGE_KEY),
);
applyTheme(savedChoice);

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedChoice = normalizeThemeChoice(button.dataset.themeChoice);
    localStorage.setItem(THEME_STORAGE_KEY, selectedChoice);
    applyTheme(selectedChoice);
  });
});

mediaQuery.addEventListener("change", () => {
  const currentChoice = normalizeThemeChoice(
    localStorage.getItem(THEME_STORAGE_KEY),
  );

  if (currentChoice === "sistema") {
    applyTheme("sistema");
  }
});
