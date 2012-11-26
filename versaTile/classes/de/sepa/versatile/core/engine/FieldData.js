/* package: de.sepa.versatile.core.engine */

/**
 * POJaScO for field data information.
 * 
 * @author Patrick Seeber
 */
function FieldData(){
	this.gameObjects = new Array();
}

FieldData.prototype = 
{
	/** An array of game object identifiers. **/
	gameObjects : null,
	
	/** The type of a ground tile. **/
	ground : null,
	/** The type of a ceiling tile. **/
	ceiling : null,		
	
	/** The type of a north wall. **/
	north : null,
	/** The type of a east wall. **/
	east : null,
	/** The type of a west wall. **/
	west : null,
	/** The type of a south wall. **/
	south : null
};