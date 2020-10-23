 var PLAY = 1;
 var END = 0;
 var gameState = 1;
 var sword,swordImage;
 var fruitGroup,fruit1,fruit2,fruit3,fruit4;
 var enemyGroup,enemy1,enemy2;
 var monster;
 var gameOverImage
 var score;
 var gameoverSound,knifeSwordSound;

function preload(){
 swordImage = loadImage("sword.png");
 fruit1 = loadImage("fruit1.png");
 fruit2 = loadImage("fruit2.png");
 fruit3 = loadImage("fruit3.png");
 fruit4 = loadImage("fruit4.png");
 enemy1 = loadAnimation("alien1.png","alien2.png");
 gameOverImage = loadImage("gameover.png");
  gameoverSound = loadSound("gameover.mp3")
 knifeSwordSound = loadSound("knifeSwooshSound.mp3")
}
function setup(){
  createCanvas(600, 400);
  sword = createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale = 0.5;
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  score = 0; 
}
function draw(){
  background ("skyblue");
  
  if(gameState === PLAY){
  spawnEnemy();
  spawnFruits();
  sword.y = World.mouseY;
  sword.x = World.mouseX;
    
  if(fruitGroup.isTouching(sword)){
     fruitGroup.destroyEach();
     score = score + 2;
    knifeSwordSound.play()
    }
  if(enemyGroup.isTouching(sword)){
    gameState = END;
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    fruitGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
    sword.addImage(gameOverImage);
    sword.x = 300;
    sword.y = 200; 
    gameoverSound.play()
  }     
  }
  drawSprites();
    text("Score: "+ score, 500,50);
}
function spawnFruits(){
  
  if(World.frameCount % 80 === 0){
    
    fruit = createSprite(600,400,20,20);
    fruit.scale = 0.2;
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: fruit.addImage(fruit1);
              break;
      case 2: fruit.addImage(fruit2);
              break;
      case 3: fruit.addImage(fruit3);
              break;
      case 4: fruit.addImage(fruit4);
              break;
              default: break;
    }
    fruit.y = Math.round(random(50,340));
    fruit.velocityX = -7;
    fruit.setLifetime = 100;
    fruitGroup.add(fruit);
  }
}
function spawnEnemy(){
  if(World.frameCount % 200 === 0){
     monster = createSprite(600,400,20,20);
     monster.addAnimation("monster", enemy1);
     monster.y = Math.round(random(100,300));
     monster.velocityX = -8;
     monster.setLifetime = 50;
     enemyGroup.add(monster);
  }
}