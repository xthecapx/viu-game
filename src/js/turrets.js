import Phaser from "phaser";
import store from "./store";

export class Turret extends Phaser.GameObjects.Image {
  constructor(
    scene,
    x,
    y,
    texture,
    frame,
    config = {
      weapon: "tower",
      price: 100,
      fireFn: addBullet,
      distances: {
        enemy: 400,
        robert: 300,
        dragon: 300,
      },
      fireDelay: 900,
    }
  ) {
    super(scene, x, y, texture, frame);

    this.nextTic = 0;
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.distances = config.distances;
    this.fireDelay = config.fireDelay;
    this.fireFn = config.fireFn;
    Phaser.GameObjects.Image.call(this, scene, 0, 0, config.weapon);
    store.gold -= config.price;
    store.goldText.setText("Gold: " + store.gold);
  }

  place(_i, _j) {
    this.y = _i * 32 + 32 / 2;
    this.x = _j * 32 + 32 / 2;
    store.map[_i][_j] = 1;
  }

  fire() {
    // turret.distance for enemy targeting
    const enemy = getEnemy(this.x, this.y, this.distances.enemy);
    const robert = getRobert(this.x, this.y, this.distances.robert);
    const dragon = getDragon(this.x, this.y, this.distances.dragon);

    if (enemy) {
      const angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
      this.fireFn(this.x, this.y, angle);
      this.angle = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG;
    } else if (robert) {
      const angle = Phaser.Math.Angle.Between(
        this.x,
        this.y,
        robert.x,
        robert.y
      );
      this.fireFn(this.x, this.y, angle);
      this.angle = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG;
    } else if (dragon) {
      const angle = Phaser.Math.Angle.Between(
        this.x,
        this.y,
        dragon.x,
        dragon.y
      );
      this.fireFn(this.x, this.y, angle);
      this.angle = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG;
    }
  }

  update(_time, _delta) {
    // time to shoot, turret.speed interval for bullets
    if (_time > this.nextTic) {
      this.fire();
      this.nextTic = _time + this.fireDelay;
    }
    // if(gameOver== true){
    //     turret.destroy();
    // }
  }
}

export class ArrowTurret extends Turret {
  constructor(...props) {
    super(...props, {
      weapon: "tower2",
      price: 200,
      fireFn: addArrow,
      distances: {
        enemy: 500,
        robert: 700,
        dragon: 600,
      },
      fireDelay: 1000,
    });
  }
}

export class FastTurret extends Turret {
  constructor(...props) {
    super(...props, {
      weapon: "tower3",
      price: 500,
      fireFn: addFastBullet,
      distances: {
        enemy: 175,
        robert: 175,
        dragon: 200,
      },
      fireDelay: 100,
    });
  }
}

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
