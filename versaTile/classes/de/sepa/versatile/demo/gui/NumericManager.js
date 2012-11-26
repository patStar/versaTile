function NumericManager()
{
	this.image = new Image();
	this.image.src = 'gfx/numerics.png';
}
NumericManager.SMALL_BOX = 'smallBox';
NumericManager.DOUBLE_BOX = 'doubleBox';
NumericManager.prototype =
{	
	image : null,
	mapping : {	'1':{x:20,y:0,w:4,h:6},
				'2':{x:24,y:0,w:4,h:6},
				'3':{x:28,y:0,w:4,h:6},
				'4':{x:32,y:0,w:4,h:6},
				'5':{x:36,y:0,w:4,h:6},
				'6':{x:40,y:0,w:4,h:6},
				'7':{x:44,y:0,w:4,h:6},
				'8':{x:48,y:0,w:4,h:6},
				'9':{x:52,y:0,w:4,h:6},
				'0':{x:56,y:0,w:4,h:6},
				'smallBox':{x:0,y:0,w:8,h:10},
				'doubleBox':{x:7,y:0,w:13,h:10}
				},
	
	drawNumber : function(context,number,x,y)
	{		
		var numbers = number.toString().split('');
		var shift = 0;
		for(var i=0; i<numbers.length; i++){						
			this.drawSingleNumber(context,numbers[i],x,y,shift);
			shift += this.mapping[numbers[i]].w+1;
		}
	},
	
	drawSingleNumber : function(context,number,x,y,shift){	
		var n = this.mapping[number];
		context.drawImage(this.image,n.x,n.y,n.w,n.h,x+shift,y,n.w,n.h);
	},
	
	drawHighlightedNumber : function(context,number,x,y)
	{
		var n=this.mapping[NumericManager.SMALL_BOX];
		if(number.toString().length > 1){
			n=this.mapping[NumericManager.DOUBLE_BOX];
		}
		context.drawImage(this.image,n.x,n.y,n.w,n.h,x,y,n.w,n.h);
		this.drawNumber(context,number,x+2,y+2);
	}		
};