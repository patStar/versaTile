include('Person');

function Alien(src,avatar)
{
	this.image = new Image();
	this.image.src = src ? src : 'gfx/littleGrey.png';
	this.avatarImage = new Image();
	this.avatarImage.src = avatar ? avatar : 'gfx/greyAvatar.png';
	this.hitpoints = 10;
}
Alien.prototype = new Person();
override(Alien,
{
	friend : false,
	image : null,
	avatarImage : null,
	hitpoints : null,
	
	draw : function(context,x,y){
		context.drawImage(this.image,20+x,y-this.image.height+18);
	},
	
	drawAvatar : function(context,x,y){
		context.drawImage(this.avatarImage,x,y);
	},	
	
	getHitpoints : function(){
		
	}
});

function LittleGrey(){
	this.name = "Little Grey";
}
LittleGrey.prototype = new Alien('gfx/littleGrey.png','gfx/greyAvatar.png');

function LittleGreen(){
	this.name = "Little Green";
}
LittleGreen.prototype = new Alien('gfx/littleGreen.png','gfx/greenAvatar.png');