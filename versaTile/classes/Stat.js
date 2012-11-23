function Stat(name){ this.name = name; }
Stat.prototype = 
{
	name : 'Unknown Stat',
	value : 1,
	maxValue : 50,
	basisValue : 0,
	bonusValue : 0,
	getCurrentValue : function() { return this.basisValue + this.value; }
};