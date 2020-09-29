/* Magic Mirror
 *
 * MIT Licensed.
 *
 * Redesigned by Răzvan Cristea
 * for iPad 3 & HD display
 * https://github.com/hangorazvan
 */
Module.register("timer", {
	defaults: {
		debugging: false
	},

//	getScripts: function() {
//		return ["moment.js"];
//	},


//	getStyles: function () {
//		return ["font-awesome.css"];
//	},

	getTranslations: function() {
		return {
			en: "en.json",
			ro: "ro.json"
		};
	},

	start: function() {
		Log.info("Starting module: " + this.name);
		var self = this;
		setInterval(function() {
			self.timer();
			self.notification();
			if (this.config.debugging!==false) {
				self.dimmer();	
			}
		}, 1000); self.dimmer();
		setInterval(function() {
			self.dimmer();
		}, 60 * 1000);
	},

	timer: function() {
		var self = this;
		var now = moment().format("HH:mm:ss");

		if (this.config.debugging!==false) {
			midnight = moment().startOf("d").add(this.config.debugging,"h").format("HH:mm:ss");
			morning = moment().startOf("d").add(this.config.debugging + 1,"h").format("HH:mm:ss");
			Log.log("Timer start & end points - Midnight " + midnight + " Morning " + morning);
		} else { midnight = moment().startOf("d").format("HH:mm:ss");
			morning = moment().startOf("d").add(6,"h").format("HH:mm:ss");
			var winter = moment().format("M");
			if ((winter >= "1" && winter <= "3") || (winter >= "11" && winter <= "12")) {
				morning = morning + 1;
			}
		}

		var hide = Array.from(document.querySelectorAll(".module:not(.clock):not(.currentweather):not(.compliments):not(.swatch):not(.connection)"));
		var icon = Array.from(document.querySelectorAll(".wicon"));
		var weat = Array.from(document.querySelectorAll(".currentweather"));
		var comp = Array.from(document.querySelectorAll(".pre-line"));
		var beat = Array.from(document.querySelectorAll(".swatch"));
		var body = Array.from(document.querySelectorAll("body"));

		body.forEach(function(element) {
			return element.style["min-height"] = window.innerHeight / (window.innerWidth / self.config.bodysize) + "px",
			element.style["min-width"] = self.config.bodysize + "px";
		});

		if (window.innerWidth < this.config.bodysize) { day_mode();
			body.forEach(function(element) {element.style.transform = "scale(" + window.innerWidth / self.config.bodysize + ")";});

			if (this.config.nightMode) { if (now >= midnight && now < morning) { night_mode();
					body.forEach(function(element) {element.style.transform = "scale(" + window.innerWidth / self.config.bodysize * 1.55 + ")";});
				} else { day_mode();
					body.forEach(function(element) {element.style.transform = "scale(" + window.innerWidth / self.config.bodysize + ")";});
				}
			}
		} else { day_mode();
			body.forEach(function(element) {element.style.transform = "scale(1)";});
		}

		function day_mode() {
			hide.forEach(function(element) {return element.style.opacity = "1";});
			icon.forEach(function(element) {return element.style.float = "left";});
			weat.forEach(function(element) {return element.style.transform = "translate(0, 0)",
				element.style.textAlign = "inherit", element.style.transition = "translate 1s ease";});
			comp.forEach(function(element) {return element.style.width = "inherit",
				element.style.transform = "scale(1)";});
			beat.forEach(function(element) {return element.style.transform = "translateY(0)",
				element.style.transition = "translate 1s ease";});
		}

		function night_mode() {
			hide.forEach(function(element) {return element.style.opacity = "0";});
			icon.forEach(function(element) {return element.style.float = "right";});
			weat.forEach(function(element) {return element.style.transform = "translate(-720px, 280px)",
				element.style.textAlign = "left", element.style.transition = "translate 1s ease";});
			comp.forEach(function(element) {return element.style.width = "600px",
				element.style.transform = "translateY(-80px) scale(0.5)";});
			beat.forEach(function(element) {return element.style.transform = "translateY(-15px)",
				element.style.transition = "translate 1s ease";});
		}
	},

	dimmer: function() {
		var now = moment().format("HH:mm:ss");
		var mins = moment().format("m");
		var secs = moment().format("s");
		var grayscale = this.config.dimming;
		var opacity = (1-grayscale/100).toPrecision(2);
		var body = Array.from(document.querySelectorAll("body"));

		if (this.config.debugging!==false) {
			night=midnight=moment().startOf("d").add(this.config.debugging,"h").format("HH:mm:ss");
			before = moment().startOf("d").add(this.config.debugging - 1,"h").format("HH:mm:ss");
			morning = moment().startOf("d").add(this.config.debugging + 1,"h").format("HH:mm:ss");
			after = moment().startOf("d").add(this.config.debugging + 2,"h").format("HH:mm:ss");
			gray1 = (secs*(grayscale/60)/1).toPrecision(2); opac1 = ((1-gray1/100)/1).toPrecision(2);
			gray2 = ((grayscale-gray1)/1).toPrecision(2); opac2 = ((1-gray2/100)/1).toPrecision(2);
			Log.log("Dimmer Night "+night+" Midnight "+midnight+" Before "+before+" Morning "+morning+" After "+after);
			Log.log("Dimmer Opacity 1: "+opac1+", Grayscale 1: "+gray1+", Opacity 2: "+opac2+", Grayscale 2: "+gray2);
		} else { gray1 = (mins*grayscale/60).toPrecision(4); opac1 = (1-gray1/100).toPrecision(2);
			gray2 = (grayscale-gray1).toPrecision(4); opac2 = (1-gray2/100).toPrecision(2);
			night = moment().endOf("d").format("HH:mm:ss"); midnight = moment().startOf("d").format("HH:mm:ss");
			before = moment().startOf("d").subtract(1,"h").format("HH:mm:ss");
			morning = moment().startOf("d").add(6,"h").format("HH:mm:ss");
			after = moment().startOf("d").add(7,"h").format("HH:mm:ss"); var winter = moment().format("M");
			if ((winter >= "1" && winter <= "3") || (winter >= "11" && winter <= "12")) {
				morning = morning + 1; after = after + 1;
			}
		}

		if (this.config.dimmMode) {
			if (this.config.fadeMode) {
				if (now >= before && now < night) {
					body.forEach(function(element) {return element.style.opacity = opac1, element.style.filter = "grayscale(" + gray1 + "%)";});
				} else if (now >= midnight && now < morning) {
					body.forEach(function(element) {return element.style.opacity = opacity, element.style.filter = "grayscale(" + grayscale + "%)";});
				} else if (now >= morning && now < after) {
					body.forEach(function(element) {return element.style.opacity = opac2, element.style.filter = "grayscale(" + gray2 + "%)";});
				} else {
					body.forEach(function(element) {return element.style.opacity = "1", element.style.filter = "grayscale(0%)";});
				}
			} else { if (now >= midnight && now < morning) {
					body.forEach(function(element) {return element.style.opacity = opacity, element.style.filter = "grayscale(" + grayscale + "%)";});
				} else {
					body.forEach(function(element) {return element.style.opacity = "1", element.style.filter = "grayscale(0%)";});
				}
			}
		}
	},

	notification: function() {
		var now = moment().format("HH:mm:ss");
		var date = moment().format("DD.MM mm:ss");
		var secs = moment().format("s");
		var ns_box = Array.from(document.querySelectorAll(".ns-box"));
		
		if (secs >= 58) { //not working this.sendNotification("HIDE_ALERT", {});
			ns_box.forEach(function(element) {element.style.display = "none";});
		}

		if (this.config.sharpMode) {
			if ((now == "23:00:00") || (now == "00:00:00") || (now == "01:00:00")) {
				this.sendNotification("SHOW_ALERT", {
					type: "notification", title: "<i class=\"far fa-bell lime\"></i> " + this.translate("Sharp hour!"),
					message: this.translate("Time it was ") + moment().format("H:mm") + "<br>" + this.translate("Good night!")
				});
			} else if ((now == "02:00:00") || (now == "03:00:00") || (now == "04:00:00")) {
				this.sendNotification("SHOW_ALERT", {
					type: "notification", title: "<i class=\"far fa-bell lime\"></i> " + this.translate("Sharp hour!"),
					message: this.translate("Time it was ") + moment().format("H:mm") + "<br>" + this.translate("Sleep well!")
				});
			} else if ((now == "05:00:00") || (now == "06:00:00") || (now == "07:00:00") || (now == "08:00:00") || 
				(now == "09:00:00") || (now == "10:00:00") || (now == "11:00:00")) {
				this.sendNotification("SHOW_ALERT", {
					type: "notification", title: "<i class=\"far fa-bell lime\"></i> " + this.translate("Sharp hour!"),
					message: this.translate("Time it was ") + moment().format("H:mm") + "<br>" + this.translate("Good morning!")
				});
			} else if ((now == "12:00:00") || (now == "13:00:00") || (now == "14:00:00")) {
				this.sendNotification("SHOW_ALERT", {
					type: "notification", title: "<i class=\"far fa-bell lime\"></i> " + this.translate("Sharp hour!"),
					message: this.translate("Time it was ") + moment().format("H:mm") + "<br>" + this.translate("Bon appetit!")
				});
			} else if ((now == "15:00:00") || (now == "16:00:00") || (now == "17:00:00")) {
				this.sendNotification("SHOW_ALERT", {
					type: "notification", title: "<i class=\"far fa-bell lime\"></i> " + this.translate("Sharp hour!"),
					message: this.translate("Time it was ") + moment().format("H:mm") + "<br>" + this.translate("Have a nice day!")
				});
			} else if ((now == "18:00:00") || (now == "19:00:00") || (now == "20:00:00") || (now == "21:00:00") || (now == "22:00:00")) {
				this.sendNotification("SHOW_ALERT", {
					type: "notification", title: "<i class=\"far fa-bell lime\"></i> " + this.translate("Sharp hour!"),
					message: this.translate("Time it was ") + moment().format("H:mm") + "<br>" + this.translate("Have a nice evening!")
				});
			}
		}

		if (this.config.dateMode) { 
			if ((date == "25.12 00:06") || (date == "26.12 00:06")) {
				this.sendNotification("SHOW_ALERT", { type: "notification", timer: 8000, 
					title: "<i class=\"fa fa-gifts yellow\"></i> " + this.translate("Marry Christmas!"),
					message: this.translate("Happy holidays with many joys!")
				});
			} else if ((date == "01.01 00:06") || (date == "02.01 00:06")) {
				this.sendNotification("SHOW_ALERT", { type: "notification", timer: 8000, 
					title: "<i class=\"fa fa-glass-cheers yellow\"></i> " + this.translate("Happy Birthday ") + moment().format("YYYY") + "!", 
					message: this.translate("A new year as good as possible and good health!")
				});
			} else if (date == "14.02 00:06") {
				this.sendNotification("SHOW_ALERT", { type: "notification", timer: 8000, 
					title: "<i class=\"far fa-heart redrf\"></i> " + this.translate("Happy Valentine's Day!"),
					message: this.translate("Happy Valentine's and much happiness!")
				});
			} else if (date == this.config.Birthday1 + " 00:06") {
				this.sendNotification("SHOW_ALERT", { type: "notification", timer: 8000, 
					title: "<i class=\"fa fa-birthday-cake yellow\"></i> " + this.translate("Happy Birthday, ") + this.config.Name1, 
					message: this.translate("Good health and be happy! F")
				});
			} else if (date == this.config.Birthday2 + " 00:06") {
				this.sendNotification("SHOW_ALERT", { type: "notification", timer: 8000,
					title: "<i class=\"fa fa-birthday-cake yellow\"></i> " + this.translate("Happy Birthday, ") + this.config.Name2, 
					message: this.translate("Good health and be happy! M")
				});
			} else if (date == this.config.Birthday3 + " 00:06") {
				this.sendNotification("SHOW_ALERT", { type: "notification", timer: 8000, 
					title: "<i class=\"fa fa-birthday-cake yellow\"></i> " + this.translate("Happy Birthday, ") + this.config.Name3, 
					message: this.translate("Good health and be happy! M")
				});
			}
		}
	}
});