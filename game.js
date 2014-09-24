(function() {
  var makeMap, map, map_size;

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

}).call(this);
