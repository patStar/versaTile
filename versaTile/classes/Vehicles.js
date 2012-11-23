function Vehicle()
{
	this.name = 'unknown vehicle';
	this.places = new Array();
	this.automated = false;
};
Vehicle.prototype = 
{
	name : null,
	// is this an automated vehicle without personal? (e.g. staleites)
	automated : null,
	// how many people have place in this vehicle
	places : null,
	// how fast can we drive this thing?
	speed : null,
	
	// Default getter for speed. May be overriden by more complex calculations.
	getSpeed : function(){return this.speed; },
	// How many people can we put into this thing?
	getFreePlaces : function() 
	{
		var freePlaces = 0;
		for(var i in this.places){
			if(this.places[i] == null) freePlaces++;
		}
		return freePlaces;
	},
	
	addPerson :	function(person, position)
	{
		if(!this.places || this.places.length < 1){
			throw 'Error while trying to a dd a person to a vehicle, that is not capable of containing persons!';
		}
		
		var oldPerson = null;
		if(this.places[position] != null){
			oldPerson = this.places[position];
		}
		this.places[position] = person;
		return oldPerson;
	}
};
