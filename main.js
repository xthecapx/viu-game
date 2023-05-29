import { AUTO, Game, Scene } from "phaser";

import { Arrow, Bullet, FastBullet } from "./src/js/bullets";
import { Dragon, Enemy, Robert } from "./src/js/enemies";
import store from "./src/js/store";
import {
  ArrowTurret,
  FastTurret,
  Turret,
  placeTurret,
  placeTurret2,
  placeTurret3
} from "./src/js/turrets";

class Main extends Scene {
  constructor() {
    super();
    this.mapOne = null;
  }

  preload() {
    // load images
    this.load.setBaseURL("http://localhost:5173");

    this.load.image("mapOne", "updatedMap.png");
    // const mapOne = this.add.image(800, 600, "mapOne");
    this.load.image("bullet", "bullet.png");
    this.load.image("arrow", "arrow.png");
    this.load.image("tower", "tower.png");
    this.load.image("tower2", "tower2.png");
    this.load.image("tower3", "fastTower.png");
    this.load.image("enemy", "enemy.gif");
    this.load.image("robert", "robert1.png");
    this.load.image("dragon", "dragon.png");
    this.load.image("towerOneButton", "towerOneButton.png");
    this.load.image("towerTwoButton", "towerTwoButton.png");
    this.load.image("towerThreeButton", "fastTowerButton.png");
    this.load.image("uibar", "bottombar.jpg");
    this.load.image("startButton", "title.png");
    this.load.image("gameOver", "gameover.jpg");
    this.load.image("upgrade", "upgradeButton.png");

    // load audio
    this.load.audio("arrow", "audio/arrow.mp3");
    this.load.audio("bullet", "audio/bullet.mp3");
    this.load.audio("fastbullet", "audio/fastbullet.mp3");
    this.load.audio("death", "audio/death.mp3");
  }

