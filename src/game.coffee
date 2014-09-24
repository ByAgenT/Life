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

