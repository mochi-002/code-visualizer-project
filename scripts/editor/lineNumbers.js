export function initLineNumbers(editor) {
    const lineNumsContainer = document.getElementById('line-nums')
    const lineNumsContent = document.getElementById('line-num-content')

    function updateLineNums() {
        const lineNum = editor.value.split('\n').length
        lineNumsContent.textContent = Array.from({ length: lineNum }, (_, i) => i + 1).join('\n')
    }

    function syncScroll() {
        lineNumsContainer.scrollTop = editor.scrollTop
    }

    editor.addEventListener('input', updateLineNums)
    editor.addEventListener('scroll', syncScroll)
    updateLineNums()
}