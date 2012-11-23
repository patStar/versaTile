/*package: de.sepa.versatile.core*/

include('de.sepa.versatile.core.Game'); // includes the Game class which is pretty much the master class.

/**
 * 
 * 
 * @author Patrick Seeber 
 */
$(function(){
	
	// the html5 canvas object created by jQuery. This will be our game screen.
	var canvas = $('<canvas id="gameScreen" width="800" height="600" style="background-color:#313131"/>');
	
	// add the game screen to the body element of the html page.
	$('body').append(canvas);
	
	// get the context to draw on
	var context = $('#gameScreen')[0].getContext('2d');
	
	// create a new instance of the game object.
	var game = new Game();
	game.screen = { 
		context 	: context, 
		mapOrigin	: {x:400,y:200} 
	};
	// load the map named firstMap.
	game.loadMap("firstMap");
	game.updateMap();

	// --- REGISTER MOUSE LISTENERS --- //
	
	// register mouse out listener
	canvas.bind('mouseout',function(event) {
		game.handleMouseOut(event,event.pageX-this.offsetLeft,event.pageY-this.offsetTop);
	});
	
	// register mouse move listener
	canvas.bind('mousemove',function(event) {
		game.handleMouseMove(event,event.pageX-this.offsetLeft,event.pageY-this.offsetTop);
	});
	
	// register mouse down listener
	canvas.bind('mousedown',function(event) {
		game.handleMouseDown(event,event.pageX-this.offsetLeft,event.pageY-this.offsetTop);
	});
	
	// register mouse up listener
	canvas.bind('mouseup',function(event) {
		game.handleMouseUp(event,event.pageX-this.offsetLeft,event.pageY-this.offsetTop);
	});
	
	// register mouse clcik listener
	canvas.bind('click',function(event)	{
		game.handleClick(event,event.pageX-this.offsetLeft,event.pageY-this.offsetTop);
	});

});