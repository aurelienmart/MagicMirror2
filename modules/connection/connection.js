/* Magic Mirror
 *
 * Module: MMM-connection-status
 *
 * By Sheya Bernstein https://github.com/sheyabernstein/MMM-connection-status
 * MIT Licensed.
 *
 * Redesigned by Răzvan Cristea
 * for iPad 3 & HD display
 * https://github.com/hangorazvan
 */
Module.register("connection", {

	defaults: {
	    initialLoadDelay: config.delay,
		animationSpeed: config.animation
	},

	getScripts: function() {
		return ["moment.js"];
	},

	getStyles: function () {
		return ["font-awesome.css"];
	},

	start: function() {
		Log.info("Starting module: " + this.name);
		this.loop();
	},
	
	getDom: function() {
		var wrapper = document.createElement("div");
		if (window.navigator.onLine === true) {
			var night = moment().format("k");
			if (night >= "23" && night < "7") {
				wrapper.className = this.config.cssClass + " dimmed";
				wrapper.innerHTML = "<i class=\"lime fas fa-wifi\"></i>" + this.config.onNight;
			} else {
				wrapper.className = this.config.cssClass + " normal";
				wrapper.innerHTML = "<i class=\"lime fas fa-wifi\"></i>" + this.config.onLine;
			}
		} else if (window.navigator.onLine === false) {
			wrapper.className = this.config.cssClass + " warn";
			wrapper.innerHTML = "<i class=\"fade fas fa-wifi\"></i>" + this.config.offLine;
		}
		return wrapper;
	},

	loop: function() {
		var self = this;
		setTimeout(function() {
			setInterval(function() {
				self.updateDom(); // self.config.animationSpeed
			}, self.config.updateInterval); // Loop interval
		}, self.config.initialLoadDelay); // First delay
	}
});