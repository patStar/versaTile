/* package :  de.sepa.versatile.core.engine */

include('de.sepa.versatile.core.Constants');

/**
 * A simple implementation of a tile object.
 * 
 * @author Patrick Seeber
 */

function Tile( width , height , fillColor, strokeColor )
{
	this.fillColor 		= fillColor;
	this.strokeColor 	= strokeColor;
	this.width 			= width;
	this.height 		= height;
}

Tile.prototype = 
{	
	/**
	 * Draws this tile with the given color at the given position on the given context.
	 * 
	 * Optionally draws a border if the strokeColor parameter is given.
	 * 
	 * @param context 
	 * 		The context to draw on.
	 * @param x 
	 * 		The x coordinate of the upper left corner. 
	 * @param y 
	 * 		The y coordinate of the upper left corner.
	 * @param fillColor 
	 * 		The color to fill the tile with.
	 * @param strokeColor 
	 * 		The color to draw the border with.
	 */
	draw : function(context,x,y,fillColor,strokeColor){
				
		context.fillStyle = fillColor ? fillColor : this.fillColor;	
		context.beginPath();
		
		// draw the parallelogram.
		context.moveTo( x + this.width / 2 , y );
		context.lineTo( x + this.width , y + this.height / 2 );		
		context.lineTo( x + this.width / 2 , y + this.height );		
		context.lineTo( x , y + this.height / 2 );	
		
		context.fill();
		context.closePath();		
		
		// draw the border of the tile if a stroke color is provided
		if(strokeColor){
			context.strokeStyle = strokeColor;
			context.stroke();
		};
	}
};