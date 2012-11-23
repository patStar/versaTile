function ObjectMap()
{
	this.internalMap = new Array();
}
ObjectMap.prototype = new Object();
override(ObjectMap,
{
	internalMap : null,
	
	updateByData : function (obj, newObject)
	{
		if(this.internalMap[obj.z] && this.internalMap[obj.z][obj.x+obj.y]){
			this.internalMap[obj.z][obj.x+obj.y] = newObject;
		}
	},
	
	remove : function (obj)
	{
		if(this.internalMap[obj.z] && this.internalMap[obj.z][obj.x+obj.y]){
			delete  this.internalMap[obj.z][obj.y][obj.x];
		}
	},
	
	get : function (x,y,z)
	{
		if(this.internalMap[z] && this.internalMap[z][x+y]){
			return this.internalMap[z][x+y];
		}
		return null;
	},
	
	push : function (obj)
	{
		if(!this.internalMap[obj.z]){
			this.internalMap[obj.z] = new Object();
		}
		this.internalMap[obj.z][obj.x+obj.y] = obj;
	}
});