/* package: classes.de.sepa.versatile.demo */

include('de.sepa.versatile.core.engine.WorldObjectFactory');
include('de.sepa.versatile.core.engine.MapBuilder');
include('de.sepa.versatile.core.engine.MapPainter');
include('de.sepa.versatile.core.engine.MapInteractionManager');
include('de.sepa.versatile.core.engine.Observable');

include('de.sepa.versatile.core.util.ResourceResolver');
include('de.sepa.versatile.core.util.ImageReader');

include('de.sepa.versatile.demo.extensions.DemoGameObjectFactory');
include('de.sepa.versatile.demo.extensions.DemoFieldDataTransformer');
include('de.sepa.versatile.demo.extensions.DemoWallAndTileManager');

include('de.sepa.versatile.demo.gui.GameScreen');
include('de.sepa.versatile.demo.gui.GameMenu');

/**
 *
 * @author Mendrik
 */
function Game() {
	
	var imageReader = new ImageReader('classes\\de\\sepa\\versatile\\demo\\gfx\\');
	
	this.gameScreen = new GameScreen();
	this.gameScreen.addChild( new GameMenu( imageReader.readImage( 'menu_bg.png' ) ) , 0 ,350 );
	
	this.wallAndTileManager = new DemoWallAndTileManager( imageReader );
	this.worldObjectFactory = new DemoGameObjectFactory( imageReader );

	var transformer = new DemoFieldDataTransformer();
	transformer.wallAndTileManager = this.wallAndTileManager;
	transformer.worldObjectFactory = this.worldObjectFactory;
	
	this.mapBuilder = new MapBuilder();
	this.mapBuilder.mapResolver	= new ResourceResolver('classes.de.sepa.versatile.demo.resources.maps');
	this.mapBuilder.mapDataTransformer = transformer; 	
	
	this.map = this.mapBuilder.loadMap('demoMap');
	
	this.mapPainter = new MapPainter();
	this.mapPainter.wallAndTileManager = this.wallAndTileManager;
	this.mapPainter.worldObjectFactory = this.worldObjectFactory;
	
	
	this.mapOrigin = { x : (this.gameScreen.canvas.width()/2) - (this.wallAndTileManager.getTileWidth()/2) , y : 100 };
	
	this.mapInteractionManager = new MapInteractionManager();	
	this.mapInteractionManager.target = this.gameScreen.canvas;
	this.mapInteractionManager.mapOrigin = this.mapOrigin;
	this.mapInteractionManager.heightModifier = this.wallAndTileManager.getTileHeight();
	this.mapInteractionManager.widthModifier= this.wallAndTileManager.getTileWidth();
	this.mapInteractionManager.map = this.map;
	this.mapInteractionManager.addObserver( this );	
}

Game.prototype = {
		
	gameScreen : null,
	mapBuilder : null,
	map : null,
	wallAndTileManager : null,
	mapOrigin : null,
	mapInteractionManager : null,
	gameListener : null,
	worldObjectFactory : null,
		
	start : function () {
		this.mapInteractionManager.start();
		this.mapInteractionManager.sendNotify();
		this.gameScreen.toggle();
	},		

	lastClickedField : null,
	
	notify : function ( message , topic ) {
		
		if(message.originalTopic === 'click' && message.selectedField) {
			this.handleClick( message.selectedField );
		}
		if(message.originalTopic === 'mousewheel'){
			this.handleWheel( message );
		}
		if(message.originalTopic === 'mousemove' && message.selectedField){			
			this.handleMove( message.selectedField )
		}
		this.mapPainter.drawMap(this.gameScreen.context, this.map, this.mapOrigin.x, this.mapOrigin.y);
		this.gameScreen.draw();
	},
	
	handleWheel : function ( message ) {
		var text = message.data > 0 ? "raise" : "lower";
		this.info("Mousewheel used to "+ text +" the height level.");
	},
	
	handleMove : function ( field ) {
		var text = field;
		if(field.data.length > 0){
			text += " contains "+ this.worldObjectFactory.produce(field.data).name;
		} 
		this.info("Field " + text);
	},
	
	handleClick : function ( field ) {
		var text = field;
		if(field.data.length > 0){
			text += " contains "+ this.worldObjectFactory.produce(field.data).name;
		}
		this.info("Click on field " + text);
		this.getGameMenu().lastSelectedText.text = text; 
	},
	
	getGameMenu : function () {
		return this.gameScreen.children[0];
	},
	
	info : function ( text ) {
		return this.gameScreen.children[0].logger.text = text;
	}
};