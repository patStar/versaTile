/*package: de.sepa.versatile.demo */

include('de.sepa.versatile.core.gui.GameScreen');

include('de.sepa.versatile.core.engine.GameObjectFactory');
include('de.sepa.versatile.core.engine.MapBuilder');
include('de.sepa.versatile.core.engine.MapPainter');
include('de.sepa.versatile.core.engine.MapInteractionManager');

include('de.sepa.versatile.core.util.ResourceResolver');

include('de.sepa.versatile.demo.extensions.DemoFieldDataTransformer');
include('de.sepa.versatile.demo.extensions.DemoWallAndTileManager');

/**
 * A simple demo of the engine.
 * 
 * @author Patrick Seeber 
 */
var mapInteractionManager;

$(function(){
	
	// craete a new game screen
	var gameScreen = new GameScreen( 'gameScreen' , 400 , 300 ); 		
		
	var demoWallAndTileManager   = new DemoWallAndTileManager( 'classes\\de\\sepa\\versatile\\demo\\gfx\\' );
	
	var mapBuilder = new MapBuilder();
	mapBuilder.mapResolver			= new ResourceResolver('classes.de.sepa.versatile.demo.resources');
	mapBuilder.gameObjectFactory 	= new GameObjectFactory();
	mapBuilder.fieldDataTransformer = new DemoFieldDataTransformer();	
	mapBuilder.wallAndTileManager   = demoWallAndTileManager;	
	
	var map = mapBuilder.loadMap('demoMap');
	
	var mapPainter = new MapPainter( demoWallAndTileManager );		
	
	mapInteractionManager = new MapInteractionManager();	
	mapInteractionManager.gameScreen = gameScreen;
	mapInteractionManager.mapOrigin = { x : 180 , y : 100 };
	mapInteractionManager.wallAndTileManager = demoWallAndTileManager;
	mapInteractionManager.map = map;
	mapInteractionManager.mapPainter = mapPainter;
	
	$('body').append('<input type="button" value="+Z" onClick="mapInteractionManager.heightLevel++"/>');
	$('body').append('<input type="button" value="-Z" onClick="mapInteractionManager.heightLevel--"/>');
	
	mapPainter.drawMap(gameScreen.context, map, 180, 100);
	
	gameScreen.toggle();
	
	mapInteractionManager.start();	
	
});