/* package: de.sepa.versatile.core.gui */

include('de.sepa.versatile.core.gui.Component');

/**
 * A screen implementation using jQuery and html5 to produce a canvas to draw on.
 *
 * @author Patrick Seeber
 */
function Screen( id , width , height , backgroundColor ){
	
	var bgColor = backgroundColor ? backgroundColor : '#313131';	
	// the html5 canvas object created by jQuery. This will be our game screen.
	this.canvas = $('<canvas id="' + id + '" width="' + width + 'px" height="' + height + 'px" style="background-color:' + bgColor + '"/>').hide();
	// add the game screen to the body element of the html page.
	$('body').append( this.canvas );
	// get the context to draw on
	this.context = $('#' + id )[0].getContext('2d');
} 
// Extending the Component class since this is a part of the gui. 
Screen.prototype = new Component();
override(Screen,
{
	/** The context of the stored canvas. **/
	context : null,
	/** The html5 canvas DOM object. **/
	canvas : null,
	
	/**
	 * Toggle method to switch the visibility of this screen.
	 */
	toggle : function() {
		this.canvas.toggle();
	},

	/**
	 * Overridden draw method using the own context to draw all child components on.
	 * 
	 * @param child
	 * 		The child component to add.
	 * @param x {Numeric}
	 * 		The relative x coordinate to this element.
	 * @param y {Numeric}
	 * 		The relative y coordinate to this element.
	 */
	draw : function ( context , x ,y ) {
		this.drawChildren( this.context, x, y);
	},		
});