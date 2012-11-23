function Person(){}
Person.prototype =
{
	name : 'Noname',
	inventory : null,
	stats : null,	
	say : function(message) { return '['+this.name+']: '+message; },
	addToInventory : function(item) { this.inventory.add(item);	},
	getStat : function(statName) { return this.stats.get(statName); },
	getHitpoints : function () {return 1;}
};