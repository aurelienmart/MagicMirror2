/* Magic Mirror
 *
 * MIT Licensed.
 *
 * Redesigned by Răzvan Cristea
 * for iPad 3 & HD display
 * https://github.com/hangorazvan
 */
Module.register("simpletext",{

	defaults: {},

	getScripts() {
	    return false;
	},
	
	getStyles() {
	    return ["font-awesome.css"];
	},

	start() {
		Log.info("Starting module: " + this.name); 
	},

	getDom() {
		var wrapper = document.createElement("div");
		wrapper.className = this.config.cssClass;
		wrapper.innerHTML = this.config.text;
		return wrapper;
	},

	getHeader() {
		return this.data.header;
	},
});
