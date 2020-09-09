var tower, towerImage;
var ghost, ghostImage;
var gamestate = "play"
var door, doorImage, doorGroup;
var climber, climberImage, climberGroup;

function preload() {
  towerImage = loadImage("tower.png");
  ghostImage = loadImage("ghost-standing.png")
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png")

}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300, 300);
  tower.addImage(towerImage)
  tower.scale = 1.25;
  tower.velocityY = 1;
  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage(ghostImage);
  ghost.scale = 0.4;
  doorGroup = new Group();
  climberGroup = new Group();
}

function draw() {
  background(0)
  if (gamestate == "play") {

    if (keyDown("right")) {
      ghost.x = ghost.x + 2

    }
    if (keyDown("left")) {
      ghost.x = ghost.x - 2


    }
    if (tower.y > 400) {
      tower.y = 300;

    }
    spawnDoors();
    if (climberGroup.isTouching(ghost)) {
      gamestate = "end";

    }
  }
  if (gamestate == "end") {
    ghost.destroy();
    doorGroup.destroyEach();
    climberGroup.destroyEach();
    tower.destroy();
    stroke("yellow");
    fill ("yellow");
    textSize(30);
    text("GAMEOVER",200,200)
  }
  drawSprites();
}

function spawnDoors() {
  if (frameCount % 240 == 0) {
    door = createSprite(200, -50);
    climber = createSprite(200, 10);
    door.addImage(doorImage);
    door.x = Math.round(random(150, 400))
    climber.x = door.x
    climber.addImage(climberImage);
    door.velocityY = 2;
    climber.velocityY = 2;
    ghost.depth = door.depth;
    door.depth = climber.depth;
    ghost.depth = ghost.depth + 5;
    doorGroup.add(door);
    climberGroup.add(climber);
    door.lifetime = 130;
    climber.lifetime = 130;
  }


}