  create() {
    game.scene.pause("main");
    this.mapOne = this.add.image(800, 600, "mapOne");
    // this graphics element is only for visualization,
    // its not related to our path
    const graphics = this.add.graphics();
    graphics.lineStyle(1, 0x000000, 0.45);
    for (var i = 0; i < 38; i++) {
      graphics.moveTo(0, i * 32);
      graphics.lineTo(1600, i * 32);
    }
    for (var j = 0; j < 50; j++) {
      graphics.moveTo(j * 32, 0);
      graphics.lineTo(j * 32, 1200);
    }
    graphics.strokePath();

    // the path for our enemies
    // parameters are the start x and y of our paths
    store.path = this.add.path(200, -25);
    store.path.lineTo(200, 300);
    store.path.lineTo(400, 300);
    store.path.lineTo(400, 600);
    store.path.lineTo(100, 600);
    store.path.lineTo(100, 1000);
    store.path.lineTo(600, 1000);
    store.path.lineTo(600, 200);
    store.path.lineTo(800, 200);
    store.path.lineTo(800, 1000);
    store.path.lineTo(1500, 1000);
    store.path.lineTo(1500, 700);
    store.path.lineTo(1000, 700);
    store.path.lineTo(1000, 300);
    store.path.lineTo(1400, 300);
    store.path.lineTo(1400, -25);

    this.add.image(400, 1180, "uibar");

    graphics.lineStyle(3, 0xffffff, 1);
    //visualize the path

    //enemies
    store.enemies = this.physics.add.group({
      classType: Enemy,
      runChildUpdate: true,
    });
    this.nextEnemy = 0;
    store.roberts = this.physics.add.group({
      classType: Robert,
      runChildUpdate: true,
    });

    this.nextRobert = 0;
    store.dragons = this.physics.add.group({
      classType: Dragon,
      runChildUpdate: true,
    });
    this.nextDragon = 0;

    //turrets
    store.turrets = this.add.group({ 
      classType: Turret, 
      runChildUpdate: true 
    });
    store.arrowTurrets = this.add.group({
      classType: ArrowTurret,
      runChildUpdate: true,
    });
    store.fastTurrets = this.add.group({
      classType: FastTurret,
      runChildUpdate: true,
    });

    store.turretOneButton = this.add.image(40, 1170, "towerOneButton");
    store.turretOneButton.setInteractive();
    store.turretOneButton.on("pointerdown", () => {
      store.turretButton = true;
      store.turret2Button = false;
      store.turret3Button = false;
      store.turretOneButton.tint = 0xfff132;
      store.turretTwoButton.tint = 0xffffff;
      store.turretThreeButton.tint = 0xffffff;
    });
    this.input.on("pointerdown", placeTurret);

    store.turretTwoButton = this.add.image(120, 1170, "towerTwoButton");
    store.turretTwoButton.setInteractive();
    store.turretTwoButton.on("pointerdown", () => {
      store.turret2Button = true;
      store.turretButton = false;
      store.turret3Button = false;
      store.turretTwoButton.tint = 0xfff132;
      store.turretOneButton.tint = 0xffffff;
      store.turretThreeButton.tint = 0xffffff;
    });
    this.input.on("pointerdown", placeTurret2);

    store.turretThreeButton = this.add.image(200, 1170, "towerThreeButton");
    store.turretThreeButton.setInteractive();
    store.turretThreeButton.on("pointerdown", () => {
      store.turret3Button = true;
      store.turret2Button = false;
      store.turretButton = false;
      store.turretThreeButton.tint = 0xfff132;
      store.turretTwoButton.tint = 0xffffff;
      store.turretOneButton.tint = 0xffffff;
    });
    this.input.on("pointerdown", placeTurret3);

    store.upgradeButton = this.add.image(400, 1170, "upgrade");
    store.upgradeButton.setInteractive();
    store.upgradeButton.on("pointerdown", function () {
      if (store.gold >= 2000) {
        store.upgrade += 1;
        store.gold -= 2000;
        goldText.setText("Gold: " + store.gold);
      }
    });
    store.bullets = this.physics.add.group({
      classType: Bullet,
      runChildUpdate: true,
    });
    store.arrows = this.physics.add.group({
      classType: Arrow,
      runChildUpdate: true,
    });
    store.fastbullets = this.physics.add.group({
      classType: FastBullet,
      runChildUpdate: true,
    });

    this.physics.add.overlap(store.enemies, store.bullets, (enemy, bullet) => {
      // only if both enemy and bullet are alive
      if (enemy.active === true && bullet.active === true) {
        // we remove the bullet right away
        const BULLET_DAMAGE = 125 * store.upgrade;
        bullet.setActive(false);
        bullet.setVisible(false);

        // decrease the enemy hp with BULLET_DAMAGE
        enemy.receiveDamage(BULLET_DAMAGE);
      }
    });
    this.physics.add.overlap(store.enemies, store.arrows, (enemy, arrow) => {
      // only if both enemy and bullet are alive
      if (enemy.active === true && arrow.active === true) {
        // we remove the bullet right away
        const ARROW_DAMAGE = 200 * store.upgrade;
        arrow.setActive(false);
        arrow.setVisible(false);

        // decrease the enemy hp with BULLET_DAMAGE
        enemy.receiveDamage(ARROW_DAMAGE);
      }
    });
    this.physics.add.overlap(
      store.enemies,
      store.fastbullets,
      (enemy, fastbullet) => {
        // only if both enemy and bullet are alive
        if (enemy.active === true && fastbullet.active === true) {
          // we remove the bullet right away
          const FASTBULLET_DAMAGE = 70 * store.upgrade;
          fastbullet.setActive(false);
          fastbullet.setVisible(false);

          // decrease the enemy hp with BULLET_DAMAGE
          enemy.receiveDamage(FASTBULLET_DAMAGE);
        }
      }
    );
    this.physics.add.overlap(store.roberts, store.bullets, (robert, bullet) => {
      // only if both robert and bullet are alive
      if (robert.active === true && bullet.active === true) {
        // we remove the bullet right away
        const BULLET_DAMAGE = 80 * store.upgrade;
        bullet.setActive(false);
        bullet.setVisible(false);

        // decrease the robert hp with BULLET_DAMAGE
        robert.receiveDamage(BULLET_DAMAGE);
      }
    });
    this.physics.add.overlap(store.roberts, store.arrows, (robert, arrow) => {
      // only if both robert and bullet are alive
      if (robert.active === true && arrow.active === true) {
        // we remove the bullet right away
        const ARROW_DAMAGE = 350 * store.upgrade;
        arrow.setActive(false);
        arrow.setVisible(false);

        // decrease the robert hp with BULLET_DAMAGE
        robert.receiveDamage(ARROW_DAMAGE);
      }
    });
    this.physics.add.overlap(
      store.roberts,
      store.fastbullets,
      (robert, fastbullet) => {
        // only if both robert and bullet are alive
        if (robert.active === true && fastbullet.active === true) {
          // we remove the bullet right away
          const FASTBULLET_DAMAGE = 70 * store.upgrade;
          fastbullet.setActive(false);
          fastbullet.setVisible(false);

          // decrease the robert hp with BULLET_DAMAGE
          robert.receiveDamage(FASTBULLET_DAMAGE);
        }
      }
    );
    this.physics.add.overlap(store.dragons, store.bullets, (dragon, bullet) => {
      // only if both robert and bullet are alive
      if (dragon.active === true && bullet.active === true) {
        // we remove the bullet right away
        const BULLET_DAMAGE = 80 * store.upgrade;
        bullet.setActive(false);
        bullet.setVisible(false);

        // decrease the robert hp with BULLET_DAMAGE
        dragon.receiveDamage(BULLET_DAMAGE);
      }
    });
    this.physics.add.overlap(store.dragons, store.arrows, (dragon, arrow) => {
      // only if both robert and bullet are alive
      if (dragon.active === true && arrow.active === true) {
        // we remove the bullet right away
        const ARROW_DAMAGE = 250 * store.upgrade;
        arrow.setActive(false);
        arrow.setVisible(false);

        // decrease the robert hp with BULLET_DAMAGE
        dragon.receiveDamage(ARROW_DAMAGE);
      }
    });
    this.physics.add.overlap(
      store.dragons,
      store.fastbullets,
      (dragon, fastbullet) => {
        // only if both robert and bullet are alive
        if (dragon.active === true && fastbullet.active === true) {
          // we remove the bullet right away
          const FASTBULLET_DAMAGE = 100 * store.upgrade;
          fastbullet.setActive(false);
          fastbullet.setVisible(false);

          // decrease the robert hp with BULLET_DAMAGE
          dragon.receiveDamage(FASTBULLET_DAMAGE);
        }
      }
    );

    store.goldText = this.add.text(700, 1155, "Gold: " + store.gold, {
      fontSize: "28px",
      fill: "#FFD700",
    });

    store.lifeText = this.add.text(1000, 1155, "Life: " + store.life, {
      fontSize: "28px",
      fill: "#000",
    });

    store.killCounter = this.add.text(1300, 1155, "Kills: " + store.kills, {
      fontSize: "28px",
      fill: "#000",
    });

    store.levelText = this.add.text(710, 30, "Level: " + store.level, {
      fontSize: "56px",
      fill: "#ff8200",
    });

    const startButton = this.add.image(800, 600, "startButton");
    startButton.setInteractive();
    startButton.on("pointerdown", function () {
      store.startgame = true;
      startButton.destroy();
    });

    // add sounds
    store.bulletSound = this.sound.add("bullet");
    store.arrowSound = this.sound.add("arrow");
    store.deathSound = this.sound.add("death");
    store.fastBulletSound = this.sound.add("fastbullet");
  }

