function OperationBase()
{
	this.fields = new Array();
};
OperationBase.prototype = 
{
	// The fields for the Buildings.
	fields : null
};


function Room(name,width,height)
{ 
	if(name) this.name = name;
	if(width) this.width = width;
	if(height) this.height = height;
};

Room.prototype = 
{
	name   : 'undefined room',
	width  : null,
	height : null		
};


function Quarter(){};
Quarter.prototype = new Room('team quarter',2,2);


function HeadQuarter(name)
{
	if(name) this.name = name;
	this.operationBase = new OperationBase();
	this.staff = new Staff();
};

HeadQuarter.prototype = 
{
	name : 'unnamed HQ',
	operationBase : null,	
	staff : null
};

function Staff()
{
	this.soldiers = new Array();
	this.scientists = new Array();
	this.worker = new Array();
};

Staff.prototype = 
{
	soldiers : null,
	scientists : null,
	worker : null,
	
	hireSoldier : function (person) { if(person) this.soldiers.push(soldier); },
	hireScientist : function (person) { if(person) this.soldiers.push(soldier); },
	hireWorker : function (person) { if(person) this.soldiers.push(worker); }
};