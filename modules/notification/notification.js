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
		startTitle: "<i class=\"lime fa fa-wifi\"></i> [ MagicMirror&sup2; ] &nbsp;",
		startNotification: "Modular smart mirror platform",
		title: null,
		notification: null,
		timer: 9000,
		animationSpeed: config.animation
	},

	getScripts: function() {
		return ["moment.js"];
	},

	getStyles: function () {
		return ["font-awesome.css"];
	},

	getTranslations: function() {
		return {
			en: "en.json",
			ro: "ro.json"
		};
	},

	start: function() {
		Log.info("Starting module: " + this.name);
	},
	
	getDom: function() {
		var wrapper = document.createElement("div");

		var title = document.createElement("div");
		title.className = "medium bright";
		title.innerHTML = this.config.title;

		var notification = document.createElement("div");
		notification.className = "small light dimmed";
		notification.style.maxHeight = "25px";
		notification.innerHTML = this.config.notification;

		wrapper.appendChild(title);
		wrapper.appendChild(notification);
		return wrapper;
	},

	onLine: function () {
		this.config.title = this.config.startTitle;
		this.config.notification = this.translate(this.config.startNotification);
		this.updateDom(this.config.animationSpeed);
	},

	offLine: function () {
		this.config.title = "<span class=\"orangered\"><i class=\"fa fa-wifi\"></i> [ MagicMirror&sup2; ] &nbsp;</span>";
		this.config.notification = "<span class=\"orangered\">" + this.translate("No Internet connection!") + "</span>";
		this.updateDom(this.config.animationSpeed);
	},

	notificationReceived: function (notification, payload, sender) {
		var self = this;
		if (notification === "DOM_OBJECTS_CREATED") {this.config.title = this.config.startTitle;
			this.config.notification = "<div class=\"msmall\">Răzvan Cristea &copy; " + moment().year() + ", MIT License.</div>";
			this.updateDom(this.config.animationSpeed);
			setTimeout(function () {
				self.onLine();
			}, this.config.timer);
		}

		if (notification === "ONLINE_NOTIFICATION") {this.onLine();}

		if (notification === "OFFLINE_NOTIFICATION") {this.offLine();}

		if (notification === "NIGHT_NOTIFICATION") {this.config.title = this.config.startTitle;
			this.config.notification = this.translate("Dimmed night mode ") + parseInt(payload * 100) + "%";
			this.updateDom();
		}

		if (notification === "DAY_NOTIFICATION") {
			if (typeof payload.title === "undefined") {
				payload.title = this.config.startTitle;
			} else this.config.title = payload.title;

			if (typeof payload.notification === "undefined") {
				payload.notification = this.translate(this.config.startNotification);
			} else this.config.notification = payload.notification;

			if (typeof payload.timer === "undefined") {
				payload.timer = this.config.timer;
			} else this.config.timer = payload.timer;
			this.updateDom(this.config.animationSpeed);
			setTimeout(function () {
				self.onLine();
			}, this.config.timer);
		}

		if (notification === "HIDE_NOTIFICATION") {
			this.onLine();
		}
	},
});