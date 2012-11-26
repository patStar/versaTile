/* package: de.sepa.versatile.core.engine */

include('de.sepa.versatile.core.util.Arrays');

/**
 * Observable implementation to realize the Observer-Observable pattern.
 * 
 * @author Patrick Seeber
 */
function Observable() {
	this.observer = new Object();
};
/** The general channel to send messages to. **/
Observable.GENERAL_TOPIC = 'general';
Observable.prototype = 
{
	/** The registered observer of this observable. **/ 
	observer : null,
	
	/**
	 * Send a notify message to all listeners of the given topic.
	 * 
	 * If no topic is given, the 'general' topic is used instead.
	 * If no message is given, zero will be send instead.
	 * 
	 * @param topic {String}
	 * 		The topic to filter the observer to send the message to.
	 * @param message
	 * 		The message to send.
	 */
	sendNotify : function ( topic , message ) {
		
		var msg = message ? message : 0;
		var top = topic   ? topic   : Observable.GENERAL_TOPIC;
		
		if ( this.observer[ top ] ) {								
			for ( var i in this.observer[ top ] ){
				this.observer[ top ][ i ].notify( top , msg );
			}
		}
	},
	
	/**
	 * Add a observer to the list of observer using a special topic.
	 * 
	 * @param topic {String}
	 * 		The topic to register this observer to.
	 * @param listener
	 * 		The listener to register.
	 */
	addObserver : function ( topic , observer ) {
		if( ! this.observer[ topic ] ){
			this.observer[ topic ] = new Array();
			this.observer[ topic ].push( observer );
		} else if ( ! Arrays.contains( this.observer[ topic ] , observer ) ) {
			this.observer[ topic ].push( observer );
		}			
	},
	
	/**
	 * Check if a special observer is registered to a specific topic.
	 * 
	 * @param topic {String}
	 * 		The topic to filter the observer.
	 * @param observer
	 * 		The observer to check.
	 * 
	 * @returns {Boolean} TRUE if the observer is registered to the given topic. 
	 * 			Otherwise, or if the topic does not exist: FALSE.
	 */
	containsObserver : function ( topic , observer ) {
		if( this.observer[ topic ] ){
			return Arrays.contains( this.observer[ topic ] , observer );
		}
		return false;
	},
	
	/**
	 * Remove a registered observer from a topic.
	 * 
	 * @param topic {String}
	 * 		The topic to filter the observer.
	 * @param observer
	 * 		The observer to remove.
	 */
	removeObserver : function ( topic , observer ) {
		if( this.containsObserver( topic , observer ) ) {
			Arrays.remove( this.observer[ topic ] , observer );			
		}
	}
};
