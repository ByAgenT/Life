map_size = 60
map = []

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
    console.log "Start map render..."
    $map = $('#map').empty()
    for row in map
        for cell in row
            if cell.isAlive then $map.append $("<div>").attr('id', cell.id).addClass('alive') else $map.append $("<div>").attr('id', cell.id).addClass('dead')          
    console.log "Map render finished!"

#Get neighbours alive cells
getNeighbours = (map, x, y) ->
    count = 0
    count++ if map[x+1][y].isAlive
    count++ if map[x+1][y+1].isAlive
    count++ if map[x][y+1].isAlive
    count++ if map[x-1][y+1].isAlive
    count++ if map[x-1][y].isAlive
    count++ if map[x-1][y-1].isAlive
    count++ if map[x][y-1].isAlive
    count++ if map[x+1][y-1].isAlive
    count


$ ->
    map = makeMap(map_size)
    console.log map
    renderMap map
    $("#map div").click ->
        id = $(@).attr('id')
        x = Math.floor(id / 61) + 1
        y = id % 60 || 60
        console.log "x: " + x + " y: " + y
        if $(@).hasClass('dead')
            $(@).removeClass('dead').addClass('alive')
            map[x-1][y-1].isAlive = true
            #TODO: check getNeighbours
            console.log "Neighbours: " + getNeighbours(map, x-1, y-1)
        else 
            $(@).removeClass('alive').addClass('dead')
            map[x-1][y-1].isAlive = false
            console.log("Changed to: " + map[x-1][y-1])




