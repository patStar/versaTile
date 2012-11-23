/* package: de.sepa.versatile.core.engine */

/**
 * The map class.
 * 
 * Simple implementation of a key value based map.
 * 
 * @author Patrick Seeber
 */
function Map() {
	this.map = new Object();
}

Map.prototype = 
{
	/** The counter for the number of elements in this map. **/
    counter : 0,
    
    /** The main map object. **/
	map : null,
	
	/**
	 * Getter for the number of elements in this map.
	 * 
	 * @returns {Number} The number of elements in this map.
	 */
	size : function() {
		return this.counter;
	},
	
	/**
	 * Method to put a value connected to a key into the map. 
	 * 
	 * @param key 
	 * 		The key connected with the value.
	 * @param value 
	 * 		The value to store.
	 */
	put : function(key,value) { 
		this.map[key] = value; this.counter++;
	},
	
	
	/**
	 * Getter for a value object stored in the map.
	 * 
	 * @param key 
	 * 		The key top access the value.
	 * 
	 * @returns The value corresponding to the key or null, if no such element exists.
	 */
	get : function(key) { 
		return this.map[key]; 
	},
	
	/**
	 * Method to remove an element from the map.
	 * 
	 * @param key 
	 * 		The key for the element to delete.
	 * 
	 * @returns The deleted value.
	 */
	remove : function(key) { 
		value = this.map[key]; 
		this.map[key] = null; 
		this.counter--; 
		return value;
	}
	
};