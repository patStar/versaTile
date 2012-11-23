include('de.sepa.versatile.core.Constants');
include('de.sepa.versatile.entities.map.WallStyle');

function WallManager()
{	
	this.walls = new Object();
	this.walls['default'] = new WallStyle();	
	var nsDoorUnder = "gfx/wallDoorUnderNS_32x48.png";
	this.walls['deafult_doors_under'] = new WallStyle(nsDoorUnder,null,null,null,null,null,nsDoorUnder,null);
	var nsDoorUpper = "gfx/wallDoorUpperNS_32x48.png";
	this.walls['deafult_doors_upper'] = new WallStyle(nsDoorUpper,null,null,null,null,null,nsDoorUpper,null);
	
	this.images = new Object();
	this.addImage("S","gfx/wallNS_32x48.png");
	this.addImage("Du","gfx/wallDoorUpperNS_32x48.png");
	this.addImage("Dl","gfx/wallDoorUnderNS_32x48.png");
	this.addImage("N","gfx/wallNS_32x48.png");
	this.addImage("W","gfx/wallWE_32x48.png");
	this.addImage("E","gfx/wallWE_32x48.png");
}

override(WallManager,
{	
	height : 48,
	width : 32,
	context : null,
	walls : null,
	images : null,
	
	addImage : function(id,src)
	{
		this.images[id] = new Image();
		this.images[id].src = src;
	},
	
	draw : function(x,y,filled,frame,direction,style)
	{
		style = style ? style : 'default';
		if(frame) this.context.drawImage(this.walls[style]['selected'][direction],x,y);
		if(filled) this.context.drawImage(this.walls[style]['filled'][direction],x,y);
	},
	
	drawNorthWall : function(x,y,style){this.draw(x,y,true,false,C.Direction.NORTH,style);},
	drawSouthWall : function(x,y,style){this.draw(x-this.width,y+16,true,false,C.Direction.SOUTH,style);},
	drawWestWall  : function(x,y,style){this.draw(x-this.width,y,true,false,C.Direction.WEST,style);},
	drawEastWall  : function(x,y,style){this.draw(x,y+16,true,false,C.Direction.EAST,style);},
	
	drawNorthWallPlusWire : function(x,y,style){this.draw(x,y,true,true,C.Direction.NORTH,style);},
	drawSouthWallPlusWire : function(x,y,style){this.draw(x-this.width,y+16,true,true,C.Direction.SOUTH,style);},
	drawWestWallPlusWire  : function(x,y,style){this.draw(x-this.width,y,true,true,C.Direction.WEST,style);},
	drawEastWallPlusWire  : function(x,y,style){this.draw(x,y+16,true,true,C.Direction.EAST,style);},
	
	drawNorthWallWireOnly : function(x,y,style){this.draw(x,y,false,true,C.Direction.NORTH,style);},
	drawSouthWallWireOnly : function(x,y,style){this.draw(x-this.width,y+16,false,true,C.Direction.SOUTH,style);},
	drawWestWallWireOnly  : function(x,y,style){this.draw(x-this.width,y,false,true,C.Direction.WEST,style);},
	drawEastWallWireOnly  : function(x,y,style){this.draw(x,y+16,false,true,C.Direction.EAST,style);},
	
	get : function(id) { return this.images[id];}
});