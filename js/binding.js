"use strict";
$("#tools-picker-Z").addEventListener("click", () => setCurrent("Z"));
$("#tools-picker-L").addEventListener("click", () => setCurrent("L"));
$("#tools-picker-O").addEventListener("click", () => setCurrent("O"));
$("#tools-picker-S").addEventListener("click", () => setCurrent("S"));
$("#tools-picker-I").addEventListener("click", () => setCurrent("I"));
$("#tools-picker-J").addEventListener("click", () => setCurrent("J"));
$("#tools-picker-T").addEventListener("click", () => setCurrent("T"));
$("#tools-picker-G").addEventListener("click", () => setCurrent("G"));
$("#tools-picker-D").addEventListener("click", () => setCurrent("D"));
$("#tools-picker-E").addEventListener("click", () => setCurrent("E"));
function setCurrent(p) {
    current = p;
    console.log(current);
    for (const x of ["Z", "L", "O", "S", "I", "J", "T", "G", "D", "E"]) {
        if (p === x) {
            $(`#tools-picker-${x}`).classList.add("picker-highlight");
            continue;
        }
        $(`#tools-picker-${x}`).classList.remove("picker-highlight");
    }
}
const palette = {
    "Z": "#b5353b",
    "L": "#b96737",
    "O": "#b89e36",
    "S": "#84b434",
    "I": "#34b585",
    "J": "#5240a6",
    "T": "#a6409c",
    "G": "#4b4b4b",
    "D": "#222222",
    "E": "#283145"
};
function shadow(x, y, r) {
    if (drag)
        draw(x, y);
    const element = $(`#editor-board-column-${y}-${x}`);
    element.style.cssText = r ? "" : `background: ${palette[current]};`;
}
function draw(x, y) {
    const element = $(`#editor-board-column-${y}-${x}`);
    element.className = "";
    element.classList.add(`editor-board-tile-${current}`);
    if (mapString.length !== width * height)
        mapString += "_".repeat((width * height) - mapString.length);
    const c = current
        .replace("E", "_")
        .replace("G", "#")
        .replace("D", "@");
    const index = y * width + x;
    mapString = mapString.substring(0, index) + c + mapString.substring(index + 1);
    $("#tools-map-string").value = mapString + (queueString ? "?" : "") + queueString;
}
function queueOnInput(e) {
    const { inputType } = e;
    const selectionStart = $("#tools-queue-string").selectionStart;
    const value = $("#tools-queue-string").value.toUpperCase();
    const filter = ["Z", "L", "O", "S", "I", "J", "T", "?", ","];
    let filteredQueue = value
        .split("")
        .filter(char => filter.indexOf(char) > -1)
        .join("");
    let parts = filteredQueue.split("?");
    if (!/^[ZLOSIJT](,[ZLOSIJT])*$/.test(parts[0]))
        parts[0] = parts[0].replaceAll(",", "").split("").join(",");
    if (parts[1] && parts[1].length > 1)
        parts[1] = parts[1][0];
    filteredQueue = parts.length > 1 ? [parts[0], parts[1]].join("?") : parts[0];
    queueString = filteredQueue;
    $("#tools-queue-string").value = filteredQueue;
    $("#tools-map-string").value = mapString + (queueString ? "?" : "") + queueString;
    const sc = inputType === "deleteContentBackward" ? (selectionStart - 1) : (selectionStart + 1);
    $("#tools-queue-string").setSelectionRange(sc < 0 ? 0 : sc, sc < 0 ? 0 : sc);
}
function mapOnInput() {
    if ($("#tools-map-string").value === "") {
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const element = $(`#editor-board-column-${y}-${x}`);
                element.className = "";
                element.classList.add(`editor-board-tile-E`);
            }
        }
    }
    const selectionStart = $("#tools-map-string").selectionStart;
    const mapStringValue = $("#tools-map-string").value.toUpperCase().split("?");
    const filter = ["Z", "L", "O", "S", "I", "J", "T", "#", "@", "_", "?"];
    let filteredMapString = mapStringValue[0]
        .split("")
        .filter(char => filter.indexOf(char) > -1)
        .join("");
    if (filteredMapString.length > (width * height))
        filteredMapString = filteredMapString.slice(0, width * height);
    {
        const parts = mapStringValue.slice(1);
        var queueStringValue = parts.length > 2 ? [parts[0], parts[1]] : parts;
    }
    mapString = filteredMapString.toUpperCase();
    queueString = queueStringValue.join("?").toUpperCase();
    $("#tools-queue-string").value = queueString;
    $("#tools-map-string").value = mapString + (queueString ? "?" : "") + queueString;
    $("#tools-map-string").setSelectionRange(selectionStart, selectionStart);
    const mapArray = mapString.match(new RegExp(`.{1,${width}}`, "g"));
    if (!mapArray) {
        return;
    }
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (!mapArray?.[y]?.[x])
                return;
            const element = $(`#editor-board-column-${y}-${x}`);
            element.className = "";
            element.classList.add(`editor-board-tile-${mapArray[y][x].replace("_", "E").replace("#", "G").replace("@", "D")}`);
        }
    }
}
