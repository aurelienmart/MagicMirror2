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

	getScripts: function () {
	    return false;
	},
	
	getStyles: function () {
	    return ["font-awesome.css"];
	},

	start: function () {
		Log.info("Starting module: " + this.name); 
	},

	getDom: function () {
		var wrapper = document.createElement("div");
		wrapper.className = this.config.cssClass;
		wrapper.innerHTML = this.config.text;
		return wrapper;
	},

	getHeader: function () {
		return this.data.header;
	},
});
