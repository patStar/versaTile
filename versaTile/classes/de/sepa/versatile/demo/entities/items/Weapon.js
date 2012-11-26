include('de.sepa.versatile.core.logic.Item');

function Weapon(){};
Weapon.prototype = new Item();
override(Weapon,
{	
	// Method to return the current ammo.
	getAmmo : function(){},
	// Method to call when this weapon is fired.
	shoot : function(){},
	// Method to call when a new type of ammo is loaded into the weapon.
	loadAmmo : function(){},
	// Method to call to reload the current type of bullets into the weapon.
	reload : function(){}
});

function ShootGun()
{
	this.name = 'Shootgun';
	this.weight =  4;
}
ShootGun.prototype = new Weapon();
override(ShootGun,
{
	ammo : null,
	getAmmo : function(){return this.ammo;},
	loadAmmo : function(ammo)
	{
		if(ammo instanceof ShootGunBullet){
			say('Yeah! Lets put some of these '+ammo.getName()+' into this gun!');
			this.ammo = ammo;
		}else{
			say('No way man! These things wont fit into my lovely gun.');
		}
	},
	shoot : function()
	{	
		say('Okay! Let\'s try to shoot this baby!');
		if(this.ammo){
			if(this.ammo.getRounds() > 1){
				this.ammo.fireBullet();
				say("Yehaw! I fired one shot of my "+this.ammo.getRounds()+" "+this.ammo.getName()+" up into the sky!");
			}else if(this.ammo.getRounds() == 1){
				this.ammo.fireBullet();
				say("Yehaw! I fired the last shot of my "+this.ammo.getName()+" up into the sky!");
			}else{
				say("Sorry man! No bullets left of my "+this.ammo.getName()+".");
			}
		}else{
			say("Sorry man! There is no ammo in this gun.");
		}
	},
	reload : function()
	{
		if(this.ammo)
		{
			say("Wow! I found some more rounds in my pockets! Lets put them into the boomstick!");
			this.ammo.addRounds(3);
		}else{
			say("Nope! I aint have any ammo in this gun. I don't know which type of ammo I should use.");
		}
	}
});