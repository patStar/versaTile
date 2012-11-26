/* package: de.sepa.versatile.core.engine */

include('de.sepa.versatile.core.engine.Observable');

/**
 * Basic implementation of class that handles interactions with the map.
 * 
 * @TODO: Extract const strings.
 * 
 * @author Patrick Seeber
 */
function MapInteractionManager () {
	
	this.heightLevel = 0 ;
	
	this.mapShift = { x : 0, y : 0 };
}

// Extend observable so observer may register to get notified by our actions.
MapInteractionManager.prototype = new Observable (); 

override(MapInteractionManager,
{
	/** The coordinates of the map origin as an object with a x and a y value. **/
	mapOrigin : null,
	/** A target object to listen for mouse actions and to bind event handlers to. **/
	target : null,
	/** The current z-level at the map. **/
	heightLevel : null,
	/** The x and y values for the map shifts. If the map is moved, the delta values are stored here. **/
	mapShift : null,
	/** The height modifier used to compute 3D coordinates from a 2D mouse position. **/
	heightModifier : null,
	/** The width modifier used to compute 3D coordinates from a 2D mouse position. **/
	widthModifier : null,
	/** The map instance to interact with. **/
	map : null,
	/** The currently selected field which is the map field under the mouse. **/
	selectedField : null,

	/**
	 * Method to bind this instance mouse listeners to the given target.
	 * 
	 * This instance listens to mouse moves, clicks and mouse wheel actions. 
	 */
	start : function () {		
		this.target.bind( 'mousemove' 	, { handler : this } , this.handleMouseMove );
		this.target.bind( 'click' 		, { handler : this } , this.handleMouseClick );
		this.target.bind( 'mousewheel' 	, { handler : this } , this.handleMouseWheel );		
	},
	
	/**
	 * Method to notify observer on mouse clicks.
	 * 
	 * This method sends a notify to the 'general' and 'click' topic.
	 * 	 
	 * @param event
	 * 		The mouse click event.
	 */
	handleMouseClick : function ( event ) {
		
		var x = event.pageX - this.offsetLeft;
		var y = event.pageY - this.offsetTop;
		
		event.data.handler.sendFieldDataNotify( 'click' , x , y );			
	},
	
	/**
	 * Method to select fields corresponding to mouse moves.
	 * 
	 * This method sends a notify to the 'general' and 'mousemove' topic.
	 * 
	 * @param event
	 * 		The catched mouse move event.
	 */
	handleMouseMove : function ( event ) {
		
		var x = event.pageX - this.offsetLeft;
		var y = event.pageY - this.offsetTop;
		
		// select a new field if necessary
		event.data.handler.selectMapField( x , y );	
		// notify all observer
		event.data.handler.sendFieldDataNotify( 'mousemove' , x , y );
	},
	
	/**
	 * Method to raise the z-level of the map if the mouse wheel is scrolled upwards and to
	 * lower it otherwise.
	 * 
	 * This method sends a notify to the 'general' and 'mousewheel' topic and uses the 
	 * jquery.mousewheel.js file from Brandon Aaron. Thanks for that!
	 * 
	 * @param event
	 * 		The mouse event containing all information about the mouse wheel action.
	 * @param d
	 * 		The delta value of the wheel scrolling.
	 * @param dx
	 * 		The x part of the delta value of the wheel scrolling.
	 * @param dy
	 * 		The y part of the delta value of the wheel scrolling.
	 */
	handleMouseWheel : function ( event , d , dx , dy ) {
		
		var x = event.pageX - this.offsetLeft;
		var y = event.pageY - this.offsetTop;
		
		var handler = event.data.handler;
		
		// raise or lower the height level
		if ( dy > 0 ){
			handler.adjustLevel( 1 , true );
		} else if( dy < 0 ){
			handler.adjustLevel( -1 , true );
		}

		// notify observer
		event.data.handler.sendFieldDataNotify( 'mousewheel' , x , y , dy );
	},
	
	/**
	 * This method sends a message object containing the x and y coordinates
	 * as well as the original topic, the currently selected field and some
	 * optional additional data to all observer on the 'general' chanel and
	 * the observer on the chanel given by the topic.
	 * 
	 * @param topic
	 * 		{String} The topic to inform possible observer.
	 * @param x
	 * 		{Numeric} The x value of the event.
	 * @param y
	 * 		{Numeric} The y value of the event.
	 * @param data
	 * 		{Mixed} Optional data to append on the message.
	 */
	sendFieldDataNotify : function ( topic , x , y , data ) {
		
		// message object containing all necessary information
		var message = 
		{ 
			x 				: x, // the x-value of the event
			y 				: y, // the y-value of the event
			selectedField	: this.selectedField, // the currently selected field 
			originalTopic	: topic, // the original topic
			data			: data // some additional data
		};
		
		if ( topic ) {
			this.sendNotify( topic, message );
		}
		this.sendNotify( null , message );
	},	
	

	/**
	 * Method to adjust ( raise / lower ) the height level (z-value) of the map.
	 * 
	 * The height level cannot be higher than the maxZ value of the map and not lower than
	 * the minZ value of the map. If requested by the second parameter, a new field is selected
	 * according to the new z-level, if another field was selected before.
	 * 
	 * @param delta
	 * 		{Numeric} The positive or negative amount, added to the current height level. 
	 * @param reselect
	 * 		{Boolean} Flag indicating whether a new field should be selected accorduing to the new z-value.  
	 */
	adjustLevel : function ( delta , reselect ) {
		
		if ( this.heightLevel + delta <= this.map.maxZ && this.heightLevel + delta >= this.map.minZ ) {
			
			this.heightLevel += delta;
			
			// change the selected field to the new z-value if requested. 
			if ( reselect && null != this.selectedField ) {
				this.selectMapFieldByCoordinate( this.selectedField.x , this.selectedField.y, this.heightLevel );	
			}	
		}								
	},
	
	/**
	 * Select a map field according to the given x and y coordinates of the screen.
	 * 
	 * The x and y values are mapped to the x and y values of a map field using the 
	 * current height level as the z-value.
	 * 
	 * @param x
	 * 		The x value on the screen.
	 * @param y
	 * 		The y value on the screen.
	 */
	selectMapField : function ( x , y ) {
		// compute the map field coordinates under the given mouse position.
		var coordPoint = this.getCoordinatesUnderMouse( x, y );	
		
		// select a new field if the computed field is not already selected. 
		if ( null == this.selectedField || this.selectedField.toString() !== coordPoint.toString() ){
			this.selectMapFieldByCoordinate( coordPoint.x , coordPoint.y , coordPoint.z );
		}				
	},
	
	/**
	 * Select the map field with the given coordinates.
	 * 
	 * If the map field does not have a ground, all map fields below this field are 
	 * selected too, until one of them has a ground. Only the topmost field is stored, 
	 * since we can easily check all fields below this field later. The selection of
	 * the lower fields is necessary since it would be hard to see for everyone which 
	 * field is selected at the moment, if the lower fields were not marked in some way.
	 * 
	 * @param x
	 * 		The x coordinate of the field on the map.
	 * @param y
	 * 		The y coordinate of the field on the map.
	 * @param z
	 * 		The z coordinate of the field on the map.
	 */
	selectMapFieldByCoordinate : function ( x , y , z ) {
		
		// check if there is already a field selected and if so: unselect it and
		// all fields below it, that may be selected, too.
		if ( null != this.selectedField ) {
			
			delete this.selectedField.selected;
			
			// unselect free fields under the current field
			var current = this.selectedField;
			while( null == current.ground && null != this.map.get( current.x , current.y , current.z -1 )){
				current = this.map.get( current.x , current.y , current.z -1 );
				current.selected = false;				
			}
		}
		
		// select the new field
		this.selectedField = this.map.get( x , y , z );						
		
		// if the new field exists, select it and all fields below it until a field has a ground.
		if ( null != this.selectedField ) {
			
			this.selectedField.selected = true;
			
			// select free fields under the current field
			var current = this.selectedField;
			while ( null == current.ground && null != this.map.get( current.x , current.y , current.z -1 )){
				current = this.map.get( current.x , current.y , current.z -1 );
				current.selected = true;				
			}
		}
	},
	
	/**
	 * Compute the map field coordinates from the given mouse coordinates.
	 * 
	 * @param x
	 * 		The x position on the screen.
	 * @param y
	 * 		The y position on the screen.
	 * 
	 * @returns {Point3D} The x,y,z coordinates of the mapField under the mouse as Point3D instance.
	 */
	getCoordinatesUnderMouse : function( x , y )
	{
		var yValue = ( y - this.mapOrigin.y - this.mapShift.y ) / this.heightModifier;
		var xValue = ( x - this.mapOrigin.x - this.mapShift.x ) / this.widthModifier;
		
		var nx = Math.ceil( this.heightLevel + yValue + xValue - 2.5 );
		var ny = Math.ceil( this.heightLevel + yValue - xValue - 1.5 );
		
		return Point3D.getPoint( nx , ny , this.heightLevel );
	},
	
});