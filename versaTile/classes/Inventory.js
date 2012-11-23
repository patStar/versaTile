function Inventory()
{
	this.items = new Array();
}

Inventory.prototype = 
{
	items : null,
	size : function(){ return this.items.length; },
	get : function(i) { return this.items[i].getName(); },
	add : function(item) 
	{	
		if(item instanceof Item){ 
			this.items.push(item); 
			return true;
		} else {
			return false;
		}
	},
	
	toString : function()
	{
		var result = '';
		for(var i=0; i<this.size(); i++){
			result += ' ,'+this.items[i].getName();
		}
		return '['+result.substr(2)+']';
	},
	
	weight : function()
	{
		var result = 0;
		for(var i=0; i<this.size(); i++){
			result += this.items[i].getWeight();
		}
		return Math.round(result*1000)/1000;
	},
	
	hasItemType : function(type)
	{
		for(var i=0; i<this.size(); i++){
			if(this.items[i] instanceof type) return true;
		}
		return false;
	}
};