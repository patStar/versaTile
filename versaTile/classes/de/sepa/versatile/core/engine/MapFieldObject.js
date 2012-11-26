/* package: de.sepa.versatile.core.engine */

/**
 * Class for displayable map objects like trees, rocks, walls, etc. 
 * 
 * @param name 
 * 		The name of the object.
 * @param image
 * 		The image to display if this object is placed at the map.
 * @param sX
 * 		The number of pixel to shift the image in x direction.
 * @param sY
 * 		The number of pixel to shift the image in y direction.
 * 
 * @author Patrick Seeber
 */
function MapFieldObject( name , image , sX , sY){
	
	this.name = name;
	this.image = image;
	
	this.shiftX = sX ? sX : 0;
	this.shiftY = sY ? sY : 0;
}

MapFieldObject.prototype = 
{
	/** he image to display if this object is placed at the map. **/
	image : null,	
	/** The name of this object. **/
	name : null,
	/** The number of pixel to shift the image in x direction. **/
	shiftX : null,
	/** The number of pixel to shift the image in y direction. **/
	shiftY : null,
	
	/**
	 * Method to draw this object on a given context.
	 * 
	 * The image will be drawn on the context placing the upper left corner of it
	 * at the given x and y coordinates plus the shift given by the shiftX and
	 * shiftY parameter. If no x or y is given, the default value of 0 is used instead.  
	 * 
	 * @param context
	 * 		The context to draw on.
	 * @param x
	 * 		The x position of the upper left corner of this objects image.  
	 * @param y
	 * 		The y position of the upper left corner of this objects image.
	 */
	draw : function(context , x, y) {
		
		var xPos = x ? x : 0;
		var yPos = y ? y : 0;
		
		context.drawImage( this.image , xPos + this.shiftX , yPos + this.shiftY );
	},

	toString : function() {
		return this.name;
	}
};