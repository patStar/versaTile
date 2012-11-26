/* package: de.sepa.versatile.core.gui */

include('de.sepa.versatile.core.engine.Observable');

/**
 * Component base class for using in guis.
 * 
 * @author Patrick Seeber
 */
function Component ( x , y ) {
	
	this.children = new Array();
	this.x = x ? x : 0;
	this.y = y ? y : 0;
}
// Override Observable to allow observer on components.
Component.prototype = new Observable();
override(Component,
{
	/** The relative x value to the parent of this component. **/
	x : null,
	/** The relative y value to the parent of this component. **/
	y : null,
	/** The child components of this component. **/
	children : null,

	/**
	 * Add a child component at the given position, relative to this component.
	 * 
	 * If no x or y values are given, the values stored in the component are used.
	 * Otherwise these values are replaced by the given ones.
	 * 
	 * @param child
	 * 		The child component to add.
	 * @param x {Numeric}
	 * 		The relative x coordinate to this element.
	 * @param y {Numeric}
	 * 		The relative y coordinate to this element.
	 */
	addChild : function ( child , x, y) {
		
		child.x = x ? x : child.x;
		child.y = y ? y : child.y;
		
		this.children.push(child);
	},

	/**
	 * Draws this component on the given context at the given position.
	 * 
	 * @param context
	 * 		The context to draw on.
	 * @param x {Numeric}
	 * 		The x coordinate to draw this component.
	 * @param y {Numeric}
	 * 		The y coordinate to draw this component.
	 */
	draw : function ( context , x ,y ) {
		this.draw(context, x, y);
	},
	
	/**
	 * Draws the children of this component on the given context at the given position.
	 * 
	 * Of no x or y value are given, the position will be computed by using the 
	 * position of this component and adding the relative coordinates of the child
	 * component.
	 * 
	 * @param context
	 * 		The context to draw on.
	 * @param x {Numeric}
	 * 		The x coordinate to draw this component.
	 * @param y {Numeric}
	 * 		The y coordinate to draw this component.
	 */
	drawChildren : function ( context , x, y ) {
		
		var xPos = x ? x : this.x;
		var yPos = y ? y : this.y;
		
		for(i in this.children){
			this.children[i].draw( context , xPos + this.children[i].x, yPos + this.children[i].y);
		}
	}
});