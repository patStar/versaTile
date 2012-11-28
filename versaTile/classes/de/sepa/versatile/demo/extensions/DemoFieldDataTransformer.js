/*package: de.sepa.versatile.demo */

include('de.sepa.versatile.core.engine.MapField');
include('de.sepa.versatile.core.engine.MapFieldTransformer');

/**
 * The MapDataTransformer for the demo application. 
 * 
 * @author Patrick Seeber 
 */
function DemoFieldDataTransformer() {}
DemoFieldDataTransformer.prototype = new MapFieldTransformer();
override(DemoFieldDataTransformer,{
	
	wallAndTileManager : null,
	
	worldObjectFactory : null,
	
	/**
	 * Method to transform a string into a MapField object.
	 * 
	 * @param mapDataString {String} The string to produce a MapField object from.
	 *
	 * @returns The created MapField object.
	 */
	transformToMapField : function ( mapDataString , x , y , z) {
		
		var mapField = new MapField( x , y , z );
		
		// the ground
		if ( mapDataString.indexOf('B') > -1 ){
			mapField.ground = 'B';
		}
		
		// walls
		if ( mapDataString.indexOf('N') > -1 ){
			mapField.walls.n = 'N';
		}
		if ( mapDataString.indexOf('E') > -1 ){
			mapField.walls.e = 'E';
		}
		if ( mapDataString.indexOf('W') > -1 ){
			mapField.walls.w = 'W';
		}
		if ( mapDataString.indexOf('S') > -1 ){
			mapField.walls.s = 'S';
		}
		
		// upper side of a door on a southern wall.
		if ( mapDataString.indexOf('Du') > -1 ){
			mapField.walls.s = 'Du';
		}	
		// center of a door on a southern wall.
		if ( mapDataString.indexOf('Dl') > -1 ){
			mapField.walls.s = 'Dl';
		}
		
		// prepare game objects
		
		var validObjects = new Array('X','An');
		
		for ( var i in validObjects ){
			if ( this.worldObjectFactory.canProduce(validObjects[i]) && mapDataString.indexOf(validObjects[i]) > -1 ){
				mapField.data.push(validObjects[i]);
			}
		}
		
				
		return mapField;
	}
});