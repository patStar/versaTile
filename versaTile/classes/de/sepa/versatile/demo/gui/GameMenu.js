/* package: classes/de/sepa/versatile/demo/gui */

include('de.sepa.versatile.core.gui.ImageComponent');
include('de.sepa.versatile.core.gui.TextComponent');

/**
 *
 * @author Mendrik
 */
function GameMenu( image ) { 
	
	this.image = image;
	
	this.logger = new TextComponent();	
	this.lastSelectedLabel = new TextComponent("Last clicked: ");
	this.lastSelectedLabel.font = 'bold 12px Courier';	
	this.lastSelectedText = new TextComponent();
	
	this.addChild(this.lastSelectedLabel , 15 , 25 );
	this.addChild(this.lastSelectedText , 120 , 25 );
	this.addChild(this.logger , 15 , 45 );
}

GameMenu.prototype = new ImageComponent();

override(GameMenu,
{
	lastSelectedLabel : null,
	lastSelectedText : null,
	logger : null
	
});