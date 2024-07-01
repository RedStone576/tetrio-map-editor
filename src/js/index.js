"use strict";
// load this first, then binding.js, and then board.js
const $ = (query) => document.querySelector(query);
// # : (G)arbage
// @ : (D)ark garbage
// _ : (E)empty
let current = "E";
let mapString = "";
let queueString = "";
let drag = false;
{
    const params = new URLSearchParams(window.location.search);
    var width = Number(params.get("w") ?? 10);
    var height = Number(params.get("h") ?? 40);
}
