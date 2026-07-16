import { editor } from "../utils/dom.js ";
import { getSelection, moveCaret, updateLineNums } from "../utils/helpers.js";

const PAIRS = {
    "(": ")",
    "[": "]",
    "{": "}",
    '"': '"',
    "'": "'",
    "`": "`",
    "<": ">"
};

const CLOSERS = new Set(Object.values(PAIRS));

function handleOpenPair(e) {
    if (!PAIRS[e.key])
        return

    const { text, start, end } = getSelection(editor)
    const prev = text[start - 1];
    const next = text[start];

    if (
        (e.key === '"' || e.key === "'") &&
        /\w/.test(prev) &&
        /\w/.test(next)
    ) {
        return;
    }

    e.preventDefault()
    if (start === end) {
        editor.value = text.slice(0, start) + e.key + PAIRS[e.key] + text.slice(end)
        moveCaret(editor, start + 1)
    }
    else {
        editor.value = text.slice(0, start) + e.key + text.slice(start, end) + PAIRS[e.key] + text.slice(end)
        editor.selectionStart = start + 1
        editor.selectionEnd = end + 1
    }
    return
}

function handleCloser(e) {
    if (!CLOSERS.has(e.key))
        return

    const { text, start } = getSelection(editor)
    const prev = text[start - 1];
    const next = text[start];

    if (
        (e.key === '"' || e.key === "'") &&
        /\w/.test(prev) &&
        /\w/.test(next)
    ) {
        return;
    }

    if (text[start] !== e.key)
        return

    e.preventDefault()
    moveCaret(editor, start + 1)
    return
}

function handlePairBackspace(e) {
    if (e.key !== 'Backspace')
        return

    const { text, start } = getSelection(editor)
    const before = text[start - 1]
    const after = text[start]
    if (start !== editor.selectionEnd)
        return
    if (PAIRS[before] !== after)
        return

    e.preventDefault()
    editor.value = text.slice(0, start - 1) + text.slice(start + 1)
    moveCaret(editor, start - 1)
    return
}

export function initAutoPairs() {
    editor.addEventListener("keydown", (e) => {
        switch (e.key) {

            case e.key in PAIRS:
                handleOpenPair(e);
                break;

            case e.key in CLOSERS:
                handleCloser(e);
                break;

            case "Backspace":
                handlePairBackspace(e);
                break;
        }
        updateLineNums(editor);
    });
}