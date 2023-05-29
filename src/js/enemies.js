import Phaser from "phaser";
import store from "./store";

export class Enemy extends Phaser.GameObjects.Image {
  constructor(
    scene,
    x,
    y,
    texture,
    frame,
    config = {
      monster: "enemy",
      hp: 125,
      incrementFactor: 6,
      speed: store.ENEMY_SPEED,
      reduceLife: 2,
      goldAfterKill: 10,
    }
  ) {
    super(scene, x, y, texture, frame);
    Phaser.GameObjects.Image.call(this, scene, 0, 0, config.monster);

    this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
    this.monster = config.monster;
    this.hp = config.hp;
    this.incrementFactor = config.incrementFactor;
    this.speed = config.speed;
    this.reduceLife = config.reduceLife;
    this.goldAfterKill = config.goldAfterKill;
  }

  receiveDamage(damage) {
    this.hp -= damage;

    // if hp drops below 0 we deactivate this enemy
    if (this.hp <= 0) {
      this.setActive(false);
      this.setVisible(false);
      store.gold = store.gold + this.goldAfterKill;
      store.goldText.setText("Gold: " + store.gold);
      store.kills = store.kills + 1;
      store.killCounter.setText("Kills: " + store.kills);
      store.deathSound.play();
    }
  }

  startOnPath() {
    // set the t parameter at the start of the path
    this.follower.t = 0;
    this.hp = this.hp + store.kills * this.incrementFactor;

    // get x and y of the given t point
    store.path.getPoint(this.follower.t, this.follower.vec);

    // set the x and y of our enemy to the received from the previous step
    this.setPosition(this.follower.vec.x, this.follower.vec.y);
  }

  update(_time, delta) {
    if (store.gameOver) {
      return;
    }
    // move the t point along the path, 0 is the start and 0 is the end
    this.follower.t += this.speed * delta;

    // get the new x and y coordinates in vec
    store.path.getPoint(this.follower.t, this.follower.vec);

    // update enemy x and y to the newly obtained x and y
    this.setPosition(this.follower.vec.x, this.follower.vec.y);

    // if we have reached the end of the path, remove the enemy
    if (this.follower.t >= 1) {
      this.setActive(false);
      this.setVisible(false);
      store.life -= this.reduceLife;
      store.lifeText.setText("Life: " + store.life);
      // removeEnemy = enemies.children.entries;
      // removeEnemy.shift();
    }
  }
}

export class Robert extends Enemy {
  constructor(...props) {
    super(...props, {
      monster: "robert",
      hp: 600,
      incrementFactor: 10,
      speed: store.ROBERT_SPEED,
      reduceLife: 5,
      goldAfterKill: 20,
    });
  }
}

export class Dragon extends Enemy {
  constructor(...props) {
    super(...props, {
      monster: "dragon",
      hp: 15000,
      incrementFactor: 25,
      speed: store.DRAGON_SPEED,
      reduceLife: 10,
      goldAfterKill: 50,
    });
  }
}
