/* package: de.sepa.versatile.core.engine */

include('de.sepa.versatile.core.engine.Point3D');

/**
 * MapField class to store data of a certain part of the map.
 * 
 * @param x 
 * 		The x coordinate of this field.
 * @param y
 * 		The y coordinate of this field.
 * @param z
 * 		The z coordinate of this field.
 * 
 * @author Patrick Seeber
 * 
 */
function MapField(x,y,z)
{
	// --- Point3D initializing
	this.x=x; 
	this.y=y;
	this.z=z;
	
	this.data = new Array();	
	// ---
	
	this.walls = new Object();
	this.walls.n = null;
	this.walls.s = null;
	this.walls.w = null;
	this.walls.e = null;
	
	this.walls.nsWire = null;
	this.walls.weWire = null;
		
	this.ground = null;	
	this.ceiling = null;
}
MapField.prototype = new Point3D(); // extends Point3D

override(MapField,
{
	/** Marker, whether or not this field is selected in some way. **/
	selected : null,
	/** The ground tile of this field. **/
	ground : null,
	/** The ceiling tile of this field. **/
	ceiling : null,	
	/** The walls of this field. **/
	walls : null,
	
	/**
	 * Method to check if there is at least one wall defined at this field.
	 * 
	 * @returns {Boolean} TRUE if there is at least one wall defined at this field. Else FALSE.
	 */
	anyWall : function() {
		return ( null != this.walls.e 
					|| null != this.walls.w 
					|| null != this.walls.n 
					|| null != this.walls.s); 
	},
	
	/**
	 * Method to check if this field is empty.
	 * 
	 * @returns {Boolean} TRUE if no wall and no ground is defined at this field. Else FALSE.
	 */
	empty : function (){ 
		return ( this.data.length == 0 
					&& null == this.ground 
					&& null == this.walls.n 
					&& null == this.walls.w 
					&& null ==  this.walls.e 
					&& null == this.walls.s );
	}
});