map_size = 60
map = []

makeMap = (size) ->
    map = []
    for row in [1..size]
        row = []
        for col in [1..size]
            row.push 0
        map.push row
    map

renderMap = (map) ->
    console.log "Start map render..."
    id = 1
    $map = $('#map').empty()
    for row in map
        for cell in row
            $map.append $("<div>").attr('id', id).addClass('dead')
            id++
    console.log "Map render finished!"

$ ->
    map = makeMap(map_size)
    renderMap map
    $("#map div").click ->
        if $(@).hasClass('dead')
            $(@).removeClass('dead').addClass('alive')
            map[$(@).attr('id')] = 1
            console.log("Changed to: " + map[$(@).attr('id')])
        else 
            $(@).removeClass('alive').addClass('dead')
            map[$(@).attr('id')] = 0
            console.log("Changed to: " + map[$(@).attr('id')])




