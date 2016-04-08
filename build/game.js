'use strict';

let grid = new Grid(5, 4, '.');
grid.createGrid();

let monster = new Monster('The Dread Finnegan', 'Cry');
let player = new Player('You');

grid.placeItems([monster, player, 'Tasty Treats']);
console.log(player);
console.log(grid);

