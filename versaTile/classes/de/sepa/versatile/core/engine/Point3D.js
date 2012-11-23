/* package: de.sepa.versatile.core.engine */

/**
 * A simple object to store data connected to three dimensional coordinates. 
 * 
 * E.g. to store game objects in a three dimensional map. 
 * 
 * @author Patrick Seeber
 */
function Point3D(){}
Point3D.prototype =
{
    /** The x,y and z coordinates. **/
	x:null,
	y:null,
	z:null,
	
	/** the data associated with the coordinates. **/
	data:null
};