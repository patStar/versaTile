/* package : de.sepa.versatile.core.engine */

include("de.sepa.versatile.core.engine.MapFieldObject");

/**
 * A simple implementation of a tile object.
 * 
 * @param width {Numeric}
 * 		The width of this tile.
 * @param height {Numeric}
 * 		The height of this tile.
 * @param fillColor {String}
 * 		The color to fill this tile with. 
 * @param strokeColor {String} 
 * 		The color for the border of this tile.
 * @param shiftX {Numeric} 
 * 		The x shift of this tile necessary for drawing.
 * @param shiftY {Numeric}
 * 		The y shift of this tile necessary for drawing. 
 * 
 * @author Patrick Seeber
 */
function Tile( width , height , fillColor, strokeColor , shiftX , shiftY )
{
	this.fillColor 		= fillColor;
	this.strokeColor 	= strokeColor;
	this.width 			= width;
	this.height 		= height;
	
	this.shiftX 		= shiftX ? shiftX : 0;
	this.shiftY 		= shiftY ? shiftY : 0;
}
// Overriding the MapFieldObject since at least, this is what 
// a tile is and to benefit from shift parameter. 
Tile.prototype = new MapFieldObject('Tile');
override(Tile,
{	
	/** The height of this tile. **/
	height : null,
	/** The width of this tile. **/
	width : null,
	
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
	draw : function ( context , x , y , fill , stroke ) {
				
		var xPos = x + this.shiftX;
		var yPos = y + this.shiftY;
		
		context.strokeStyle = this.strokeColor;
		context.fillStyle = this.fillColor;	
		context.beginPath();		
		
		// draw the parallelogram.
		context.moveTo( xPos + this.width / 2 , yPos );
		context.lineTo( xPos + this.width , yPos + this.height / 2 );		
		context.lineTo( xPos + this.width / 2 , yPos + this.height );		
		context.lineTo( xPos , yPos + this.height / 2 );	
		
		if ( fill !== false ) {
			context.fill();
		};

		context.closePath();		
		
		// draw the border of the tile if a stroke color is provided
		if ( stroke ) {
			context.stroke();
		};
	}
});