include('Ammo');

function StandardGunAmmo(rounds){
	this.numberOfRounds = rounds ? rounds : 0;
}
StandardGunAmmo.prototype = new Ammo("Standard Gun Ammo");
override(StandardGunAmmo,
{
	numberOfRounds : null,
	weightPerRound : 0.1,
	getName : function() { return this.name+' ('+this.numberOfRounds+')'; },
	getRounds : function(){ return this.numberOfRounds; }	,
	getWeight : function() { return this.numberOfRounds*this.weightPerRound; },
	fireBullet : function(number) 
	{ 
		if(!number) number=1;
		this.numberOfRounds-=number; 
		trace(number+" rounds of "+this.name+" fired. "+this.numberOfRounds+" rounds left.");
	},
	addRounds : function(number) 
	{ 	
		this.numberOfRounds+=number; 
		trace(number+" rounds added to "+this.name+". "+this.numberOfRounds+" rounds left.");
	}
});

function ShootGunBullet(rounds){
	this.numberOfRounds = rounds ? rounds : 0;
}
ShootGunBullet.prototype = new StandardGunAmmo();
ShootGunBullet.prototype.name = "Shootgun Bullets";

function AdvancedShootGunBullet(rounds){
	this.numberOfRounds = rounds ? rounds : 0;
}
AdvancedShootGunBullet.prototype = new ShootGunBullet();
AdvancedShootGunBullet.prototype = "Advanced Shootgun Bullets";