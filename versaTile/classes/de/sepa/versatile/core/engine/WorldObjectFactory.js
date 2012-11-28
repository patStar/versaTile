/* package: de.sepa.versatile.core.engine */

include('de.sepa.versatile.core.engine.Map');

/**
 * WorldObjectFactory to produce objects like items, figures, etc.
 *
 * @author Patrick Seeber
 */

function WorldObjectFactory() {};

WorldObjectFactory.prototype = {
		
	/**
	 * Method to produce instances of game objects.
	 * 
	 * This method has to be overwritten by any class that extends the WorldObjectFactory
	 * and wants to produce world objects.
	 *  
	 * @param type
	 * 		The object type to produce.
	 * @returns Always null since this method has to be overwritten.
	 */
	produce : function ( type ) {
		return null;		
	},	
	
	/**
	 * Method to check if a certain type of game object can be produced by this factory.
	 * 
	 * This method has to be overwritten by any class that extends the WorldObjectFactory
	 * and wants to produce world objects.
	 * 
	 * @param type
	 * 		The object type to be verified.
	 * @returns {Boolean} TRUE if the requested type is supported. Else FALSE.
	 */
	canProduce : function ( type ) {
		return false;		
	}
};