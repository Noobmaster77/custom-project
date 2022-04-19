var bg,bgImg;
var player, shooterImg, shooter_shooting;
var bullet,bulletImg,bulletGroup,blastImg;
var zombie,zombieImage,zombieGroup 

var life =3
var score = 0
var gameState = 1

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  blastImg = loadImage("assets/blast.png")
  bgImg = loadImage("assets/bg.jpeg")
  bulletImg = loadImage("assets/bullet1.png")
 zombieImage = loadImage("assets/zombie.png")
 
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1600, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

   bulletGroup = createGroup(); 

  heading = createElement("h3"); 
  scoreboard = createElement("h3");
}

function draw() {
  background(0);
  
  if (gameState===1){
    enemyzombie();
  }







  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 shootBullet();
  player.addImage(shooter_shooting)
  
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

scoreboard.html("Score: "+score)
scoreboard.style('color:red'); 
scoreboard.position(width-200,20)

heading.html("Life: "+life)
heading.style('color:red'); 
heading.position(150,20)


//f (zombieGroup.touches(player)) {
////handleGameover(zombieGroup);
//}

//if(zombieGroup.collide(bulletGroup)){
 //handleBubbleCollision(zombieGroup);
//}




drawSprites();
enemyzombie();
}

function enemyzombie(){

  if (frameCount % 50 === 0){
    zombie = createSprite(random(1000,1500),random(300,500),40,40)
    zombie.addImage(zombieImage);
    zombie.scale =0.15
    zombie .velocityX = -3
  }
}
  function shootBullet(){
   bullet= createSprite(190, width/4, 50,20)
   bullet.y= player.y-20
   bullet.addImage(bulletImg)
   bullet.scale=0.12
     bullet.velocityX= 7
   bulletGroup.add(bullet)
}


function handleBubbleCollision(zombieGroup){
  if (life > 0) {
     score=score+1;
  }

  blast= createSprite(bullet.x+60, bullet.y, 50,50);
  blast.addImage(blastImg) 
  
  blast.scale=0.3
  blast.life=20
  bulletGroup.destroyEach()
  zombieGroup.destroyEach()
}


function handleGameover(zombieGroup){
  
  life=life-1;
  zombieGroup.destroyEach();
  

  if (life === 0) {
    gameState=2
    
    swal({
      title: `Game Over`,
      text: "Oops you lost the game....!!!",
      text: "Your Score is " + score,
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"
    });
  }

}