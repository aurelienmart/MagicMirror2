/* Magic Mirror
 *
 * MIT Licensed.
 *
 * Redesigned by Răzvan Cristea
 * for iPad 3 & HD display
 * https://github.com/hangorazvan
 */
Module.register("simpletext",{

	// Default module config.
	defaults: {},

	getScripts: function() {
	    return [];
	},
	
	getStyles: function() {
	    return [];
	},

	start: function() {
		Log.info("Starting module: " + this.name); 
	},

	getDom: function() {
		var wrapper = document.createElement("div");
		wrapper.className = this.config.cssClass;
		wrapper.innerHTML = this.config.text;
		return wrapper;
	}
});
