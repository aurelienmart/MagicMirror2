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

	getScripts: function () {
		return ["moment.js"];
	},

	getStyles: function () {
		return ["font-awesome.css"];
	},

	getTranslations: function () {
		return {
			en: "../en.json",
			ro: "../ro.json"
		};
	},

	start: function () {
		Log.info("Starting module: " + this.name);
	},

	notificationReceived: function (notification, payload, sender) {
		if (notification === "ALL_MODULES_STARTED") {
			var self = this;
			setInterval(function () {
				self.variables();
				self.timer();
				self.dimmer();
				self.notification();
			}, 1000)
		}
	},

	variables: function () {
		this.now = moment().format("HH:mm:ss"); 
		this.date = moment().format("DD.MM mm:ss");
		this.mins = moment().format("m"); 
		this.secs = moment().format("s"); 
		this.grayscale = this.config.dimming; 
	//	this.opacity = (1 - this.grayscale / 100).toPrecision(2);

		if (this.config.debugging!==false) { config.notification = true;
			this.gray1 = (this.secs * (this.grayscale / 60) / 1).toPrecision(2); 
			this.gray2 = ((this.grayscale - this.gray1) / 1).toPrecision(2);
			this.night = moment().endOf("d").add(this.config.debugging,"h").format("HH:mm:ss");
			this.midnight = moment().startOf("d").add(this.config.debugging,"h").format("HH:mm:ss");
			this.before = moment().startOf("d").add(this.config.debugging - 1,"h").format("HH:mm:ss");
			this.morning = moment().startOf("d").add(this.config.debugging + 1,"h").format("HH:mm:ss");
			this.after = moment().startOf("d").add(this.config.debugging + 2,"h").format("HH:mm:ss");
			Log.log("Dimmer Night " + this.night + " Midnight " + this.midnight + " Before " 
				+ this.before + " Morning " + this.morning + " After " + this.after);
			Log.log("Dimmer Opacity 1: " + this.opac1 + ", Grayscale 1: " + this.gray1 
				+ ", Opacity 2: " + this.opac2 + ", Grayscale 2: " + this.gray2);
		} else {
			this.gray1 = (this.mins * this.grayscale / 60).toPrecision(4);
			this.gray2 = (this.grayscale - this.gray1).toPrecision(4);
			this.night = moment().endOf("d").format("HH:mm:ss");
			this.midnight = moment().startOf("d").format("HH:mm:ss");
			this.before = moment().startOf("d").subtract(1,"h").format("HH:mm:ss");
			this.morning = moment().startOf("d").add(6,"h").format("HH:mm:ss");
			this.after = moment().startOf("d").add(7,"h").format("HH:mm:ss");
			this.weekday = moment().format("E"); this.winter = moment().format("MM");
			if ((this.winter >= "01" && this.winter <= "03") || (this.winter >= "10" && this.winter <= "12")) {
				this.morning = moment().startOf("d").add(7,"h").format("HH:mm:ss");
				this.after = moment().startOf("d").add(8,"h").format("HH:mm:ss");
			}
		}
	},

	timer: function () {
		var now = this.now; var size = this.config.bodysize; 
		var hide = Array.from(document.querySelectorAll(".module:not(.night)"));
		var show = Array.from(document.querySelectorAll(".day"));
		var weat = Array.from(document.querySelectorAll(".weather"));
		var comp = Array.from(document.querySelectorAll(".complimentz"));
		var fish = Array.from(document.querySelectorAll(".yframe"));
		var body = Array.from(document.querySelectorAll("body"));

		if (window.innerWidth <= size) {
			if (this.config.zoomMode) {
				if (navigator.appVersion.match(/iPad/)) {
					if (now >= this.midnight && now < this.morning) { 
						night_mode(); } else { day_mode(); 
					}
				} else { day_mode(); }
			} else { resize(); }
		}

		function resize() {
			body.forEach(function(element) {return element.style.minHeight = window.innerHeight / (window.innerWidth / size) + "px", element.style.minWidth = size + "px", element.style.transform = "scale(" + window.innerWidth / size + ")";});
		}

		function scaling() {
			body.forEach(function(element) {return element.style.minHeight = window.innerHeight / (window.innerWidth / size) + "px", element.style.minWidth = size + "px", element.style.transform = "scale(" + window.innerWidth / size * 1.53 + ")";});
		}

		function day_mode() { resize();
			weat.forEach(function(element) {return element.style.transform = "translate(0, 0)", element.style.textAlign = "inherit";});
			comp.forEach(function(element) {return element.style.width = "inherit", element.style.transform = "scale(1)";});
			show.forEach(function(element) {return element.style.filter = "opacity(1)", element.style.position = "static";});
		//	fish.forEach(function(element) {return element.style.filter = "opacity(0)", element.style.position = "fixed";});
		}

		function night_mode() { scaling();
			hide.forEach(function(element) {return element.style.filter = "opacity(0)", element.style.position = "fixed";}); 
			weat.forEach(function(element) {return element.style.transform = "translate(-715px, 250px)", element.style.textAlign = "left";});
			comp.forEach(function(element) {return element.style.width = "500px", element.style.transform = "translateY(-100%) scale(0.6)";});
		//	fish.forEach(function(element) {return element.style.filter = "opacity(1)", element.style.position = "static";});
		}
	},

	dimmer: function () {
		var self = this; var now = this.now; 
		var grayscale = this.grayscale;
		var gray1 = this.gray1; var gray2 = this.gray2; 
		var body = Array.from(document.querySelectorAll("body"));
		var above = Array.from(document.querySelectorAll(".above"));
		var below = Array.from(document.querySelectorAll(".below"));

		if (this.config.background) {
			below.forEach(function(element) {return element.style.backgroundImage = "url(" + self.config.background + ")", element.style.backgroundSize = "cover";});
		}

		if (this.config.monochrome) {
			body.forEach(function(element) {return element.style.filter = "grayscale(" + self.config.monochrome +"%)";});
			this.config.nightMode = false;
		}

		if (this.config.nightMode) {
			if (this.config.fadeMode) {
				if (now >= this.before && now < this.night) {
					body.forEach(function(element) {return element.style.filter = "grayscale(" + gray1 + "%)";});
					above.forEach(function(element) {return element.style.background = "black", element.style.filter = "opacity(" + gray1 + "%)";});
					this.sendNotification("NIGHT_NOTIFICATION", gray1);
				} else if (now >= this.midnight && now < this.morning) {
					body.forEach(function(element) {return element.style.filter = "grayscale(" + grayscale + "%)";});
					above.forEach(function(element) {return element.style.background = "black", element.style.filter = "opacity(" + grayscale + "%)";});
					this.sendNotification("NIGHT_NOTIFICATION", grayscale);
				} else if (now >= this.morning && now < this.after) {
					body.forEach(function(element) {return element.style.filter = "grayscale(" + gray2 + "%)";});
					above.forEach(function(element) {return element.style.background = "black", element.style.filter = "opacity(" + gray2 + "%)";});
					this.sendNotification("NIGHT_NOTIFICATION", gray2);
				} else {
					body.forEach(function(element) {return element.style.filter = "grayscale(0)";});
					above.forEach(function(element) {return element.style.background = "transparent", element.style.filter = "opacity(1)";});
				}
			} else { if (now >= this.midnight && now < this.morning) {
					body.forEach(function(element) {return element.style.filter = "grayscale(" + grayscale + "%)";});
					above.forEach(function(element) {return element.style.background = "black", element.style.filter = "opacity(" + grayscale + "%)";});
					this.sendNotification("NIGHT_NOTIFICATION", grayscale);
				} else {
					body.forEach(function(element) {return element.style.filter = "grayscale(0)";});
					above.forEach(function(element) {return element.style.background = "transparent", element.style.filter = "opacity(1)";});
				}
			}
		}
	},

	notification: function () {
		var self = this; var now = this.now; var date = this.date; 
		var sharp = this.translate("Time it was ") + moment().format("H:mm");
		var bell = "bell lime ";
		var gift = "gifts yellow ";
		var glas = "glass-cheers yellow ";
		var hart = "heart orangered ";
		var cake = "birthday-cake yellow ";

		if (now >= this.after && now < this.before) {
			OnLine();
		} else if (this.secs == "58") {
			OnLine();
		}

		function OnLine() {
			if (navigator.onLine == true) {
				self.sendNotification("ONLINE_NOTIFICATION");
			} else if (navigator.onLine == false) {
				self.sendNotification("OFFLINE_NOTIFICATION");
			}
		}

		if (this.config.sharpMode) {
			if ((now == "23:00:00") || (now == "00:00:00") || (now == "01:00:00")) {
				this.sendNotification("DAY_NOTIFICATION", {imageFA: bell, title: sharp, message: this.translate("Good night!"), timer: 8000});
			} else if (now == "02:00:00" || now == "03:00:00" || now == "04:00:00") {
				this.sendNotification("DAY_NOTIFICATION", {imageFA: bell, title: sharp, message: this.translate("Sleep well!"), timer: 8000});
			} else if (now == "05:00:00" || now == "06:00:00" || now == "07:00:00" ||
				now == "08:00:00" || now == "09:00:00" || now == "10:00:00" || now == "11:00:00") {
				this.sendNotification("DAY_NOTIFICATION", {imageFA: bell, title: sharp, message: this.translate("Good morning!"), timer: 8000});
			} else if (now == "12:00:00" || now == "13:00:00" || now == "14:00:00") {
				this.sendNotification("DAY_NOTIFICATION", {imageFA: bell, title: sharp, message: this.translate("Bon appetit!"), timer: 8000});
			} else if (now == "15:00:00" || now == "16:40:00" || now == "17:00:00") {
				this.sendNotification("DAY_NOTIFICATION", {imageFA: bell, title: sharp, message: this.translate("Have a nice day!"), timer: 8000});
			} else if (now == "18:00:00" || now == "19:00:00" || now == "20:00:00" || now == "21:00:00" || now == "22:00:00") {
				this.sendNotification("DAY_NOTIFICATION", {imageFA: bell, title: sharp, message: this.translate("Have a nice evening!"), timer: 8000});
			}
		}

		if (this.config.dateMode) { 
			if (date == "25.12 00:10" || date == "26.12 00:10") {
				this.sendNotification("DAY_NOTIFICATION", {imageFA: gift, title: this.translate("Marry Christmas!"), message: this.translate("Happy holidays with many joys!"), timer: 14000});
			} else if (date == "01.01 00:10" || date == "02.01 00:10") {
				this.sendNotification("DAY_NOTIFICATION", {imageFA: glas, title: this.translate("Happy New Year ") + moment().format("YYYY") + "!", message: this.translate("A good new year and good health!"), timer: 14000});
			} else if (date == "14.02 00:10") {
				this.sendNotification("DAY_NOTIFICATION", {imageFA: hart, title: "Happy Valentine's Day!", message: this.translate("Happy Valentine's Day!"), timer: 14000});
			} else if (date == this.config.birthday1 + " 00:10") {
				this.sendNotification("DAY_NOTIFICATION", {imageFA: cake, title: this.translate("Happy Birthday, ") + this.config.name1, message: this.translate("Good health and be happy! F"), timer: 14000});
			} else if (date == this.config.birthday2 + " 00:10") {
				this.sendNotification("DAY_NOTIFICATION", {imageFA: cake, title: this.translate("Happy Birthday, ") + this.config.name2, message: this.translate("Good health and be happy! M"), timer: 14000});
			} else if (date == this.config.birthday3 + " 00:10") {
				this.sendNotification("DAY_NOTIFICATION", {imageFA: cake, title: this.translate("Happy Birthday, ") + this.config.name3, message: this.translate("Good health and be happy! M"), timer: 14000});
			}
		}

		if (this.config.resetMM) {
			if (now == "03:59:58") {location.reload();}
		}
	}
});