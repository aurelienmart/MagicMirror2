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
		animationSpeed: config.animation,
	},

	getScripts: function () {
		return ["moment.js"];
	},

	getStyles: function () {
		return ["font-awesome.css"];
	},

	getTranslations: function () {
		return {
			en: "en.json",
			ro: "ro.json"
		};
	},

	start: function () {
		Log.info("Starting module: " + this.name);
	},
	
	getDom: function () {
		var wrapper = document.createElement("div");

		var title = document.createElement("div");
		title.className = "medium bright";
		title.innerHTML = this.image + this.title;

		var notification = document.createElement("div");
		notification.className = "small light dimmed";
		notification.style.maxHeight = "25px";
		notification.innerHTML = this.message;

		wrapper.appendChild(title);
		wrapper.appendChild(notification);
		return wrapper;
	},

	onLine: function () {
		this.image = "<i class=\"fa fa-" + this.config.startImage + "\"></i> ";
		if (navigator.appVersion.match(/iPad/)) {
			this.title = this.config.startTablet;
		} else this.title = this.config.startTitle;
		this.message = this.translate(this.config.startNotification);
		this.timeout();
	},

	offLine: function () {
		this.image = "<i class=\"orangered fa fa-wifi\"></i>";
		this.title = "<span class=\"orangered\">" + this.translate("No Internet connection!") + "</span>";
		this.message = this.translate("Check Wi-Fi connection and router");
		this.timeout();
	},

	timeout: function () {
		var self = this;
		setTimeout(function () {
			self.updateDom();
		}, this.config.timer);
	},

	notificationReceived: function (notification, payload, sender) {
		if (notification === "DOM_OBJECTS_CREATED") {
			this.image = "<i class=\"fa fa-" + this.config.startImage + "\"></i> ";
			if (navigator.appVersion.match(/iPad/)) {
				this.title = this.config.startTablet;
			} else this.title = this.config.startTitle;
			this.message = "Răzvan Cristea &copy; " + moment().year() + ", MIT License.";
			this.updateDom(config.animation);
		}

		if (notification === "ONLINE_NOTIFICATION") {this.onLine();}

		if (notification === "OFFLINE_NOTIFICATION") {this.offLine();}

		if (notification === "NIGHT_NOTIFICATION") {
			this.message = this.translate("Dimmed night mode ") + parseInt(payload) + "%";
			this.timeout();
		}
			
		if (notification === "DAY_NOTIFICATION") {
			if (typeof payload.imageFA === "undefined") {
				this.image = "<i class=\"fa fa-" + this.config.startImage + "\"></i> ";
			} else this.image = "<i class=\"fa fa-" + payload.imageFA + "\"></i> ";

		//	if (typeof payload.imageUrl === "undefined") {
		//		this.image = payload.imageUrl;
		//	}

			if (typeof payload.title === "undefined") {
				payload.title = this.config.startTitle;
			} else this.title = payload.title;

			if (typeof payload.message === "undefined") {
				payload.message = this.translate(this.config.startNotification);
			} else this.message = payload.message;

			if (typeof payload.timer === "undefined") {
				payload.timer = this.config.timer;
			} else this.config.timer = payload.timer;
			this.updateDom(config.animation);
		}
	}
});