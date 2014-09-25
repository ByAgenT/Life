(function() {
  var makeMap, map, map_size, renderMap;

  map_size = 60;

  map = [];

  makeMap = function(size) {
    var col, row, _i, _j;
    map = [];
    for (row = _i = 1; 1 <= size ? _i <= size : _i >= size; row = 1 <= size ? ++_i : --_i) {
      row = [];
      for (col = _j = 1; 1 <= size ? _j <= size : _j >= size; col = 1 <= size ? ++_j : --_j) {
        row.push(0);
      }
      map.push(row);
    }
    return map;
  };

  renderMap = function(map) {
    var $map, cell, id, row, _i, _j, _len, _len1;
    console.log("Start map render...");
    id = 1;
    $map = $('#map').empty();
    for (_i = 0, _len = map.length; _i < _len; _i++) {
      row = map[_i];
      for (_j = 0, _len1 = row.length; _j < _len1; _j++) {
        cell = row[_j];
        $map.append($("<div>").attr('id', id).addClass('dead'));
        id++;
      }
    }
    return console.log("Map render finished!");
  };

  $(function() {
    map = makeMap(map_size);
    renderMap(map);
    return $("#map div").click(function() {
      if ($(this).hasClass('dead')) {
        $(this).removeClass('dead').addClass('alive');
        map[$(this).attr('id')] = 1;
        return console.log("Changed to: " + map[$(this).attr('id')]);
      } else {
        $(this).removeClass('alive').addClass('dead');
        map[$(this).attr('id')] = 0;
        return console.log("Changed to: " + map[$(this).attr('id')]);
      }
    });
  });

}).call(this);
