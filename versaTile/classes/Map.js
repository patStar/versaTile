function Map()
{
	this.map = new Object();
}
Map.prototype = 
{
    counter : 0,
	map : null,
	size : function(){return this.counter;},
	put : function(key,value) { this.map[key] = value; this.counter++;},
	get : function(key) { return this.map[key]; },
	remove : function(key) { value = this.map[key]; this.map[key] = null; this.counter--; return value;}
};