import Phaser from 'phaser';
import store from './store';

export const  Enemy = new Phaser.Class({
  Extends: Phaser.GameObjects.Image,

  initialize: function Enemy(scene) {
    Phaser.GameObjects.Image.call(this, scene, 0, 0, "enemy");

    this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
  },

  receiveDamage: function (damage) {
    this.hp -= damage;

    // if hp drops below 0 we deactivate this enemy
    if (this.hp <= 0) {
      this.setActive(false);
      this.setVisible(false);
      store.gold = store.gold + 10;
      store.goldText.setText("Gold: " + store.gold);
      store.kills = store.kills + 1
      store.killCounter.setText("Kills: " + store.kills);
      store.deathSound.play();
    }
  },
  startOnPath: function () {
    // set the t parameter at the start of the path
    this.follower.t = 0;
    this.hp = 125 + store.kills * 6;

    // get x and y of the given t point
    store.path.getPoint(this.follower.t, this.follower.vec);

    // set the x and y of our enemy to the received from the previous step
    this.setPosition(this.follower.vec.x, this.follower.vec.y);
  },
  update: function (time, delta) {
    if (store.gameOver) {
      return;
    }
    // move the t point along the path, 0 is the start and 0 is the end
    this.follower.t += store.ENEMY_SPEED * delta;

    // get the new x and y coordinates in vec
    store.path.getPoint(this.follower.t, this.follower.vec);

    // update enemy x and y to the newly obtained x and y
    this.setPosition(this.follower.vec.x, this.follower.vec.y);

    // if we have reached the end of the path, remove the enemy
    if (this.follower.t >= 1) {
      this.setActive(false);
      this.setVisible(false);
      store.life -= 2;
      store.lifeText.setText("Life: " + store.life);
      // removeEnemy = enemies.children.entries;
      // removeEnemy.shift();
    }
  },
});

export const  Robert = new Phaser.Class({
  Extends: Phaser.GameObjects.Image,

  initialize: function Robert(scene) {
    Phaser.GameObjects.Image.call(this, scene, 0, 0, "robert");

    this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
  },

  startOnPath: function () {
    // set the t parameter at the start of the path
    this.follower.t = 0;
    this.hp = 600 + store.kills * 10;

    // get x and y of the given t point
    store.path.getPoint(this.follower.t, this.follower.vec);

    // set the x and y of our robert to the received from the previous step
    this.setPosition(this.follower.vec.x, this.follower.vec.y);
  },
  receiveDamage: function (damage) {
    this.hp -= damage;

    // if hp drops below 0 we deactivate this robert
    if (this.hp <= 0) {
      this.setActive(false);
      this.setVisible(false);
      store.gold += 20;
      store.goldText.setText("Gold: " + store.gold);
      store.kills = store.kills + 1;
      store.killCounter.setText("Kills: " + store.kills);
      store.deathSound.play();
    }
  },
  update: function (time, delta) {
    if (store.gameOver) {
      return;
    }
    // move the t point along the path, 0 is the start and 0 is the end
    this.follower.t += store.ROBERT_SPEED * delta;

    // get the new x and y coordinates in vec
    store.path.getPoint(this.follower.t, this.follower.vec);

    // update robert x and y to the newly obtained x and y
    this.setPosition(this.follower.vec.x, this.follower.vec.y);

    // if we have reached the end of the path, remove the robert
    if (this.follower.t >= 1) {
      this.setActive(false);
      this.setVisible(false);
      store.life -= 5;
      store.lifeText.setText("Life: " + life);
      // removeRobert = roberts.children.entries;
      // removeRobert.shift();
    }
  },
});

export const  Dragon = new Phaser.Class({
  Extends: Phaser.GameObjects.Image,
  initialize: function Dragon(scene) {
    Phaser.GameObjects.Image.call(this, scene, 0, 0, "dragon");
    this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
  },
  startOnPath: function () {
    // set the t parameter at the start of the path
    this.follower.t = 0;
    this.hp = 15000 + store.kills * 25;

    // get x and y of the given t point
    store.path.getPoint(this.follower.t, this.follower.vec);

    // set the x and y of our robert to the received from the previous step
    this.setPosition(this.follower.vec.x, this.follower.vec.y);
  },
  receiveDamage: function (damage) {
    this.hp -= damage;

    // if hp drops below 0 we deactivate this robert
    if (this.hp <= 0) {
      this.setActive(false);
      this.setVisible(false);
      store.gold += 50;
      store.goldText.setText("Gold: " + store.gold);
    }
  },
  update: function (time, delta) {
    if (store.gameOver) {
      return;
    }
    // move the t point along the path, 0 is the start and 0 is the end
    this.follower.t += store.DRAGON_SPEED * delta;
    // get the new x and y coordinates in vec
    store.path.getPoint(this.follower.t, this.follower.vec);

    // update robert x and y to the newly obtained x and y
    this.setPosition(this.follower.vec.x, this.follower.vec.y);
    // if we have reached the end of the path, remove the dragon
    if (this.follower.t >= 1) {
      this.setActive(false);
      this.setVisible(false);
      store.life -= 10;
      store.lifeText.setText("Life: " + store.life);
    }
  },
});
