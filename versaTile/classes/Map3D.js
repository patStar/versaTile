include("MapField");

function Map3D()
{
	this.map = new Object();
	this.minX = 0;
	this.minY = 0;
	this.minZ = 0;
	this.maxX = 0;
	this.maxY = 0;
	this.maxZ = 0;
}
Map3D.prototype = 
{
	map : null,
	xWidth : function() { return Math.abs(maxX + minX);},
	yWidth : function() { return Math.abs(maxY + minY);},
	zWidth : function() { return Math.abs(maxZ + minZ);},
	
	get : function(x,y,z)
	{ 
		var index = this.$(x,y,z);
		if(this.map[index]){
			return this.map[index];
		}
		return null;
	},
	
	put : function(mapField)
	{ 
		this.map[this.$(mapField.x,mapField.y,mapField.z)] = mapField; 
		
		if(this.minX > mapField.x) this.minX = mapField.x;
		else if(this.maxX < mapField.x) this.maxX = mapField.x;
		
		if(this.minY > mapField.y) this.minY = mapField.y;
		else if(this.maxY < mapField.y) this.maxY = mapField.y;
		
		if(this.minZ > mapField.z) this.minZ = mapField.z;
		else if(this.maxZ < mapField.z) this.maxZ = mapField.z;
	},
	
	$ : function(x,y,z) {return "X"+x+"Y"+y+"Z"+z;}
};
