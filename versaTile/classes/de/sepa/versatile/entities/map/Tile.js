include('de.sepa.versatile.core.Constants');

function Tile(width, height, x, y)
{
	this.strokeColor = "black";
	this.fillColor = "khaki";
	this.shadowColor = "#666C3F";
	this.x = x ? x :0;
	this.y = y ? y :0;
	this.width = width ? width : 64;
	this.height = height ? height : 32;
	this.anchor = C.Anchor.UPPER_LEFT;		
}

override(Tile,{
	
	getShadowByLevel : function(level)
	{
		return "rgb("+(100+(level*10))+","+(100+(level*10))+",0)";
	},
	
	draw : function(context,x,y,color,stroke){
		var xPos = x ? x : this.x;
		var yPos = y ? y : this.y;

		if(this.anchor == C.Anchor.UPPER_LEFT){
			context.fillStyle = color ? color : this.fillColor;	
			context.beginPath();
			context.moveTo(xPos+this.width/2,yPos);
			context.lineTo(xPos+this.width,yPos+this.height/2);		
			context.lineTo(xPos+this.width/2,yPos+this.height);		
			context.lineTo(xPos,yPos+this.height/2);		
			context.fill();
			context.closePath();
		}
	},
	
	drawMarker : function(context,x,y,color)
	{
		var xPos = x ? x : this.x;
		var yPos = y ? y : this.y;

		if(this.anchor == C.Anchor.UPPER_LEFT){
			context.fillStyle = "white";
			context.strokeStyle =  color ? color : this.fillColor;
			context.beginPath();
			context.moveTo(xPos+this.width/2,yPos);
			context.lineTo(xPos+this.width,yPos+this.height/2);		
			context.lineTo(xPos+this.width/2,yPos+this.height);		
			context.lineTo(xPos,yPos+this.height/2);
			context.closePath();
			context.fill();
			context.stroke();
		}
	}
});