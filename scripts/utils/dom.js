export const $ = (id) =>
    document.getElementById(id);

export const $$ = (selector) =>
    document.querySelectorAll(selector);

export const editor = $("code-editor");