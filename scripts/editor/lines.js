import { $, editor } from "../utils/dom.js";

const lineNumbers = $("line-num-content");
const lineNumsContainer = $("line-nums");

function updateLineNums() {
    const lineNum = editor.value.split('\n').length
    lineNumbers.textContent =
        Array.from({ length: lineNum }, (_, i) => i + 1)
            .join('\n')
}

function syncLineNumsScroll() {
    lineNumsContainer.scrollTop = editor.scrollTop
}

export function initLineNumbers() {
    updateLineNums()
    editor.addEventListener('input', updateLineNums)
    editor.addEventListener('scroll', syncLineNumsScroll)
}