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
		var self = this;
		setInterval(function() {
			self.variables();
			self.timer();
			self.dimmer();
			self.notification();
		}, 1000);
	},

	variables: function() {
		this.now = moment().format("HH:mm:ss"); this.date = moment().format("DD.MM mm:ss");
		this.mins = moment().format("m"); this.secs = moment().format("s");
		this.grayscale = this.config.dimming; this.opacity = (1 - this.grayscale / 100).toPrecision(2);

		if (this.config.debugging!==false) {
			this.gray1 = (this.secs * (this.grayscale / 60) / 1).toPrecision(2); 
			this.opac1 = ((1 - this.gray1 / 100) / 1).toPrecision(2);
			this.gray2 = ((this.grayscale - this.gray1) / 1).toPrecision(2);
			this.opac2 = ((1 - this.gray2 / 100) / 1).toPrecision(2);
			this.night = moment().endOf("d").add(this.config.debugging,"h").format("HH:mm:ss");
			this.midnight = moment().startOf("d").add(this.config.debugging,"h").format("HH:mm:ss");
			this.morning = moment().startOf("d").add(this.config.debugging + 2,"h").format("HH:mm:ss");
			this.after = moment().startOf("d").add(this.config.debugging + 3,"h").format("HH:mm:ss");
			Log.log("Dimmer Night " + this.night + " Midnight " + this.midnight + " Before " + this.before + " Morning " + this.morning + " After " + this.after);
			Log.log("Dimmer Opacity 1: " + this.opac1 + ", Grayscale 1: " + this.gray1 + ", Opacity 2: " + this.opac2 + ", Grayscale 2: " + this.gray2);
		} else {
			this.gray1 = (this.mins * this.grayscale / 60).toPrecision(4);
			this.opac1 = (1 - this.gray1 / 100).toPrecision(2);
			this.gray2 = (this.grayscale - this.gray1).toPrecision(4);
			this.opac2 = (1 - this.gray2 / 100).toPrecision(2);
			this.night = moment().endOf("d").format("HH:mm:ss");
			this.midnight = moment().startOf("d").format("HH:mm:ss");
			this.before = moment().startOf("d").subtract(1,"h").format("HH:mm:ss");
			this.morning = moment().startOf("d").add(6,"h").format("HH:mm:ss");
			this.after = moment().startOf("d").add(7,"h").format("HH:mm:ss");
			this.winter = moment().format("MM");
			if ((this.winter >= "01" && this.winter <= "03") || (this.winter >= "10" && this.winter <= "12")) {
				this.morning = this.morning + 1; this.after = this.after + 1;
			}
		}
	},

	timer: function() { var self = this; 
		var now = this.now; var midnight = this.midnight; var morning = this.morning;
		var hide = Array.from(document.querySelectorAll(".module:not(.night)"));
		var icon = Array.from(document.querySelectorAll(".wicon"));
		var weat = Array.from(document.querySelectorAll(".currentweather"));
		var comp = Array.from(document.querySelectorAll(".pre-line"));
		var body = Array.from(document.querySelectorAll("body"));

		body.forEach(function(element) {return element.style.minHeight = window.innerHeight / (window.innerWidth / self.config.bodysize) + "px", element.style.minWidth = self.config.bodysize + "px"});

		if (window.innerWidth < this.config.bodysize) { day_mode(); body.forEach(function(element) {return element.style.transform = "scale(" + window.innerWidth / self.config.bodysize + ")"});
			if (this.config.nightMode) {
				if (now >= midnight && now < morning) { night_mode();
					body.forEach(function(element) {return element.style.transform = "scale(" + window.innerWidth / self.config.bodysize * 1.55 + ")"})
				} else { day_mode(); body.forEach(function(element) {return element.style.transform = "scale(" + window.innerWidth / self.config.bodysize + ")"})}
			}
		} else { day_mode(); body.forEach(function(element) {return element.style.transform = "scale(1)"})}

		function day_mode() {
			hide.forEach(function(element) {element.style.display = "inherit";}); icon.forEach(function(element) {element.style.float = "left"});
			weat.forEach(function(element) {return element.style.transform = "translate(0, 0)", element.style.textAlign = "inherit"});
			comp.forEach(function(element) {return element.style.width = "inherit", element.style.transform = "scale(1)"});
		}

		function night_mode() {
			hide.forEach(function(element) {element.style.display = "none"}); icon.forEach(function(element) {element.style.float = "right"});
			weat.forEach(function(element) {return element.style.transform = "translate(-720px, 280px)", element.style.textAlign = "left"});
			comp.forEach(function(element) {return element.style.width = "600px", element.style.transform = "translateY(-80px) scale(0.5)"});
		}
	},

	dimmer: function() {
		var now = this.now; var grayscale = this.grayscale; var opacity = this.opacity;
		var gray1 = this.gray1; var gray2 = this.gray2; var opac1 = this.opac1;
		var opac2 = this.opac2; var night = this.night; var midnight = this.midnight;
		var morning = this.morning; var before = this.before; var after = this.after;
		var body = Array.from(document.querySelectorAll("body"));

		if (this.config.nightMode) {
			if (this.config.dimmMode) {
				if (this.config.fadeMode) {
					if (now >= before && now < night) {
						body.forEach(function(element) {return element.style.opacity = opac1, element.style.filter = "grayscale(" + gray1 + "%)"})
						this.sendNotification("NIGHT_NOTIFICATION", this.opac1)
					} else if (now >= midnight && now < morning) {
						body.forEach(function(element) {return element.style.opacity = opacity, element.style.filter = "grayscale(" + grayscale + "%)"})
					} else if (now >= morning && now < after) {
						body.forEach(function(element) {return element.style.opacity = opac2, element.style.filter = "grayscale(" + gray2 + "%)"})
						this.sendNotification("NIGHT_NOTIFICATION", this.opac2)
					} else { body.forEach(function(element) {return element.style.opacity = "1", element.style.filter = "grayscale(0%)"})}
				} else { if (now >= midnight && now < morning) {
						body.forEach(function(element) {return element.style.opacity = opacity, element.style.filter = "grayscale(" + grayscale + "%)"})
					} else {body.forEach(function(element) {return element.style.opacity = "1", element.style.filter = "grayscale(0%)"})}
				}
			}
		}
	},

	notification: function() {
		now = this.now; date = this.date; mins = this.mins; secs = this.secs;

		if (secs == "15" || secs == "35" || secs == "55") {
			if (window.navigator.onLine === true) {this.sendNotification("ONLINE_NOTIFICATION")}
			else if (window.navigator.onLine === false) {this.sendNotification("OFFLINE_NOTIFICATION")}
		}

		if (this.config.sharpMode) {
			if ((now == "23:00:00") || (now == "00:00:00") || (now == "01:00:00")) {
				this.sendNotification("DAY_NOTIFICATION", {title: "<i class=\"far fa-bell lime\"></i> " + this.translate("Time it was ") + moment().format("H:mm"), notification: this.translate("Good night!")})
			} else if (now == "02:00:00" || now == "03:00:00" || now == "04:00:00") {
				this.sendNotification("DAY_NOTIFICATION", {title: "<i class=\"far fa-bell lime\"></i> " + this.translate("Time it was ") + moment().format("H:mm"), notification: this.translate("Sleep well!")})
			} else if (now == "05:00:00" || now == "06:00:00" || now == "07:00:00" || now == "08:00:00" || now == "09:00:00" || now == "10:00:00" || now == "11:00:00") {
				this.sendNotification("DAY_NOTIFICATION", {title: "<i class=\"far fa-bell lime\"></i> " + this.translate("Time it was ") + moment().format("H:mm"), notification: this.translate("Good morning!")})
			} else if (now == "12:00:00" || now == "13:00:00" || now == "14:00:00") {
				this.sendNotification("DAY_NOTIFICATION", {title: "<i class=\"far fa-bell lime\"></i> " + this.translate("Time it was ") + moment().format("H:mm"), notification: this.translate("Bon appetit!")})
			} else if (now == "15:00:00" || now == "16:40:00" || now == "17:00:00") {
				this.sendNotification("DAY_NOTIFICATION", {title: "<i class=\"far fa-bell lime\"></i> " + this.translate("Time it was ") + moment().format("H:mm"), notification: this.translate("Have a nice day!")})
			} else if (now == "18:00:00" || now == "19:00:00" || now == "20:00:00" || now == "21:00:00" || now == "22:00:00") {
				this.sendNotification("DAY_NOTIFICATION", {title: "<i class=\"far fa-bell lime\"></i> " + this.translate("Time it was ") + moment().format("H:mm"), notification: this.translate("Have a nice evening!")})
			}
		}

		if (this.config.dateMode) { 
			if (date == "25.12 00:06" || date == "26.12 00:06" || date == "09.10 05:06") {
				this.sendNotification("DAY_NOTIFICATION", {title: "<i class=\"fa fa-gifts yellow\"></i> " + this.translate("Marry Christmas!"), notification: this.translate("Happy holidays with many joys!"), timer: 9000})
			} else if (date == "01.01 00:06" || date == "02.01 00:06") {
				this.sendNotification("DAY_NOTIFICATION", {title: "<i class=\"fa fa-glass-cheers yellow\"></i> " + this.translate("Happy New Year ") + moment().format("YYYY") + "!", notification: this.translate("A good new year and good health!"), timer: 9000})
			} else if (date == "14.02 00:06") {
				this.sendNotification("DAY_NOTIFICATION", {title: "<i class=\"far fa-heart orangered\"></i> " + "Happy Valentine's Day!", notification: this.translate("Happy Valentine's Day!"), timer: 9000})
			} else if (date == this.config.birthday1 + " 00:06") {
				this.sendNotification("DAY_NOTIFICATION", {title: "<i class=\"fa fa-birthday-cake yellow\"></i> " + this.translate("Happy Birthday, ") + this.config.name1, notification: this.translate("Good health and be happy! F"), timer: 9000})
			} else if (date == this.config.birthday2 + " 00:06") {
				this.sendNotification("DAY_NOTIFICATION", {title: "<i class=\"fa fa-birthday-cake yellow\"></i> " + this.translate("Happy Birthday, ") + this.config.name2, notification: this.translate("Good health and be happy! M"), timer: 9000})
			} else if (date == this.config.birthday3 + " 00:06") {
				this.sendNotification("DAY_NOTIFICATION", {title: "<i class=\"fa fa-birthday-cake yellow\"></i> " + this.translate("Happy Birthday, ") + this.config.name3, notification: this.translate("Good health and be happy! M"), timer: 9000})
			}
		}
	},
});