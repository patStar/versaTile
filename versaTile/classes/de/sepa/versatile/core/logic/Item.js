function Item(name)
{
	this.name = name ? name : 'undefined item';
	this.image = new Image();
	this.image.src = 'gfx/box.png';
};
Item.prototype = new Object();
override(Item,
{
	image : null,
	name : null, 
	weight : -1,
	// Method to return the weight of this item.
	getWeight : function(){ return this.weight; },
	// Method to return the horitontal space this item blocks in the inventory.
	getHSpace : function(){}, 
	// Method to return the vertical space this item blocks in the inventory.
	getVSpace : function(){}, 	
	// Method to return the itemname.
	getName : function(){ return this.name; },		
	// Method to invoke to use the item, or use it on another object.
	useItOn : function(){},	
	
	draw : function(context,x,y){
		context.drawImage(this.image,x+18,y);
	}
});