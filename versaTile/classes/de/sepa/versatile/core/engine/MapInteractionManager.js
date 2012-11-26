/* package: de.sepa.versatile.core.engine */

/**
 * Implementation of class that handles interactions with the map.
 * 
 * @author Patrick Seeber
 */
function MapInteractionManager() {
	
	this.heightLevel = 0 ;
	this.mapShift = { x : 0, y : 0 };
}

MapInteractionManager.prototype =
{
	mapOrigin : null,
	gameScreen : null,
	heightLevel : null,
	mapShift : null,
	wallAndTileManager : null,
	map : null,
	mapPainter : null,
	
	selectedField : null,
	
	start : function() {		
		this.gameScreen.canvas.bind( 'mousemove' , { handler : this } , this.handleMouseMove );
	},

	handleMouseMove : function (event) {
		var x = event.pageX-this.offsetLeft;
		var y = event.pageY-this.offsetTop;
		
		event.data.handler.selectMapField(x,y);					
	},
	
	selectMapField : function ( x , y ) {
		var coordPoint = this.getCoordinatesUnderMouse( x, y );	
		
		if( null != this.selectedField && this.selectedField.toString() === coordPoint.toString() ){
			return;
		}
		
		if( null == this.map.get( coordPoint.x , coordPoint.y , coordPoint.z ) ) {
			return;
		}
		
		if( null != this.selectedField ) {
			delete this.selectedField.selected; 
		}
		
		this.selectedField = this.map.get( coordPoint.x , coordPoint.y , coordPoint.z );		
		this.selectedField.selected = true;

		this.mapPainter.drawMap(this.gameScreen.context, this.map, this.mapOrigin.x, this.mapOrigin.y);
	},
	
	getCoordinatesUnderMouse : function( x , y )
	{
		var yValue = ( y - this.mapOrigin.y - this.mapShift.y ) / this.wallAndTileManager.getTileHeight();
		var xValue = ( x - this.mapOrigin.x - this.mapShift.x ) / this.wallAndTileManager.getTileWidth();
		
		var nx = Math.ceil( this.heightLevel + yValue + xValue - 2.5 );
		var ny = Math.ceil( this.heightLevel + yValue - xValue - 1.5 );
		
		return Point3D.getPoint(nx,ny,this.heightLevel);
	},
	
};