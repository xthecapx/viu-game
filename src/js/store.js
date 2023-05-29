import { map } from './map';

class StateUtility {
  constructor() {
    if (StateUtility._instance) {
      return StateUtility._instance;
    }

    StateUtility._instance = this;
    this._turretSpace = 2;
    this._path = undefined;
    this._turrets = undefined;
    this._arrowTurrets = undefined;
    this._fastTurrets = undefined;
    this._enemies = undefined;
    this._roberts = undefined;
    this._dragons = undefined;
    this._turretButton = false;
    this._turret2Button = false;
    this._turret3Button = false;
    this._upgradeButton = undefined;
    this._gold = 200;
    this._goldText = undefined;
    this._life = 100;
    this._lifeText = undefined;
    this._startgame = false;
    this._gameOver = false;
    this._killCounter = undefined;
    this._kills = 0;
    this._level = 1;
    this._levelText = undefined;
    this._bulletSound = undefined;
    this._arrowSound = undefined;
    this._fastBulletSound = undefined;
    this._deathSound = undefined;
    this._upgrade = 1;
    this._ENEMY_SPEED = 1 / 40000;
    this._ROBERT_SPEED = 1 / 120000;
    this._DRAGON_SPEED = 1 / 160000;
    this._game = undefined;
    this._map = map
    this._path = undefined;
  }

  get turretSpace() {
    return this._turretSpace;
  }

  set turretSpace(value) {
    this._turretSpace = value;
  }

  get path() {
    return this._path;
  }

  set path(value) {
    this._path = value;
  }

  get turrets() {
    return this._turrets;
  }

  set turrets(value) {
    this._turrets = value;
  }

  get arrowTurrets() {
    return this._arrowTurrets;
  }

  set arrowTurrets(value) {
    this._arrowTurrets = value;
  }

  get fastTurrets() {
    return this._fastTurrets;
  }

  set fastTurrets(value) {
    this._fastTurrets = value;
  }

  get enemies() {
    return this._enemies;
  }

  set enemies(value) {
    this._enemies = value;
  }

  get roberts() {
    return this._roberts;
  }

  set roberts(value) {
    this._roberts = value;
  }

  get dragons() {
    return this._dragons;
  }

  set dragons(value) {
    this._dragons = value;
  }

  get turretButton() {
    return this._turretButton;
  }

  set turretButton(value) {
    this._turretButton = value;
  }

  get turret2Button() {
    return this._turret2Button;
  }

  set turret2Button(value) {
    this._turret2Button = value;
  }

  get turret3Button() {
    return this._turret3Button;
  }

  set turret3Button(value) {
    this._turret3Button = value;
  }

  get upgradeButton() {
    return this._upgradeButton;
  }

  set upgradeButton(value) {
    this._upgradeButton = value;
  }

  get gold() {
    return this._gold;
  }

  set gold(value) {
    this._gold = value;
  }

  get goldText() {
    return this._goldText;
  }

  set goldText(value) {
    this._goldText = value;
  }

  get life() {
    return this._life;
  }

  set life(value) {
    this._life = value;
  }

  get lifeText() {
    return this._lifeText;
  }

  set lifeText(value) {
    this._lifeText = value;
  }

  get startgame() {
    return this._startgame;
  }

  set startgame(value) {
    this._startgame = value;
  }

  get gameOver() {
    return this._gameOver;
  }

  set gameOver(value) {
    this._gameOver = value;
  }

  get killCounter() {
    return this._killCounter;
  }

  set killCounter(value) {
    this._killCounter = value;
  }

  get kills() {
    return this._kills;
  }

  set kills(value) {
    this._kills = value;
  }

  get level() {
    return this._level;
  }

  set level(value) {
    this._level = value;
  }

  get levelText() {
    return this._levelText;
  }

  set levelText(value) {
    this._levelText = value;
  }

  get bulletSound() {
    return this._bulletSound;
  }

  set bulletSound(value) {
    this._bulletSound = value;
  }

  get arrowSound() {
    return this._arrowSound;
  }

  set arrowSound(value) {
    this._arrowSound = value;
  }

  get fastBulletSound() {
    return this._fastBulletSound;
  }

  set fastBulletSound(value) {
    this._fastBulletSound = value;
  }

  get deathSound() {
    return this._deathSound;
  }

  set deathSound(value) {
    this._deathSound = value;
  }

  get upgrade() {
    return this._upgrade;
  }

  set upgrade(value) {
    this._upgrade = value;
  }

  get ENEMY_SPEED() {
    return this._ENEMY_SPEED;
  }

  get ROBERT_SPEED() {
    return this._ROBERT_SPEED;
  }

  get DRAGON_SPEED() {
    return this._DRAGON_SPEED;
  }

  get game() {
    return this._game;
  }

  set game(value) {
    this._game = value;
  }

  get map() {
    return this._map;
  }

  set map(value) {
    this._map = value;
  }

  get path() {
    return this._path;
  }

  set path(value) {
    this._path = value;
  }
}

const store = new StateUtility();

export default store;
