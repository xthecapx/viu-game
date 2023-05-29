import Phaser from "phaser";
import store from "./store";

export const Turret = new Phaser.Class({
  Extends: Phaser.GameObjects.Image,

  initialize: function Turret(scene) {
    Phaser.GameObjects.Image.call(this, scene, 0, 0, "tower");
    this.nextTic = 0;
    store.gold -= 100;
    store.goldText.setText("Gold: " + store.gold);
  },

  // we will place the turret according to the grid
  place: function (i, j) {
    this.y = i * 32 + 32 / 2;
    this.x = j * 32 + 32 / 2;
    store.map[i][j] = 1;
  },

  fire: function () {
    // turret.distance for enemy targeting
    const enemy = getEnemy(this.x, this.y, 400);
    const robert = getRobert(this.x, this.y, 300);
    const dragon = getDragon(this.x, this.y, 300);

    if (enemy) {
      const angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
      addBullet(this.x, this.y, angle);
      this.angle = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG;
    } else if (robert) {
      const angle = Phaser.Math.Angle.Between(
        this.x,
        this.y,
        robert.x,
        robert.y
      );
      addBullet(this.x, this.y, angle);
      this.angle = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG;
    } else if (dragon) {
      const angle = Phaser.Math.Angle.Between(
        this.x,
        this.y,
        dragon.x,
        dragon.y
      );
      addBullet(this.x, this.y, angle);
      this.angle = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG;
    }
  },
  update: function (time, delta) {
    // time to shoot, turret.speed interval for bullets
    if (time > this.nextTic) {
      this.fire();
      this.nextTic = time + 900;
    }
    // if(gameOver== true){
    //     turret.destroy();
    // }
  },
});

export const ArrowTurret = new Phaser.Class({
  Extends: Phaser.GameObjects.Image,

  initialize: function ArrowTurret(scene) {
    Phaser.GameObjects.Image.call(this, scene, 0, 0, "tower2");
    this.nextTic = 0;
    store.gold -= 200;
    store.goldText.setText("Gold: " + store.gold);
  },

  // we will place the turret according to the grid
  place: function (i, j) {
    this.y = i * 32 + 32 / 2;
    this.x = j * 32 + 32 / 2;
    store.map[i][j] = 1;
  },

  fire: function () {
    // turret.distance for enemy targeting

    const enemy = getEnemy(this.x, this.y, 500);
    const robert = getRobert(this.x, this.y, 700);
    const dragon = getDragon(this.x, this.y, 600);

    if (dragon) {
      const angle = Phaser.Math.Angle.Between(
        this.x,
        this.y,
        dragon.x,
        dragon.y
      );
      addArrow(this.x, this.y, angle);
      this.angle = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG;
    } else if (robert) {
      const angle = Phaser.Math.Angle.Between(
        this.x,
        this.y,
        robert.x,
        robert.y
      );
      addArrow(this.x, this.y, angle);
      this.angle = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG;
    } else if (enemy) {
      const angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
      addArrow(this.x, this.y, angle);
      this.angle = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG;
    }
  },

  update: function (time, delta) {
    // time to shoot, turret.speed interval for Arrows
    if (time > this.nextTic) {
      this.fire();
      this.nextTic = time + 1000;
    }
  },
});

export const FastTurret = new Phaser.Class({
  Extends: Phaser.GameObjects.Image,

  initialize: function Turret(scene) {
    Phaser.GameObjects.Image.call(this, scene, 0, 0, "tower3");
    this.nextTic = 0;
    store.gold -= 500;
    store.goldText.setText("Gold: " + store.gold);
  },

  // we will place the turret according to the grid
  place: function (i, j) {
    this.y = i * 32 + 32 / 2;
    this.x = j * 32 + 32 / 2;
    store.map[i][j] = 1;
  },

  fire: function () {
    // turret.distance for enemy targeting
    const enemy = getEnemy(this.x, this.y, 175);
    const robert = getRobert(this.x, this.y, 175);
    const dragon = getDragon(this.x, this.y, 200);

    if (dragon) {
      const angle = Phaser.Math.Angle.Between(
        this.x,
        this.y,
        dragon.x,
        dragon.y
      );
      addBullet(this.x, this.y, angle);
      this.angle = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG;
    } else if (robert) {
      const angle = Phaser.Math.Angle.Between(
        this.x,
        this.y,
        robert.x,
        robert.y
      );
      addBullet(this.x, this.y, angle);
      this.angle = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG;
    } else if (enemy) {
      const angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
      addBullet(this.x, this.y, angle);
      this.angle = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG;
    }
  },
  update: function (time, delta) {
    // time to shoot, turret.speed interval for bullets
    if (time > this.nextTic) {
      this.fire();
      this.nextTic = time + 100;
    }
    // if(gameOver== true){
    //     turret.destroy();
    // }
  },
});

