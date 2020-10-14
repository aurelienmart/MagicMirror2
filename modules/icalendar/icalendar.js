/* Magic Mirror
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * Redesigned by Răzvan Cristea
 * for iPad 3 & HD display
 * https://github.com/hangorazvan
 */
var config = {
	lang: "ro",
	calendar: {
		maximumEntries: 14,
		defaultSymbol: "calendar",
		displaySymbol: true,
		urls: [
			{
				symbol: "calendar-check-o",
				url: "https://calendar.google.com/calendar/ical/ro.romanian%23holiday%40group.v.calendar.google.com/public/basic.ics"
			},
		]
	}
};

var calendar = {
	eventList: [],
	calendarLocation: "icalendar",
	updateInterval: 1000,
	updateDataInterval: 60 * 1000,
	fadeInterval: 2000,
	fade: 1,
	intervalId: null,
	dataIntervalId: null,
	maximumEntries: config.calendar.maximumEntries || 52,
	calendarUrl: (typeof config.calendar.urls == "undefined") ? config.calendar.url : config.calendar.urls[0].url,
	calendarPos: 0,
	defaultSymbol: config.calendar.defaultSymbol || "calendar",
	calendarSymbol: (typeof config.calendar.urls == "undefined") ? config.calendar.defaultSymbol || "none" : config.calendar.urls[0].symbol,
	displaySymbol: (typeof config.calendar.displaySymbol == "undefined") ? false : config.calendar.displaySymbol,
	shortRunningText: "încă", // still
	longRunningText: "până",  // until
};

