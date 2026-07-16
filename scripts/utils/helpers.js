import { $ } from "./dom.js";

export function getSelection(editor) {
    return {
        text: editor.value,
        start: editor.selectionStart,
        end: editor.selectionEnd,
    };
}

export function moveCaret(editor, position) {
    editor.selectionStart =
        editor.selectionEnd =
        position;
}

export function updateLineNums(editor) {
    const lineNum = editor.value.split('\n').length
    const lineNumbers = $("line-num-content");
    lineNumbers.textContent =
        Array.from({ length: lineNum }, (_, i) => i + 1)
            .join('\n')
}