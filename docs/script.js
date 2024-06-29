// hewwo, welcome to the source code :3
// sorry for the amount of crazy looking jsdoc clutter and some questionable code style hehehehehe
// its kind of a mental illness thing nyaa

/** @param {string} query */
const $ = (query) => /** @type {HTMLElement}*/ (document.querySelector(query))


/** @type {Record<string, string[]>} */
//const _els = {}

/** @param {string} query */
/*function $$(query)
{

}*/

//

/** @type {"z" | "l" | "o" | "s" | "i" | "j" | "t" | "#" | "@" | "_"} */
let current     = "z" 
let mapString   = ""
let queueString = ""

let drag = false

{
    const params = new URLSearchParams(window.location.search)

    var width  = Number(params.get("w") ?? 10)
    var height = Number(params.get("h") ?? 40)
}

init()
function init()
{
    const board = ($("#editor-board"))

    mapString       = "_".repeat(height * width)
    board.innerHTML = ""

    ;(/** @type {HTMLTextAreaElement}*/ ($("#tools-map-string"))).value   = mapString
    ;(/** @type {HTMLTextAreaElement}*/ ($("#tools-queue-string"))).value = ""

    for (let x = 0; x < width; x++)
    {
        const row = document.createElement("div")
        row.setAttribute("id", `editor-board-row-${x}`)

        for (let y = 0; y < height; y++)
        {
            const column = document.createElement("div")
            column.setAttribute("id", `editor-board-column-${y}-${x}`)

            column.addEventListener("mouseover", () => shadow(x, y, false))
            column.addEventListener("mouseout",  () => shadow(x, y, true))
            column.addEventListener("click",     () => draw(x, y))
                
            row.appendChild(column)
        }

        board.appendChild(row)
    }

    board.addEventListener("mousedown",  () => drag = true)
    board.addEventListener("mouseup",    () => drag = false)
    board.addEventListener("mouseleave", () => drag = false)
}

const palette = {
    "z": "#b5353b",
    "l": "#b96737", 
    "o": "#b89e36",
    "s": "#84b434",
    "i": "#34b585",
    "j": "#5240a6",
    "t": "#a6409c",
    "#": "#4b4b4b",
    "@": "#222222",
    "_": "#283145"
}

/**
 * @param {number} x
 * @param {number} y
 * @param {boolean} r
 */
function shadow(x, y, r)
{
    if (drag) draw(x, y)

    const element = $(`#editor-board-column-${y}-${x}`)
    
    element.style.cssText = r ? "" : `background: ${palette[current]};`
}

/**
 * @param {number} x
 * @param {number} y
 */
function draw(x, y)
{
    const element = $(`#editor-board-column-${y}-${x}`)
  
    element.className = ""
    element.classList.add(`editor-board-tile-${current.replace("@", "d").replace("#", "g").replace("_", "e")}`)

    // this is ass
    if (mapString.length !== width * height) mapString += "_".repeat((width * height) - mapString.length)

    const index = y * width + x
    mapString   = mapString.substring(0, index) + current + mapString.substring(index + 1)

    //console.log(mapString)
}    

$("#tools-picker-z").addEventListener("click", () => setCurrent("z"))
$("#tools-picker-l").addEventListener("click", () => setCurrent("l"))
$("#tools-picker-o").addEventListener("click", () => setCurrent("o"))
$("#tools-picker-s").addEventListener("click", () => setCurrent("s"))
$("#tools-picker-i").addEventListener("click", () => setCurrent("i"))
$("#tools-picker-j").addEventListener("click", () => setCurrent("j"))
$("#tools-picker-t").addEventListener("click", () => setCurrent("t"))
$("#tools-picker-g").addEventListener("click", () => setCurrent("g"))
$("#tools-picker-d").addEventListener("click", () => setCurrent("d"))
$("#tools-picker-e").addEventListener("click", () => setCurrent("e"))

/**
 * @param {"z" | "l" | "o" | "s" | "i" | "j" | "t" | "g" | "d" | "e"} p
 */
function setCurrent(p)
{
    //@ts-ignore
    current = p
    .replace("d", "@")
    .replace("g", "#")
    .replace("e", "_")

    console.log(current)

    for (const x of ["z", "l", "o", "s", "i", "j", "t", "g", "d", "e"])
    {
        if (p === x) 
        {
            $(`#tools-picker-${x}`).classList.add("picker-highlight")
            continue
        }
        
        $(`#tools-picker-${x}`).classList.remove("picker-highlight")
    }
}

