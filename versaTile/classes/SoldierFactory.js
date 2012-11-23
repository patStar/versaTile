include("Constants");
include("Soldier");

function SoldierFactory() {}
SoldierFactory.prototype =
{
	minimalStats : 0,
	maximalStats : 0,

	minimalStatBoni : 0,
	maximalStatBoni : 0,

	maleForeNames : [ 'Arnold','Adam', 'Santiago','Antonio', 'Barrak', 'Benjamin', 'Christopher','Charlie', 'Clarc', 'Reed','Daniel','Pioneer','Hammer','Doom','Thunder','Elijah','Dolph','Lee','Donovan', 'Dave', 'Flint', 'Gunner', 'Ewan', 'Fargo', 'Frank', 'Francis', 'George', 'Henry', 'Isaac', 'Luther', 'John','Gabriel', 'Jack', 'Jim', 'James', 'Jacob', 'Kyle', 'Leonard', 'Martin', 'Bruce', 'Rufus', 'Nigel', 'Omar', 'Dan', 'Osama', 'Ali', 'Jean','Taylor', 'Luc' ,'Jean Luc', 'Patrick','Hassan','Pierce','Sheldon','Paul', 'Quentin', 'Richard','Romeo', 'Roland', 'Simon', 'Sadam', 'Steven', 'Steve', 'Theodore', 'Thomas', 'Ugeen', 'Victor', 'Valentine', 'Werner','William', 'Xavier' ,'Zander', 'Tiberius', 'Neo','Nero','Chuck'],
	femaleForeNames : [ 'Anna', 'Beatrice', 'Carmen','Ginger','Irene','Casandra','Olga','Gorscha','Blossom','Willow','Chasey','Caroline', 'Christie','Sharon', 'Charlie', 'Diana', 'Eve', 'Franca', 'Francis', 'Gretchen', 'Helen', 'Ivy', 'Inga', 'Ivonne', 'Janine', 'Julia', 'Josephine', 'Kylie', 'Kirsten', 'Kora', 'Jill', 'Liana','Liz','Monica','Maria','Melanie','Madleen','Milla','Rebecca','Susan','Sandra','Jodie','Simone','Tiara','Twyla','Ura','Victoria','Valentine', 'Yvonne', 'Zora'],
	
	surNames : ['Adler','Belucci','Buscemi','Walken','Bernstein','Brown','White','Black','Reed','Richards','Grey','Clarcke','Daniels','Jackson','Storm','Sheppard','O\'Neil','MacCracken','Lane','Gold','Silver','Stone','Snider','Sandler','Lundgreen','Woods','Majors','Evans','Foreman','Gore','Harrisson','Holmes','Ianovic','Johnson','Jamesson','Korber','Langley','Lawson','Ludlum','Bourne','Bond','Minogue','Stevenson','Johannson','Vicious','Jovovic','Willis','Cage','Foster','Simmons', 'Ibn Ali', 'Ben Hassan', 'Picard', 'Shattner', 'Kirk','Valentine','Summers','Cooper','Markov','Malcovic','Segal','Schwarzenegger','Turner','Sparrow','Norris'],

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