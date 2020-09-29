/* Magic Mirror
 *
 * Redesigned by Răzvan Cristea
 * for iPad 3 & HD display
 *
 * https://github.com/hangorazvan
 * Creative Commons BY-NC-SA 4.0, Romania.
 */
Module.register("monthly", {

	defaults: {
		fadeSpeed: config.animation,
		initialLoadDelay: config.delay,
		updateDelay: config.delay,
		specialDay: ""
	},
	
//	getScripts: function() {
//		return ["moment.js"];
//	},

	start: function() {
		Log.info("Starting module: " + this.name);
		moment.locale(config.language);
		this.scheduleUpdate(1/5 * this.config.initialLoadDelay);
	},
	
	scheduleUpdate: function() {
		this.midnight = moment().endOf("day").add(1/5 * this.config.updateDelay, "seconds");
		var self = this;
		setTimeout(function() {
			self.updateDom(this.config.fadeSpeed);
			self.scheduleUpdate();
		}, this.midnight.diff(moment()));
	},

	notificationReceived: function(notification, payload, sender) {
		var self = this;
		if (notification === "CALENDAR_EVENTS") {
			var result = [];
			for (event of payload) {
				var startDate = moment(parseInt(event.startDate));
				var endDate = moment(parseInt(event.endDate));

				result.push({
					startDate: startDate,
					endDate: endDate,
					color: event.color,
					title: event.title
				});
			}
			self.events = result;
			self.loaded = false;

//			Log.log("Calendar events: " + event.title);
			self.updateDom(this.config.fadeSpeed * 0);
		}
	},

	getDom: function() {
		var time = moment();
		if (this.config.monthOffset !== 0) {
			time = time.add(this.config.monthOffset, "months");
		}

		var date = this.config.monthOffset ? 0 : time.date();
		var month = time.month();
		var year = time.year();
		var monthName = time.format("MMMM");
		var monthLength = time.daysInMonth();
		var startingDay = time.date(1).weekday();
		var wrapper = document.createElement("table");
		wrapper.className = this.config.tableClass;

		var header = document.createElement("tHead");
		var headerTR = document.createElement("tr");
		if (this.config.showHeader) {
			var headerTH = document.createElement("th");
			headerTH.colSpan = "7";
			headerTH.scope = "col";
			headerTH.className = "calendar-th";
			var headerMonthSpan = document.createElement("span");
			headerMonthSpan.className = "monthName";
			headerMonthSpan.innerHTML = monthName + " ";
			var headerYearSpan = document.createElement("span");
			headerYearSpan.className = "yearDigits";
			headerYearSpan.innerHTML = year;
			var headerSpace = document.createTextNode(" ");
			headerTH.appendChild(headerMonthSpan);
			headerTH.appendChild(headerSpace);
			headerTH.appendChild(headerYearSpan);
			headerTR.appendChild(headerTH);
		}
		header.appendChild(headerTR);
		wrapper.appendChild(header);
		
		var bodyContent = document.createElement("tBody");
		var bodyTR = document.createElement("tr");
		bodyTR.className = "calendar-header";
		for (var i = 0; i <= 6; i++ ){
			var bodyTD = document.createElement("td");
			bodyTD.className = "calendar-header-day";
			bodyTD.innerHTML = time.weekday(i).format("ddd");
			bodyTR.appendChild(bodyTD);
		}
		bodyContent.appendChild(bodyTR);
		wrapper.appendChild(bodyContent);

		var bodyContent = document.createElement("tBody");
		var bodyTR = document.createElement("tr");
		bodyTR.className = "weekRow";

		var day = 1; var nextMonth = day;
		var special = parseInt(moment(this.config.specialDay, "DD").format("DD"));
		for (var i = 0; i < 9; i++) {
			for (var j = 0; j <= 6; j++) {
				var bodyTD = document.createElement("td");
				bodyTD.className = "calendar-day";
				var squareDiv = document.createElement("div");
				squareDiv.className = "square-box";
				var squareContent = document.createElement("div");
				squareContent.className = "square-content";
				var squareContentInner = document.createElement("div");
				var innerSpan = document.createElement("span");

				if (j < startingDay && i == 0) {
					innerSpan.className = "monthPrev";
					innerSpan.innerHTML = time.subtract(1, "months").endOf("month").subtract((startingDay - 1) - j, "days").date();
				} else if (day <= monthLength && (i > 0 || j >= startingDay)) {

					var dayStarts = time.date(day).startOf("day");
					var dayEnds = time.date(day).endOf("day");
					var dayEvents = (this.events || []).filter(function(event) { 
						return event.startDate.isBetween(dayStarts, dayEnds) || event.endDate.isBetween(dayStarts, dayEnds);
					});
					if (dayEvents.length != 0) {
						innerSpan.className = innerSpan.className + " events";
						innerSpan.style = "--event-count: " + dayEvents.length + "; --event-color: " + dayEvents[0].color;
					}
					if (dayStarts.isSame(time, "day")) {
						innerSpan.className = "events day" + day;
					}
				
					if (day == date) {
						innerSpan.className = "today day" + day;
					} else if (day == special) {
						innerSpan.className = "special day" + day;
					} else {
						innerSpan.className = "daily day" + day;
					}
					innerSpan.innerHTML = day;
					day++;
				} else if (day > monthLength && i > 0) {
					innerSpan.className = "monthNext";
					innerSpan.innerHTML = moment([year, month, monthLength]).add(nextMonth, "days").date();
					nextMonth++;
				}
				squareContentInner.appendChild(innerSpan);
				squareContent.appendChild(squareContentInner);
				squareDiv.appendChild(squareContent);
				bodyTD.appendChild(squareDiv);
				bodyTR.appendChild(bodyTD);
			}
			if (day > monthLength) {
				break;
			} else {
				bodyTR.appendChild(bodyTD);
				bodyContent.appendChild(bodyTR);
				var bodyTR = document.createElement("tr");
				bodyTR.className = "weekRow";
			}
		}

		if (time.add({month:1}).month() == 10) {
			this.config.specialDay = 13;
		} 

		if (time.add({month:1}).month() == 8) {
			this.config.specialDay = 22;
		}
		
		bodyContent.appendChild(bodyTR);
		wrapper.appendChild(bodyContent);
		this.loaded = true;
		return wrapper;
	}
});