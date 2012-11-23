/* package: de.sepa.versatile.core */

include('de.sepa.versatile.core.Constants');

include('de.sepa.versatile.core.engine.Shader');
include('de.sepa.versatile.core.engine.MapField');
include('de.sepa.versatile.core.engine.Map3D');
include('de.sepa.versatile.core.engine.ObjectMap');

include('de.sepa.versatile.core.logic.figures.Alien');
include('de.sepa.versatile.core.logic.SoldierFactory');
include('de.sepa.versatile.core.logic.Item');

include('de.sepa.versatile.gui.BottomMenu');
include('de.sepa.versatile.gui.AttackSign');

include('de.sepa.versatile.entities.map.WallManager');
include('de.sepa.versatile.entities.map.Tile');
include('de.sepa.versatile.entities.map.Wall');

include('de.sepa.versatile.entities.items.OtherAmmo');
include('de.sepa.versatile.entities.items.Weapon');

/**
 * The game class.
 * 
 * @author Patrick Seeber
 */
function Game()
{
	this.objectMap = new ObjectMap();
	this.bottomMenu = new BottomMenu(this,800,180);  
	this.soldierFactory = new SoldierFactory();
	
	this.soldierFactory.minimalStats = 40;
	this.soldierFactory.maximalStats = 120;
	this.soldierFactory.maximalStatBoni = 1;
}

