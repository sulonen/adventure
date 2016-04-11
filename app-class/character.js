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
  }

  get(item) {
    this.carrying.push(item);
  }

  give(item) {
    let index = this.carrying.indexOf(item);
    if (index) this.carrying.splice(index, 1);
  }
}

class Warrior extends Player {
  constructor(name) {
    super(name);
    this.carrying = ['A flashlight with no batteries'];
    this.class = 'Warrior';
  }
}

class Archer extends Player {
  constructor(name) {
    super(name);
    this.carrying = ['A broken slinky'];
    this.class = 'Archer';
  }
}

module.exports.Character = Character;
module.exports.Monster = Monster;
module.exports.Player = Player;
module.exports.Warrior = Warrior;
module.exports.Archer = Archer;

