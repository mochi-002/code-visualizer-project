import { initLanguage } from "./language.js";
import { initLineNumbers } from "./lines.js";
import { initAutoPairs } from "./auto-pairs.js";
import { initAutoIndent } from "./auto-indent.js";
import { initComments } from "./toggle-comments.js";
import { initClear } from "./clear.js";

export function initEditor() {
    initLanguage();
    initLineNumbers();
    initAutoPairs();
    initAutoIndent();
    initComments();
    initClear();
}