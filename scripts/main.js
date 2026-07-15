import { editor, python_btn, cpp_btn, toggleBtn, checkSyntaxButton, runButton, output } from "./componants/defaults.js";
import { initLineNumbers } from "./editor/lineNumbers.js";
import { handleEnter, handleTab, handleHome } from './editor/autoIndent.js';
import { handleComment } from "./editor/comments.js";
import { handleOpenPair, handlePairBackspace, handleCloser } from './editor/autoPairs.js';
import { setLanguage } from './editor/language.js';
// import { runCpp, runPython } fromN "./runner/runCode.js";
// import { checkCppSyntax, checkPythonSyntax } from "./runner/checkSyntax.js";

let language = 'p'
setLanguage(editor, language)
initLineNumbers(editor)

editor.addEventListener('keydown', e => {
    const updateLineNums = () => editor.dispatchEvent(new Event('input'))

    if (handleTab(e, editor)) { updateLineNums(); return; }
    if (handleEnter(e, editor)) { updateLineNums(); return; }
    if (handleHome(e, editor)) { return; }
    if (handleComment(e, editor)) { updateLineNums(); return; }
    if (handlePairBackspace(e, editor)) { updateLineNums(); return; }
    if (handleCloser(e, editor)) { return; }
    if (handleOpenPair(e, editor)) { updateLineNums(); return; }
})

python_btn.addEventListener('click', () => {
    language = 'p'
    setLanguage(editor, language)
    python_btn.classList.remove('lang-btn-inactive')
    python_btn.classList.add('lang-btn-python-active')
    cpp_btn.classList.remove('lang-btn-cpp-active')
    cpp_btn.classList.add('lang-btn-inactive')
})

cpp_btn.addEventListener('click', () => {
    language = 'c'
    setLanguage(editor, language)
    python_btn.classList.add('lang-btn-inactive')
    python_btn.classList.remove('lang-btn-python-active')
    cpp_btn.classList.add('lang-btn-cpp-active')
    cpp_btn.classList.remove('lang-btn-inactive')
})

toggleBtn.addEventListener('click', () => {
    const html = document.documentElement;
    html.classList.toggle('dark');
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
});