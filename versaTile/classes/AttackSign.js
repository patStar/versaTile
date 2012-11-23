function Icon(src)
{
	this.image = new Image();
	this.image.src = src ? src : 'gfx/defaultIcon.png';
}
Icon.prototype = 
{
	image : null,
	
	draw : function(context,x,y){
		context.drawImage(this.image,x,y);
	}
};

function AttackSign(){}
AttackSign.prototype = new Icon('gfx/attackSign.png');

function Pointer()
Pointer.prototype = new Icon('gfx/pointer.png');

function CooperateIcon()
CooperateIcon.prototype = new Icon('gfx/workTogether.png');

function ManAvatar()
CooperateIcon.prototype = new Icon('gfx/manAvatar.png');

function WomanAvatar()
CooperateIcon.prototype = new Icon('gfx/womanAvatar.png');

function PickupIcon()
CooperateIcon.prototype = new Icon('gfx/pickUp.png');
