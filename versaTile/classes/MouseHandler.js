function MouseHandler(game)
{	
	this.game = game;
}

MouseHandler.prototype = 
{
	game : null,
	mouseDown : null,
	
	mouseMove : function(event){	
		this.game.handleMouseMove(event.pageX-this.offsetLeft,event.pageY-this.offsetTop);
	}	
};