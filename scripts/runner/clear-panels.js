import { $ } from "../utils/dom.js";
import { showConfirm } from "../utils/confirm.js";

const input = $("input-box");
const output = $("output-box");

const DEFAULT_OUTPUT = "Run your code to see the output...";

function clearInput() {
    input.value = "";
    input.focus();
}

function clearOutput() {
    output.textContent = DEFAULT_OUTPUT;
}

function confirmClear(titleText, messageText, callback) {
    showConfirm({
        titleText,
        messageText,
        onConfirm: callback,
    });
}

export function initClearPanels() {
    const clearInputButtons = [
        $("clear-input"),
        $("clear-input-mobile"),
    ];

    const clearOutputButtons = [
        $("clear-output"),
        $("clear-output-mobile"),
    ];

    clearInputButtons.forEach((btn) => {
        if (!btn)
            return;

        btn.addEventListener("click", (e) => {
            confirmClear(
                "Clear Input?",
                "This will permanently remove all program input.",
                clearInput
            );
        });
    });

    clearOutputButtons.forEach((btn) => {
        if (!btn)
            return;
        btn.addEventListener("click", (e) => {
            confirmClear(
                "Clear Output?",
                "This will remove the current program output.",
                clearOutput
            );
        });
    });
}