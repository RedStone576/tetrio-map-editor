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
    // ass
    for (const x of ["Z", "L", "O", "S", "I", "J", "T", "G", "D", "E"]) {
        if (p === x) {
            $(`#tools-picker-${x}`).classList.add("picker-highlight");
            continue;
        }
        $(`#tools-picker-${x}`).classList.remove("picker-highlight");
    }
}
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
    // this is ass
    if (mapString.length !== width * height)
        mapString += "_".repeat((width * height) - mapString.length);
    const index = y * width + x;
    mapString = mapString.substring(0, index) + current + mapString.substring(index + 1);
    $("#tools-map-string").value = (mapString + (queueString ? "?" : "") + queueString).toUpperCase();
}
