/* package: de.sepa.versatile.core.util */

/**
 * ImageReader class to create images from source strings.
 * 
 * @param defaultFolder {String}
 * 		The absolute path to a default folder containing images.
 * 
 * @author Patrick Seeber
 */
function ImageReader ( defaultFolder ) {
	
	this.defaultFolder = defaultFolder;
}

ImageReader.prototype = 
{
	/** The path to the default folder containing images. **/ 
	defaultFolder : null,
	
	/**
	 * Creates an image instance from a source path string.
	 * 
	 * @param src
	 * 		The source path string or filename.
	 * @param useDefault	
	 * 		Flag, whether or not to use the default folder. Default is TRUE.
	 * 
	 * @returns {Image} The image created from the source or null.
	 */
	readImage : function( src , useDefault ) {
		var img = new Image();
		if(useDefault === false){
			img.src = src;			
		}else{
			img.src = this.defaultFolder + src;
		}
		return img;
	}
};