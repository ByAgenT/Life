(function() {
  var Cell, getNeighbours, makeMap, map, map_size, nextGeneration, renderMap, switchCell, timer;

  map_size = 60;

  map = [];

  timer = void 0;

  Cell = (function() {
    function Cell(isAlive, id, x, y) {
      this.isAlive = isAlive;
      this.id = id;
      this.x = x;
      this.y = y;
    }

    Cell.prototype.isAlive = false;

    Cell.prototype.id = 0;

    Cell.prototype.x = 0;

    Cell.prototype.y = 0;

    return Cell;

  })();

  makeMap = function(size) {
    var col, id, row, rows, _i, _j;
    map = [];
    id = 1;
    for (rows = _i = 1; 1 <= size ? _i <= size : _i >= size; rows = 1 <= size ? ++_i : --_i) {
      row = [];
      for (col = _j = 1; 1 <= size ? _j <= size : _j >= size; col = 1 <= size ? ++_j : --_j) {
        row.push(new Cell(false, id, rows, col));
        id++;
      }
      map.push(row);
    }
    return map;
  };

  renderMap = function(map) {
    var $map, cell, row, _i, _j, _len, _len1;
    $map = $('#map').empty();
    for (_i = 0, _len = map.length; _i < _len; _i++) {
      row = map[_i];
      for (_j = 0, _len1 = row.length; _j < _len1; _j++) {
        cell = row[_j];
        if (cell.isAlive) {
          $map.append($("<div>").attr('id', cell.id).addClass('alive'));
        } else {
          $map.append($("<div>").attr('id', cell.id).addClass('dead'));
        }
      }
    }
    return console.log("Map rendered!");
  };

  getNeighbours = function(map, x, y) {
    var count;
    count = 0;
    try {
      if (map[x + 1][y].isAlive) {
        count++;
      }
    } catch (_error) {}
    try {
      if (map[x + 1][y + 1].isAlive) {
        count++;
      }
    } catch (_error) {}
    try {
      if (map[x][y + 1].isAlive) {
        count++;
      }
    } catch (_error) {}
    try {
      if (map[x - 1][y + 1].isAlive) {
        count++;
      }
    } catch (_error) {}
    try {
      if (map[x - 1][y].isAlive) {
        count++;
      }
    } catch (_error) {}
    try {
      if (map[x - 1][y - 1].isAlive) {
        count++;
      }
    } catch (_error) {}
    try {
      if (map[x][y - 1].isAlive) {
        count++;
      }
    } catch (_error) {}
    try {
      if (map[x + 1][y - 1].isAlive) {
        count++;
      }
    } catch (_error) {}
    return count;
  };

  switchCell = function(obj, x, y) {
    if (obj.hasClass('dead')) {
      obj.removeClass('dead').addClass('alive');
      map[x - 1][y - 1].isAlive = true;
      return console.log("Neighbours: " + getNeighbours(map, x - 1, y - 1));
    } else {
      obj.removeClass('alive').addClass('dead');
      map[x - 1][y - 1].isAlive = false;
      return console.log("Changed to: " + map[x - 1][y - 1]);
    }
  };

  nextGeneration = function(map) {
    var ccell, cell, neighbours, row, toChange, _i, _j, _k, _len, _len1, _len2, _results;
    toChange = [];
    for (_i = 0, _len = map.length; _i < _len; _i++) {
      row = map[_i];
      for (_j = 0, _len1 = row.length; _j < _len1; _j++) {
        cell = row[_j];
        neighbours = getNeighbours(map, cell.x - 1, cell.y - 1);
        if (cell.isAlive && (neighbours < 2 || neighbours > 3)) {
          toChange.push(cell);
          continue;
        }
        if (!cell.isAlive && neighbours === 3) {
          toChange.push(cell);
          continue;
        }
      }
    }
    _results = [];
    for (_k = 0, _len2 = toChange.length; _k < _len2; _k++) {
      ccell = toChange[_k];
      _results.push(switchCell($('#' + ccell.id), ccell.x, ccell.y));
    }
    return _results;
  };

  $(function() {
    map = makeMap(map_size);
    console.log(map);
    renderMap(map);
    $("#map div").click(function() {
      var id, x, y;
      id = $(this).attr('id');
      x = Math.floor(id / 61) + 1;
      y = id % 60 || 60;
      console.log("x: " + x + " y: " + y);
      return switchCell($(this), x, y);
    });
    $("#step").click(function() {
      return nextGeneration(map);
    });
    $("#start").click(function() {
      timer = setInterval((function() {
        return nextGeneration(map);
      }), 500);
      return console.log("Timer started...");
    });
    return $("#stop").click(function() {
      return clearInterval(timer);
    });
  });

}).call(this);
