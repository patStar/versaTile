/* package: de.sepa.versatile.core.engine */

/**
 * A simple class to compute a shadow level from coordinates.  
 * 
 * @author Patrick Seeber
 */
function Shader(){};	
Shader.prototype = {
	
	/**
	 * Computes the shadow level of the given map field. 
	 * 
	 * @param map
	 * @param x
	 * @param y
	 * @param z
	 * @param dz
	 * 
	 * @returns {Number} A numeric shadow level.
	 */
	getShadowLevel : function(map,x,y,z,dz) {
		var level = (z+x)/10;
		return level;
	}
};