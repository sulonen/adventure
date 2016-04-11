'use strict';

function Character(hitpoints) {
  this.hitpoints = hitpoints; this.position = [];
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
}

function Warrior(name) {
  Player.call(this, name);
  this.carrying = ['A flashlight with no batteries'];
  this.class = 'Warrior';
}

function Archer(name) {
  Player.call(this, name);
  this.carrying = ['A broken slinky'];
  this.class = 'Archer';
}

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

module.exports.Character = Character;
module.exports.Monster = Monster;
module.exports.Player = Player;
module.exports.Warrior = Warrior;
module.exports.Archer = Archer;