$.fn.updateWithText = function(text, speed, force)
{
	var dummy = $("<span/>").html(text);
	if (force || ($(this).html() != dummy.html()))
	{
		$(this).fadeOut(speed/2, function(){
			$(this).html(text);
			$(this).fadeIn(speed/2, function(){
			});
		});
	}
};
$(document).ready(function($){
	var eventList = [];
	moment.locale(config.lang);
	calendar.init();
});
calendar.processEvents = function(url, events){
	tmpEventList = [];
	var eventListLength = this.eventList.length;
	for (var i = 0; i < eventListLength; i++){
		if (this.eventList[i]["url"] != url){
			tmpEventList.push(this.eventList[i]);
		}
	}
	this.eventList = tmpEventList;
	for (var i in events){
		var e = events[i];
		for (var key in e){
			var value = e[key];
			var seperator = key.search(";");
			if (seperator >= 0){
				var mainKey = key.substring(0,seperator);
				var subKey = key.substring(seperator+1);
				var dt;
				if (subKey == "VALUE=DATE"){
					dt = new Date(value.substring(0,4), value.substring(4,6) - 1, value.substring(6,8));
				} else {
					dt = new Date(value.substring(0,4), value.substring(4,6) - 1, value.substring(6,8), value.substring(9,11), value.substring(11,13), value.substring(13,15));
				}
				if (mainKey == "DTSTART") e.startDate = dt;
				if (mainKey == "DTEND") e.endDate = dt;
			}
		}
		if (e.startDate == undefined){
			var days = moment(e.DTSTART).diff(moment(), "days");
			var seconds = moment(e.DTSTART).diff(moment(), "seconds");
			var startDate = moment(e.DTSTART);
			var endDays = moment(e.DTEND).diff(moment(), "days");
			var endSeconds = moment(e.DTEND).diff(moment(), "seconds");
			var endDate = moment(e.DTEND);
		} else {
			var days = moment(e.startDate).diff(moment(), "days");
			var seconds = moment(e.startDate).diff(moment(), "seconds");
			var startDate = moment(e.startDate);
			var endDays = moment(e.endDate).diff(moment(), "days");
			var endSeconds = moment(e.endDate).diff(moment(), "seconds");
			var endDate = moment(e.endDate);
		}
		if (seconds >= 0){
			if (seconds <= 60*60*5 || seconds >= 60*60*24*2){
//				var time_string = moment(startDate).fromNow(); // remaining hours
				var time_string = moment(startDate).from(moment().format("YYYYMMDD")).replace("peste o zi", "mâine").replace("in a day", "Tomorrow").replace(" la 0:00", "");
			} else {
//				var time_string = moment(startDate).calendar(); // remaining hours
				var time_string = moment(startDate).calendar().replace("peste o zi", "mâine").replace("in a day", "Tomorrow").replace("la 0:00", "");
			}
			if (!e.RRULE){
				this.eventList.push({"description":e.SUMMARY,"seconds":seconds,"days":time_string,"url": url, symbol: this.calendarSymbol});
			}
			e.seconds = seconds;
		} else if  (endSeconds > 0) {
			if (endSeconds <= 60*60*5 || endSeconds >= 60*60*24*2){
//				var time_string = this.shortRunningText + " " + moment(endDate).fromNow(true); // remaining hours
				var time_string = moment(endDate).from(moment().format("YYYYMMDD")).replace("/mâine|peste o zi/g", "astăzi").replace("in a day", "Today").replace(" la 0:00", "");
			} else {
//				var time_string = this.longRunningText + " " + moment(endDate).calendar(); // remaining hours
				var time_string = moment(endDate).calendar().replace(/mâine|peste o zi/g, "astăzi").replace("in a day", "Today").replace("la 0:00", "");
			}
			if (!e.RRULE){
				this.eventList.push({"description":e.SUMMARY,"seconds":seconds,"days":time_string,"url": url, symbol: this.calendarSymbol});
			}
			e.seconds = endSeconds;
		}
		if (e.RRULE){
			var options = new RRule.parseString(e.RRULE);
			options.dtstart = e.startDate;
			var rule = new RRule(options);
			var oneYear = new Date();
			oneYear.setFullYear(oneYear.getFullYear() + 1);
			var dates = rule.between(new Date(), oneYear, true, function(date, i){return i < 10;});
			for (date in dates) {
				var dt = new Date(dates[date]);
				var days = moment(dt).diff(moment(), "days");
				var seconds = moment(dt).diff(moment(), "seconds");
				var startDate = moment(dt);
				if (seconds >= 0) {
					if (seconds <= 60*60*5 || seconds >= 60*60*24*2){
//						var time_string = moment(dt).fromNow(); // remaining hours
						var time_string = moment(dt).from(moment().format("YYYYMMDD")).replace("peste o zi", "mâine").replace("in a day", "Tomorrow").replace(" la 0:00", "");
					} else {
//						var time_string = moment(dt).calendar(); // remaining hours
						var time_string = moment(dt).calendar().replace("peste o zi", "mâine").replace("in a day", "Tomorrow").replace("la 0:00", "");
					}
					this.eventList.push({"description":e.SUMMARY,"seconds":seconds,"days":time_string,"url": url, symbol: this.calendarSymbol});
				}
			}
		}
	}
	this.eventList = this.eventList.sort(function(a,b){return a.seconds-b.seconds;});
	this.eventList = this.eventList.slice(0, calendar.maximumEntries);
};
calendar.updateData = function(callback){
	new ical_parser("icalendar.php" + "?url="+encodeURIComponent(this.calendarUrl), function(cal){
		this.processEvents(this.calendarUrl, cal.getEvents());
		this.calendarPos++;
		if ((typeof config.calendar.urls == "undefined") || (this.calendarPos >= config.calendar.urls.length)){
			this.calendarPos = 0;
			if (callback !== undefined && Object.prototype.toString.call(callback) === "[object Function]"){
				callback(this.eventList);
			}
		} else {
			setTimeout(function(){
				this.updateData(this.updateCalendar.bind(this));
			}.bind(this), 10);
		}
		if (typeof config.calendar.urls != "undefined"){
			this.calendarUrl = config.calendar.urls[this.calendarPos].url;
			this.calendarSymbol = config.calendar.urls[this.calendarPos].symbol || this.defaultSymbol;
		}
	}.bind(this));
};
calendar.updateCalendar = function(eventList){
	var is_new = true;
	if ($(".calendar-table").length){
		is_new = false;
	}
	table = $("<table/>").addClass("calendar-table");
	opacity = 1;
	for (var i in eventList){
		var e = eventList[i];
		var row = $("<tr/>").attr("id", "event" +i).css("opacity",opacity).addClass("event");
		if (this.displaySymbol){
			row.append($("<td/>").addClass("fa").addClass("fa-"+e.symbol).addClass("calendar-icon"));
		}
		row.append($("<td/>").html(e.description.replace("Orthodox Good Friday", "Vinerea Mare").replace("Adormirea Maicii Domnului", "Adormirea M.D.").replace(/Doua zi|a doua zi/, "A doua zi").replace("Ziua Sfîntului Andrei", "Ziua Sf. Andrei").replace("Ziua Internațională a Femeii", "Ziua femeii").replace("Zi Constantin Brancusi", "Ziua Constantin Brâncuși")).addClass("description"));
		row.append($("<td/>").html(e.days).addClass("days"));
		if (! is_new && $("#event"+i).length){
			$("#event" +i).updateWithText(row.children(), this.fadeInterval);
		} else {
			is_new = true;
		}
		table.append(row);
		opacity -= this.fade / eventList.length;
	}
	if (is_new) {
		$("."+this.calendarLocation).updateWithText(table, this.fadeInterval);
	}
};
calendar.init = function(){
	this.updateData(this.updateCalendar.bind(this));
	this.dataIntervalId = setInterval(function(){
		this.updateData(this.updateCalendar.bind(this));
	}.bind(this), this.updateDataInterval);
};
