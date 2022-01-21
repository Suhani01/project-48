var walkingbear,jumpingbear,bear, background1, standingBear
var gameState=0
var honeyImage
var honeyCount=0
var beeImage
var invisibleGround, invisibleGround2
var honeyGroup, beeGroup
var gameOverImage
var resetImage
var finalImage

function preload(){
  walkingbear=loadAnimation("images/bear1.png","images/bear2.png","images/bear3.png","images/bear4.png")
  background1=loadImage("images/bg4.png")
  honeyImage=loadImage("images/honey.png")
  beeImage=loadImage("images/bee.png")
  standingBear=loadAnimation("images/bear2.png")
  gameOverImage=loadImage("images/Gameover.png")
  resetImage=loadImage("images/restart.png")
  finalImage=loadImage("images/finalScore.png")
}

function setup(){
  createCanvas(displayWidth-05,displayHeight-120);
  
  
  //  bg=createSprite(width/2,0,width,height)
  //  bg.addImage(background1)
  //  bg.scale=0.45


   bg = createSprite(0,250,400,20);
  bg.addImage(background1);
  bg.scale=0.475
  // bg.x = width /2;

   bear=createSprite(50,displayHeight-275,20,50)
  bear.addAnimation("jumping",walkingbear)
  bear.addAnimation("standing",standingBear)
   bear.scale=0.3
  

   invisibleGround = createSprite(200,height-50,width+1500,10);
  invisibleGround.visible = false;

  invisibleGround2 = createSprite(200,20,width+1500,10);
  invisibleGround2.visible = false;

  gameOver=createSprite(width/2,height/2-100,50,50)
  gameOver.addImage(gameOverImage)
  gameOver.scale=0.7
  gameOver.visible=false;

  restart=createSprite(width/2,height/2+100,20,20)
  restart.addImage(resetImage)
  restart.scale=0.15
  restart.visible=false;
  
final=createSprite(width/2, height/2+250,20,20)
final.addImage(finalImage)
final.scale=0.35
final.visible=false
  honeyGroup=new Group()
  beeGroup=new Group()
}

function draw(){
 background(255) 
  bg.velocityX=-10
  if (bg.x <0.000000000000000000001){
    bg.x =width
  }

  
if(gameState===0){

  if(keyDown("space")) {
    bear.velocityY = -12;
  }

  bear.velocityY=bear.velocityY+0.8
  bear.collide(invisibleGround)
  beeGroup.bounceOff(invisibleGround)
  beeGroup.bounceOff(invisibleGround2)

  spawnHoney()
  spawnBee()

  for(var i=0;i<honeyGroup.length;i++){
    if(honeyGroup.get(i).isTouching(bear)){
      honeyGroup.get(i).destroy()
      honeyCount +=1
    }
  }

  // for(var i=0;i<beeGroup.length;i++){
  //  if(beeGroup.get(i).y===20){
  //     bee.velocityY=random()
  //     console.log(bee.y)
  //   }else if (beeGroup.get(i).y===height-50){
  //     bee.velocityY=random(-15,-5)
  //   }   
 if(beeGroup.isTouching(bear)){
   gameState=1
 }


}else if(gameState===1){

  bg.velocityX = 0;
    bear.velocityY = 0;
    bear.changeAnimation("standing",standingBear)

   beeGroup.setVelocityYEach(0)
   honeyGroup.setVelocityYEach(0)

   beeGroup.setVelocityXEach(0)
   honeyGroup.setVelocityXEach(0)

   beeGroup.setLifetimeEach(-1);
    honeyGroup.setLifetimeEach(-1);

    
    gameOver.visible=true
    
    gameOver.addImage(gameOverImage);

   restart.visible=true
    
    restart.addImage(resetImage);

    final.visible=true
    
    final.addImage(finalImage)
  

    if(mousePressedOver(restart)) {
      reset();
    }
  
 }
 
 drawSprites()
 if(gameState===1){
  fill("yellow")
  textSize(55)
  textFont("BOLD")
    text(honeyCount,width/2+120,height/2+270)
 }
if(gameState===0){
  fill("white")
  
  text("Honey Score: "+ honeyCount, width-200,50);

  final.visible=false
}
 
  
  
}

function spawnHoney() {

  if (frameCount % 100 === 0) {
    var honey = createSprite(width-50,120,40,10);
    honey.y = Math.round(random(50,500));
    honey.addImage(honeyImage);
    honey.scale = 0.1;
    honey.velocityX = -5;
    
    
    honey.lifetime =1000;
    gameOver.depth=honey.depth+1
    honeyGroup.add(honey);
  }
  
}

function spawnBee() {

  if (frameCount % 90 === 0) {
    var bee = createSprite(width-50,120,40,10);
    bee.y = Math.round(random(50,500));
    bee.addImage(beeImage);
    bee.scale = 0.1;
    bee.velocityX = -(6 + 3*honeyCount/15);
    bee.velocityY=random(6 + 7*honeyCount/5,-(6 + 7*honeyCount/5))

    // if(beeGroup.y===20){
    //   bee.velocityY=random(25)
    //   console.log(bee.y)
    // }else if (beeGroup.y===height-50){
    //   bee.velocityY=random(-65)
    // }    
    
    
    bee.lifetime = 1000;
    gameOver.depth=bee.depth+1
    beeGroup.add(bee);
  }

}



function reset(){
  gameState = 0;
  gameOver.visible = false;
  restart.visible = false;
  final.visible=false

  beeGroup.destroyEach();
  honeyGroup.destroyEach();
  
  
  bear.changeAnimation("jumping",walkingbear);
  honeyCount = 0;
  
}