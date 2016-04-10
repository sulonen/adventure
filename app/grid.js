'use strict';

function Grid(horizontal, vertical, fill) {
  this.horizontal = horizontal;
  this.vertical = vertical;
  this.fill = fill;
  this.grid = [];
}

Grid.prototype.createGrid = function() {
  for (var i = 0; i < this.horizontal; i++) {
    this.grid[i] = [];
    for (var j = 0; j < this.vertical; j++) {
      this.grid[i][j] = [this.fill];
    }
  }
};

Grid.prototype.placeItems = function(items) {
  var horizontal = this.horizontal;
  var vertical = this.vertical;
  var fill = this.fill;
  var grid = this.grid;
  items.forEach(function(item) {
    var hPosition, vPosition;
    
    function position(horizontal, vertical) {
      hPosition = Math.floor(Math.random() * horizontal);
      vPosition = Math.floor(Math.random() * vertical);
    }

    position(horizontal, vertical);
    
    if (grid[hPosition][vPosition] != fill) {
      position(horizontal, vertical); 
    } else {
      if (item.__proto__.constructor.name == 'Monster'
          || item.__proto__.constructor.name == 'Thing') {
        item.position = [hPosition, vPosition];
      }
      grid[hPosition][vPosition] = [item];
    }
  });
};

module.exports.Grid = Grid;

