import { $ } from "./dom.js";

const overlay = $("confirm-overlay");
const title = $("confirm-title");
const message = $("confirm-message");
const confirmBtn = $("confirm-confirm");
const cancelBtn = $("confirm-cancel");

let callback = null;

export function showConfirm({ titleText, messageText, onConfirm }) {
    title.textContent = titleText;
    message.textContent = messageText;
    callback = onConfirm;

    overlay.classList.remove("hidden");
    overlay.classList.add("flex");
    document.body.classList.add("overflow-hidden");
    confirmBtn.focus();
}

export function hideConfirm() {
    overlay.classList.add("hidden");
    overlay.classList.remove("flex");
    document.body.classList.remove("overflow-hidden");
    callback = null;
}

export function initConfirm() {
    confirmBtn.addEventListener("click", () => {
        callback?.();   
        hideConfirm();
    });

    cancelBtn.addEventListener("click", hideConfirm);

    overlay.addEventListener("click", e => {
        if (e.target === overlay) hideConfirm();
    });

    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && !overlay.classList.contains("hidden")) hideConfirm();
    });
}