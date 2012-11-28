/* package: de.sepa.versatile.core.engine */

/**
 * A simple object to store data connected to three dimensional coordinates. 
 * 
 * E.g. to store game objects in a three dimensional map. 
 * 
 * @author Patrick Seeber
 */
function Point3D(x,y,z){}

Point3D.getPoint = function ( x , y , z ) {
	var point = new Point3D();
	point.x = x;
	point.y = y;
	point.z = z;
	return point;
};

Point3D.prototype =
{
    /** The x,y and z coordinates. **/
	x:null,
	y:null,
	z:null,
	
	/** the data associated with the coordinates. **/
	data:null,
	
	/**
	 * @return A string representation of this object.
	 */
	toString : function() {
		return "["+this.x+","+this.y+","+this.z+"]";
	}
};