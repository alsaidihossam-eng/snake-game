let hPositionX = 240;
let hPositionY = 160;
let directionX = 0;
let directionY = 0;
let grid = 40;
let body = [];
let fPosition = [];
let foodchain = 0;
let f = 1;
let mHistory = '0';
let sLength = 5;
let cIndex;
let score = 0;
let maxScore = 0;
let myCustomfont;
let gameEnd = false;
let hit = false;

// load Font


function startingBody() {
  for (let i = sLength; i > 0; i--) {
    body.push([((hPositionX - (grid*i)) + grid), hPositionY])}
  }


function preload(){
 myCustomfont = loadFont('PixelifySans-Bold.ttf');
 snakeHeadU = loadImage('snakeHeadU.png');
 snakeHeadD = loadImage('snakeHeadD.png');
 snakeHeadR = loadImage('snakeHeadR.png');
 snakeHeadL = loadImage('snakeHeadL.png');
 keyboardImageU = loadImage('pressedUp.jpg')
 keyboardImageD = loadImage('pressedDown.jpg')
 spaceBarImageU = loadImage('spaceBarUp.png')
 spaceBarImageD = loadImage('spaceBarDown.png') 
 appleImage = loadImage('apple.png')
}

// reset game function

function resetGame(){
 
  // Stop Loop

  noLoop();
  
  // Update maxScore 

  if (score > maxScore){
    maxScore = score;
  }  

  // Reset Stats

  hPositionX = 240;
  hPositionY = 160;
  sLength = 5;
  score = 0;
  body = [];
  startingBody()
  fPosition = [];
  directionX = 0;
  directionY = 0;
  mHistory = '0';
  textSize(50)
  fill('#f01f99')
  text('Game Over',(width / 2) - 130, (height / 2 ) - 20);
  textSize(35)
  text('Restart',(width / 2) - 80, (height / 2) + 30);
  image(spaceBarImageU, (width / 2) - 175 , (height / 2) + 0)
  gameEnd = true
  
}

// Setup

function setup(){

  createCanvas(800, 800);
  frameRate(10);
  
}


startingBody()

// While Draw Function

function draw(){

  // Background

  background('#efffdf');

  // Start Text

  if (mHistory == '0') { 
    textSize(50)
    text('Press To Start',(width / 2) - 195, (height / 2) + 150);
    if (frameCount % 8 == 0) {image(keyboardImageD, (width / 2) - 100 , (height / 2) - 67.5)} else {image(keyboardImageU, (width / 2) - 100 , (height / 2) - 67.5)}
  }

  // Head Position

  hPositionX += directionX;
  hPositionY += directionY;

  // Fruit Position

  if (mHistory != '0') {  
    if (random(0,1) < 0.1 && fPosition.length < 10) {
    let fPositionX = floor(random(0,1) * (width / grid)) * grid;
    let fPositionY = floor(random(0,1) * (height / grid)) * grid;
    fPosition.push([fPositionX, fPositionY]);
  }
 }

  // Draw Fruits

    for (const item of fPosition) {
    image(appleImage, item[0], item[1]);
  }

  // Check Food Collision
  
  for (const item of fPosition){
    if (hPositionX == item[0] && hPositionY == item[1]){
      sLength += 1;
      cIndex = fPosition.indexOf(item);
      fPosition.splice(cIndex,1);
      score += 1;
      hit = true;
    }
  }

  // Update Snake

  if (mHistory != '0') {
    if (body.length < sLength){
    body.push([hPositionX, hPositionY]);
    } else { body.shift();
      body.push([hPositionX, hPositionY]);
    }
  }

  for (let i = 0; i < body.length - 1; i++) {
  strokeWeight(1);
  stroke('#ffffff');
  fill('#ccdc39');
  square(body[i][0],body[i][1],grid);
  }

  // food animation

  if (hit) { if (f < body.length){
  fill('#f01f99');
  square(body[body.length-f][0],body[body.length-f][1],40);
  f += 2;
  } else {f = 1;
    hit = false;
  }
}

  // Snake Head Render

  if (mHistory == 'd') {image(snakeHeadR, hPositionX, hPositionY);
  } else if (mHistory == 's') {image(snakeHeadD, hPositionX, hPositionY);
  } else if (mHistory == 'w') {image(snakeHeadU, hPositionX, hPositionY);
  } else if (mHistory == 'a') {image(snakeHeadL, hPositionX, hPositionY);
  } else {image(snakeHeadR, hPositionX, hPositionY);}
  

  // Check Self Collision

  for (const item of body.slice(0,-1)) {
  if (item[0] == hPositionX && item[1] == hPositionY){
    resetGame();
  }
  }

  // Head Boundary Constraints

  if (hPositionX >= width){
  resetGame();
  } else if (hPositionX < 0){
  resetGame();
  }

  if (hPositionY >= height){
  resetGame();
  } else if (hPositionY < 0 ){
  resetGame();
  }
  
  // Score

  ScoreString = 'Score: ' + str(score);
  textFont(myCustomfont);
  textSize(25);
  fill('#f01f99');
  text(ScoreString, 20, 30);  

  // High Score

  maxScoreString = 'Highscore: ' + String(maxScore).padStart(3,'0');
  text(maxScoreString, 150, 30);


}

// Movements

function keyPressed(){
if (key === 'd' || keyCode === 39){
  if (mHistory != 'a'){
  directionX = +grid;
  directionY = 0;
  mHistory = 'd';
  }
} else if (key === 'a' || keyCode === 37) {
  if (mHistory != 'd' && mHistory != '0'){
  directionX = -grid;
  directionY = 0;
  mHistory = 'a';
  }
} else if (key === 'w' || keyCode === 38) {
  if (mHistory != 's'){
  directionY = -grid;
  directionX = 0;
  mHistory = 'w';
}
} else if (key === 's' || keyCode === 40) {
  if (mHistory != 'w'){
  directionY = +grid;
  directionX = 0;
  mHistory = 's';
}
}  else if (key === ' ') {
  if (gameEnd == true){
  directionX = +grid;
  directionY = 0;
  mHistory = 'd';
  loop()
  gameEnd = !gameEnd
  }
}
}

function mousePressed() {
  if (gameEnd == true){
    loop()
}
}
