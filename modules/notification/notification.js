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
		animationSpeed: config.animation
	},

	getScripts() {
		return ["moment.js"];
	},

	getStyles: function () {
		return ["font-awesome.css"];
	},

	getTranslations() {
		return {
			en: "en.json",
			ro: "ro.json"
		};
	},

	start() {
		Log.info("Starting module: " + this.name);
	},
	
	getDom() {
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
		if (window.innerWidth <= 1024) {
			this.title = this.config.startTitle2;
		} else this.title = this.config.startTitle;
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
		if (notification === "DOM_OBJECTS_CREATED") {
			if (window.innerWidth <= 1024) {
				this.title = this.config.startTitle2;
			} else this.title = this.config.startTitle;
			this.notification = "Răzvan Cristea &copy; " + moment().year() + ", MIT License.";
			this.updateDom(this.config.animationSpeed);

			setTimeout(function () {
				self.onLine();
			}, this.config.timer);
		}

		if (notification === "DAY_ONLINE_NOTIFICATION") {this.onLine();}

		if (notification === "OFFLINE_NOTIFICATION") {this.offLine();}

		if (this.config.nightMode) {
			if (notification === "NIGHT_ONLINE_NOTIFICATION") {
				this.notification = this.translate("Dimmed night mode ") + parseInt(payload) + "%";
				this.updateDom(this.config.animationSpeed);
			}
		}

		if (notification === "DAY_NOTIFICATION") {
			if (typeof payload.title === "undefined") {
				if (window.innerWidth <= 1024) {
					payload.title = this.config.startTitle2;
				} else payload.title = this.config.startTitle;
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