'use strict';

const angular = require('angular');
const Grid = require('./grid').Grid;
const character = require('./character');
const Player = character.Player;
const Monster = character.Monster;
const moves = require('./moves');

var app = angular.module('Adventure', []);

app.controller('GameController', ['$scope', function($scope) {
  var player;
  var clock = 30; 
  $scope.text = 'Welcome, Adventurer! What is your name?';
  $scope.input = 'Enter your name';

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
      console.log('west');
    }

    function east() {
      clock--;
      console.log('east');
    }

    function north() {
      clock--;
      console.log('north');
    }

    function south() {
      clock--;
      console.log('south');
    }

    if (typeof(player) == 'undefined') {
      let grid = new Grid(5, 4, '.');
      player = new Player($scope.input);
      let monster = new Monster('The Dread Finnegan', 'Cries Piteously');

      grid.createGrid();
      grid.placeItems([monster, player, 'Tasty Treats']);

      console.log(player);

      console.log(grid);

      $scope.text = 'Hello, ' + player.name
        + '. You find yourself in a filthy abandoned office space.'
        + ' It is dark.'
        + ' You are carrying: ' + carrying(player) + '.';
    } else {
      if (clock <= 0) {
        player.hitpoints = 0;
        $scope.text = player.name + ', you lose. '
          + player.name + ' has died of boredom.';
      } else {
        if ($scope.input.match(moves.west)) {
          west();  
        } else if ($scope.input.match(moves.east)) {
          east();
        } else if ($scope.input.match(moves.north)) {
          north();
        } else if ($scope.input.match(moves.south)) {
          south();


        } else {
          $scope.text = player.name + ', you\'re drunk.'
            + ' What do you really want to do?';
        }
      }
    }

  };

}]);

