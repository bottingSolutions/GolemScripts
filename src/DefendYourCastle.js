/*
 * This scripts works for the game Defend Your Castle found at http://www.xgenstudios.com/game.php?keyword=castle 
 * in its current state it gets to about level 17 before losing. I Believe this is due to the giants falling over and
 * causing the script to spend too much time trying to move them. Until I have better shape recognition methods implemented this script is
 * at about as good as its going to get.
 * 
 */
var ShapeType = Java.type('solutions.botting.golem.shape.ShapeType');
var ColorPoint = Java.type('solutions.botting.golem.color.ColorPoint');
var ArrayList = Java.type('java.util.ArrayList');
var running = false;
var gameOverColorPoints = new ArrayList();
var mainMenuColorPoints = new ArrayList();
var inLevelColorPoints = new ArrayList();
var shopColorPoints = new ArrayList();
var roundOverColorPoints = new ArrayList();
var gameState = "";
startUp();

while(running){
	//you don't want to get the script stuck!
	 if (golem.getCurrentScript().isInterrupted()){
	 	running = false;
	 	break;
	 }
	var screenCapture = api.getBufferedImageOfBotBounds();

	 gameState = checkGameState(screenCapture);
	
	switch(gameState){
		case 0:
		
		
			//check for small mobs
			var p = color.findColorInAreaInImage(-15132391,1,199,301,368,false,true,true,screenCapture);
			if(p != null){
			
				input.holdMouse(p.x,p.y,1);
				  input.releaseMouse(50,2,1);
				
			}	
				
			
		break;		
		case 1:
			
			golem.getCurrentScript().interrupt();
		break;
		case 3:
		
			var p = api.getRandomPointInBounds(340.0,355.0,45,20)
			input.clickMouse(p.x,p.y,1);	
			java.lang.Thread.sleep(1000); 
		break;
		case 4:
			var p = api.getRandomPointInBounds(480,365,40,15)
			input.clickMouse(p.x,p.y,1);	
			java.lang.Thread.sleep(1000); 		
		break;
		case 2:
		
			var p = api.getRandomPointInBounds(252,255,108,5)
			input.clickMouse(p.x,p.y,1);
		break;

		case 5:
			
		break;
		
		
	
		
	}
}


function checkGameState(image){
	if(color.isColorAtPointsInImage(inLevelColorPoints,image)){
		return 0;
	}	
	if(color.isColorAtPointsInImage(gameOverColorPoints,image)){
		return 1;
	}
	if(color.isColorAtPointsInImage(mainMenuColorPoints,image)){
		return 2;
	}	
	if(color.isColorAtPointsInImage(roundOverColorPoints,image)){
		return 3;
	}
	if(color.isColorAtPointsInImage(shopColorPoints,image)){
		return 4;
	}

	return 5;
}	

function startUp(){
	resetBotArea();
//colors points for state identifcation
	gameOverColorPoints.add(new ColorPoint(-3355444,60,75));
	gameOverColorPoints.add(new ColorPoint(-1,197,215));
	mainMenuColorPoints.add(new ColorPoint(-3355444,49,31));
	mainMenuColorPoints.add(new ColorPoint(-3355444,508,55));
	mainMenuColorPoints.add(new ColorPoint(-12733694,406,118));	
	mainMenuColorPoints.add(new ColorPoint(-7631989,412,338));		
	roundOverColorPoints.add(new ColorPoint(-3355444,285,139));	
	roundOverColorPoints.add(new ColorPoint(-3355444,307,287));	
	shopColorPoints.add(new ColorPoint(-3355444,42,375));	
	shopColorPoints.add(new ColorPoint(-3355444,274,375));	
	inLevelColorPoints.add(new ColorPoint(-16738048,546,391));	
	running =findGameArea();
}
/*
 * Used because we are detecting the game area automatically and not presetting
 * we need to reset the bot area to search the entire screen.
 */
function resetBotArea(){
	golem.setBotBoundsFullScreen();
}
function findGameArea(){
	var rectangle = shape.findShapesWithSize(ShapeType.RECTANGLE,550,400,10);
	if(!rectangle.isEmpty()){
		golem.setBotBounds(rectangle[0].getBounds());
		return true;
	}
	print("could not find game area");
	return false;
}