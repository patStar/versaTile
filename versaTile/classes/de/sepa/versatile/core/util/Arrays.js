/* package: de.sepa.versatile.core.util */

/**
 * Arrays class to handle common operations on arrays.
 * 
 * @author Patrick Seeber
 */
function Arrays() {}

Arrays.prototype = 
{
	/**
	 * Does the given array contain the given element.
	 *  
	 * @param array
	 * 		The array to check for the element.
	 * @param element
	 * 		The element to look for inside the array.
	 * @returns {Boolean} TRUE if the array contains the element. Otherwise FALSE. 
	 */
	contains : function ( array , element) {
		return (this.firstIndexOf(array,element) > -1);
	},
	
	/**
	 * Get the position of the first occurrence of the element in the 
	 * array or -1 if no such element exists.  
	 * 
	 * @param array
	 * 		The array to check for the element.
	 * @param element
	 * 		The element to look for inside the array.
	 * @returns {Numeric} The position of the first occurrence of the 
	 * 			given element or -1 if no such element exists.
	 */
	firstIndexOf : function ( array , element) {		
		for( i in array ){
			if(element == array[i]){
				return i;
			}
		}
		return -1;
	},
	
	/**
	 * Get the position of the last occurrence of the element in the 
	 * array or -1 if no such element exists.  
	 * 
	 * @param array
	 * 		The array to check for the element.
	 * @param element
	 * 		The element to look for inside the array.
	 * @returns {Numeric} The position of the last occurrence of the 
	 * 			given element or -1 if no such element exists.
	 */
	lastIndexOf : function ( array , element) {		
		for( var i = array.length-1 ; i >= 0 ; i++ ){
			if(element == array[i]){
				return i;
			}
		}
		return -1;
	},
	
	/**
	 * Removes an element from the array if the array contains this element.
	 * 
	 * @param array
	 * 		The given array to remove the element from.
	 * @param element
	 * 		The element to remove.
	 * @returns The array without the removed element.
	 */
	remove : function ( array , element ) {
		var i = this.firstIndexOf(array, element);
		if(i > -1){
			array.splice(i,1);
		}
		return array;
	}
};