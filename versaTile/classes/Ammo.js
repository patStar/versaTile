include('Item');

function Ammo(name){if(name) this.name = name;}
Ammo.prototype = new Item();
override(Ammo,
{	
	// Number of bullets or energy units or whatsoever!
	getRounds : function(){},
	// MEthod to add some rounds to this ammo.
	addRounds : function(){},
	// Method to invoke to use the item, or use it on another object.
	fireBullet : function(){},
	// Method to call when a round of this ammo hits a target.
	hitOn : function(){}
});