/* package: de.sepa.versatile.core.gui */

/**
 * A game screen implementation using jQuery and html5 to produce a canvas to draw
 * the game data on.
 *
 * @author Patrick Seeber
 */
function GameScreen( id , width , height , backgroundColor ){
	
	var bgColor = backgroundColor ? backgroundColor : '#313131';	
	// the html5 canvas object created by jQuery. This will be our game screen.
	this.canvas = $('<canvas id="' + id + '" width="' + width + 'px" height="' + height + 'px" style="background-color:' + bgColor + '"/>').hide();
	// add the game screen to the body element of the html page.
	$('body').append( this.canvas );
	// get the context to draw on
	this.context = $('#' + id )[0].getContext('2d');
} 

GameScreen.prototype =
{
	context : null,
	canvas : null,
	
	toggle : function() {
		this.canvas.toggle();
	}
};