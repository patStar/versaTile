include('de.sepa.versatile.core.Constants');

function WallStyle(northImage, northImageSelect, eastImage,eastImageSelect, westImage, westImageSelect, southImage, southImageSelect)
{
	var weX = "gfx/wireWallWE_32x48.png";
	var we = "gfx/wallWE_32x48.png";
	var nsX = "gfx/wireWallNS_32x48.png";
	var ns = "gfx/wallNS_32x48.png";
	
	this.filled = new Object();
	
	this.filled[C.Direction.NORTH] = new Image();
	this.filled[C.Direction.EAST] = new Image();
	this.filled[C.Direction.WEST] = new Image();
	this.filled[C.Direction.SOUTH] = new Image();
	
	this.filled[C.Direction.NORTH].src = northImage ? northImage : ns;
	this.filled[C.Direction.EAST].src = eastImage ? eastImage : we;
	this.filled[C.Direction.WEST].src = westImage ? westImage : we;
	this.filled[C.Direction.SOUTH].src = southImage ? southImage : ns;
	
	this.selected = new Object();
	
	this.selected[C.Direction.NORTH] = new Image();
	this.selected[C.Direction.EAST] = new Image();
	this.selected[C.Direction.WEST] = new Image();
	this.selected[C.Direction.SOUTH] = new Image();
	
	this.selected[C.Direction.NORTH].src = northImageSelect ? northImageSelect : nsX;
	this.selected[C.Direction.EAST].src = eastImageSelect ? eastImageSelect : weX;
	this.selected[C.Direction.WEST].src = westImageSelect ? westImageSelect : weX;
	this.selected[C.Direction.SOUTH].src = southImageSelect  ? northImageSelect : nsX;
}

override(WallStyle,{
	filled : null,
	selected : null
});