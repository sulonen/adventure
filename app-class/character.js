'use strict';

class Character {
  constructor(hitpoints) {
    this.hitpoints = hitpoints;
  }
}

class Monster extends Character {
  constructor(name, attack) {
    super(1);
    this.name = name;
    this.attack = attack;
  }

  friend(player) {
    player.friend.push(this.name);
  }
}

class Player extends Character {
  constructor(name) {
    super(1);
    this.name = name;
    this.friend = [];
    this.carrying = ['A flashlight with no batteries'];
  }

  get(item) {
    this.carrying.push(item);
  }

  give(item) {
    let index = this.carrying.indexOf(item);
    if (index) this.carrying.splice(index, 1);
  }
}

module.exports.Character = Character;
module.exports.Monster = Monster;
module.exports.Player = Player;

