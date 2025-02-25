/* Magic Mirror Module
 *
 * Data Loader for Onecall OpenWeatherMap
 *
 * Designed by Răzvan Cristea
 * https://github.com/hangorazvan
 */
Module.register("loader", {
	// Default module config.
	defaults: {
		lat: config.latitude,				// your location latitude,
		lon: config.longitude,				// your location longitude,
		appid: "",
		appid2: "", 						// optional
		backup: config.backup,				// optional backup appid
		dayUpdateInterval: 10 * 60 * 1000, 	// every 10 minutes
		nightUpdateInterval: 30 * 60 * 1000, // every 15 minutes
	},

	getScripts: function () {
		return ["moment.js"];
	},

	start: function () {
		Log.info("Starting module: " + this.name);
		this.OneUpdate();
		this.AirUpdate();
		this.scheduleUpdate();
	},

	OneUpdate: function () {
		if (this.config.appid === "") {
			Log.error("OneCall: APPID not set!");
			return;
		}
		var params = "?lat=" + this.config.lat + "&lon=" + this.config.lon + "&units=" + config.units + "&lang=" + config.language;
		var url = "https://api.openweathermap.org/data/2.5/onecall" + params + "&exclude=minutely" + "&appid=" + this.config.appid;
		var self = this;

		var weatherRequest = new XMLHttpRequest();
		weatherRequest.open("GET", url, true);
		weatherRequest.onreadystatechange = function () {
			if (this.readyState === 4) {
				if (this.status === 200) {
					self.sendNotification("ONE_RESPONSE", JSON.parse(this.response));
				//	Log.info("ONE_RESPONSE", JSON.parse(this.response));
				} else if (this.status === 401 || this.status === 429) {
					self.updateDom(self.config.animationSpeed);
					if (self.config.backup === "") {
						Log.error("Onecall: backup APPID not set!");
						return;
					} else {
						self.config.appid = self.config.backup;
					}
				} else {
					Log.error(self.name + ": Incorrect APPID. Could not load weather.");
				}
			}
		};
		weatherRequest.send();
	},

	AirUpdate: function () {
		var api = this.config.appid2;
		if (this.config.appid2 === ""){
			api = this.config.appid;
			if (this.config.appid === "") {
				Log.error("Air Pollution: APPID not set!");
				return;
			}
		}

		var url = "https://api.openweathermap.org/data/2.5/air_pollution?lat=" + this.config.lat + "&lon=" + this.config.lon + "&appid=" + api;
		var self = this;

		var airRequest = new XMLHttpRequest();
		airRequest.open("GET", url, true);
		airRequest.onreadystatechange = function () {
			if (this.readyState === 4) {
				if (this.status === 200) {
					self.sendNotification("AIR_RESPONSE", JSON.parse(this.response));
				//	Log.info("AIR_RESPONSE", JSON.parse(this.response));
				} else if (this.status === 401 || this.status === 429) {
					self.updateDom(self.config.animationSpeed);
					if (self.config.backup === "") {
						Log.error("Air Pollution: backup APPID not set!");
						return;
					} else {
						self.config.appid = self.config.backup;
					}
				} else {
					Log.error(self.name + ": Incorrect APPID. Could not load Air Pollution.");
				}
			}
		};
		airRequest.send();
	},

	scheduleUpdate: function () {
		var now = moment().format("HH:mm:ss");
		var updateInterval = null;
		var self = this;

		if (now >= "07:00:00" && now <= "23:59:59") {
			updateInterval = this.config.dayUpdateInterval;
		} else {
			updateInterval = this.config.nightUpdateInterval;
		}

		setInterval(function () {
			self.OneUpdate();
			setTimeout(function () {
				self.AirUpdate();
			}, 2000);
		}, updateInterval);
	}
});