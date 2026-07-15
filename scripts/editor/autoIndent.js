export function handleEnter(e, editor) {
    if (e.key !== "Enter")
        return false;

    e.preventDefault();
    const start = editor.selectionStart;
    const text = editor.value;
    const before = text.slice(0, start);
    const after = text.slice(start);
    const currentLine = before.split("\n").pop();
    const indent = currentLine.match(/^\s*/)[0];
    const lastChar = currentLine.trimEnd().slice(-1);
    const extraIndent =
        ["{", "[", "(", ":"].includes(lastChar) ? "    " : "";

    const nextChar = after.trimStart()[0];
    if (["}", "]", ")"].includes(nextChar)) {
        const insideIndent = indent + extraIndent;
        const closingIndent = insideIndent.replace(/^ {4}/, "");
        editor.value = before + "\n" + insideIndent + "\n" + closingIndent + after.trimStart();
        editor.selectionStart = editor.selectionEnd = start + 1 + insideIndent.length;
        return true;
    }
    editor.value = before + "\n" + indent + extraIndent + after;
    editor.selectionStart = editor.selectionEnd = start + 1 + indent.length + extraIndent.length;
    return true;
}

export function handleTab(e, editor) {
    if (e.key !== 'Tab')
        return false

    e.preventDefault()
    const start = editor.selectionStart
    const end = editor.selectionEnd
    const text = editor.value
    const currLine = text.substring(0, start).split('\n').pop()

    if (e.shiftKey) {
        const lineStart = start - currLine.length
        const spaces = currLine.match(/^ {1,4}/)
        editor.value = text.slice(0, lineStart)
            + currLine.slice(spaces[0].length)
            + text.slice(end)
        editor.selectionStart = editor.selectionEnd = start - spaces[0].length
    }
    else {
        editor.value = text.slice(0, start) + '    ' + text.slice(start)
        editor.selectionStart = editor.selectionEnd = start + 4
    }
    return true
}

export function handleHome(e, editor) {
    if (e.key !== 'Home' || e.ctrlKey   )
        return false

    e.preventDefault()
    const start = editor.selectionStart
    const text = editor.value
    const currLine = text.substring(0, start).split('\n').pop()
    const lineStart = start - currLine.length
    const firstNonSpace = lineStart + currLine.match(/^(\s*)/)[1].length
    editor.selectionStart = editor.selectionEnd =
        start === firstNonSpace ? lineStart : firstNonSpace
    return true;
}
