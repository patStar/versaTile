/* package: de.sepa.versatile.core.engine */

include('de.sepa.versatile.core.engine.MapField');

/**
 * Factory for MapField objects.
 * 
 * Converts strings to MapField objects and vice versa for map handling purposes.
 * 
 * @author Patrick Seeber
 */
function MapFieldTransformer(){}

MapFieldTransformer.prototype =
{
	/**
	 * Method to transform a string into a MapField object.
	 * 
	 * This method has to be overwritten by all instances extending the MapFieldTransformer.
	 * 
	 * @param MapFieldString {String} The string to produce a MapField object from.
	 *
	 * @returns Always null since this is only a stub which needs to be overwritten.
	 */
	transformToMapField : function ( mapFieldString , x , y , z ) {
		return new MapField( x , y , z );
	},

	/**
	 * Method to transform a MapField object into a string.
	 * 
	 * This method has to be overwritten by all instances extending the MapFieldTransformer.
	 * 
	 * @param MapField {MapField} The MapField object to parse into a string.
	 *
	 * @returns Always null since this is only a stub which needs to be overwritten.
	 */
	transformToString : function ( mapField ) {
		return "";
	}
};