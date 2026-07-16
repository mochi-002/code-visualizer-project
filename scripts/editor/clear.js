import { $, editor } from "../utils/dom.js"
import { resetUI } from "./reset-ui.js";
import { updateLineNums } from "../utils/helpers.js";
import { showConfirm } from "../utils/confirm.js";

const clearButton = $("clearBtn");

function updateButton() {
    clearButton.disabled = editor.value.length === 0;
}

function clearEditor() {
    editor.value = "";
    updateLineNums(editor);
    resetUI();
    updateButton();
    requestAnimationFrame(() => {
        editor.focus();
    });
}

export function initClear() {
    updateButton();
    editor.addEventListener("input", updateButton);
    clearBtn.addEventListener("click", () => {
        showConfirm({
            titleText: "Clear Editor?",
            messageText:
                "This will permanently remove all code in the editor.",
            onConfirm: clearEditor,
        });
    });
}