import { editor } from "../utils/dom.js";
import { getLanguage } from "../utils/storage.js";
import { getSelection, moveCaret, updateLineNums } from "../utils/helpers.js";

const COMMENTS = {
    python: "#",
    cpp: "//"
};


function handleComment(e, editor, lang) {
    if (!(e.ctrlKey || e.metaKey) || e.key !== '/')
        return

    e.preventDefault()
    const { text, start } = getSelection(editor)
    const currLine = text.substring(0, start).split('\n').pop()
    const lineStart = start - currLine.length
    const lineEnd = text.indexOf('\n', start)
    const end = (lineEnd === -1 ? text.length : lineEnd)
    const line = text.substring(lineStart, end)
    const comment = COMMENTS[getLanguage()];
    const indent = line.match(/^\s*/)[0];
    const content = line.slice(indent.length)

    let newLine;

    if (line.trimStart().startsWith(comment.trim()))
        newLine = indent + content.replace(comment, "")
    else
        newLine = indent + comment + content

    editor.value = text.slice(0, lineStart) + newLine + text.slice(end)
    moveCaret(editor, start + (newLine.length - line.length))

    return
}

export function initComments() { 
    editor.addEventListener("keydown", (e) => {
        handleComment(e, editor, getLanguage())
    })
    updateLineNums(editor)
}