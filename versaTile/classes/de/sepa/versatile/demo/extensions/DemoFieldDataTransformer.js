/*package: de.sepa.versatile.demo */

include('de.sepa.versatile.core.engine.FieldData');
include('de.sepa.versatile.core.engine.FieldDataTransformer');

/**
 * The FieldDataTransformer for the demo application. 
 * 
 * @author Patrick Seeber 
 */
function DemoFieldDataTransformer() {}
DemoFieldDataTransformer.prototype = new FieldDataTransformer();
override(DemoFieldDataTransformer,{
	
	/**
	 * Method to transform a string into a FieldData object.
	 * 
	 * @param fieldDataString {String} The string to produce a FieldData object from.
	 *
	 * @returns The created FieldData object.
	 */
	transformToFieldData : function ( fieldDataString ) {
		
		var fieldData = new FieldData();
		
		// the ground
		if ( fieldDataString.indexOf('B') > -1 ){
			fieldData.ground = 'B';
		}
		
		// walls
		if ( fieldDataString.indexOf('N') > -1 ){
			fieldData.north = 'N';
		}
		if ( fieldDataString.indexOf('E') > -1 ){
			fieldData.east = 'E';
		}
		if ( fieldDataString.indexOf('W') > -1 ){
			fieldData.west = 'W';
		}
		if ( fieldDataString.indexOf('S') > -1 ){
			fieldData.south = 'S';
		}
		
		// upper side of a door on a southern wall.
		if ( fieldDataString.indexOf('Du') > -1 ){
			fieldData.south = 'Du';
		}	
		// center of a door on a southern wall.
		if ( fieldDataString.indexOf('Dl') > -1 ){
			fieldData.south = 'Dl';
		}
		
		// prepare game objects
		
		// soldiers...
		if ( fieldDataString.indexOf('X') > -1 ){
			fieldData.gameObjects.push('X');
		}
		// green aliens...
		if ( fieldDataString.indexOf('An') > -1 ){
			fieldData.gameObjects.push('An');
		}
		// gray aliens...
		if ( fieldDataString.indexOf('Ay') > -1 ){
			fieldData.gameObjects.push('Ay');
		}
				
		return fieldData;
	}
});