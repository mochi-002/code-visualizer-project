import { $, editor } from "../utils/dom.js";
import { getSelection, moveCaret, updateLineNums } from "../utils/helpers.js";

const INDENT = "    ";
const OPENING_CHARS = ["{", "[", "(", ":"];
const CLOSING_CHARS = ["}", "]", ")"];

function handleEnter(e) {
    if (e.key !== "Enter")
        return;

    e.preventDefault();
    const { text, start } = getSelection(editor);
    const before = text.slice(0, start);
    const after = text.slice(start);
    const currentLine = before.split("\n").pop();
    const indent = currentLine.match(/^\s*/)[0];
    const lastChar = currentLine.trimEnd().slice(-1);
    const extraIndent =
        OPENING_CHARS.includes(lastChar) ? INDENT : "";

    const nextChar = after.trimStart()[0];
    if (CLOSING_CHARS.includes(nextChar)) {
        const insideIndent = indent + extraIndent;
        const closingIndent = insideIndent.replace(/^ {4}/, "");
        editor.value = before + "\n" + insideIndent + "\n" + closingIndent + after.trimStart();
        moveCaret(editor, start + 1 + insideIndent.length);
        return;
    }
    editor.value = before + "\n" + indent + extraIndent + after;
    moveCaret(editor, start + 1 + indent.length + extraIndent.length);
    return;
}

function handleTab(e) {
    if (e.key !== 'Tab')
        return

    e.preventDefault()
    const { text, start, end } = getSelection(editor)
    const currLine = text.substring(0, start).split('\n').pop()

    if (e.shiftKey) {
        const lineStart = start - currLine.length
        const spaces = currLine.match(/^ {1,4}/)
        if (!spaces)
            return;
        editor.value = text.slice(0, lineStart)
            + currLine.slice(spaces[0].length)
            + text.slice(end)
        moveCaret(editor, start - spaces[0].length)
    }
    else {
        editor.value = text.slice(0, start) + INDENT + text.slice(start)
        moveCaret(editor, start + INDENT.length)
    }
    return
}

function handleHome(e) {
    if (e.key !== 'Home' || e.ctrlKey)
        return

    e.preventDefault()
    const { text, start } = getSelection(editor)
    const currLine = text.substring(0, start).split('\n').pop()
    const lineStart = start - currLine.length
    const firstNonSpace = lineStart + currLine.match(/^(\s*)/)[1].length
    moveCaret(editor, start === firstNonSpace ? lineStart : firstNonSpace)
    return;
}

export function initAutoIndent() {
    editor.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "Enter":
                handleEnter(e);
                break;

            case "Tab":
                handleTab(e);
                break;

            case "Home":
                handleHome(e);
                break;
        }
        updateLineNums(editor)
    });
}