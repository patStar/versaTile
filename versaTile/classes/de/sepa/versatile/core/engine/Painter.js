function Painter(){}
Painter.prototype = 
{
	context : null,
	
	draw : function(){},
	
	drawTile : function(context,x,y,color,stroke){
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
	
	drawField : function(field)
	{
		var c = this.newContext(64,64);
		if(field.wall.s){
			this.drawWallS(c); // draw the southern wall
		}
		if(field.wall.e){
			this.drawWallE(c); // draw the eastern wall
		}
		if(field.wall.ground){
			this.drawGround(c); // draw the ground
		}
		return c;
	},
	
	newContext : function (width, height) { $('<canvas width="'+width+'" height="'+height+'">')[0].getContext('2d'); },
	
	drawGround : function (context)
	{
		context.fillStyle = "khaki";
		context.beginPath();
		context.fill();
		context.closePath();
	}
};