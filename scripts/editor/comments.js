export function handleComment(e, editor, lang) {
    if (!(e.ctrlKey || e.metaKey) || e.key !== '/')
        return false

    e.preventDefault()
    const start = editor.selectionStart
    const text = editor.value
    const currLine = text.substring(0, start).split('\n').pop()
    const lineStart = start - currLine.length
    const lineEnd = text.indexOf('\n', start)
    const end = (lineEnd === -1 ? text.length : lineEnd)
    const line = text.substring(lineStart, end)
    const comment = (lang === 'python' ? '# ' : '// ')
    const indent = line.match(/^\s*/)[0];
    const content = line.slice(indent.length)

    let newLine;

    if (line.trimStart().startsWith(comment.trim()))
        newLine = indent + content.replace(comment, "")
    else
        newLine = indent + comment + content

    editor.value = text.slice(0, lineStart) + newLine + text.slice(end)
    editor.selectionStart = editor.selectionEnd = start + (newLine.length - line.length)
    
    return true
}
