include('C');

function Wall(width, height, x, y)
{
	this.image = new Object();
	this.image.we = new Image();
	this.image.we.src = "gfx/wallWE_32x48.png";
	this.image.ns = new Image();
	this.image.ns.src = "gfx/wallNS_32x48.png";
	this.image.nsWire = new Image();
	this.image.nsWire.src = "gfx/wireWallNS_32x48.png";
	this.image.weWire = new Image();
	this.image.weWire.src = "gfx/wireWallWE_32x48.png";
	this.image.nsDoorLowerWire = new Image();
	this.image.nsDoorLowerWire.src = "gfx/wallDoorUnderWallNS_32x48.png";
	this.image.nsDoorUpperWire = new Image();
	this.image.nsDoorUpperWire.src = "gfx/wallDoorUpperWallNS_32x48.png";
}

override(Wall,{
	
	height : 48,
	width : 32,
	
	draw : function(context,x,y,direction,filled,frame)
	{
		if(direction == C.Direction.WEST){
			x -= this.width;
			if(frame) context.drawImage(this.image.weWire,x,y);
			if(filled) context.drawImage(this.image.we,x,y);
		}else if(direction == C.Direction.SOUTH){
			x -= this.width;
			y += 16;
			if(frame) context.drawImage(this.image.nsWire,x,y);
			if(filled) context.drawImage(this.image.ns,x,y);
		}else if(direction == C.Direction.EAST){
			y += 16;
			if(frame) context.drawImage(this.image.weWire,x,y);
			if(filled) context.drawImage(this.image.we,x,y);
		}else if(direction == C.Direction.NORTH){
			if(frame) context.drawImage(this.image.nsWire,x,y);
			if(filled) context.drawImage(this.image.ns,x,y);
		}
	},
	
	drawWall : function(context,x,y,direction){this.draw(context,x,y,direction,true,false);},
	drawWiredWall : function(context,x,y,direction) {this.draw(context,x,y,direction,false,true);},	
	drawMarkedWall : function(context,x,y,direction) {this.draw(context,x,y,direction,true,true);}
});