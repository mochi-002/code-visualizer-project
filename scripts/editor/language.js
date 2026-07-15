import { fileName, input, output, tracerBody, visCanvas, visDetected, lineNum } from "../componants/defaults.js"

const PYTHON_DEFAULT = `def main():
    print("Hello, World!")


if __name__ == "__main__":
    main()
`;

const CPP_DEFAULT = `#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}
`;

function clearState() {
    input.value = ""
    output.textContent = `Run your code to see the Output ...`
    tracerBody.innerHTML = `<div class="text-[#d8d6d1] dark:text-border2 text-center px-3 sm:text-xl text-base">Run the code to trace its steps</div>`
    visDetected.textContent = `auto-detect from code`
    visCanvas.innerHTML = `<div class="dark:text-[#c9c7c2] text-[#2a2a2a] text-center leading-[2px]">
            Click <span class="capitalize dark:text-vis text-sky-700">vizualise</span>
            </div>`
    lineNum.textContent = `line -`
}

export function setLanguage(editor, lang) {
    editor.value = (lang === 'p' ? PYTHON_DEFAULT : CPP_DEFAULT)
    fileName.textContent = (lang === 'p' ? `main.py` : `main.cpp`)
    clearState()
}