  update(time, delta) {
    if (store.gameOver) {
      const gameOverButton = this.add.image(700, 400, "gameOver");
      this.mapOne.tint = 0xbc0505;
      gameOverButton.setInteractive();
      gameOverButton.on("pointerdown", function () {
        this.mapOne.tint = 0xbc0505;
        gameOverButton.destroy();
        location.reload();
        return;
      });
    }

    if (time > this.nextEnemy && store.startgame === true) {
      // const enemies = store.getPropertyByName('enemies');
      const enemy = store.enemies.get();

      if (enemy) {
        enemy.setActive(true);
        enemy.setVisible(true);

        // place the enemy at the start of the path
        enemy.startOnPath();

        this.nextEnemy = time + 5000 / (1 + 1.2 * store.level);
      }
    }

    if (
      time > this.nextRobert &&
      store.roberts.children.entries.length < 5 &&
      store.startgame === true &&
      store.kills > 20
    ) {
      const robert = store.roberts.get();

      if (robert) {
        robert.setActive(true);
        robert.setVisible(true);

        // place the robert at the start of the path
        robert.startOnPath();

        this.nextRobert = time + 10000 / (1 + 0.7 * store.kills);
      }
    }

    if (
      time > this.nextDragon &&
      store.dragons.children.entries.length < 1 &&
      store.startgame === true &&
      store.kills > 400
    ) {
      const dragon = store.dragons.get();

      if (dragon) {
        dragon.setActive(true);
        dragon.setVisible(true);
        // place the robert at the start of the path
        dragon.startOnPath();

        this.nextDragon = time + 10000 / (1 + 0.3 * store.kills);
      }
    }

    for (let i = 0; i < store.enemies.children.entries.length; i++) {
      if (store.enemies.children.entries[i].active === false) {
        store.enemies.children.entries.splice(i, 1);
      }
    }

    for (let i = 0; i < store.roberts.children.entries.length; i++) {
      if (store.roberts.children.entries[i].active === false) {
        store.roberts.children.entries.splice(i, 1);
      }
    }

    for (let i = 0; i < store.dragons.children.entries.length; i++) {
      if (store.dragons.children.entries[i].active === false) {
        store.dragons.children.entries.splice(i, 1);
      }
    }

    store.level = Math.ceil(time / 40000);
    store.levelText.setText("Level: " + store.level);

    this.input.keyboard.on("keydown_A", function (event) {
      store.turretButton = true;
      store.turret2Button = false;
      store.turret3Button = false;
    });
    this.input.keyboard.on("keydown_S", function (event) {
      store.turret2Button = true;
      store.turretButton = false;
      store.turret3Button = false;
    });
    this.input.keyboard.on("keydown_D", function (event) {
      store.turret3Button = true;
      store.turretButton = false;
      store.turret2Button = false;
    });

    // endGame();

    if (store.life <= 0) {
      store.gameOver = true;
    }
  }
}

const config = {
  type: AUTO,
  parent: "content",
  width: 1600,
  height: 1200,
  physics: {
    default: "arcade",
  },
  scene: [Main],
};

export const game = new Game(config);
