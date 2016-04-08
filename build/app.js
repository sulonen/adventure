(function(angular) {
  'use strict';

  var app = angular.module('Adventure', []);

  app.controller('GameController', ['$scope', function($scope) {
    $scope.text = 'Welcome, Adventurer! What is your name?';
    $scope.input = 'Enter your name';

    $scope.handleInput = function() {
      function testFunction() {
        console.log('From inside testFunction');
      }

      testFunction();
    };

  }]);

})(window.angular);


// let grid = new Grid(5, 4, '.');
// grid.createGrid();
// 
// let monster = new Monster('The Dread Finnegan', 'Cries Pitifully');
// let player = new Player('You');
// 
// grid.placeItems([monster, player, 'Tasty Treats']);
// console.log(player);
// console.log(grid);
// 
'use strict';

(function(module) {
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
        this.grid[i][j] = this.fill;
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
        if (item.__proto__.constructor.name == 'Player'
            || item.__proto__.constructor.name =='Monster') {
          item.position = [hPosition, vPosition];
        }
        grid[hPosition][vPosition] = item;
      }
    });
  };

  module.Grid = Grid;
})(window);

'use strict';

(function(module) {
  function Character(hitpoints) {
    this.hitpoints = hitpoints;
    this.position = [];
  }

  function Monster(name, attack) {
    Character.call(this, 1);
    this.name = name;
    this.attack = attack;
  }

  function Player(name) {
    Character.call(this, 1);
    this.name = name;
    this.friend = [];
    this.carrying = ['A flashlight with no batteries'];
  }

  Monster.prototype.attack = function(player) {
    player.hitpoints -= 1;
  };

  Monster.prototype.friend = function(player) {
    player.friend.push(this.name);
  };

  Player.prototype.get = function(item) {
    this.carrying.push(item);
  };

  Player.prototype.give = function(item) {
    let index = this.carrying.indexOf(item);
    if (index) this.carrying.splice(index, 1);
  };

  module.Character = Character;
  module.Monster = Monster;
  module.Player = Player;
})(window);

