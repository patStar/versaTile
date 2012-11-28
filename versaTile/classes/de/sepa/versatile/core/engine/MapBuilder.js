/* package: de.sepa.versatile.core.engine */

include("de.sepa.versatile.core.util.ResourceResolver");

include("de.sepa.versatile.core.engine.Map3D");
include("de.sepa.versatile.core.engine.MapField");

/**
 * MapBuilder class to create a map from a file. 
 *
 * @author Patrick Seeber
 * 
 */
function MapBuilder() {}
MapBuilder.prototype = 
{
	/** The folder to search for map data. **/		
	mapResolver : null,
	/** Instance of a field data transformer. **/
	mapDataTransformer : null,
	
	/**
	 * Method to create a map from a map data file.
	 * 
	 * @param mapName {String} 
	 * 		The filename of the map data file.
	 * @returns {Map3D} The created map object.
	 */
	loadMap : function( mapName )
	{
		// read an array with map data from a file.
		var mapData = this.mapResolver.readResource( mapName ); 

		var map = new Map3D();

		for( var z = 0 ; z < mapData.length ; z++ ) {
			for( var y = 0 ; y < mapData[z].length ; y++ ) {
				for( var x = 0 ; x < mapData[z][y].length ; x++ ) {
					
					var field = this.mapDataTransformer.transformToMapField( mapData[z][y][x] , x , y , z);
					map.put(field);
				}
			}
		}
		
		return map;
	}	
};