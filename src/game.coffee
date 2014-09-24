map_size = 20

map = []

makeMap = (size) ->
	map = []
	for row in [0..size]
		row = []
		for col in [0..size]
			row.push 0
		map.push row

#TODO: make render function
renderMap = (map) ->
	console.log "Start map render..."
	$map = $('#map').empty()
	for row in map
		for cell in row
			$map.append $("<div>").addClass("c-#{cell}")
	console.log "Map render finished!"
$ ->
	renderMap makeMap(map_size)
