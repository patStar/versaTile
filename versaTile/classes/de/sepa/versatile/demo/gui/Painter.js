/* package: de,sepa.verstaile.core.engine */

/**
 * Painter class to draw the map.
 * 
 * @author Patrick Seeber
 */
function Painter(){}
Painter.prototype = 
{
	/** The canvas context to draw on. */
	context : null,
	
	draw : function(){},
	
	drawTile : function(context,x,y,color,stroke){

		context.fillStyle = color ? color : this.fillColor;	
		context.beginPath();
		context.moveTo(x+this.width/2,yPos);
		context.lineTo(x+this.width,y+this.height/2);		
		context.lineTo(x+this.width/2,y+this.height);		
		context.lineTo(x,yPos+this.height/2);		
		context.fill();
		context.closePath();
	},
	
	drawField : function(field)
	{
		var c = this.newContext(64,64);
		if ( field.wall.s ){
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