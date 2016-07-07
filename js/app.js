//CHOOSING CHARACTER START
var playerChoice = prompt("Please select A character of your choice by keying in their number:\n"+
                           "1. Boy\n" + 
                           "2. Cat girl\n" +
                           "3. Horn girl\n" +
                           "4. Pink girl\n" +
                           "5. Princess girl");

//if player choice is not registered
while ((parseInt(playerChoice) <= 0)||
       (parseInt(playerChoice) > 5) || 
       (isNaN(playerChoice)===true)){
        console.log(playerChoice);
        playerChoice = prompt("There is no such character.Please select A character of your choice by keying in their number:\n"+
                               "1. Boy\n" + 
                               "2. Cat girl\n" +
                               "3. Horn girl\n" +
                               "4. Pink girl\n" +
                               "5. Princess girl");
}

//Condition of player's choice
var choice;
if (playerChoice === "1"){
    choice = "images/char-boy.png";
    console.log("1 " + choice);
}else if (playerChoice === "2"){
    choice = "images/char-cat-girl.png";
    console.log("2 " + choice);
}else if (playerChoice === "3"){
    choice = "images/char-horn-girl.png";
    console.log("3 " + choice);
}else if (playerChoice === "4"){
    choice = "images/char-pink-girl.png";
    console.log("4 " + choice);
}else if (playerChoice === "5"){
    choice = "images/char-princess-girl.png";
    console.log("5 " + choice);
}
//CHOOSING CHARACTER END

// ENEMY CLASS START
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.x = x;//enemy initial horizontal position.
    this.y = y;//enemy initial vertical position.

    this.sprite = 'images/enemy-bug.png';

    this.speed = speed; //speed of the Enemy

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt * 2; //increase the x position of Enemy in the horizontal axis. in this case,the enemy will be moving to the right

    //if the Enemy has reached the end of the canvas horizontally
    if (this.x >505) {
        this.x = 0; //send it back to where it has started.
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//ENEMY CLASS END

// Now instantiate Enemies
// Place all enemy objects in an array called allEnemies
var allEnemies = []//create the enemy array
var enemy1 = new Enemy(15, 50, 70);//create new enemy
var enemy2 = new Enemy(100, 135, 90);
var enemy3 = new Enemy(225, 220, 70);

allEnemies.push(enemy1);//push the enemy that was created into the array
allEnemies.push(enemy2);
allEnemies.push(enemy3);

//GEMS CLASS START
var Gems = function(x, y, color, points) {
    if (x === 1){
        this.x = 0;
    } else if (x === 2){
        this.x = 101;
    } else if (x === 3){
        this.x = 202;
    } else if (x === 4){
        this.x = 303;
    } else if (x === 5){
        this.x = 404;
    }
    this.y = y;
    this.points = points;
    if (color === "blue"){
        this.sprite = "images/Gem Blue.png";
    } else if (color === "green") {
        this.sprite = "images/Gem Green.png";
    } else if (color === "orange") {
        this.sprite = "images/Gem Orange.png";
    }
};

Gems.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Gems.prototype.positionReset = function() {
        var x = Math.floor(Math.random() * 4) + 1;
        if (x === 1){
            this.x = 0;
        } else if (x === 2){
            this.x = 101;
        } else if (x === 3){
            this.x = 202;
        } else if (x === 4){
            this.x = 303;
        } else if (x === 5){
            this.x = 404;
        }
};

//GEMS CLASS END

//Instantiate Gems
var allGems = [];//create the gems array
var blueGem = new Gems(Math.floor(Math.random() * 4) + 1, 50, "blue", 250);
var greenGem = new Gems(Math.floor(Math.random() * 4) + 1, 135, "green", 150);
var orangeGem = new Gems(Math.floor(Math.random() * 4) + 1, 220, "orange", 100);

allGems.push(blueGem);
allGems.push(greenGem);
allGems.push(orangeGem);

//PLAYER CLASS START
var Player = function(x, y) {
    this.x = x;//enemy initial horizontal position.
    this.y = y;//enemy initial vertical position.
    this.score = 0;

    this.sprite = choice;//loads a character of choice for every Player
};

// Update the player's position, required method for game
Player.prototype.update = function() {
    this.checkCollisions();
    this.collectItem();
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//input handler(for the game)
Player.prototype.handleInput = function(key) {
    if (key === 'up' && this.y < 100 && this.y > 1) {
        this.completedLevel();
        this.y -= 82.5; //move up
    } else if (key === 'left' && this.x > 1) {
        this.x -= 100; //move left
    } else if (key === 'right' && this.x < 400) {
        this.x += 100; //move right
    } else if (key === 'up' && this.y > 1) {
        this.y -= 82.5; //move up
    } else if (key === 'down' && this.y < 400) {
        this.y += 82.5; //move down
    }
};

//reset player
Player.prototype.reset = function(){
        this.x = 200;
        this.y = 400;
};

//collision checker
Player.prototype.checkCollisions = function() {
    //player dimensions
    var playerTop = this.y;
    var playerBottom = this.y + 60;
    var playerLeft = this.x;
    var playerRight = this.x + 65;

    for (var i = 0; i < allEnemies.length; i++){
        var enemy = allEnemies[i];
        //Enemy dimension
        var enemyTop = enemy.y;
        var enemyBottom = enemy.y + 65;
        var enemyLeft = enemy.x + 15;
        var enemyRight = enemy.x + 80;

        //if the player collides with the enemy
        if ((playerTop <= enemyBottom) &&
             (playerBottom >= enemyTop) &&
             (playerLeft <= enemyRight) &&
             (playerRight >= enemyLeft)){

            setTimeout(function() {
                blueGem.positionReset();
                orangeGem.positionReset();
                greenGem.positionReset();
                this.reset();
            }.bind(this), 200);
            this.score = 0;
            updateScoreBoard();
        }
    }
};

Player.prototype.collectItem = function() {
    //player dimensions
    var playerTop = this.y;
    var playerBottom = this.y + 60;
    var playerLeft = this.x;
    var playerRight = this.x + 65;

    for (var i = 0; i < allGems.length; i++){
        var gems = allGems[i];
        //gems dimension
        var gemsTop = gems.y;
        var gemsBottom = gems.y + 65;
        var gemsLeft = gems.x;
        var gemsRight = gems.x + 80;

        //if the player collects the gem
        if ((playerTop <= gemsBottom) &&
             (playerBottom >= gemsTop) &&
             (playerLeft <= gemsRight) &&
             (playerRight >= gemsLeft)){
            gems.x = 800;
            this.score += gems.points;
            updateScoreBoard();
        }
    }
};

//complete level
Player.prototype.completedLevel = function() {
        //if player reach the win condition (top of the canvas)
        this.score += 500;
        updateScoreBoard();
        setTimeout(function() {
            blueGem.positionReset();
            orangeGem.positionReset();
            greenGem.positionReset();
            this.reset();
        }.bind(this), 200);
};
//PLAYER CLASS END

//instantiate the player
// Place the player object in a variable called player
var player = new Player(200,400);

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


//SCOREBOARD START
var htmlScore = "<div class=playerScore>%score%</div>";
var formattedScore = htmlScore.replace("%score%", player.score);
$("#scoreBoard").append(formattedScore);
var updateScoreBoard = function() {
    $(".playerScore").remove();
    formattedScore = htmlScore.replace("%score%", player.score);
    $("#scoreBoard").append(formattedScore);
};
//SCOREBOARD END