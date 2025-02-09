init()
function init()
{
    const board = $("#editor-board")

    mapString       = "_".repeat(height * width)
    board.innerHTML = ""

    $<HTMLTextAreaElement>("#tools-map-string").value   = mapString
    $<HTMLTextAreaElement>("#tools-queue-string").value = ""

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

    $("#tools-queue-string").addEventListener("input", queueOnInput)
    $("#tools-map-string").addEventListener("input", mapOnInput)
}
