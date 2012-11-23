function Shader(){};
	
Shader.prototype.getShadowLevel = function(map,x,y,z,dz)
{
	var level = (z+x)/10;
	
	return level;
};