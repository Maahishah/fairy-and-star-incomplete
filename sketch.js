var starImg, fairyImg, bgImg;
var fairy , fairyVoice;
var star, starBody;
var starGroup;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	starImg = loadImage("images/star.png");
	fairyImg = loadAnimation("images/fairyImage1.png","images/fairyImage2.png");
	bgImg = loadImage("images/starryNight.jpg");
	fairyVoice = loadSound("sound/JoyMusic.mp3");

}

function setup() {
	createCanvas(800, 750);

    starGroup =  createGroup();

	// fairyVoice.play();

	fairy = createSprite(130, 520);
	fairy.addAnimation("fairyflying",fairyImg);  
	fairy.scale =0.25;

	engine = Engine.create();                
	world = engine.world;

	starBody = Bodies.circle(650 , 30 , 5 , {restitution:0.5, isStatic:true});
	World.add(world, starBody);
	
	Engine.run(engine);

}

function draw() {
  background(bgImg);

  //starGroup.debug=true;
fairy.debug=true;
fairy.setCollider("rectangle",0,0,700,700);






  stars();

for(var i=0;i<starGroup.lenght;i++){
	if(starGroup.get(i).isTouching(fairy)){
		starGroup.get(i).remove()
		
	}
}



  keyPressed();
  edgeSprites();
  drawSprites();
}







function keyPressed() {
if(keyCode===LEFT_ARROW){
	fairy.velocityX=-3;
}

if(keyCode===RIGHT_ARROW){
	fairy.velocityX=3;
}
}

//making stars 
function stars(){
if(frameCount%100===0){
var star = createSprite(650,30);
	star.addImage(starImg);
	star.scale = 0.2;
	star.velocityY=4;
	star.x=random(0,800);
    star.debug=true;
	star.lifetime=200;
	starGroup.add(star);
	//starGroup.setLifetimeEach(300);
}}

//edge sprites
function edgeSprites(){
var topEdge = createSprite(400,10,800,20);
topEdge.visible=false;

var bottomEdge = createSprite(400,740,800,20);
bottomEdge.visible=false;

var rightEdge = createSprite(0,375,20,750);
rightEdge.visible = false;

var leftEdge = createSprite(790,375,20,750);
leftEdge.visible=false;


fairy.bounceOff(topEdge);
fairy.bounceOff(bottomEdge);
fairy.bounceOff(rightEdge);
fairy.bounceOff(leftEdge);

}

