var System = new Object();

// An override function to inherit methods and members from objects.
override = function(x,o){
	if(typeof(o) == 'object'){
		for(var i in o){		
			x.prototype[i] = o[i];
		}
	}
};

// Internal array to store the names of included classes to avoid double includes.
var _INCLUDES = new Object();

// Function to include other JS-Scripts into the application.
function include(scriptName)
{
	try{
		// Replacing dots to backslashes, so de.sepa.game.main.MyClass is 
		// converted into the folder url 'classes/de/sepa/game/main/MyClass.js'.
		var realScriptName = 'classes/'+scriptName.trim().replace(/[.]/g,'/')+'.js';
		
		// Check if this script isn't already included.
		if(!_INCLUDES[realScriptName]){			
			// The jQuery AJAX request.
			var request = {url:realScriptName, async:false, dataType:'script'};
			$.ajax(request)
				.fail( function ( a , b , exception ) {
					console.error('Error while trying to load script "'+scriptName.trim()+'" resolved to "'+realScriptName+'".');
					console.error(exception);
				})
				.success(_INCLUDES[realScriptName] = true);
		}
	}catch(e){
		console.error('Error while trying to load script "'+scriptName.trim()+'".');
		throw e;
	}
}

// Function to read a JSON string from a file.
function readJSON(filename) {
	return $.ajax({url:filename,async:false,dataType:'json'});
}

function log(message) {console.log(arguments);}
function trace(message) {console.log(arguments);}

// Function to read the content from a file.
function readFromFile(filename) {
	return $.ajax({url:filename,async:false}).responseText;
}

include('de.sepa.versatile.core.util.ResourceResolver');

System.resourceResolver = new ResourceResolver('resources');
function readResource (filename) {
	return System.resourceResolver.readResource(filename);
}