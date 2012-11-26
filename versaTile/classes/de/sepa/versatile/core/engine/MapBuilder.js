/* package: de.sepa.versatile.core.engine */

include("de.sepa.versatile.core.util.ResourceResolver");

include("de.sepa.versatile.core.engine.Map3D");
include("de.sepa.versatile.core.engine.MapField");
include("de.sepa.versatile.core.engine.FieldData");

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
	/** An instance of a manager to produce walls and tiles. **/		
	wallAndTileManager : null,
	/** An instance of a factory to produce game objects. **/		
	gameObjectFactory : null,
	/** Instance of a field data transformer. **/
	fieldDataTransformer : null,
	
	/**
	 * Modifies a map field using the given field data string.
	 * 
	 * @param field {MapField}
	 * 		The MapField object to modify. 
	 * @param fieldData {FieldData} 
	 * 		A data string containing information to modify the map field.
	 * @returns {MapField} The modified map field.
	 */
	modifyField: function( field , fieldData ) {			
				
		field.ground  = fieldData.ground;
		field.ceiling = fieldData.ceiling;
		
		field.walls.n = fieldData.north;
		field.walls.e = fieldData.east;
		field.walls.w = fieldData.west;
		field.walls.s = fieldData.south;
		
		// setup game objects.
		for( var i in fieldData.gameObjects ) {
			if( this.gameObjectFactory.canProduce( fieldData.gameObjects[i] ) ){
				field.data.push( this.gameObjectFactory.produce( fieldData.gameObjects[i] ) );
			}
		};
		
		return field;
	},
	
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
					
					var fieldData = this.fieldDataTransformer.transformToFieldData( mapData[z][y][x] );
					field = this.modifyField( new MapField(x,y,z) , fieldData );					
					map.put(field);
				}
			}
		}
		
		return map;
	}	
};