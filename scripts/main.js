import { initTheme } from "./ui/theme.js"; // ✔️
import { initMenu } from "./ui/menu.js"; // ✔️
import { initEditor } from "./editor/editor.js"; // ✔️
import { initVisualizerModal } from "./ui/modal.js";
import { initTabs } from "./ui/tabs.js";
import { initClear } from "./editor/clear.js";
import { initClearPanels } from "./runner/clear-panels.js";
import { initConfirm } from "./utils/confirm.js";
// import { initRunner } from "./runner/runner.js"; //

initTheme();
initMenu();
initEditor();
initVisualizerModal();
initTabs();
initClear();
initClearPanels();
initConfirm();
// initRunner();