"use strict";
const $ = (query) => document.querySelector(query);
// # : (G)arbage
// @ : (D)ark garbage
// _ : (E)empty
let current = "_";
let mapString = "";
let queueString = "";
let drag = false;
{
    const params = new URLSearchParams(window.location.search);
    var width = Number(params.get("w") ?? 10);
    var height = Number(params.get("h") ?? 40);
}
init();
function init() {
    const board = $("#editor-board");
    mapString = "_".repeat(height * width);
    board.innerHTML = "";
    $("#tools-map-string").value = mapString;
    $("#tools-queue-string").value = "";
    for (let x = 0; x < width; x++) {
        const row = document.createElement("div");
        row.setAttribute("id", `editor-board-row-${x}`);
        for (let y = 0; y < height; y++) {
            const column = document.createElement("div");
            column.setAttribute("id", `editor-board-column-${y}-${x}`);
            column.addEventListener("mouseover", () => shadow(x, y, false));
            column.addEventListener("mouseout", () => shadow(x, y, true));
            column.addEventListener("click", () => draw(x, y));
            row.appendChild(column);
        }
        board.appendChild(row);
    }
    board.addEventListener("mousedown", () => drag = true);
    board.addEventListener("mouseup", () => drag = false);
    board.addEventListener("mouseleave", () => drag = false);
}
