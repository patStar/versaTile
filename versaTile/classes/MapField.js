include('Point3D');

function MapField(x,y,z)
{
	this.x=x; 
	this.y=y;
	this.z=z;
	this.data = new Array();
	this.wall = new Object();
	this.wall.n = null;
	this.wall.s = null;
	this.wall.w = null;
	this.wall.e = null;
	this.ground = null;
	this.id = MapField.idCounter++;
}
MapField.idCounter = 0;
MapField.prototype = new Point3D();
override(MapField,
{
	id : null,
	ground:null,
	wall: null,
	anyWall:function(){return (this.wall.e ||this.wall.w ||this.wall.n ||this.wall.s); },
	empty: function (){ return (this.ground || this.wall.n || this.wall.w || this.wall.e || this.wall.s);}
});