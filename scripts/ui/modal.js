import { $ } from "../utils/dom.js"

const overlay = $("visualizer-overlay");
const openBtn = $("open-visualizer");
const closeBtn = $("close-visualizer");

let isOpen = false

function openVisualizer() {
    if (isOpen)
        return;

    isOpen = true;

    overlay.classList.remove("hidden");
    overlay.classList.add("flex");
    document.body.classList.add("overflow-hidden");
}

function closeVisualizer() {
    if (!isOpen)
        return;

    isOpen = false;

    const modal = overlay.firstElementChild;
    modal.classList.remove("animate-menu-open");
    modal.classList.add("animate-menu-close");
    modal.addEventListener("animationend", () => {
        overlay.classList.remove("flex");
        overlay.classList.add("hidden");
        modal.classList.remove("animate-menu-close");
        modal.classList.add("animate-menu-open");
    }, { once: true });
    document.body.classList.remove("overflow-hidden");
}

export function initVisualizerModal() {
    openBtn.addEventListener("click", openVisualizer);
    closeBtn.addEventListener("click", closeVisualizer);
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay)
            closeVisualizer();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape")
            closeVisualizer();
    });
}