/* package: de.sepa.versatile.core.engine */

include('de.sepa.versatile.core.engine.Map3D');
include('de.sepa.versatile.core.engine.WallAndTileManager');
/**
 * MapField class to store data of a certain part of the map.
 * 
 * @param x 
 * 		The x coordinate of this field.
 * @param y
 * 		The y coordinate of this field.
 * @param z
 * 		The z coordinate of this field.
 * 
 * @author Patrick Seeber
 * 
 */
function MapPainter( wallAndTileManager ) {
	this.wallAndTileManager = wallAndTileManager;
	
	this.wallShiftX 	= wallAndTileManager.getTileWidth() / 2;
	this.wallShiftY 	= wallAndTileManager.getTileHeight() / 2;
	this.groundShiftY 	= wallAndTileManager.getTileHeight();
}


MapPainter.prototype =
{		
	/** The x shift to draw right headed walls. (e.g. half of the tile width) **/
	wallShiftX : null,	
	/** The y shift to draw the front walls. (e.g. half of the tile height) **/
	wallShiftY : null,
	/** The y shift to draw the ground tile. (e.g. height of wall minus half of the tile height) **/
	groundShiftY : null,
		
	/** An instance of a manager to produce walls and tiles. **/		
	wallAndTileManager : null,
	
	/**
	 * 
	 * @param context
	 * @param map {Map3D}
	 * @param x {Numeric}
	 * @param y {Numeric}
	 */
	drawMap : function (context,map,xPos,yPos){		
		
		for(var n=0; n<=map.maxX+map.maxY+map.maxZ; n++){			
			for ( var z = map.minZ ; z <= Math.min(n,map.maxZ) ; z++ ){
				for(var y = map.minY ; y <= Math.min((n-z),map.maxY) ; y++){
					if(map.get(n-y-z,y,z)){
						this.drawMapField( context , ( xPos - (2*y-n+z) * this.wallAndTileManager.getTileWidth() / 2 ) , ( yPos + ( n*(this.wallAndTileManager.getTileHeight() / 2 ) - z*(this.wallAndTileManager.getWallHeight() + 1 ) )) , map.get( n-y-z , y , z ) );
					}
				}
			}
		}				
	},	

	drawMapField : function( context , x , y , mapField ) {
		
		// 1st: draw the background walls.
		if( null != mapField.walls.w ){
			this.wallAndTileManager.getWall(mapField.walls.w).draw( context , x , y , true, mapField.selected);
		} else if ( mapField.selected ) {
			this.wallAndTileManager.getWEDefaultWall().draw( context , x , y , false, mapField.selected);			
		}		
		
		if( null != mapField.walls.n ){
			this.wallAndTileManager.getWall(mapField.walls.n).draw( context , x + this.wallShiftX , y , true, mapField.selected);
		} else if ( mapField.selected ) {
			this.wallAndTileManager.getNSDefaultWall().draw( context , x + this.wallShiftX , y , false, mapField.selected);			
		}		
		
		// 2nd: draw the ground
		if( null != mapField.ground ){
			this.wallAndTileManager.getTile(mapField.ground).draw( context, x , y + this.groundShiftY);
		}
		if(this.selected){
			this.wallAndTileManager.getDefaultTile().draw( context, x , y + this.groundShiftY, 'transparent' , 'grey');
		}
		
		// 3rd: draw objects
		for(var i in mapField.data){
			mapField.data[i].draw( context,  x , y );
		}
		
		// 4th: draw the front walls.
		if( null != mapField.walls.e ){
			this.wallAndTileManager.getWall(mapField.walls.e).draw( context , x + this.wallShiftX , y + this.wallShiftY, true, mapField.selected);
		} else if ( mapField.selected ) {
			this.wallAndTileManager.getWEDefaultWall().draw( context , x + this.wallShiftX , y + this.wallShiftY, false, mapField.selected);			
		}				
		if( null != mapField.walls.s ){
			this.wallAndTileManager.getWall(mapField.walls.s).draw( context , x , y + this.wallShiftY, true, mapField.selected);
		} else if ( mapField.selected ) {
			this.wallAndTileManager.getNSDefaultWall().draw( context , x , y + this.wallShiftY, false, mapField.selected);			
		}		

		
		// 5th: draw the ceiling
		if( null != mapField.ceiling ){
			this.wallAndTileManager.getDefaultTile().draw( context, x , y, 'transparent' , 'grey');			
		}
		if(this.selected){
			this.wallAndTileManager.getDefaultTile().draw( context, x , y, 'transparent' , 'grey');
		}

		
	}
};