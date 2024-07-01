$("#tools-picker-Z").addEventListener("click", () => setCurrent("Z"))
$("#tools-picker-L").addEventListener("click", () => setCurrent("L"))
$("#tools-picker-O").addEventListener("click", () => setCurrent("O"))
$("#tools-picker-S").addEventListener("click", () => setCurrent("S"))
$("#tools-picker-I").addEventListener("click", () => setCurrent("I"))
$("#tools-picker-J").addEventListener("click", () => setCurrent("J"))
$("#tools-picker-T").addEventListener("click", () => setCurrent("T"))
$("#tools-picker-G").addEventListener("click", () => setCurrent("G"))
$("#tools-picker-D").addEventListener("click", () => setCurrent("D"))
$("#tools-picker-E").addEventListener("click", () => setCurrent("E"))

function setCurrent(p: typeof current)
{
    current = p

    console.log(current)

    // ass
    for (const x of ["Z", "L", "O", "S", "I", "J", "T", "G", "D", "E"])
    {
        if (p === x) 
        {
            $(`#tools-picker-${x}`).classList.add("picker-highlight")
            continue
        }
        
        $(`#tools-picker-${x}`).classList.remove("picker-highlight")
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
}

function shadow(x: number, y: number, r: boolean)
{
    if (drag) draw(x, y)

    const element = $(`#editor-board-column-${y}-${x}`)
    
    element.style.cssText = r ? "" : `background: ${palette[current]};`
}

function draw(x: number, y: number)
{
    const element = $(`#editor-board-column-${y}-${x}`)
  
    element.className = ""
    element.classList.add(`editor-board-tile-${current}`)

    // this is ass
    if (mapString.length !== width * height) mapString += "_".repeat((width * height) - mapString.length)

    const index = y * width + x
    mapString   = mapString.substring(0, index) + current + mapString.substring(index + 1)

    $<HTMLTextAreaElement>("#tools-map-string").value = (mapString + (queueString ? "?" : "") + queueString).toUpperCase()
}

// 

function queueOnInput()
{
    const value  = $<HTMLTextAreaElement>("#tools-queue-string").value.toUpperCase()
    const filter = ["Z", "L", "O", "S", "I", "J", "T", "?"]
    
    let filteredQueue = value
    .split("")
    .filter(char => filter.indexOf(char.toLowerCase()) > -1)
    .join("")

    // check delimiter
    if (filteredQueue.split("?").length > 2)
    {
      const parts = filteredQueue.split("?")
      
      filteredQueue = [parts[0], parts[1]].join("?")
    }
    
    queueString = filteredQueue
    $<HTMLTextAreaElement>("#tools-queue-string").value = filteredQueue
    $<HTMLTextAreaElement>("#tools-map-string").value   = mapString + (queueString ? "?" : "") + queueString
}

function mapOnInput()
{
    console.log("mapinput")

    const filter = ["Z", "L", "O", "S", "I", "J", "T", "?"]

    const selectionStart = $<HTMLTextAreaElement>("#tools-map-string").selectionStart
    const mapStringValue = $<HTMLTextAreaElement>("#tools-map-string").value/* "{mapString}?{queueString}?{holdPiece*}" */.split("?")
    
    let filteredMapString = mapStringValue[0]
    .split("")
    .filter(char => filter.indexOf(char.toLowerCase()) > -1)
    .join("")

    // chop off extra char, might change this later
    if (filteredMapString.length > (width * height)) filteredMapString = filteredMapString.slice(0, width * height)

    {
        const parts = mapStringValue.slice(1)
        // check if there's >2 delimiter
        var queueStringValue = parts.length > 2 ? [parts[0], parts[1]] : parts
    }

    mapString   = filteredMapString.toUpperCase()
    queueString = queueStringValue.join("?").toUpperCase()

    $<HTMLTextAreaElement>("#tools-queue-string").value = queueString
    $<HTMLTextAreaElement>("#tools-map-string").value   = mapString + (queueString ? "?" : "") + queueString

    $<HTMLTextAreaElement>("#tools-map-string").setSelectionRange(selectionStart, selectionStart)

    // draw
    const mapArray = mapString.match(new RegExp(`.{1,${width}}`, "g"))

    if (!mapArray) 
    {
        //init()
        return
    }

    for (let y = 0; y < height; y++)
    {
        for (let x = 0; x < width; x++)
        {
            if (!mapArray?.[y]?.[x]) return
        
            const element = $(`#editor-board-column-${y}-${x}`)
  
            element.className = ""
            element.classList.add(`editor-board-tile-${current}`)
        }
    }
}
