/* Magic Mirror
 *
 * MIT Licensed.
 *
 * Redesigned by Răzvan Cristea
 * for iPad 3 & HD display
 * https://github.com/hangorazvan
 */
Module.register("icalendar", {

	defaults: {},

	getScripts: function() {
		return ["jquery.js", "rrule.js"];
	},

	getStyles: function() {
		return ["font-awesome.css"];
	},
	
	start: function() {
		Log.info("Starting module: " + this.name); 
		this.calendar();
	},

	getDom: function() {
		var wrapper = document.createElement("div");
		wrapper.className = this.config.calendarClass + " qsmall";
		return wrapper;
	},

	getHeader: function() {
		return false;
	},
	
	calendar: function() {
		var configs = this.config;
		var calendar = {
			eventList: [],
			calendarLocation: this.config.calendarClass,
			updateInterval: this.config.updateInterval,
			updateDataInterval: this.config.updateDataInterval,
			fadeInterval: config.animation,
			fade: this.config.fade,
			maximumEntries: this.config.maximumEntries || 52,
			calendarUrl: (typeof this.config.calendar.urls == "undefined") ? this.config.calendar.url : this.config.calendar.urls[0].url,
			calendarPos: 0,
			defaultSymbol: this.config.defaultSymbol || "calendar",
			calendarSymbol: (typeof this.config.calendar.urls == "undefined") ? this.config.defaultSymbol || "none" : this.config.calendar.urls[0].symbol,
			displaySymbol: (typeof this.config.displaySymbol == "undefined") ? false : this.config.displaySymbol,
			shortRunningText: this.translate("STILL"),
			longRunningText: this.translate("UNTIL")
		};
		$.fn.updateWithText = function(text, speed, force) {
			var cals = $("<span/>").html(text);
			if (force || ($(this).html() != cals.html())) {
				$(this).fadeOut(speed/2, function() {
					$(this).html(text);
					$(this).fadeIn(speed/2, function() {
					});
				});
			}
		};
		$(document).ready(function($) {
			var eventList = [];
			moment.locale(config.language);
			calendar.init();
		});
		calendar.processEvents = function(url, events) {
			tmpEventList = [];
			var eventListLength = this.eventList.length;
			for (var i = 0; i < eventListLength; i++) {
				if (this.eventList[i]["url"] != url) {
					tmpEventList.push(this.eventList[i]);
				}
			}
			this.eventList = tmpEventList;
			for (i in events) {
				var e = events[i];
				for (var key in e) {
					var value = e[key];
					var seperator = key.search(";");
					if (seperator >= 0) {
						var mainKey = key.substring(0,seperator);
						var subKey = key.substring(seperator+1);
						var dt;
						if (subKey == "VALUE=DATE") {
							dt = new Date(value.substring(0,4), value.substring(4,6) - 1, value.substring(6,8));
						} else {
							dt = new Date(value.substring(0,4), value.substring(4,6) - 1, value.substring(6,8), value.substring(9,11), value.substring(11,13), value.substring(13,15));
						}
						if (mainKey == "DTSTART") e.startDate = dt;
						if (mainKey == "DTEND") e.endDate = dt;
					}
				}
				if (e.startDate === undefined) {
					var days = moment(e.DTSTART).diff(moment(), "days");
					var seconds = moment(e.DTSTART).diff(moment(), "seconds");
					var startDate = moment(e.DTSTART);
					var endDays = moment(e.DTEND).diff(moment(), "days");
					var endSeconds = moment(e.DTEND).diff(moment(), "seconds");
					var endDate = moment(e.DTEND);
				} else {
					days = moment(e.startDate).diff(moment(), "days");
					seconds = moment(e.startDate).diff(moment(), "seconds");
					startDate = moment(e.startDate);
					endDays = moment(e.endDate).diff(moment(), "days");
					endSeconds = moment(e.endDate).diff(moment(), "seconds");
					endDate = moment(e.endDate);
				}
				if (seconds >= 0) {
					if (seconds <= 60*60*5 || seconds >= 60*60*24*2) {
						var time_string = moment(startDate).from(moment().format("YYYYMMDD")).replace("peste o zi", "mâine").replace("in a day", "Tomorrow").replace(/la|0:00|00:00/g, "");
					} else {
						time_string = moment(startDate).calendar().replace("peste o zi", "mâine").replace("in a day", "Tomorrow").replace(/la|0:00|00:00/g, "");
					}
					if (!e.RRULE) {
						this.eventList.push({"description":e.SUMMARY,"seconds":seconds,"days":time_string,"url": url, symbol: this.calendarSymbol});
					}
					e.seconds = seconds;
				} else if  (endSeconds > 0) {
					if (endSeconds <= 60*60*5 || endSeconds >= 60*60*24*2) {
						time_string = moment(endDate).from(moment().format("YYYYMMDD")).replace(/mâine|peste o zi/g, "astăzi").replace("in a day", "Today").replace(/la|0:00|00:00/g, "");
					} else {
						time_string = moment(endDate).calendar().replace(/mâine|peste o zi/g, "astăzi").replace("in a day", "Today").replace(/la|0:00|00:00/g, "");
					}
					if (!e.RRULE) {
						this.eventList.push({"description":e.SUMMARY,"seconds":seconds,"days":time_string,"url": url, symbol: this.calendarSymbol});
					}
					e.seconds = endSeconds;
				}
				if (e.RRULE) {
					var options = new RRule.parseString(e.RRULE);
					options.dtstart = e.startDate;
					var rule = new RRule(options);
					var oneYear = new Date();
					oneYear.setFullYear(oneYear.getFullYear() + 1);
					var dates = rule.between(new Date(), oneYear, true, function(date, i){return i < 10;});
					for (var date in dates) {
						dt = new Date(dates[date]);
						days = moment(dt).diff(moment(), "days");
						seconds = moment(dt).diff(moment(), "seconds");
						startDate = moment(dt);
						if (seconds >= 0) {
							if (seconds <= 60*60*5 || seconds >= 60*60*24*2) {
								time_string = moment(dt).from(moment().format("YYYYMMDD")).replace("peste o zi", "mâine").replace("in a day", "Tomorrow").replace(/la|0:00|00:00/g, "");
							} else {
								time_string = moment(dt).calendar().replace("peste o zi", "mâine").replace("in a day", "Tomorrow").replace(/la|0:00|00:00/g, "");
							}
							this.eventList.push({"description":e.SUMMARY,"seconds":seconds,"days":time_string,"url": url, symbol: this.calendarSymbol});
						}
					}
				}
			}
			this.eventList = this.eventList.sort(function(a,b){return a.seconds-b.seconds;});
			this.eventList = this.eventList.slice(0, calendar.maximumEntries);
		};
		calendar.updateData = function(callback) {
			new ical_parser("php/calendar.php" + "?url="+encodeURIComponent(this.calendarUrl), function(cal) {
				this.processEvents(this.calendarUrl, cal.getEvents());
				this.calendarPos++;
				if ((typeof configs.calendar.urls == "undefined") || (this.calendarPos >= configs.calendar.urls.length)) {
					this.calendarPos = 0;
					if (callback !== undefined && Object.prototype.toString.call(callback) === "[object Function]") {
						callback(this.eventList);
					}
				} else {
					setTimeout(function() {
						this.updateData(this.updateCalendar.bind(this));
					}.bind(this), this.updateInterval);
				}
				if (typeof configs.calendar.urls != "undefined") {
					this.calendarUrl = configs.calendar.urls[this.calendarPos].url;
					this.calendarSymbol = configs.calendar.urls[this.calendarPos].symbol || this.defaultSymbol;
				}
			}.bind(this));
		};
		calendar.updateCalendar = function(eventList) {
			var is_new = true;
			if ($(".calendar-table").length) {
				is_new = false;
			}
			table = $("<table/>").addClass("calendar-table");
			opacity = 1;
			for (var i in eventList) {
				var e = eventList[i];
				var row = $("<tr/>").attr("id", "event" +i).css("opacity",opacity).addClass("event");
				if (this.displaySymbol) {
					row.append($("<td/>").addClass("fa").addClass("fa-"+e.symbol).addClass("calendar-icon"));
				}
				row.append($("<td/>").html(e.description.replace("New moon", "Lună nouă la").replace("Full moon", "Lună plină la").replace("First quarter", "Primul pătrar la").replace("Last quarter", "Ultimul pătrar la").replace("Orthodox Good Friday", "Vinerea Mare").replace("Adormirea Maicii Domnului", "Adormirea M.D.").replace(/Doua zi|a doua zi/, "A doua zi").replace("Ziua Sfîntului Andrei", "Ziua Sf. Andrei").replace("Ziua Internațională a Femeii", "Ziua femeii").replace("Zi Constantin Brancusi", "Ziua Constantin Brâncuși")).addClass("description"));
				row.append($("<td/>").html(e.days).addClass("days"));
				if (!is_new && $("#event"+i).length) {
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
		calendar.init = function() {
			this.updateData(this.updateCalendar.bind(this));
			setInterval(function () {
				this.updateCalendar(this.eventList)
			}.bind(this), this.updateInterval);
			setInterval(function () {
				this.updateData(this.updateCalendar.bind(this));
			}.bind(this), this.updateDataInterval);
		};

		/** 
		 * Javascript ical Parser
		 * Proof of concept method of reading icalendar (.ics) files with javascript.
		 *
		 * @author: Carl Saggs
		 * @source: https://github.com/thybag/
		 * @version: 0.2
		 */
		function ical_parser(feed_url, callback){
			//store of unproccesed data.
			this.raw_data = null;
			//Store of proccessed data.
			this.events = [];
			
			/**
			 * loadFile
			 * Using AJAX to load the requested .ics file, passing it to the callback when completed.
			 * @param url URL of .ics file
			 * @param callback Function to call on completion.
			 */
			this.loadFile = function(url, callback){
				//Create request object
				try {xmlhttp = window.XMLHttpRequest?new XMLHttpRequest(): new ActiveXObject("Microsoft.XMLHTTP");}  catch (e) { }
				//Grab file
				xmlhttp.onreadystatechange = function(){
					if ((xmlhttp.readyState == 4) && (xmlhttp.status == 200)) {
						//On success, run callback.
						callback(xmlhttp.responseText);
					}
				}
				xmlhttp.open("GET", url, true);
				xmlhttp.send(null);
			}
			
			/**
			 * makeDate
			 * Convert the dateformat used by ICalendar in to one more suitable for javascript.
			 * @param String ical_date 
			 * @return dt object, includes javascript Date + day name, hour/minutes/day/month/year etc.
			 */
			this.makeDate = function(ical_date){
				//break date apart
						var dtutc =  {
					year: ical_date.substr(0,4),
					month: ical_date.substr(4,2),
					day: ical_date.substr(6,2),
					hour: ical_date.substr(9,2),
					minute: ical_date.substr(11,2)
				}
				//Create JS date (months start at 0 in JS - don't ask)
						var utcdatems = Date.UTC(dtutc.year, (dtutc.month-1), dtutc.day, dtutc.hour, dtutc.minute);
						var dt = {};
						dt.date = new Date(utcdatems);
						
						dt.year = dt.date.getFullYear();
						dt.month = ('0' + (dt.date.getMonth()+1)).slice(-2);
						dt.day = ('0' + dt.date.getDate()).slice(-2);
						dt.hour = ('0' + dt.date.getHours()).slice(-2);
						dt.minute = ('0' + dt.date.getMinutes()).slice(-2);

				//Get the full name of the given day
				dt.dayname =["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dt.date.getDay()];
						dt.monthname = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ][dt.date.getMonth()] ;
				
				return dt;
			}
			
			/**
			 * parseICAL
			 * Convert the ICAL format in to a number of javascript objects (Each representing a date)
			 *
			 * @param data Raw ICAL data
			 */
			this.parseICAL = function(data){
				//Ensure cal is empty
				this.events = [];
				
				//Clean string and split the file so we can handle it (line by line)
				cal_array = data.replace(new RegExp( "\\r", "g" ), "").replace(/\n /g,"").split("\n");
				
				//Keep track of when we are activly parsing an event
				var in_event = false;
				//Use as a holder for the current event being proccessed.
				var cur_event = null;
				for(var i=0;i<cal_array.length;i++){
					ln = cal_array[i];
					//If we encounted a new Event, create a blank event object + set in event options.
					if(!in_event && ln == 'BEGIN:VEVENT'){
						in_event = true;
						cur_event = {};
					}
					//If we encounter end event, complete the object and add it to our events array then clear it for reuse.
								if(in_event && ln == 'END:VEVENT'){
						in_event = false;
						this.events.push(cur_event);
						cur_event = null;
					}
					//If we are in an event
								else if(in_event){
										//var lntrim = ln.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
										//var lnsplit = lntrim.split(':');
										//type = lnsplit[0];
										//val = lnsplit[1];

						//Split the item based on the first ":"
						idx = ln.indexOf(':');
						//Apply trimming to values to reduce risks of badly formatted ical files.
						type = ln.substr(0,idx).replace(/^\s\s*/, '').replace(/\s\s*$/, '');//Trim
						val = ln.substr(idx+1).replace(/^\s\s*/, '').replace(/\s\s*$/, '');
						
						if(typeof cur_event[type]  !== 'undefined'){
							continue;
						}
						
						//If the type is a start date, proccess it and store details
						if(type =='DTSTART'){
							dt = this.makeDate(val);
							val = dt.date;
							//These are helpful for display
							cur_event.start_time = dt.hour+':'+dt.minute;
							cur_event.start_date = dt.day+'/'+dt.month+'/'+dt.year;
							cur_event.day = dt.dayname;
												cur_event.start_date_long = dt.day+'. '+dt.monthname+' '+dt.year ;
						}
						//If the type is an end date, do the same as above
										else if(type =='DTEND'){
							dt = this.makeDate(val);
							val = dt.date;
							//These are helpful for display
							cur_event.end_time = dt.hour+':'+dt.minute;
							cur_event.end_date = dt.day+'/'+dt.month+'/'+dt.year;
							cur_event.day = dt.dayname;
						}
						//Convert timestamp
										else if(type =='DTSTAMP'){ 
												val = this.makeDate(val).date;
										}
										else {
											val = val
												.replace(/\\r\\n/g,'<br />')
												.replace(/\\n/g,'<br />')
												.replace(/\\,/g,',');
										}

						//Add the value to our event object.
						cur_event[type] = val;
					}
				}
				//Run this to finish proccessing our Events.
				this.complete();
			}
			/**
			 * complete
			 * Sort all events in to a sensible order and run the original callback
			 */
			this.complete = function(){
				//Sort the data so its in date order.
				this.events.sort(function(a,b){
					return a.DTSTART-b.DTSTART;
				});
				//Run callback method, if was defined. (return self)
				if(typeof callback == 'function') callback(this);
			}
			/**
			 * getEvents
			 * return all events found in the ical file.
			 *
			 * @return list of events objects
			 */
			this.getEvents = function(){
				return this.events;
			}
			
			/**
			 * getFutureEvents
			 * return all events sheduled to take place after the current date.
			 *
			 * @return list of events objects
			 */
			this.getFutureEvents = function(){
				var future_events = [], current_date = new Date();
				
				this.events.forEach(function(itm){
					//If the event ends after the current time, add it to the array to return.
					if(itm.DTEND > current_date) future_events.push(itm);
				});
				return future_events;
			}
			
			/**
			 * getPastEvents
			 * return all events sheduled to take place before the current date.
			 *
			 * @return list of events objects
			 */
			this.getPastEvents = function(){
				var past_events = [], current_date = new Date();
				
				this.events.forEach(function(itm){
					//If the event ended before the current time, add it to the array to return.
					if(itm.DTEND <= current_date) past_events.push(itm);
				});
				return past_events.reverse();
			}
			
			/**
			 * load
			 * load a new ICAL file.
			 *
			 * @param ical file url
			 */
			this.load = function(ical_file){
				var tmp_this = this;
				this.raw_data = null;
				this.loadFile(ical_file, function(data){
					//if the file loads, store the data and invoke the parser
					tmp_this.raw_data = data;
					tmp_this.parseICAL(data);
				});
			}
			
			//Store this so we can use it in the callback from the load function.
			var tmp_this = this;
			//Store the feed url
			this.feed_url = feed_url;
			//Load the file
			this.load(this.feed_url);
		}
	}
});