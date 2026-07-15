const PAIRS = { '(': ')', '[': ']', '{': '}', '"': '"', "'": "'" };
const CLOSERS = new Set([')', ']', '}', '"', "'"]);

export function handleOpenPair(e, editor) {
    if (!PAIRS[e.key])
        return false

    const start = editor.selectionStart
    const end = editor.selectionEnd

    const text = editor.value
    e.preventDefault()
    if (start == end) {
        editor.value = text.slice(0, start) + e.key + PAIRS[e.key] + text.slice(end)
        editor.selectionEnd = editor.selectionStart = start + 1
    }
    else {
        editor.value = text.slice(0, start) + e.key + text.slice(start, end) + PAIRS[e.key] + text.slice(end)
        editor.selectionStart = start + 1
        editor.selectionEnd = end + 1
    }
    return true
}

export function handleCloser(e, editor) {
    if (!CLOSERS.has(e.key))
        return false

    const start = editor.selectionStart
    const text = editor.value
    if (text[start] !== e.key)
        return false

    e.preventDefault()
    editor.selectionStart = editor.selectionStart = start + 1
    return true
}

export function handlePairBackspace(e, editor) {
    if (e.key !== 'Backspace')
        return false

    const start = editor.selectionStart
    const text = editor.value
    const before = text[start - 1]
    const after = text[start]
    if (start !== editor.selectionEnd)
        return false
    if (PAIRS[before] !== after)
        return false

    e.preventDefault()
    editor.value = text.slice(0, start - 1) + text.slice(start + 1)
    editor.selectionEnd = editor.selectionStart = start - 1
    return true
}
