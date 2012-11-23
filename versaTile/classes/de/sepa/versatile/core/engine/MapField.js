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
	
	this.wall = new Object();
	this.wall.n = null;
	this.wall.s = null;
	this.wall.w = null;
	this.wall.e = null;
	
	this.ground = null;
	
	this.id = MapField.idCounter++;
}
MapField.prototype = new Point3D(); // extends Point3D

/** Static map field counter to generate unique ids from. **/ 
MapField.idCounter = 0;

override(MapField,
{	
	/** The unique id of this map field. **/
	id : null,
	
	/** The ground information of this field. **/
	ground:null,
	
	/** The wall information of this field. **/
	wall: null,
	
	/**
	 * Method to check if there is at least one wall defined at this field.
	 * 
	 * @returns {Boolean} TRUE if there is at least one wall defined at this field. Else FALSE.
	 */
	anyWall:function() {
		return ( this.wall.e || this.wall.w || this.wall.n || this.wall.s); 
	},
	
	/**
	 * Method to check if this field is empty.
	 * 
	 * @TODO: Check for data!
	 * 
	 * @returns {Boolean} TRUE if no wall and no ground is defined at this field. Else FALSE.
	 */
	empty: function (){ 
		return !( this.ground || this.wall.n || this.wall.w || this.wall.e || this.wall.s );
	}
});