/*package: de.sepa.versatile.demo */

include('de.sepa.versatile.core.engine.WorldObjectFactory');
include('de.sepa.versatile.core.engine.MapFieldObject');

include('de.sepa.versatile.core.util.ImageReader');

/**
 * The WorldObjectFactory for the demo application. 
 * 
 * @author Patrick Seeber 
 */
function DemoGameObjectFactory( imageReader) {
	this.imageReader = imageReader;	
	
	this.catalogue = new Object();
	
	this.catalogue['X'] = new MapFieldObject( 'Soldier' , this.imageReader.readImage('blue.png',true) , +24 , +12 );
	this.catalogue['An'] = new MapFieldObject( 'Alien' , this.imageReader.readImage('littleGreen.png',true) , +22 , +24 );
}

DemoGameObjectFactory.prototype = new WorldObjectFactory();
override(DemoGameObjectFactory,{
	
	imageReader : null,
	
	catalogue : null,

	produce : function ( type ) {
		return this.catalogue[type];	
	},	

	canProduce : function ( type ) {
		return (this.catalogue[type] instanceof MapFieldObject);
	}
});