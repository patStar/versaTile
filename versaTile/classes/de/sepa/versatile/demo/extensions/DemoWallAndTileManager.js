/*package: de.sepa.versatile.demo */

include('de.sepa.versatile.core.engine.WallAndTileManager');
include('de.sepa.versatile.core.engine.Wall');
include('de.sepa.versatile.core.engine.Tile');

/**
 * The WallAndTileManager for the demo application. 
 * 
 * @author Patrick Seeber 
 */
function DemoWallAndTileManager( gfxSourceFolder ) {
	
	this.gfxSourceFolder = gfxSourceFolder;
	
	this.defaultWall = new Object();
	this.defaultWall.ns = new Wall( 32 , 48 , this.gfx('wallNS_32x48.png') , this.gfx('wireWallNS_32x48.png') );
	this.defaultWall.we = new Wall( 32 , 48 , this.gfx('wallWE_32x48.png') , this.gfx('wireWallWE_32x48.png') );
	
	this.defaultTile = new Tile( 64 , 32 , 'khaki' , 'black' );
};

DemoWallAndTileManager.prototype = new WallAndTileManager();

override(DemoWallAndTileManager,
{
	defaultWall : null,
	defaultTile : null,
	
	/** The absolute path to the gfx folder. **/
	gfxSourceFolder : null,
	
	/**
	 * Method to compute the complete path to a graphic source.
	 *  
	 * @param src 
	 * 		The relative source path.
	 * @returns The absolute source path.
	 */
	gfx : function( src ) {
		return this.gfxSourceFolder + src;
	},
	
	/**
	 * Method to get a wall object of a certain type.
	 * 
	 * @param wallType {String}
	 * 		The wall type.
	 *
	 * @returns {Wall} The created wall object or null if no corresponding object could be found.
	 */
	getWall : function( wallType ) {
		
		var wall = null;
		
		if( 'N' == wallType || 'S' == wallType ){
			wall = new Wall( 32 , 48 , this.gfx('wallNS_32x48.png') , this.gfx('wireWallNS_32x48.png') );
		}
		if( 'E' == wallType || 'W' == wallType){
			wall = new Wall( 32 , 48 , this.gfx('wallWE_32x48.png') , this.gfx('wireWallWE_32x48.png') );
		}
		if( 'Du' == wallType ){
			wall = new Wall( 32 , 48 , this.gfx('wallDoorUpper_32x48.png') , this.gfx('wireWallNS_32x48.png') );
		}
		if( 'Dl' == wallType ){
			wall = new Wall( 32 , 48 , this.gfx('wallDoorUnder_32x48.png') , this.gfx('wireWallNS_32x48.png') );
		}
		
		return wall;
	},
	
	getWEDefaultWall : function() {
		return this.defaultWall.we;
	},
	
	getNSDefaultWall : function() {
		return this.defaultWall.ns;
	},
	
	getDefaultTile : function() {
		return this.defaultTile;
	},	
	
	/**
	 * Method to get a tile object of a certain type.
	 * 
	 * @param tileType {String}
	 * 		The tile type.
	 *
	 * @returns {Tile} The created tile object or null if no corresponding object could be found.
	 */
	getTile : function( tileType ) {
		
		var tile = null;
		
		if( 'B' == tileType ){
			tile = new Tile( 64 , 32 , 'khaki' , 'black' );
		}
		
		return tile;
	},
	
	/**
	 * Getter for the width of all tiles.
	 * 
	 * @returns {Number} The width of all tiles.
	 */
	getTileWidth : function() {
		return 64;
	},
	
	/**
	 * Getter for the height of all tiles.
	 * 
	 * @returns {Number} The height of all tiles.
	 */
	getTileHeight : function() {
		return 32;
	},
	
	/**
	 * Getter for the height of all walls.
	 * 
	 * @returns {Number} The height of all walls.
	 */
	getWallHeight : function() {
		return 48;
	},
	
	/**
	 * Getter for the width of all walls.
	 * 
	 * @returns {Number} The width of all walls.
	 */
	getWallWidth : function() {
		return 16;
	}
});
