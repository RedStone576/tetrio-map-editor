"use strict";
const $ = (query) => document.querySelector(query);
let current = "E";
let mapString = "";
let queueString = "";
let drag = false;
{
    const params = new URLSearchParams(window.location.search);
    var width = Number(params.get("w") ?? 10);
    var height = Number(params.get("h") ?? 40);
}
