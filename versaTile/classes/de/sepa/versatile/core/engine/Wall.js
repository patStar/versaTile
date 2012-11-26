/* package : de.sepa.versatile.core.engine */

include("de.sepa.versatile.core.engine.MapFieldObject");

/**
 * A simple implementation of a wall object.
 *
 * @param width {Numeric}
 * 		The width of this wall.
 * @param height {Numeric}
 * 		The height of this wall.
 * @param image {Image}
 * 		The image of this wall to draw. 
 * @param wiredImage {String}
 * 		A wire frame image of this wall.  		
 * @param shiftX {Numeric} 
 * 		The x shift of this wall necessary for drawing.
 * @param shiftY {Numeric}
 * 		The y shift of this wall necessary for drawing. 
 *  
 * @author Patrick Seeber
 */
function Wall ( width , height , image , wiredImage , shiftX , shiftY )
{
	this.width = width;
	this.height = height;
	
	this.image = image;	
	this.wiredImage = wiredImage;
	
	this.shiftX = shiftX ? shiftX : 0;
	this.shiftY = shiftY ? shiftY : 0;
}	
// Overriding the MapFieldObject since at least, this is what 
// a wall is and to benefit from shift parameter.
Wall.prototype = new MapFieldObject('Wall');
override(Wall,
{	
	/** The height of this wall. **/
	height : null,
	/** The width of this wall. **/
	width : null,
	
	/** The image object of the wired wall. **/
	wiredImage : null,
	
	/**
	 * Method to draw this door on a canvas.
	 * 
	 * @param context 
	 * 		The context to draw on.
	 * @param x {Numeric}
	 * 		The x coordinate of the upper left corner.
	 * @param y {Numeric}
	 * 		The y coordinate of the upper left corner.
	 * @param filled {Boolean}
	 * 		Flag to signal if a filled wall should be drawn.
	 * @param frame {Boolean}
	 * 		Flag to signal if the wire frame of a wall should be drawn.
	 */
	draw : function( context , x , y , filled , frame )
	{
		if( filled ) {
			context.drawImage( this.image , x + this.shiftX , y  + this.shiftY );
		}
		if( frame ) {
			context.drawImage( this.wiredImage , x + this.shiftX , y  + this.shiftY );
		}
	}	
});