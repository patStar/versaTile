/* package: de.sepa.versatile.core.engine */

include('de.sepa.versatile.core.engine.Map3D');
include('de.sepa.versatile.core.engine.WallAndTileManager');
include('de.sepa.versatile.core.engine.WorldObjectFactory');

/**
 * MapPainter class to draw a given map on a context.
 * 
 * @author Patrick Seeber
 * 
 */
function MapPainter () {}

MapPainter.prototype =
{				
	/** An instance of a WallAndTileManager to obtain the image data for drawing walls and tiles. **/		
	wallAndTileManager : null,
	/** An instance of a WorldObjectFactory to obtain the image data for drawing world objects. **/		
	worldObjectFactory : null,
	
	/**
	 * Iterates over the map and draws the fields.
	 * 
	 * At first the background is cleared and then the map fields are drawn from {minX,minY,minZ} 
	 * to {maxX,maxY,maxZ}.
	 *   
	 * If the origin is [0,0,0] we start drawing the field at position [0,0,0] (sum of coordinates = 0). 
	 * After that, the fields [1,0,0] , [0,1,0] , [0,0,1] are drawn (sum of coordinates = 1). The next 
	 * fields are [2,0,0], [1,1,0], [0,2,0], [1,0,1], [0,1,1], [0,0,2] (sum of coordinates = 2), etc.
	 * Processing the map like this assures, that parts, that lay behind other parts are displayed
	 * correctly.
	 * 
	 * @param context
	 * 		The context to draw on.
	 * @param map {Map3D}
	 * 		The map to draw.
	 * @param x {Numeric}
	 * 		The x position on the context to start drawing.
	 * @param y {Numeric}
	 * 		The y position on the context to start drawing.
	 */
	drawMap : function ( context , map , xPos , yPos ){		
				
		context.clearRect( 0 , 0 , context.canvas.width , context.canvas.height );
		
		for ( var n = 0;  n <= ( map.maxX + map.maxY + map.maxZ - map.minX - map.minY - map.minZ ) ; n++ ) {			
			for ( var z = 0 ; z <= Math.min( n , map.maxZ - map.minZ ) ; z++ ) {
				for ( var y = 0 ; y <= Math.min( (n-z) , ( map.maxY - map.minY ) ) ; y++ ) {
					if(map.get( ( n - y - z - map.minX ) , ( y - map.minY ) , ( z - map.minZ) ) ) {
						this.drawMapField( context , ( xPos - (2*y-n+z) * this.wallAndTileManager.getTileWidth() / 2 ) , ( yPos + ( n*(this.wallAndTileManager.getTileHeight() / 2 ) - z*(this.wallAndTileManager.getWallHeight() + 1 ) )) , map.get( n-y-z , y , z ) );
					}
				}
			}
		}				
	},	

	/**
	 * This methods draw a single map field.
	 * 
	 * To verify, that background parts stay background and the parts in front will be in front
	 * we have to draw the components of the map field in the correct order. At first we draw the
	 * background walls. After that we draw the ground and then each object that shall be placed
	 * inside this map field. At the end we draw the front walls and then the ceiling.
	 * 
	 * @TODO: 	Check somehow if the "inside" of the field can be seen through front walls and 
	 * 			ceiling. If not, we don't need to draw the "inside" components.
	 * 
	 * @TODO:	Refactor the if-else if blocks. DRY! 
	 * 
	 * @param context
	 * 		The context to draw on.
	 * @param x {Numeric}
	 * 		The x position on the context to start drawing.
	 * @param y {Numeric}
	 * 		The y position on the context to start drawing.
	 * @param mapField
	 * 		The map field to draw.
	 */
	drawMapField : function ( context , x , y , mapField ) {
		
		// 1st: draw the background walls.
		if( null != mapField.walls.w ){
			this.wallAndTileManager.getWall( mapField.walls.w ).draw( context , x , y , true, mapField.selected );
		} else if ( mapField.selected ) {
			this.wallAndTileManager.getWDefaultWall().draw( context , x , y , false, mapField.selected );			
		}		
		
		if( null != mapField.walls.n ){
			this.wallAndTileManager.getWall( mapField.walls.n ).draw( context , x , y , true, mapField.selected );
		} else if ( mapField.selected ) {
			this.wallAndTileManager.getNDefaultWall().draw( context , x , y , false, mapField.selected );			
		}		
		
		// 2nd: draw the ground
		if( null != mapField.ground ) {
			this.wallAndTileManager.getTile( mapField.ground ).draw( context, x , y );
		}
		if( this.selected ) {
			this.wallAndTileManager.getDefaultTile().draw( context, x , y , false , true );
		}

		// 3rd: draw objects
		for( var i in mapField.data ) {
			if ( this.worldObjectFactory.canProduce( mapField.data[ i ] ) ) {
				this.worldObjectFactory.produce( mapField.data[ i ] ).draw( context,  x , y );
			}
		}
		
		// 4th: draw the front walls.
		if ( null != mapField.walls.e ) {
			this.wallAndTileManager.getWall( mapField.walls.e ).draw( context , x , y , true, mapField.selected );
		} else if ( mapField.selected ) {
			this.wallAndTileManager.getEDefaultWall().draw( context , x , y , false, mapField.selected );
		}				
		if ( null != mapField.walls.s ) {
			this.wallAndTileManager.getWall( mapField.walls.s ).draw( context , x , y , true, mapField.selected );
		} else if ( mapField.selected ) {
			this.wallAndTileManager.getSDefaultWall().draw( context , x , y , false, mapField.selected );			
		}		
		
		// 5th: draw the ceiling
		if( null != mapField.ceiling ) {
			this.wallAndTileManager.getDefaultTile().draw( context, x , y );			
		}
		if ( this.selected ) {
			this.wallAndTileManager.getDefaultTile().draw( context, x , y, false , true );
		}
		
	}
};