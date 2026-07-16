export function getTheme() {
    return localStorage.getItem("theme") ?? "dark";
}

export function setTheme(theme) {
    localStorage.setItem("theme", theme);
}

export function getLanguage() {
    return localStorage.getItem("language") ?? "python";
}

export function setLanguage(language) {
    localStorage.setItem("language", language);
}