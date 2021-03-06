'use strict';

const angular = require('angular');
const Grid = require('./grid').Grid;
const Thing = require('./thing').Thing;
const move = require('./move');
const character = require('./character');
const Warrior = character.Warrior;
const Archer = character.Archer;
const Monster = character.Monster;

var app = angular.module('Adventure', []);

app.controller('GameController', ['$scope', function($scope) {
  var grid;
  var player;
  var playerClass = null;
  var monster;
  var treats;
  var clock = 30;
  
  $scope.text = 'Welcome, Adventurer! Would you like to be a warrior or an archer?';
  $scope.input = 'Enter your class';

  $scope.handleInput = function() {
    function carrying(character) {
      let string = '';
      character.carrying.forEach((item) => {
        if (character.carrying.length > 1) {
          string += item + ' ';
        } else {
          string += item;
        }
      });
      return string;
    }

    function west() {
      clock--;
      if (player.position[0] - 1 < 0) {
        $scope.text = player.name + ', you\'ve run into a wall.';
      } else {
        player.position[0]--;
        if (typeof(grid.grid[player.position[0]][player.position[1]][0]) !== 'string') {
          $scope.text = 'You almost stepped on '
            + grid.grid[player.position[0]][player.position[1]][0].name + '!';
        } else {
          $scope.text = player.name + ', you are in a filthy, abandoned office space.';
        }    
      }
    }

    function east() {
      clock--;
      if (player.position[0] + 1 >= grid.grid.length) {
        $scope.text = player.name + ', you\'ve run into a wall.';
      } else {
        player.position[0]++;
        if (typeof(grid.grid[player.position[0]][player.position[1]][0]) !== 'string') {
          $scope.text = 'You almost stepped on '
            + grid.grid[player.position[0]][player.position[1]][0].name + '!';
        } else {
          $scope.text = player.name + ', you are in a filthy, abandoned office space.';
        }    
      }
    }

    function north() {
      clock--;
      if (player.position[1] - 1 < 0) {
        $scope.text = player.name + ', you\'ve run into a wall.';
      } else {
        player.position[1]--;
        if (typeof(grid.grid[player.position[0]][player.position[1]][0]) !== 'string') {
          $scope.text = 'You almost stepped on '
            + grid.grid[player.position[0]][player.position[1]][0].name + '!';
        } else {
          $scope.text = player.name + ', you are in a filthy, abandoned office space.';
        }    
      }
    }

    function south() {
      clock--;
      if (player.position[1] + 1 >= grid.grid[0].length) {
        $scope.text = player.name + ', you\'ve run into a wall.';
      } else {
        player.position[1]++;
        if (typeof(grid.grid[player.position[0]][player.position[1]][0]) !== 'string') {
          $scope.text = 'You almost stepped on '
            + grid.grid[player.position[0]][player.position[1]][0].name + '!';
        } else {
          $scope.text = player.name + ', you are in a filthy, abandoned office space.';
        }    
      }
    }
    
    function get() {
      if (typeof(grid.grid[player.position[0]][player.position[1]][0]) == 'object') {
        clock--;
        player.carrying.push(grid.grid[player.position[0]][player.position[1]][0]);
        grid.grid[player.position[0]][player.position[1]][0] = '.';
        $scope.text = 'You picked up ' + player.carrying[1].name + '!';
      } else {
        clock--;
        $scope.text = 'There is nothing here to pick up.';
      }
    }

    function give() {
      if (typeof(grid.grid[player.position[0]][player.position[1]][0]) == 'object') {
        if (player.carrying.length > 1) {
          player.carrying.pop();
          monster.friend(player);
          $scope.text = player.name + ', you give the noms to ' + monster.name
            + '! You have a new friend! You win!';
        } else {
          $scope.text = monster.name + ' ' + monster.attack + '! '
            + player.name + ' dies of shame and sadness. You lose.';
        }
      } else {
        if (player.carrying.length > 1) {
          clock--;
          $scope.text = 'Hmm. Who should we give these delicious noms to?';
        } else {
          clock--;
          if (player.class == 'Warrior') {
            $scope.text = 'You know that doesn\'t have batteries in it, right?';
          } else {
            $scope.text = 'You wave your slinky about ineffectually.';
          }
        }
      }
    }

    function entry() {
      player.position = [0, 0];
      treats = new Thing('Tasty Treats');
      monster = new Monster('The Dread Finnegan', 'Cries Piteously');

      grid.createGrid();
      grid.placeItems([monster, treats]);

      $scope.text = 'Hello, ' + player.name
        + '. You find yourself in a filthy abandoned office space.'
        + ' It is dark.'
        + ' You are carrying: ' + carrying(player) + '.';
      $scope.input = '?';

      grid.grid[player.position[0]][player.position[1]][0] = '.';
    }

    if (typeof(player) == 'undefined' && playerClass == null) {
      grid = new Grid(5, 4, '.');
      if ($scope.input.match(move.warrior)) {
        playerClass = 'Warrior';
        $scope.text = 'Fine. You\'re a warrior. What\'s your name?';
        $scope.input = 'Enter your name';
      } else if ($scope.input.match(move.archer)) {
        playerClass = 'Archer';
        $scope.text = 'Fine. You\'re an archer. What\'s your name?';
        $scope.input = 'Enter your name';
      } else {
        $scope.text = 'An unknown heroic individual has died of boredom. You lose.';
      }
    } else {
      if (clock <= 0) {
        player.hitpoints = 0;
        $scope.text = player.name + ', you lose. '
          + player.name + ' has died of boredom.';
      } else {
        if (typeof(player) == 'undefined' && playerClass == 'Warrior') {
          player = new Warrior($scope.input);
          console.log(player);
          entry();
        } else if (typeof(player) == 'undefined' && playerClass == 'Archer') {
          player = new Archer($scope.input);
          console.log(player);
          entry();
        } else if ($scope.input.match(move.west)) {
          west();
        } else if ($scope.input.match(move.east)) {
          east();
        } else if ($scope.input.match(move.north)) {
          north();
        } else if ($scope.input.match(move.south)) {
          south();
        } else if ($scope.input.match(move.get)) {
          get();
        } else if ($scope.input.match(move.give)) {
          give();
        } else {
          clock--;
          $scope.text = player.name + ', you\'re drunk.'
            + ' What do you really want to do?';
        }
      }
    }
  };

}]);

