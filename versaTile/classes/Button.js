function Button(src,x,y,func,call)
{
	this.x = x?x:0;
	this.y = y?y:0;
	this.call = call?call:this;
	this.func = func?func:function(){};
	this.image = new Image();
	this.image.src = src?src:'gfx/default.png';
}

Button.prototype = 
{
	image : null,
	name : null,
	call : null,
	func : null,
	x : null,
	y : null,
	
	draw : function(context,x,y){
		x=x?x:this.x;
		y=y?y:this.y;
		context.drawImage(this.image,x,y);
	},
	
	width : function(){
		return this.image.width;
	},
	
	height : function(){
		return this.image.height;
	},
	
	click : function(){
		this.func.call(this.call);
	}	
};