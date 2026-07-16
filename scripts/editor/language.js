import { resetUI } from "./reset-ui.js";
import { getLanguage } from "../utils/storage.js";
import { PYTHON_DEFAULT, CPP_DEFAULT } from "../utils/constants.js";
import { $, $$, editor } from "../utils/dom.js";
import { setLanguage } from "../utils/storage.js";

const fileName = $("filename");

const desktopButtons = $$("[data-lang]");
const mobileButtons = $$("[data-mobile-lang]");
const pythonBtn = $("btn-py")
const cppBtn = $("btn-cpp")

function updateLanguageButtons(lang) {
    pythonBtn.classList.toggle(
        "lang-btn-python-active",
        lang === "python"
    );

    cppBtn.classList.toggle(
        "lang-btn-cpp-active",
        lang === "cpp"
    );

    pythonBtn.classList.toggle(
        "lang-btn-inactive",
        lang !== "python"
    );

    cppBtn.classList.toggle(
        "lang-btn-inactive",
        lang !== "cpp"
    );
}

function applyLanguage(lang) {
    setLanguage(lang);

    editor.placeholder = lang === "python"
        ? PYTHON_DEFAULT
        : CPP_DEFAULT;

    fileName.textContent = lang === "python"
        ? "main.py"
        : "main.cpp";

    localStorage.setItem("language", lang);
    updateLanguageButtons(lang)
    resetUI();
}

export function initLanguage() {
    const saved = getLanguage();
    applyLanguage(saved);

    [...desktopButtons].forEach(button => {
        button.addEventListener("click", () => {
            const lang = button.dataset.lang || button.dataset.mobileLang;
            applyLanguage(lang);
        });
    });

    [...mobileButtons].forEach(button => {
        button.addEventListener("click", () => {
            const lang = button.dataset.lang || button.dataset.mobileLang;
            applyLanguage(lang);
        });
    });
}