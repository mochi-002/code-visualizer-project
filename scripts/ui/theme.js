import { $, $$ } from "../utils/dom.js";
import { getTheme, setTheme } from "../utils/storage.js";

const themeBtn = $("theme-btn");
const html = document.documentElement;
const mobileThemeButtons = $$("[data-theme]");

function applyTheme(theme) {
    html.classList.toggle("dark", theme === "dark");
}

function loadTheme() {
    const savedTheme = getTheme();
    applyTheme(savedTheme);
}

function toggleTheme() {
    const newTheme = html.classList.contains("dark") ? "light" : "dark";
    applyTheme(newTheme);
    setTheme(newTheme);
}

export function initTheme() {
    loadTheme();
    themeBtn?.addEventListener("click", toggleTheme);

    mobileThemeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const theme = button.dataset.theme;
            applyTheme(theme);
            setTheme(theme);
        });
    });
}