Game.prototype =
{
	wallManager : new WallManager(),
	tile : new Tile(64,32),
	wall : new Wall(32,32),
	shader : new Shader(),
	screen : null,
	map : null,
	heightLevel : 0,
	selectedField : null,
	selectionColor : "white",
	selectedObject : null,
	staticMapImage : null,
	soldierFactory : null,
	
	attackSign : new AttackSign(),	
	pointer : new Pointer(),	
	cooperationIcon : new CooperateIcon(),
	pickupIcon: new PickupIcon(),	
	
	mapShiftX : 0,
	mapShiftY : 0,
	
	totalShiftX : 0,
	totalShiftY : -100,
	
	mouseDown : null,
	isClick : false,
	bottomMenu : null,
	
	loadMap : function( mapName )
	{
		rawData = eval(readJSON("maps/"+mapName).responseText);
		
		var map = new Map3D(-1,-1,-1);
		
		for(var z=0; z<rawData.length; z++){
			for(var y=0; y<rawData[0].length; y++){
				for(var x=0; x<rawData[0][0].length; x++){
					field = new MapField(x,y,z);
					field.ground = (rawData[z][y][x].indexOf("B") > -1);
					field.wall.n = (rawData[z][y][x].indexOf("N") > -1) ? this.wallManager.get("N"): null;
					if((rawData[z][y][x].indexOf("S") > -1)){
						field.wall.s = this.wallManager.get("S");
					}else if(rawData[z][y][x].indexOf("Du") > -1){
						field.wall.s = this.wallManager.get("Du");
					}else if(rawData[z][y][x].indexOf("Dl") > -1){
						field.wall.s = this.wallManager.get("Dl");
					}else{
						field.wall.s = null;
					}
					field.wall.e = (rawData[z][y][x].indexOf("E") > -1) ? this.wallManager.get("E"): null;
					field.wall.w = (rawData[z][y][x].indexOf("W") > -1) ? this.wallManager.get("W"): null;

					if(rawData[z][y][x].indexOf("X") > -1){
						var soldier = null;
						if(rawData[z][y][x].indexOf("Xr") > -1){
							soldier = this.soldierFactory.createRandomSoldier();
						}else if(rawData[z][y][x].indexOf("Xb") > -1){
							soldier = this.soldierFactory.createRandomSoldier();
						}
						
						if(soldier){
							field.data.push(soldier);
						}							
					}else if(rawData[z][y][x].indexOf("A") > -1){
						var alien = null;
						if(rawData[z][y][x].indexOf("Ay") > -1){
							alien = new LittleGrey();
						}else if(rawData[z][y][x].indexOf("An") > -1){
							alien = new LittleGreen();
						}
						
						if(alien){
							field.data.push(alien);
						}						
					}					
					if(x==6 && y==6 && z==0){field.data.push(new ShootGunBullet(6));}
					if(x==6 && y==7 && z==0){field.data.push(new ShootGun());}
					map.put(field);
				}
			}
		}
		
		this.map = map;
		this.staticMapImage = $('<canvas width="800" height="600">')[0].getContext('2d');
//		this.drawMap(this.staticMapImage);
	//	this.screen.context.drawImage(this.staticMapImage.canvas,this.totalShiftX+this.mapShiftX,this.totalShiftY+this.mapShiftY)
		return this.map;
	},
	
	updateMap : function(x,y,z)
	{
		this.clearScreen(this.staticMapImage,255);
		this.drawMap(this.staticMapImage);
		this.clearScreen(this.screen.context,255);
		this.screen.context.drawImage(this.staticMapImage.canvas,this.totalShiftX+this.mapShiftX,this.totalShiftY+this.mapShiftY);
		this.bottomMenu.draw(this.screen.context,0,420);
	},
	
	clearScreen : function(context,alpha) 
	{
		if(!alpha) alpha = 0;
		context.fillStyle = "rgba(0,0,0,"+alpha+")";
		context.fillRect(0,0,800,600);
	},
	
	drawMap : function(context)
	{
		this.wallManager.context = context;
		this.clearScreen(context);

		for(var z=this.map.minZ; z<=this.map.maxZ; z++){
			for(var y=this.map.minY; y<=this.map.maxY; y++){
				for(var x=this.map.minX; x<=this.map.maxX; x++){
					var mapField = this.map.get(x,y,z);
					if(mapField){
						var selected = (this.selectedField && this.selectedField == mapField);
						this.drawTile(context,mapField,selected);
					}
				}
			}
		}
	},
	
	drawGround : function(context,mapField,selected)
	{
		xPos = this.screen.mapOrigin.x+(mapField.x-mapField.y-1)*this.tile.width/2;
		yPos = this.screen.mapOrigin.y+((mapField.x+mapField.y)/2-(this.wall.height/this.tile.height -0.5)*mapField.z)*this.tile.height;
		
		var shading = 0;
		for(var dz=0; dz < this.map.maxZ-mapField.z; dz++){
			shading += this.shader.getShadowLevel(this.map,mapField.x,mapField.y,mapField.z,dz);
		}
		
		var tileColor = this.tile.getShadowByLevel(shading);
		
		this.tile.draw(context,xPos,yPos,tileColor);
		// draw marker?
		if(selected){this.tile.drawMarker(context,xPos,yPos,this.selectionColor);}
	},
	
	drawSelectedWall : function(context,field,background)
	{
		var x = field.x;
		var y = field.y;
		var z = field.z;
	
		xPos = this.screen.mapOrigin.x+(x-y)*this.tile.width/2;
		yPos = this.screen.mapOrigin.y-this.wall.height+(x+y+1)*this.tile.height/2-(this.wall.height-this.tile.height/2)*z;
		
		if(background){
			this.wall.drawWiredWall(context,xPos,yPos,C.Direction.NORTH,this.selectionColor);
			this.wall.drawWiredWall(context,xPos,yPos,C.Direction.WEST,this.selectionColor);
		}else{
			this.wall.drawWiredWall(context,xPos,yPos,C.Direction.EAST,this.selectionColor);
			this.wall.drawWiredWall(context,xPos,yPos,C.Direction.SOUTH,this.selectionColor);
		}
	},
	
	drawWallNW : function(context,mapField,selected)
	{		
	
		xPos = this.screen.mapOrigin.x+(mapField.x-mapField.y)*this.tile.width/2;
		yPos = this.screen.mapOrigin.y-this.wall.height+(mapField.x+mapField.y+1)*this.tile.height/2-(this.wall.height-this.tile.height/2)*mapField.z;

		this.wallManager.context = context;
		
		if(mapField.wall.n ){			
			if(selected){
				this.wallManager.drawNorthWallPlusWire(xPos,yPos,style);
			}else{
				this.wallManager.drawNorthWall(xPos,yPos,style);
			}
		}
		
		if(mapField.wall.w){
			if(selected){
				this.wallManager.drawWestWallPlusWire(xPos,yPos);
			}else{
				this.wallManager.drawWestWall(xPos,yPos);
			}
		}
	},
	
	drawWallSE : function(context,mapField,selected)
	{		
		xPos = this.screen.mapOrigin.x+(mapField.x-mapField.y)*this.tile.width/2;
		yPos = this.screen.mapOrigin.y-this.wall.height+(mapField.x+mapField.y+1)*this.tile.height/2-(this.wall.height-this.tile.height/2)*mapField.z;
		
		if(mapField.wall.s){			
			if(selected){
				context.drawImage(mapField.wall.s,xPos-32,yPos+16);
			}else{
				context.drawImage(mapField.wall.s,xPos-32,yPos+16);
			}
		}
		
		if(mapField.wall.e){
			if(selected){
				this.wallManager.drawEastWallPlusWire(xPos,yPos);
			}else{
				context.drawImage(mapField.wall.e,xPos,yPos+16);
			}
		}
	},
	
	drawTile : function(context, mapField, selected)
	{
		var x = mapField.x;
		var y = mapField.y;
		var z = mapField.z;

		if(mapField.wall.n || mapField.wall.w){
			this.drawWallNW(context,mapField);
		}
		if(selected){
			this.drawSelectedWall(context,mapField,true);
		}
		if(mapField.ground){
			this.drawGround(context,mapField);			
		}
		
		// is there another object at the selected tile
		if(mapField.data.length > 0){	

			var obj = mapField.data[0];
			
			// is a soldier selected and we are over another soldier wirh our mouse
			if(obj instanceof Person && selected && this.selectedSoldier() && obj != this.selectedSoldier()){
				if(obj.friend){
					// draw the cooperation icon over the friend
					if(!this.attackMode) this.cooperationIcon.draw(context,20+this.screen.mapOrigin.x+(x-y-1)*this.tile.width/2,-32+this.screen.mapOrigin.y+(x+y-2*z)*this.tile.height/2);
				}else{
					// draw the attack sign on any fiend
					context.globalAlpha = 0.5;
					this.attackSign.draw(context,9+this.screen.mapOrigin.x+(x-y-1)*this.tile.width/2,-22+this.screen.mapOrigin.y+(x+y-2*z)*this.tile.height/2);
					context.globalAlpha = 1;
				}
			}else if(obj instanceof Item && selected && this.selectedSoldier()){
				if(!this.attackMode) this.pickupIcon.draw(context,20+this.screen.mapOrigin.x+(x-y-1)*this.tile.width/2,-32+this.screen.mapOrigin.y+(x+y-2*z)*this.tile.height/2);
			}
						
			// draw the soldier at the field
			obj.draw(context,this.screen.mapOrigin.x+(x-y-1)*this.tile.width/2,this.screen.mapOrigin.y+(x+y-2*z)*this.tile.height/2);									
		}	
		
		// draw the pointer over the selected soldier
		if(this.selectedObject && this.map.get(mapField.x,mapField.y,mapField.z-1) && this.map.get(mapField.x,mapField.y,mapField.z-1).id == this.selectedObject.id){
			this.pointer.draw(context,26+this.screen.mapOrigin.x+(x-y-1)*this.tile.width/2,-34+this.screen.mapOrigin.y+(x+y-2*(z-1))*this.tile.height/2);			
		}		
		
		// draw front wall		
		if(mapField.wall.s || mapField.wall.e || mapField.wall.du || mapField.wall.dl){
			this.drawWallSE(context,mapField);
		}
		
		// draw front selection wall and attack sign if atack mode is on
		if(selected){
			this.drawSelectedWall(context,mapField);						
			if(this.attackMode && this.selectedObject != mapField){				
				context.globalAlpha = 0.2;
				this.attackSign.draw(context,9+this.screen.mapOrigin.x+(x-y-1)*this.tile.width/2,-22+this.screen.mapOrigin.y+(x+y-2*z)*this.tile.height/2);
				context.globalAlpha = 1;
			}
		}
	},
	
	getCoordinatesUnderMouse : function(x,y)
	{
		nx = Math.ceil(this.heightLevel - 1 + ((y-this.screen.mapOrigin.y-this.totalShiftY)/this.tile.height) + ((x-this.screen.mapOrigin.x-this.totalShiftX)/this.tile.width));
		ny = Math.ceil(this.heightLevel - 1 + ((y-this.screen.mapOrigin.y-this.totalShiftY)/this.tile.height) - ((x-this.screen.mapOrigin.x-this.totalShiftX)/this.tile.width));
		return {x:nx,y:ny};
	},
	
	selectTile : function(x,y,z)
	{		
		//the selection is over its own field		
		if(this.selectedField && this.selectedField == this.map.get(x,y,z)){
		
		}
		// the selection is over a field
		else if(this.map.get(x,y,z))
		{
			// select the field
			this.selectedField = this.map.get(x,y,z);
			// if nothing is connected to the mouse yet...
			if(!this.selectedObject){
				this.selectionColor = "white";
				this.bottomMenu.primary = null;
			}
			if(this.selectedField.data.length > 0) // some object is at this field
			{
				if(this.selectedObject && this.selectedObject.data[0] != this.selectedField.data[0]){
					this.bottomMenu.secondary = this.selectedField.data[0];
				}else if(!this.selectedObject){
					this.bottomMenu.primary = this.selectedField.data[0];
				}
			}
			else
			{
				this.bottomMenu.secondary = null;
			}
		}else if(this.selectedField){
			this.selectedField = null;
		}else{
			return false;
		}
		return true;
	},
	
	chat: function(message){
		this.bottomMenu.log.push(message);
	}, 
	
	moveFieldData: function(from, to)
	{
		to.data = from.data;
		from.data = new Array();

		var suffix = this.coordString(from)+" to "+this.coordString(to)+".";
		
		if(to.data[0] instanceof Soldier) this.chat(to.data[0].name+" walked from "+suffix);
		else if(to.data[0] instanceof Item) this.chat(to.data[0].name+" was moved "+suffix);
	},
	
	coordString : function(obj){
		return '['+obj.x+','+obj.y+','+obj.z+']';
	},
	
	clearSelectedObject : function()
	{
		this.selectedObject = null;
		this.selectionColor = "white";
		this.attackMode = false;
	},
	
	clickTile : function(x,y,z)
	{
		var mapField = this.map.get(x,y,z);

		var affect = false;
		// if we haven't actively activated the attack mode we may point over an enemy at the moment, lets check that.
		if(this.selectedSoldier() && mapField.data.length > 0 && mapField.data[0] instanceof Person && !mapField.data[0].friend){
			affect = true;
		}		
						
		if(!this.attackMode && !affect)
		{
			if(mapField && mapField.ground)
			{
				if(this.selectedObject)
				{
					// move object
					if(mapField.data.length<1)
					{					
						this.moveFieldData(this.selectedObject, mapField);
						this.clearSelectedObject();
					}
					else // there is an object at this tile!
					{
						// reclick on the same object
						if(mapField== this.selectedObject)
						{
							this.selectedObject = null;
							this.selectionColor = "white";
						}
						else if(this.selectedSoldier()) // interact with objects
						{
							var soldier = this.selectedSoldier();
							
							// pickup items							
							if(mapField.data[0] instanceof Item)
							{
								var item = mapField.data[0];
								if(soldier.addToInventory(item)){
									mapField.data.splice(0,1);
									this.chat(soldier.name+" picked up "+item.name+".");
									this.bottomMenu.secondary = null;
									this.moveFieldData(this.selectedObject, mapField);	
									this.selectedObject = mapField;
								}else{								
									this.chat(soldier.say('Too, heavy! I cannot carry this anymore!\nI can only lift '+soldier.canCarryWeight()));
								}
							}// interact with other persons
							else if(mapField.data[0] instanceof Person){
								var otherPerson = mapField.data[0];
								// switch selection with other person
								if(otherPerson.friend){
									this.selectedObject = mapField;
									this.bottomMenu.primary = mapField.data[0];
									this.bottomMenu.secondary = null;
								}
							}
						}
					}
					
				}
				else if(mapField.data.length>0) // pickup objects
				{
					if(mapField.data[0] instanceof Soldier){
						this.selectedObject = mapField;				
						this.bottomMenu.primary = mapField.data[0];
						this.drawSelectionMenu();
						this.selectionColor = "yellow";
					}
				}
				else
				{				
					this.shiftUp(mapField);
					this.selectionColor = "white";
				}
			}else{
				this.selectedObject = null;
				this.selectionColor = "white";
			}
		}else if(mapField && mapField.data.length > 0){
			if(mapField.data[0] instanceof Person){
				if(mapField == this.selectedObject){
					this.clearSelectedObject();
				}else{
					if(this.selectedSoldier().inventory.hasItemType(Weapon)){
						this.chat("BAM! "+(this.selectedSoldier()).name+" shoots at "+mapField.data[0].name+"!");
						//this.clearSelectedObject();
					}
				}
			}
		}
	},
	
	shiftUp : function(mapField)
	{
		var upperField = this.map.get(mapField.x,mapField.y,mapField.z+1);
		upperField.ground = mapField.ground;
		mapField.ground = false;
		mapField.wall.s = true;
		mapField.wall.e = true;
	},
	
	handleClick : function(event,x,y)
	{
		if(!this.isClick) return 0;
		
		if(this.isInMainGameScreen(x,y)){
			coords = this.getCoordinatesUnderMouse(x,y);			
			if(this.map.get(coords.x,coords.y,this.heightLevel)){
				this.clickTile(coords.x,coords.y,this.heightLevel);				
			}
		}else if(this.isInBottomMenu(x,y)){
			this.bottomMenu.click(event,x,y-420);
		}
		
		this.updateMap(coords.x,coords.y,this.heightLevel);
	},
	
	handleMouseMove : function(event,x,y)
	{		
		coords = this.getCoordinatesUnderMouse(x,y);

		//dragging
		if(this.mouseDown && this.isInMainGameScreen(x,y)){
			this.isClick = false;
			this.mapShiftX = event.pageX - this.mouseDown.pageX ;
			this.mapShiftY = event.pageY - this.mouseDown.pageY ;
			this.updateMap(coords.x,coords.y,this.heightLevel);	
		}else if(this.isInMainGameScreen(x,y)){
			if(this.selectTile(coords.x,coords.y,this.heightLevel)){
				this.updateMap(coords.x,coords.y,this.heightLevel);
			}
		} else {
			this.selectedField = null;
			this.updateMap(coords.x,coords.y,this.heightLevel);
		}		
	},
	
	isInMainGameScreen : function(x,y){
		return (x >= 0 && x < this.screen.context.canvas.width && y >= 0 && y <= this.screen.context.canvas.height-this.bottomMenu.context.canvas.height);
	},
	
	isInBottomMenu : function(x,y){
		return (x >= 0 && x < this.screen.context.canvas.width && y >= this.screen.context.canvas.height-this.bottomMenu.context.canvas.height && y <= this.screen.context.canvas.height);
	},
	
	handleMouseDown : function(event,x,y)
	{
		this.mouseDown = event;
		this.isClick = true;
	},
	
	handleMouseOut : function(event,x,y)
	{
		this.mouseDown = null;
		this.isClick = false;
	},
	
	handleMouseUp : function(event,x,y)
	{
		this.mouseDown = null;
		this.totalShiftX += this.mapShiftX;
		this.totalShiftY += this.mapShiftY;
		this.mapShiftX = 0;
		this.mapShiftY = 0;
	},
	
	drawSelectionMenu : function(context,x,y){
	},
	
	attackMode : false,
	
	attackButtonClicked : function(event)
	{
		this.attackMode = !this.attackMode;
		if(this.selectedSoldier()){
		}else if(this.attackMode){
			this.attackMode = false;
		}
		this.chat("Attack mode switched to "+this.attackMode+".");
	},
	
	selectedSoldier : function()
	{
		if(this.selectedObject && this.selectedObject.data && this.selectedObject.data.length > 0){
			return this.selectedObject.data[0];
		}
		return null;
	}	
};