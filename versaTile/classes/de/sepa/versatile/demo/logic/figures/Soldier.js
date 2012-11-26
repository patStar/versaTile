include('de.sepa.versatile.core.logic.Person');
include('de.sepa.versatile.core.logic.Inventory');
include('de.sepa.versatile.core.engine.Map');
include('de.sepa.versatile.core.logic.stats.StrengthStat');
include('de.sepa.versatile.core.Constants');

function Soldier(name, gender)
{
	this.name = name;
	this.inventory = new Inventory();
	this.stats = new Map();
	this.stats.put(StrengthStat.ID, new StrengthStat());
	this.stats.put(AgilityStat.ID, new AgilityStat());
	this.stats.put(IntelligenceStat.ID, new IntelligenceStat());
	this.stats.put(WisdomStat.ID, new WisdomStat());
	
	this.gender = gender;
	
	this.image = new Image();
	this.avatarImage = new Image();
	if(gender == Gender.FEMALE)
	{
		this.image.src = 'gfx/red.png';
		this.avatarImage.src = 'gfx/womanAvatar.png';
	}
	if(gender == Gender.MALE)
	{
		this.image.src = 'gfx/blue.png';
		this.avatarImage.src = 'gfx/manAvatar.png';
	}
	
	this.friend = true;
}
Soldier.prototype = new Person();
override(Soldier,
{
	friend : false,
	image : null,
	gender : Gender.UNDEFINED,
	avatarImage : null,
	enemiesSpotted : 0,

	addToInventory : function(item) 
	{
		if(item instanceof Item){
			if(this.stats.get(StrengthStat.ID)){
				if( this.canCarryWeight() != null && item.getWeight() <= this.canCarryWeight() ){
					return this.inventory.add(item);	
				}
			}else{
				return this.inventory.add(item);	
			}
		}		
	},
	canCarryWeight : function() {
		if(this.stats.get(StrengthStat.ID)){
			return this.stats.get(StrengthStat.ID).getCurrentValue() -this.inventory.weight();
		}
		return null;
	},
	getRating:function()
	{
		var sum = 0;
		for(statName in this.stats.map){
			var stat = this.getStat(statName);
			sum += stat.value + stat.basisValue + 2 * stat.bonusValue;
		}
		return sum;
	},
		image : null,
	
	draw : function(context,x,y)
	{
		context.drawImage(this.image,x+24,y-16);
	},
	
	drawAvatar : function(context,x,y)
	{
		context.drawImage(this.avatarImage,x,y);
	}
});