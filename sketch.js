var PLAY = 1 ;
var END = 0 ;
var gameState = PLAY ;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var survivalTime , monkey_collided , over
var forestImage , forest , gameoverImage
var background_sound

function preload(){
 
  monkey_collided = loadAnimation("sprite_4.png") ;
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  forestImage = loadImage("forest20.png") ;
  gameoverImage = loadImage("gameover.png") ;
  restartImage = loadImage("restart.jpg") ;
  background_sound = loadSound("running_sound.mp3") ;

  
 
}



function setup() {
createCanvas(600 ,600) ;
  
  
forest = createSprite(300 ,250 ,600 ,600) ;
forest.addImage(forestImage) ;
forest.scale = 2.45;
forest.x = forest.width/2 ;
console.log(forest.x) ;
  
  
monkey = createSprite(50 , 500 ,20 ,20) ;
monkey.addAnimation("monkey" ,monkey_running) ;
monkey.addAnimation("collided" , monkey_collided) ;
monkey.scale = 0.145 ;
  
over = createSprite(290 , 150, 20 ,20) ;
over.addImage(gameoverImage) ;
over.scale = 0.5 ;
  
restart = createSprite(290 , 250, 20 ,20) ;
restart.addImage(restartImage) ;
restart.scale = 0.1 ; 

ground = createSprite(400 ,550 ,1200 ,10) ;
ground.visible = false ;

  
bananaGroup = createGroup() ; 
obstaclesGroup = createGroup() ; 
    
monkey.setCollider("circle" ,0 ,0 , 270 ) ;
monkey.debug = true ;
    
score = 0 ; 
  
survivalTime = 0 ;
    
}


function draw() {
  background("white") ;
  
  
  if(gameState === PLAY){
    
    over.visible = false ;
    restart.visible = false ;
    
    background_sound.play() ; 
    
    forest.velocityX = -5 ;
    
 if(forest.x < 0){
    forest.x = forest.width/2 ;   
    }
 
   console.log(monkey.y) ;   
  
    
 if(keyDown("space") &&  monkey.y >=300){
    monkey.velocityY = -16 ;
    }

    monkey.velocityY = monkey.velocityY + 0.8  ;
  
    rock() ; 
  
    food() ;  
  
   survivalTime = survivalTime + Math.round(getFrameRate()/60) ;
    
 if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach() ;
    score = score+1 ;  
    } 
    

  
 if(obstaclesGroup.isTouching(monkey)){
     gameState = END ; 
     
}
  }else if(gameState === END){
   
    over.visible = true ;
    restart.visible = true ;
    
    monkey.changeAnimation("collided" , monkey_collided) ; 
    
    forest.velocityX = 0 ;
    monkey.velocityY = 0 ;
    
    background_sound.stop() ;
    
    
    if(mousePressedOver(restart)){
      
      reset();
    }
    
    obstaclesGroup.setVelocityXEach(0) ;
    bananaGroup.setVelocityXEach(0) ;  
    obstaclesGroup.setLifetimeEach(-1) ;
    bananaGroup.setLifetimeEach(-1) ;  

  
}

    monkey.collide(ground) ; 

  
 drawSprites() ;

   stroke("black") ;
   fill("black") ;
   textSize(20) ;
   text("SurvivalTime :" +survivalTime , 100 ,50) ; 
  
   stroke("black") ;
   fill("black") ;
   textSize(20) ;
   text("Score :" +score , 400 ,50) ;

}

function reset(){
  
gameState = PLAY ;
over.visible = false ;
restart.visible = false ;
obstaclesGroup.destroyEach() ;
bananaGroup.destroyEach() ;
 
monkey.changeAnimation("running" , monkey_running) ;

survivalTime = 0 ;
score = 0 ;
  
  
}


function food(){
 if(frameCount % 100  ===  0){
  var banana = createSprite(600 , 600 , 20 ,20) ;
  banana.addImage(bananaImage) ;
  banana.scale = 0.1 ;
  banana.velocityX = -(5 +3*score/10) ;
  banana.lifetime = 150 ; 
  
  banana.y = Math.round(random(320 ,400)) ;
   
  bananaGroup.add(banana) ; 
  } 
}



function rock(){
 if(frameCount % 200  ===  0){
  var obstacle = createSprite(600 , 510 , 20 ,20 ) ;
  obstacle.addImage(obstaceImage) ;
  obstacle.scale = 0.18 ;
  obstacle.velocityX = -(5 +3*score/20) ;
  obstacle.lifetime = 150 ;
  
   obstacle.setCollider("circle" , 0 ,0 ,200) ;
   obstacle.debug  = true ;
   
  obstaclesGroup.add(obstacle) ;
  } 
}