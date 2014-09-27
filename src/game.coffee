map_size = 60
map = []
timer = undefined

class Cell
    constructor: (isAlive, id, x, y) ->
        @.isAlive = isAlive
        @.id = id
        @.x = x
        @.y = y
    isAlive: false
    id: 0
    x: 0
    y: 0

#Map Generating
makeMap = (size) ->
    map = []
    id = 1
    for rows in [1..size]
        row = []
        for col in [1..size]
            row.push(new Cell(false, id, rows, col))
            id++
        map.push row
    map

#Render map to page
renderMap = (map) ->
    $map = $('#map').empty()
    for row in map
        for cell in row
            if cell.isAlive then $map.append $("<div>").attr('id', cell.id).addClass('alive') else $map.append $("<div>").attr('id', cell.id).addClass('dead')          
    console.log "Map rendered!"

#Get neighbours alive cells
getNeighbours = (map, x, y) ->
    count = 0
    try count++ if map[x+1][y].isAlive
    try count++ if map[x+1][y+1].isAlive
    try count++ if map[x][y+1].isAlive
    try count++ if map[x-1][y+1].isAlive
    try count++ if map[x-1][y].isAlive
    try count++ if map[x-1][y-1].isAlive
    try count++ if map[x][y-1].isAlive
    try count++ if map[x+1][y-1].isAlive
    count

switchCell = (obj ,x, y) ->
    if obj.hasClass('dead')
        obj.removeClass('dead').addClass('alive')
        map[x-1][y-1].isAlive = true
    else 
        obj.removeClass('alive').addClass('dead')
        map[x-1][y-1].isAlive = false

# move to the next generation
nextGeneration = (map)->
    toChange = []
    for row in map
        for cell in row
            neighbours = getNeighbours(map, cell.x-1, cell.y-1)
            if cell.isAlive && (neighbours < 2 || neighbours > 3)
                toChange.push cell
                continue
            if !cell.isAlive && neighbours == 3
                toChange.push cell
                continue
    for ccell in toChange
        switchCell($('#' + ccell.id), ccell.x, ccell.y)




$ ->
    map = makeMap(map_size)
    console.log map
    renderMap map
    $("#map div").click ->
        id = $(@).attr('id')
        x = Math.floor(id / 61) + 1
        y = id % 60 || 60
        switchCell($(@), x, y)

    $("#step").click ->
        nextGeneration(map)

    $("#start").click ->
            timer = setInterval ( ->
                nextGeneration(map)
                ), 100

    $("#stop").click ->
        clearInterval(timer)