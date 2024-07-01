// load this first, then binding.js, and then board.js

const $ = <T = HTMLElement>(query: string) => document.querySelector(query) as T

// # : (G)arbage
// @ : (D)ark garbage
// _ : (E)empty
let current: "Z" | "L" | "O" | "S" | "I" | "J" | "T" | "G" | "D" | "E" = "E" 

let mapString   = ""
let queueString = ""

let drag = false

{
    const params = new URLSearchParams(window.location.search)

    var width  = Number(params.get("w") ?? 10)
    var height = Number(params.get("h") ?? 40)
}
