/* package: de.sepa.versatile.core.util */

/**
 * ResourceResolver class to read resources from files.
 * 
 * @param resourceFolder
 * 		The root resource folder to look for resources.
 * 
 * @author Patrick Seeber
 */
function ResourceResolver( resourceFolder ) 
{
	this.resourceFolder = resourceFolder;
}

ResourceResolver.prototype =
{
	/** The path to the folder to look for resources. **/
	resourceFolder : null,
	
	/**
	 * Read a resource string from a file and evaluate the response.
	 * 
	 * @param filename
	 * 		The resource file to read.
	 * @returns The evaluated resource from the file.
	 */
	readResource : function(filename) {
		var realFileName = (this.resourceFolder + '/' + filename).replace(/[.]/g,'/');
		return eval($.ajax({url:realFileName,async:false,dataType:'json'}).responseText);
	}	
};