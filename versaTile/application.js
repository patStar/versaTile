$(function(){main();});

include('Game');

function main()
{
	canvas = $('<canvas id="gameScreen" width="800" height="600" style="background-color:#313131"/>');
	$('body').append(canvas);
	
	var game = new Game();
	game.screen = { context : $('#gameScreen')[0].getContext('2d'), mapOrigin: {x:400,y:200} };
	game.loadMap("firstMap");
	game.updateMap();

	canvas.bind('mouseout',function(event){game.handleMouseOut(event,event.pageX-this.offsetLeft,event.pageY-this.offsetTop);});
	canvas.bind('mousemove',function(event){game.handleMouseMove(event,event.pageX-this.offsetLeft,event.pageY-this.offsetTop);});
	canvas.bind('mousedown',function(event){game.handleMouseDown(event,event.pageX-this.offsetLeft,event.pageY-this.offsetTop);});
	canvas.bind('mouseup',function(event){game.handleMouseUp(event,event.pageX-this.offsetLeft,event.pageY-this.offsetTop);});
	canvas.bind('click',function(event){game.handleClick(event,event.pageX-this.offsetLeft,event.pageY-this.offsetTop);});
	
}