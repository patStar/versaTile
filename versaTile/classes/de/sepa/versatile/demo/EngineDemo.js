/*package: de.sepa.versatile.demo */

include('de.sepa.versatile.core.gui.Screen');
include('de.sepa.versatile.core.gui.ImageComponent');
include('de.sepa.versatile.core.gui.TextComponent');

include('de.sepa.versatile.core.engine.GameObjectFactory');
include('de.sepa.versatile.core.engine.MapBuilder');
include('de.sepa.versatile.core.engine.MapPainter');
include('de.sepa.versatile.core.engine.MapInteractionManager');
include('de.sepa.versatile.core.engine.Observable');

include('de.sepa.versatile.core.util.ResourceResolver');
include('de.sepa.versatile.core.util.ImageReader');

include('de.sepa.versatile.demo.extensions.DemoGameObjectFactory');
include('de.sepa.versatile.demo.extensions.DemoFieldDataTransformer');
include('de.sepa.versatile.demo.extensions.DemoWallAndTileManager');

/**
 * A simple demo of the engine.
 * 
 * @author Patrick Seeber 
 */
$(function(){
		
	// create a new game screen
	var gameScreen = new Screen( 'gameScreen' , 400 , 500 ); 		
	
	var imageReader = new ImageReader('classes\\de\\sepa\\versatile\\demo\\gfx\\');
	
	var demoWallAndTileManager   = new DemoWallAndTileManager(imageReader);
		
	var mapBuilder = new MapBuilder();
	mapBuilder.mapResolver			= new ResourceResolver('classes.de.sepa.versatile.demo.resources.maps');
	mapBuilder.gameObjectFactory 	= new DemoGameObjectFactory(imageReader);
	mapBuilder.fieldDataTransformer = new DemoFieldDataTransformer();	
	mapBuilder.wallAndTileManager   = demoWallAndTileManager;	
	
	var map = mapBuilder.loadMap('demoMap');
	
	var mapPainter = new MapPainter( demoWallAndTileManager );		
	
	var mapOrigin = { x : (gameScreen.canvas.width()/2) - (demoWallAndTileManager.getTileWidth()/2) , y : 100 };		
			
	var gameMenuLogger = new TextComponent();
	var lastSelectedLabel = new TextComponent("Last clicked: ");
	lastSelectedLabel.font = 'bold 12px Courier';	
	var lastSelectedText = new TextComponent();
	
	var gameListener = 
	{ 
		notify : function ( topic , message ) {
			if(message.originalTopic === 'click') {
				gameMenuLogger.text = "Click on field ";
				var text = message.selectedField;
				if(message.selectedField.data.length > 0){
					text += " contains "+ message.selectedField.data;
				}
				gameMenuLogger.text = "Click on field " + text;
				lastSelectedText.text = text; 
			}
			if(message.originalTopic === 'mousewheel'){
				var text = message.data > 0 ? "raise" : "lower";
				gameMenuLogger.text = "Mousewheel used to "+text+" the height level.";
			}
			if(message.originalTopic === 'mousemove' && message.selectedField){				
				gameMenuLogger.text = "Field " + message.selectedField;
				if(message.selectedField.data.length > 0){
					gameMenuLogger.text += " contains "+ message.selectedField.data;
				}
			}
			mapPainter.drawMap(gameScreen.context, map, mapOrigin.x, mapOrigin.y);
			gameScreen.draw();
		}
	};
	
	var gameMenu =  new ImageComponent( imageReader.readImage( 'menu_bg.png' ));
	gameMenu.addChild(lastSelectedLabel , 15 , 25 );
	gameMenu.addChild(lastSelectedText , 120 , 25 );
	gameMenu.addChild(gameMenuLogger , 15 , 45 );
		
	gameScreen.addChild(gameMenu , 0 , 350 );
	
	var mapInteractionManager = new MapInteractionManager();	
	mapInteractionManager.target = gameScreen.canvas;
	mapInteractionManager.mapOrigin = mapOrigin;
	mapInteractionManager.heightModifier = demoWallAndTileManager.getTileHeight();
	mapInteractionManager.widthModifier= demoWallAndTileManager.getTileWidth();
	mapInteractionManager.map = map;
	mapInteractionManager.addObserver(Observable.GENERAL_TOPIC, gameListener );	
	mapInteractionManager.start();
	
	mapInteractionManager.sendNotify();
	
	gameScreen.toggle();

	
});