/* package: de.sepa.versatile.core.gui */

include('de.sepa.versatile.core.gui.Component');

/**
 * ImageComponent to handle images in guis.
 *
 * @author Patrick Seeber
 */
function ImageComponent ( image , x , y ) {
	
	this.image = image;
	this.x = x ? x : 0;
	this.y = y ? y : 0;
}
// Extending the Component class and the observer class within. 
ImageComponent.prototype = new Component();
override(ImageComponent,
{	
	/** The image for this menu. **/	
	image : null,
	
	/**
	 * Draws the image of this component on a context at the given coordinates.
	 * 
	 * Draws all child components after the image has been drawn.
	 *  
	 * @param child
	 * 		The child component to add.
	 * @param x {Numeric}
	 * 		The relative x coordinate to this element.
	 * @param y {Numeric}
	 * 		The relative y coordinate to this element.
	 */
	draw : function ( context , x , y )
	{
		var xPos = x ? x : this.x;
		var yPos = y ? y : this.y;
		
		context.drawImage( this.image , xPos, yPos );
		
		this.drawChildren( context , xPos, yPos);
	}
});