/* Magic Mirror
 *
  * MIT Licensed.
 *
 * Redesigned by Răzvan Cristea
 * for iPad 3 & HD display
 * https://github.com/hangorazvan
 */
Module.register("notification", {

	defaults: {
		title: "<i class=\"lime fa fa-wifi\"></i> [ MagicMirror&sup2; ] &nbsp; &nbsp;",
		notification: null,
		timer: 5000
	},

	getScripts: function() {
		return ["moment.js"];
	},

	getStyles: function () {
		return ["font-awesome.css"];
	},

	start: function() {
		Log.info("Starting module: " + this.name);
		var self = this;
		setInterval(function() {
			self.updateDom();
		}, 1000);
	},
	
	getDom: function() {
		var wrapper = document.createElement("div");

		var title = document.createElement("div");
		title.className = "xmedium bright";
		title.innerHTML = this.config.title;

		var notification = document.createElement("div");
		notification.className = "small light dimmed";
		notification.innerHTML = this.config.notification;

		if (window.navigator.onLine === true) {
			this.config.title = this.config.title;
			this.config.notification = this.config.notification;
		} else if (window.navigator.onLine === false) {
			title.className = "xmedium orangered";
			title.innerHTML = "<i class=\"orangered fa fa-wifi\"></i> [ MagicMirror&sup2; ] &nbsp; &nbsp;";
			notification.className = "small light orangered";
			notification.innerHTML = "Fără conexiune la internet!";
		}

		wrapper.appendChild(title);
		wrapper.appendChild(notification);
		return wrapper;
	},

	reset: function () {
		this.config.title = "<i class=\"lime fa fa-wifi\"></i> [ MagicMirror&sup2; ] &nbsp; &nbsp;";
		this.config.notification = "Platformă modulară inteligentă";
	},

	notificationReceived: function (notification, payload, sender) {
		var self = this;
		if (notification === "ALL_MODULES_STARTED") {
			this.config.title = this.config.title;
			this.config.notification = "Modulele s-au încărcat cu succes";
			setTimeout(function () {
				self.reset();
			}, this.config.timer);
		}

		if (notification === "NIGHT_NOTIFICATION") {
			this.config.notification = "Mod nocturn estompat " + payload * 100 + "%";
		}

		if (notification === "DAY_NOTIFICATION") {
			if (typeof payload.title === "undefined") {
				payload.title = this.config.title;
			} else this.config.title = payload.title;

			if (typeof payload.notification === "undefined") {
				payload.notification = this.config.notification;
			} else this.config.notification = payload.notification;

			if (typeof payload.timer === "undefined") {
				payload.timer = this.config.timer;
			} else this.config.timer = payload.timer;

			setTimeout(function () {
				self.reset();
			}, this.config.timer);
		}

		if (notification === "HIDE_NOTIFICATION") {
			setTimeout(function () {
				self.reset();
			}, this.config.timer);
		}
	},
});