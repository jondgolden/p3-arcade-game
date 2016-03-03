'use strict';

// Enemies our player must avoid
var Enemy = function (y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    //Range of enemy left to right
    this.x = -101;
    //Up to down range of enemy for each row of bricks
    this.y = y;
    //Min, max speed of enemies
    this.speed = speed;
    //Sprite image
    this.sprite = 'images/char-boy.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
    if (this.x >= 505) {
        this.x = -101;
        var YAxis = [72, 155, 238];
        // randomly select a new y-coordinate
        this.y = Random(YAxis);
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
  this.reset();
  this.sprite = 'images/enemy-bug.png';
};

// sends player back to beginning
Player.prototype.reset = function () {
  this.x = 202;
  this.y = 404;
};

Player.prototype.update = function (dt) {
  if(this.y < 25){
      this.reset();
  };
};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (direction) {
  if (direction === 'left' && this.x > 0) {
      this.x = this.x - 101;
  } else if (direction === 'up' && this.y > 0) {
      this.y = this.y - 83;
  } else if (direction === 'right' && this.x < 404) {
      this.x = this.x + 101;
  } else if (direction === 'down' && this.y < 332) {
      this.y = this.y + 83;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(70, 150), new Enemy(150, 205), new Enemy(240, 100)];

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// returns random value from array
function Random(array) {
  return array[Math.floor(Math.random() * array.length)];
}
