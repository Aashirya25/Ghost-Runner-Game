var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var edges

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(200,200)
  ghost.addImage(ghostImg)
  ghost.scale = 0.4


  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group()

  edges = createEdgeSprites()
}

function draw() {
  background(200);
  
  if(gameState == "play"){
  if(tower.y > 400){
      tower.y = 300
    }

  if(keyDown("space")){
    ghost.velocityY = -5
  }
   ghost.velocityY = ghost.velocityY + 0.08 
  
   if(keyDown("Left_arrow")){
     ghost.x = ghost.x -2
   }
   if(keyDown("Right_arrow")){
     ghost.x = ghost.x + 2
   }

   spawnRailing()

if(climbersGroup.isTouching(ghost)){
  ghost.velocityY = 0
}

if(invisibleBlockGroup.isTouching(ghost)||ghost.y>550){
  ghost.destroy()
  gameState = "end"
}
  }
  
  if(gameState == "end"){
    text ("game over",200,200)
  }
    drawSprites()
}

function spawnRailing() {
  if(frameCount%280===0){
    door = createSprite(200,-50)
    climber = createSprite(200,10)
    invisibleBlock = createSprite(200,15)

    invisibleBlock.setWidth = climber.setWidth
    invisibleBlock.height = 2

    climber.addImage(climberImg)
    door.addImage(doorImg)

    door.velocityY=1
    climber.velocityY = 1
    invisibleBlock.velocityY = 1

    door.x = Math.round(random(120,400))

    climber.x = door.x
    invisibleBlock.x = door.x

    climber.lifetime = 800
    door.lifetime = 800
    invisibleBlock.lifetime = 800

    doorsGroup.add(door)
    climbersGroup.add(climber)
    invisibleBlockGroup.add(invisibleBlock)

    ghost.depth = door.depth
   ghost.depth = ghost.depth + 5


  }
}



