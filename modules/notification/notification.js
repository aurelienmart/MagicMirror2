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
		timer: 8000,
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
		title.className = "smedium bright";
		title.innerHTML = this.title;

		var notification = document.createElement("div");
		notification.className = "ssmall light dimmed";
		notification.style.maxHeight = "25px";
		notification.innerHTML = this.notification;

		wrapper.appendChild(title);
		wrapper.appendChild(notification);
		return wrapper;
	},

	onLine: function () {
		this.title = this.config.startTitle;
		this.notification = this.translate(this.config.startNotification);
		this.updateDom(this.config.animationSpeed);
	},

	offLine: function () {
		this.title = "<span class=\"orangered\">" + this.translate("No Internet connection!") + "</span>";
		this.notification = this.translate("Check Wi-Fi connection and router");
		this.updateDom(this.config.animationSpeed);
	},

	notificationReceived: function (notification, payload, sender) {
		var self = this;
		if (notification === "DOM_OBJECTS_CREATED") {this.title = this.config.startTitle;
			this.notification = "Răzvan Cristea &copy; " + moment().year() + ", MIT License.";
			this.updateDom(this.config.animationSpeed);

			setTimeout(function () {
				self.onLine();
			}, this.config.timer);
		}

		if (notification === "DAY_ONLINE_NOTIFICATION") {this.onLine();}

		if (notification === "OFFLINE_NOTIFICATION") {this.offLine();}

		if (notification === "NIGHT_ONLINE_NOTIFICATION") {
			this.notification = this.translate("Dimmed night mode ") + parseInt(payload * 100) + "%";
			this.updateDom(this.config.animationSpeed);
		}

		if (notification === "NIGHT_NOTIFICATION") {
			this.notification = this.translate("Dimmed night mode ") + parseInt(payload * 100) + "%";
			this.updateDom();
		}

		if (notification === "DAY_NOTIFICATION") {
			if (typeof payload.title === "undefined") {
				payload.title = this.config.startTitle;
			} else this.title = payload.title;

			if (typeof payload.notification === "undefined") {
				payload.notification = this.translate(this.config.startNotification);
			} else this.notification = payload.notification;

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