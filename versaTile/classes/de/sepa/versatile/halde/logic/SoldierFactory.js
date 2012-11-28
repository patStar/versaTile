/* package: de.sepa.versatile.core.logic */

include("de.sepa.versatile.core.Constants");

include("de.sepa.versatile.core.logic.StrengthStat");
include("de.sepa.versatile.core.logic.figures.Soldier");

/**
 * 
 * @author Patrick Seeber
 */
function SoldierFactory() 
{
	this.maleForeNames   = readResource("maleNames");
	this.femaleForeNames = readResource("femaleNames");
	this.surNames        = readResource("surNames");
}
SoldierFactory.prototype =
{
	/** The minimal number of stat points for the soldier to produce. **/
	minimalStats : 0,
	/** The maximal number of stat points for the soldier to produce. **/
	maximalStats : 0,
	/** The minimal number of bonus stat points for the soldier to produce. **/
	minimalStatBoni : 0,
	/** The maximal number of bonus stat points for the soldier to produce. **/
	maximalStatBoni : 0,

	/** A list of male fore names to compute the soldier name from. **/
	maleForeNames : null,
	/** A list of female fore names to compute the soldier name from. **/
	femaleForeNames : null,
	/** A list of sur names to compute the soldier name from. **/
	surNames : null,

	statNames : [StrengthStat.ID, AgilityStat.ID, IntelligenceStat.ID, WisdomStat.ID],
	
	createRandomSoldier : function()
	{
		// Namen und geschlecht ermitteln.
		var gender = Gender.MALE;
		if(Math.random() < 0.5){ gender = Gender.FEMALE; }
		var randomSoldier = new Soldier(this.getRandomForeName(gender)+" "+this.getRandomSurName(), gender);	
		
		if(this.maximalStats > 0){
			// Verteilen der Startattribute
			var numberOfStats = Math.floor(this.minimalStats + Math.random()*(this.maximalStats-this.minimalStats));		
			for(var i=0; i<numberOfStats; i++)
			{
				var x =  Math.floor(Math.random()*this.statNames.length);
				var statName = this.statNames[x];
				randomSoldier.getStat(statName).basisValue++;
			}
		}

		if(this.maximalStatBoni > 0){
			// Verteilen der Startattribute
			var numberOfBoni = Math.floor(this.minimalStatBoni + Math.random()*(this.maximalStatBoni+1-this.minimalStatBoni));	
			for(var i=0; i<numberOfBoni; i++)
			{
				var x =  Math.floor(Math.random()*this.statNames.length);
				var statName = this.statNames[x];
				randomSoldier.getStat(statName).bonusValue++;
			}
		}
		
		return randomSoldier;
	},
	
	getRandomForeName : function(gender)
	{
		if(gender == Gender.MALE){ 
			return this.maleForeNames[Math.floor(Math.random()*this.maleForeNames.length)];
		}
		else if(gender == Gender.FEMALE){ 
			return this.femaleForeNames[Math.floor(Math.random()*this.femaleForeNames.length)];
		}
	},
	
	getRandomSurName : function(gender)
	{
		return this.surNames[Math.floor(Math.random()*this.surNames.length)];
	}
};