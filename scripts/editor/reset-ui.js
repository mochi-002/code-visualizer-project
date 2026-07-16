import { $ } from "../utils/dom.js";
import { defaultVisualizerCanvas, defaultVisualizerMobileCanvas, defaultVisualizerText, defaultLineNumText, defaultTracerBody, defaultTracerMobileBody, defaultInputBoxPlaceholder, defaultOutputBoxText } from "./defaults.js";

const inputBox = $("input-box");
const outputBox = $("output-box");
const tracerBody = $("tracer-body");
const tracerMobileBody = $("mobile-tracer-body");
const visCanvas = $("viz-canvas");
const visMobileCanvas = $("mobile-viz-canvas");
const visDetected = $("viz-detected");
const lineNum = $("current-line");
const lineNumMobile = $("mobile-current-line");

function resetOutput() {
    inputBox.placeholder = defaultInputBoxPlaceholder
    outputBox.textContent = defaultOutputBoxText
};

function resetTracer() {
    tracerBody.innerHTML = defaultTracerBody
    tracerMobileBody.innerHTML = defaultTracerMobileBody
};

function resetVisualizer() {
    visDetected.textContent = defaultVisualizerText
    visCanvas.innerHTML = defaultVisualizerCanvas
    visMobileCanvas.innerHTML = defaultVisualizerMobileCanvas
}

function resetCurrentLine() {
    lineNum.textContent = defaultLineNumText
    lineNumMobile.textContent = defaultLineNumText
};

export function resetUI() {
    resetOutput()
    resetTracer()
    resetVisualizer()
    resetCurrentLine()
}