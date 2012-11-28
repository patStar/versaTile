/* package: de.sepa.versatile.core.engine */

/**
 * WallAndTileManager class to receive wall and tile objects from.
 * 
 * This is only a stub that needs to be overwritten and extended by real applications.
 * 
 * @author Patrick Seeber 
 */
function WallAndTileManager(){}

WallAndTileManager.prototype = 
{
	/**
	 * Method to get a wall object of a certain type.
	 * 
	 * This method has to be overwritten by all instances extending the WallAndTileManager
	 * if they want to produce certain wall types. 
	 * 
	 * @param wallType The wall type.
	 *
	 * @returns Always null since this is only a stub which needs to be overwritten.
	 */
	getWall : function( wallType ) {
		return null;
	},

	/**
	 * Method to get a tile object of a certain type.
	 * 
	 * This method has to be overwritten by all instances extending the WallAndTileManager
	 * if they want to produce certain tile types. 
	 * 
	 * @param tileType The tile type.
	 *
	 * @returns Always null since this is only a stub which needs to be overwritten.
	 */
	getTile : function( tileType ) {
		return null;
	},
	
	/**
	 * Getter for the width of all tiles.
	 * 
	 * This method has to be overwritten by all instances extending the WallAndTileManager 
	 * with appropriate return values.
	 * 
	 * @returns {Number} Always -1 since this is only a stub which needs to be overwritten.
	 */
	getTileWidth : function() {
		return -1;
	},
	
	/**
	 * Getter for the height of all tiles.
	 * 
	 * This method has to be overwritten by all instances extending the WallAndTileManager 
	 * with appropriate return values.
	 * 
	 * @returns {Number} Always -1 since this is only a stub which needs to be overwritten.
	 */
	getTileHeight : function() {
		return -1;
	},
	
	/**
	 * Getter for the width of all walls.
	 * 
	 * This method has to be overwritten by all instances extending the WallAndTileManager 
	 * with appropriate return values.
	 * 
	 * @returns {Number} Always -1 since this is only a stub which needs to be overwritten.
	 */
	getWallWidth : function() {
		return -1;
	},
	
	/**
	 * Getter for the height of all walls.
	 * 
	 * This method has to be overwritten by all instances extending the WallAndTileManager 
	 * with appropriate return values.
	 * 
	 * @returns {Number} Always -1 since this is only a stub which needs to be overwritten.
	 */
	getWallHeight : function() {
		return -1;
	}
	
};