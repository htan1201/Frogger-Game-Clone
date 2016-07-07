frontend-nanodegree-arcade-game
===============================

Students should use this [rubric](https://www.udacity.com/course/viewer/#!/c-nd001/l-2696458597/m-2687128535) for self-checking their submission.

For detailed instructions on how to get started, check out this [guide](https://docs.google.com/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub?embedded=true).

===============================
HOW TO PLAY THE GAME
===============================
OBJECTIVES:
 * COLLECT AS MANY GEMS TO GET MORE POINTS. (THE GEMS THAT IS CLOSER TO THE RIVER HAVE MORE POINTS)
 * AVOID THE BUGS!!!
 * GET TO THE RIVER TO COMPLETE THE LEVEL.

HOW TO PLAY:
 1. OPEN THE INDEX.HTML INTO YOUR BROWSER BY DOUBLE CLICKING ON IT.
 2. CHOOSE YOUR CHARACTER BY INPUTTING NUMBERS IN THE PROMPT.
 3. USE ARROWS TO CONTROL YOUR CHARACTER.


engine.js guide
===============================

`renderEntities()` is a function that can be used to add more entities. such as the collectible items for the game

`Resources.load`, add more images to it, to allow the game to load images that you want to use in the game.

app.js guide
===============================

1. Enemy Class

`Enemy` class is where all the details of the enemy should be declared.

`Enemy.prototype.update` is a function that is used to update the enemy objects, depending on what you would like the objects to do upon trigerring an event. (e.g if the enemy reaches the end of the canvas, return the object to the start of the canvas).

`Enemy.prototype.render` is a function where the system will draw the objects that you declared respectively.

2. Gems Class

`Gems` is a class where all the initial properties of the gems should be declared

`Gems.prototype.render` is a function where the system will draw the objects that you declared respectively.

`Gems.prototype.positionReset` is a function that is used in this game when the game is over or completed, to position back the gems in a random position.

3. Player Class

`Player` is a class where all the initial properties of the players should be declared.

`Player.prototype.update` is a function that is used to update the condition of the player according to its position.

`Player.prototype.render` is a function where the system will draw the objects that you declared respectively.

`Player.prototype.handleInput` is a function where the game handles the keyboard input from the user.

`Player.prototype.reset` is a function that is used to reset the position of the player upon completing the game or lost the game.

`Player.prototype.checkCollisions` is a function that is used to check the position between the player and the enemies, if they overlap, means they have collided.

`Player.prototype.collectItem` is a function that is used to check the position between the player and the gems, if they overlap, means the player have collected the gem and it will add the score to the scoreboard respectively.

'Player.prototype.completedLevel' is a function that will be called when the player have completed the level. it will reset the gems and player position.

4. Score Board

`updateScoreBoard` is a function that is used to update the scoreboard in the html page