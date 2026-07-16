import { $ } from "../utils/dom.js"
import { getLanguage, getTheme } from "../utils/storage.js"

const menu = $('mobile-menu')
const overlay = $('menu-overlay')
const hamburgerButton = $('hamburger-btn')

const langButtons = document.querySelectorAll("[data-mobile-lang]");
const themeButtons = document.querySelectorAll("[data-theme]");


function updateActiveButtons(type, value) {
    const buttons = type === "language"
        ? langButtons
        : themeButtons;

    buttons.forEach(btn => {
        const selected = type === "language"
            ? btn.dataset.mobileLang === value
            : btn.dataset.theme === value;

        const check = btn.querySelector(".active-check");

        if (selected) {
            btn.classList.add("bg-black/5", "dark:bg-white/5");

            if (!check) {
                const icon = document.createElement("i");

                if (type === "theme") {
                    icon.className = value === "dark"
                        ? "active-check fa-solid fa-check text-sky-400"
                        : "active-check fa-solid fa-check text-amber-400";
                } else {
                    icon.className = "active-check fa-solid fa-check text-orange-500";
                }

                btn.appendChild(icon);
            }
        } else {
            btn.classList.remove("bg-black/5", "dark:bg-white/5");

            if (check) {
                check.remove();
            }
        }
    });
}

function openMenu() {
    menu.classList.remove("hidden");
    overlay.classList.remove("hidden");

    menu.classList.remove("animate-menu-close");
    menu.classList.add("animate-menu-open");

    hamburgerButton.classList.add("toggle-btn");
}

function closeMenu() {
    menu.classList.remove("animate-menu-open");
    menu.classList.add("animate-menu-close");

    hamburgerButton.classList.remove("toggle-btn");

    // Wait until the close animation finishes
    menu.addEventListener(
        "animationend",
        () => {
            menu.classList.add("hidden");
            overlay.classList.add("hidden");
        },
        { once: true }
    );
}

function toggleMenu() {
    if (menu.classList.contains("hidden")) {
        openMenu();
    } else {
        closeMenu();
    }
}

export function initMenu() {
    hamburgerButton.addEventListener("click", toggleMenu)
    overlay.addEventListener("click", closeMenu)

    menu.querySelectorAll("button, a").forEach(item => {
        item.addEventListener("click", closeMenu)
    })

    langButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            updateActiveButtons("language", btn.dataset.mobileLang)
        })
    })

    themeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            updateActiveButtons("theme", btn.dataset.theme);
        });
    });

    const savedLanguage = getLanguage()
    const savedTheme = getTheme()

    updateActiveButtons("language", savedLanguage);
    updateActiveButtons("theme", savedTheme);
}