(function() {
  var makeMap, map, map_size, renderMap;

  map_size = 20;

  map = [];

  makeMap = function(size) {
    var col, row, _i, _j, _results;
    map = [];
    _results = [];
    for (row = _i = 0; 0 <= size ? _i <= size : _i >= size; row = 0 <= size ? ++_i : --_i) {
      row = [];
      for (col = _j = 0; 0 <= size ? _j <= size : _j >= size; col = 0 <= size ? ++_j : --_j) {
        row.push(0);
      }
      _results.push(map.push(row));
    }
    return _results;
  };

  renderMap = function(map) {
    var $map, cell, row, _i, _j, _len, _len1;
    console.log("Start map render...");
    $map = $('#map').empty();
    for (_i = 0, _len = map.length; _i < _len; _i++) {
      row = map[_i];
      for (_j = 0, _len1 = row.length; _j < _len1; _j++) {
        cell = row[_j];
        $map.append($("<div>").addClass("c-" + cell));
      }
    }
    return console.log("Map render finished!");
  };

  $(function() {
    return renderMap(makeMap(map_size));
  });

}).call(this);
