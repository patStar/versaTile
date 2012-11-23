include('Button');
include('NumericManager');

function BottomMenu(game,width,height)
{
	this.log = new Array();
	this.context = $('<canvas width="'+width+'" height="'+height+'">')[0].getContext('2d');
	this.game = game;	
	this.background = "grey";
	this.buttons = new Array();
	
	var atkButton = new Button('gfx/attack.png',750,20,this.game.attackButtonClicked,this.game);
	this.buttons.push(atkButton);
	
	this.numericManager = new NumericManager();
	
}
BottomMenu.prototype =
{
	numericManager : null, 
	log : null,
	context : null,
	game : null,
	
	primary : null,
	secondary : null,
	
	background : null,
	
	attack : null,
	mouseListener : null,
	
	buttons : null,
	
	draw : function(context,x,y)
	{
		this.context.strokeStyle = "black";
		this.context.lineWidth = "0.5";
		this.context.font = "10px Courier new";
		this.context.fillStyle = this.background;
		this.context.fillRect(0,0,800,180);
	
		// draw the buttons
		for(var i=0; i<this.buttons.length; i++){
			this.drawButton(this.buttons[i]);
		}		
	
		if(this.primary){
			if(!this.secondary){ 
				this.context.strokeText(this.primary.name,10,15); 
			}else if(this.primary && this.secondary){ 
				this.context.strokeText(this.primary.name+" >> "+this.secondary.name,10,15); 
			}
			
			if(this.primary instanceof Person) 
			{
				this.primary.drawAvatar(this.context,10,25); 
				if(this.primary.enemiesSpotted > 0){
					this.numericManager.drawHighlightedNumber(this.context,this.primary.enemiesSpotted,12,27);
				}
			}
		}
		
		for(var i=0; i<Math.min(this.log.length,10); i++){
			this.context.save();
			this.context.lineWidth = "0.4";
			this.context.font = "8px Courier new";
			this.context.strokeText(this.log[this.log.length-i-1],400,25+i*15);
			this.context.restore();
		}

		if(this.primary && this.primary instanceof Soldier){		
			var start = 55;
			this.context.strokeText("Name :"+this.primary.name,10,start+=15);
			this.context.strokeText("STR :"+this.primary.stats.get(StrengthStat.ID).getCurrentValue(),10,start+=15);
			this.context.strokeText("AGI :"+this.primary.stats.get(AgilityStat.ID).getCurrentValue(),10,start+=15);
			this.context.strokeText("INT :"+this.primary.stats.get(IntelligenceStat.ID).getCurrentValue(),10,start+=15);
			this.context.strokeText("WIS :"+this.primary.stats.get(WisdomStat.ID).getCurrentValue(),10,start+=15);

			this.context.strokeText("Inventory :"+this.primary.inventory.toString()+" ("+this.primary.inventory.weight()+"/"+this.primary.canCarryWeight()+")",10,start+=15);
		}
		
		context.drawImage(this.context.canvas,x,y);
	},
	
	drawButton : function(button)
	{
		button.draw(this.context);	
	},
	
	click : function(event,x,y)
	{
		for(var i=0; i<this.buttons.length; i++){	
			var button = this.buttons[i];
			if(this.isInside(x,y,button.x,button.y,button.width(),button.height())){
				button.click();
			}
		}
	},
	
	isInside : function(x,y,x2,y2,w,h){
		return (x>=x2 && x<=x2+w && y>= y2 && y<= y2+h);
	}
};