/* package: de.sepa.versatile.core.engine */

include('de.sepa.versatile.core.engine.FieldData');

/**
 * Factory for FieldData objects.
 * 
 * Converts strings to FieldData objects and vice versa for map handling purposes.
 * 
 * @author Patrick Seeber
 */
function FieldDataTransformer(){}

FieldDataTransformer.prototype =
{
	/**
	 * Method to transform a string into a FieldData object.
	 * 
	 * This method has to be overwritten by all instances extending the FieldDataTransformer
	 * if they want to produce certain wall types. 
	 * 
	 * @param fieldDataString {String} The string to produce a FieldData object from.
	 *
	 * @returns Always null since this is only a stub which needs to be overwritten.
	 */
	transformToFieldData : function ( fieldDataString ) {
		return new FieldData();
	},

	/**
	 * Method to transform a FieldData object into a string.
	 * 
	 * This method has to be overwritten by all instances extending the FieldDataTransformer
	 * if they want to produce certain wall types. 
	 * 
	 * @param fieldData {FieldData} The FieldData object to parse into a string.
	 *
	 * @returns Always null since this is only a stub which needs to be overwritten.
	 */
	transformToString : function ( fieldData ) {
		return "";
	}
};