// aiming turrets at enemies
function getEnemy(x, y, distance) {
  const enemyUnits = store.enemies.getChildren();
  for (let i = 0; i < enemyUnits.length; i++) {
    if (
      enemyUnits[i].active &&
      Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) <
        distance
    )
      return enemyUnits[i];
  }
  return false;
}
//aiming turrets at roberts
function getRobert(x, y, distance) {
  const robertUnits = store.roberts.getChildren();
  for (let i = 0; i < robertUnits.length; i++) {
    if (
      robertUnits[i].active &&
      Phaser.Math.Distance.Between(x, y, robertUnits[i].x, robertUnits[i].y) <
        distance
    )
      return robertUnits[i];
  }
  return false;
}

//aiming turrets at dragons
function getDragon(x, y, distance) {
  const dragonUnits = store.dragons.getChildren();
  for (let i = 0; i < dragonUnits.length; i++) {
    if (
      dragonUnits[i].active &&
      Phaser.Math.Distance.Between(x, y, dragonUnits[i].x, dragonUnits[i].y) <
        distance
    )
      return dragonUnits[i];
  }
  return false;
}

//place arrow turrets
export function placeTurret2(pointer) {
  const i = Math.floor(pointer.y / 32);
  const j = Math.floor(pointer.x / 32);
  if (
    canPlaceTurret(i, j) &&
    store.turret2Button == true &&
    store.gold >= 200
  ) {
    const arrowTurret = store.arrowTurrets.get();

    if (arrowTurret) {
      arrowTurret.setActive(true);
      arrowTurret.setVisible(true);
      arrowTurret.place(i, j);
      store.turret2Button = false;
      store.turretTwoButton.tint = 0xffffff;
    }
  }
}

//place bullet turrets
export function placeTurret(pointer) {
  const i = Math.floor(pointer.y / 32);
  const j = Math.floor(pointer.x / 32);
  if (canPlaceTurret(i, j) && store.turretButton == true && store.gold >= 100) {
    const turret = store.turrets.get();

    if (turret) {
      turret.setActive(true);
      turret.setVisible(true);
      turret.place(i, j);
      store.turretButton = false;
      store.turretOneButton.tint = 0xffffff;
    }
  }
}

//place fast turrets
export function placeTurret3(pointer) {
  const i = Math.floor(pointer.y / 32);
  const j = Math.floor(pointer.x / 32);
  if (
    canPlaceTurret(i, j) &&
    store.turret3Button == true &&
    store.gold >= 500
  ) {
    const fastTurret = store.fastTurrets.get();

    if (fastTurret) {
      fastTurret.setActive(true);
      fastTurret.setVisible(true);
      fastTurret.place(i, j);
      store.turret3Button = false;
      store.turretThreeButton.tint = 0xffffff;
    }
  }
}

function canPlaceTurret(i, j) {
  return store.map[i][j] === 0;
}

function addBullet(x, y, angle) {
  const bullet = store.bullets.get();

  if (bullet) {
    bullet.fire(x, y, angle);
  }
}

function addArrow(x, y, angle) {
  var arrow = store.arrows.get();
  if (arrow) {
    arrow.fire(x, y, angle);
  }
}

function addFastBullet(x, y, angle) {
  var fastbullet = store.fastbullets.get();
  if (fastbullet) {
    fastbullet.fire(x, y, angle);
  }
}
