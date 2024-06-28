// hewwo, welcome to the source code :3
// sorry for the amount of crazy looking jsdoc and some questionable code style hehehehehe
// its kind of a mental illness thing nyaa

/** @param {string} query */
const $ = (query) => /** @type {HTMLElement}*/ (document.querySelector(query))

/** @type {Record<string, string[]>} */
const _els = {}

/** @param {string} query */
function $$(query)
{

}

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
        row.setAttribute("id", `row-${x}`)

        for (let y = 0; y < height; y++)
        {
            const column = document.createElement("div")
            column.setAttribute("id", `column-${y}-${x}`)

            //column.addEventListener("mouseover", () => shadow(x, y))
            //column.addEventListener("mouseout",  () => shadow(x, y, true))
            //column.addEventListener("click",     () => draw(x, y))
                
            row.appendChild(column)
        }

        board.appendChild(row)
    }

    board.addEventListener("mousedown",  () => drag = true)
    board.addEventListener("mouseup",    () => drag = false)
    board.addEventListener("mouseleave", () => drag = false)
}

/**
 * @param {number} x
 * @param {number} y
 * @param {boolean} r
 */
function shadow(x, y, r)
{
    //if (drag) draw(x, y)

    const element = $(`#column-${y}-${x}`)
    
    element.style.cssText = r ? "" : `background: var(--block-${current});`
}


