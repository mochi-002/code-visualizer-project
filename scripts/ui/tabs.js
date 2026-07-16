import { $$ } from "../utils/dom.js";

const buttons = $$("[data-tab]");
const panels = $$("[data-panel]");

function showTab(activeTab) {
    buttons.forEach(button => {
        const active = button.dataset.tab === activeTab;

        button.classList.toggle("tab-active", active);
        button.classList.toggle("tab-inactive", !active);
    });
    panels.forEach(panel => {
        const active = panel.dataset.panel === activeTab;

        if (active) {
            panel.classList.remove("hidden");
            // Restart animation
            panel.classList.remove("animate-fade-in");
            void panel.offsetWidth;
            panel.classList.add("animate-fade-in");
        } else {
            panel.classList.add("hidden");
        }
    });
}

export function initTabs() {
    showTab("input");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            showTab(button.dataset.tab);
        });
    });
}