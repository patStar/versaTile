/* package :  de.sepa.versatile.core.engine */

include('de.sepa.versatile.core.Constants');

/**
 * A simple implementation of a wall object.
 * 
 * @author Patrick Seeber
 */
function Wall( width, height , filledImage , wiredImage )
{
	this.width = width;
	this.height = height;
	
	this.filledImage = new Image();
	this.filledImage.src = filledImage;	
	
	this.wiredImage = new Image();
	this.wiredImage.src = wiredImage;	
}	

Wall.prototype = {
	
	/** The height of this wall. **/
	height : null,
	/** The width of this wall. **/
	width : null,
	
	/** The image object of the filled wall. **/
	filledImage : null,
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
			context.drawImage( this.filledImage , x , y );
		}
		if( frame ) {
			context.drawImage( this.wiredImage , x , y );
		}
	}	
};