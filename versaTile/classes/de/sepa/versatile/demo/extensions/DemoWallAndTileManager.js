/*package: de.sepa.versatile.demo */

include('de.sepa.versatile.core.engine.WallAndTileManager');
include('de.sepa.versatile.core.engine.Wall');
include('de.sepa.versatile.core.engine.Tile');

include('de.sepa.versatile.core.util.ImageReader');

/**
 * The WallAndTileManager for the demo application. 
 * 
 * @author Patrick Seeber 
 */
function DemoWallAndTileManager( imageReader ) {
	
	this.imageReader = imageReader;

	this.catalogue = new Object();
	this.catalogue.tiles = new Object();
	this.catalogue.walls = new Object();

	this.catalogue.tiles['B'] = new Tile( 64 , 32 , 'khaki' , 'black' , 0 , 32);
	
	this.catalogue.walls['N'] = new Wall( 32 , 48 , this.gfx('wallNS_32x48.png') , this.gfx('wireWallNS_32x48.png') , 32 , 0); 
	this.catalogue.walls['E'] = new Wall( 32 , 48 , this.gfx('wallWE_32x48.png') , this.gfx('wireWallWE_32x48.png') , 32 , 16); 
	this.catalogue.walls['W'] = new Wall( 32 , 48 , this.gfx('wallWE_32x48.png') , this.gfx('wireWallWE_32x48.png') ); 
	this.catalogue.walls['S'] = new Wall( 32 , 48 , this.gfx('wallNS_32x48.png') , this.gfx('wireWallNS_32x48.png') , 0 , 16 ); 
	this.catalogue.walls['Du'] = new Wall( 32 , 48 , this.gfx('wallDoorUpper_32x48.png') , this.gfx('wireWallNS_32x48.png') , 0 , 16 ); 
	this.catalogue.walls['Dl'] = new Wall( 32 , 48 , this.gfx('wallDoorUnder_32x48.png') , this.gfx('wireWallNS_32x48.png') , 0 , 16 ); 

};

DemoWallAndTileManager.prototype = new WallAndTileManager();

override(DemoWallAndTileManager,
{	
	catalogue : null,
	/** The absolute path to the gfx folder. **/
	imageReader: null,
	
	/**
	 * Method to compute the complete path to a graphic source.
	 *  
	 * @param src 
	 * 		The relative source path.
	 * @returns The absolute source path.
	 */
	gfx : function( src ) {
		return this.imageReader.readImage( src , true );		
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
		return this.catalogue.walls[ wallType ];
	},
	
	getNDefaultWall : function() {
		return this.getWall('N');
	},
	
	getEDefaultWall : function() {
		return this.getWall('E');
	},

	getWDefaultWall : function() {
		return this.getWall('W');
	},
	
	getSDefaultWall : function() {
		return this.getWall('S');
	},
	
	getDefaultTile : function() {
		return this.getTile('B');
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
		return this.catalogue.tiles[ tileType ];
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
