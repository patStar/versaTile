/* package: de.sepa.versatile.core.engine */

include("de.sepa.versatile.core.engine.MapField");

/**
 * Simulated three dimensional map to store map fields in.
 * 
 * In fact, this is a one dimensional map and the three coordinates are used as one
 * concatenated string to store the fields into a one dimensional map for the ease of use.
 * 
 * @author Patrick Seeber
 */
function Map3D()
{
	this.map = new Object();
	
	this.minX = 0;
	this.minY = 0;
	this.minZ = 0;
	
	this.maxX = 0;
	this.maxY = 0;
	this.maxZ = 0;
}
Map3D.prototype = 
{
	maxX : null,
	maxY : null,
	maxZ : null,
	minX : null,
	minY : null,
	minZ: null,
		
	/** The map instance. **/
	map : null,
	
	/**
	 * Returns the distance from the minimal x coordinate to the maximum.
	 * 
	 * @returns The xWidth of this map. 
	 */
	xWidth : function() { 
		return Math.abs(maxX - minX);
	},
	
	/**
	 * Returns the distance from the minimal y coordinate to the maximum.
	 * 
	 * @returns The yWidth of this map. 
	 */
	yWidth : function() { 
		return Math.abs(maxY - minY);
	},
	
	/**
	 * Returns the distance from the minimal z coordinate to the maximum.
	 * 
	 * @returns The zWidth of this map. 
	 */
	zWidth : function() { 
		return Math.abs(maxZ - minZ);
	},
	
	/**
	 * Getter for the map field stored at the given coordinates.
	 * 
	 * @param x
	 * 		The x coordinate.
	 * @param y
	 * 		The y coordinate.
	 * @param z
	 * 		The z coordinate.
	 * 
	 * @returns the map field at the given coordinates.
	 */
	get : function(x,y,z)
	{ 
		var i = this.$(x,y,z);
		if(this.map[i]){
			return this.map[i];
		}
		return null;
	},
	
	/**
	 * Method to put a map field into the map.
	 * 
	 * The field is stored by its coordinates, concatenated by the $ method.
	 * 
	 * @param mapField 
	 * 		The map field to put into the map.
	 */
	put : function(field)
	{ 
		this.map[this.$(field.x,field.y,field.z)] = field; 
		
		// update minX and maxX if necessary.
		this.minX = Math.min(this.minX,field.x);
		this.maxX = Math.max(this.maxX,field.x);
		
		// update minY and maxY if necessary.
		this.minY = Math.min(this.minY,field.x);
		this.maxY = Math.max(this.maxY,field.x);
		
		// update minZ and maxZ if necessary.
		this.minZ = Math.min(this.minZ,field.x);
		this.maxZ = Math.max(this.maxZ,field.x);
		
	},
	
	/**
	 * Method to create a unique string from the given coordinates.
	 * 
	 * E.g. The coordinates x=1, y=2 and z=3 will result in the string "X1Y2Z3".
	 * 
	 * @param x {Number} The x value.
	 * @param y {Number} The y value.
	 * @param z {Number} The z value.
	 * 
	 * @returns {String} A concatinated string of the coordinates.
	 */
	$ : function(x,y,z) {
		return "X"+x+"Y"+y+"Z"+z;
	}
};
