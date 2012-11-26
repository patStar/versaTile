/* package: de.sepa.versatile.core.gui */

include('de.sepa.versatile.core.gui.Component');

/**
 * Simple text component to display text om guis.
 *
 * @author Patrick Seeber
 */
function TextComponent ( text , x, y ) {
	
	this.x = x ? x : 0;
	this.y = y ? y : 0;
	
	this.text = text ? text : "";
	
	this.fontColor = 'black';
	this.font = '12px Courier';
}
// Extending the Component class to use this in guis.
TextComponent.prototype = new Component(); 
override(TextComponent,
{
	/** The tet to display. **/
	text : null,
	/** The font color. **/
	fontColor : null,
	/** The html5 canvas font string ála 'bold 12px Arial'. **/
	font : null,

	/**
	 * Draws this text component and the stored text ont he given context.
	 * 
	 * Subsequently draws all child components as well.
	 * 
	 * @param child
	 * 		The child component to add.
	 * @param x {Numeric}
	 * 		The relative x coordinate to this element.
	 * @param y {Numeric}
	 * 		The relative y coordinate to this element.
	 */
	draw : function ( context , x ,y ) {
		
		var xPos = x ? x : this.x;
		var yPos = y ? y : this.y;
		
		context.fillStyle = this.fontColor;
		context.font = this.font;
		context.fillText( this.text ,xPos , yPos );
		
		this.drawChildren( context , xPos , yPos );
	}
});