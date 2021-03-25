/* global cloneObject */

/* Magic Mirror
 * Module: Calendar
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 */

"use strict";

Module.register("calendar", {
	// Define module defaults
	defaults: {
		animationSpeed: config.animation,
		selfSignedCert: false
	},

	requiresVersion: config.minVersion,

	// Define required scripts.
	getStyles() {
		return ["font-awesome.css"];
	},

	// Define required scripts.
	getScripts() {
		return ["moment.js"];
	},

	// Define required translations.
	getTranslations() {
		// The translations for the default modules are defined in the core translation files.
		// Therefore we can just return false. Otherwise we should have returned a dictionary.
		// If you're trying to build your own module including translations, check out the documentation.
		return false;
	},

	// Override start method.
	start() {
		var _this = this;

		Log.log("Starting module: " + this.name);

		// Set locale.
		moment.updateLocale(config.language, this.getLocaleSpecification(config.timeFormat));

		// clear data holder before start
		this.calendarData = {};

		// indicate no data available yet
		this.loaded = false;

		this.config.calendars.forEach(function (calendar) {
			calendar.url = calendar.url.replace("webcal://", "http://");

			var calendarConfig = {
				maximumEntries: calendar.maximumEntries,
				maximumNumberOfDays: calendar.maximumNumberOfDays,
				broadcastPastEvents: calendar.broadcastPastEvents,
				selfSignedCert: calendar.selfSignedCert
			};

			if (calendar.symbolClass === "undefined" || calendar.symbolClass === null) {
				calendarConfig.symbolClass = "";
			}
			if (calendar.titleClass === "undefined" || calendar.titleClass === null) {
				calendarConfig.titleClass = "";
			}
			if (calendar.timeClass === "undefined" || calendar.timeClass === null) {
				calendarConfig.timeClass = "";
			}

			// we check user and password here for backwards compatibility with old configs
			if (calendar.user && calendar.pass) {
				Log.warn("Deprecation warning: Please update your calendar authentication configuration.");
				Log.warn("https://github.com/MichMich/MagicMirror/tree/v2.1.2/modules/default/calendar#calendar-authentication-options");
				calendar.auth = {
					user: calendar.user,
					pass: calendar.pass
				};
			}

			// tell helper to start a fetcher for this calendar
			// fetcher till cycle
			_this.addCalendar(calendar.url, calendar.auth, calendarConfig);
		});
	},

	// Override socket notification handler.
	socketNotificationReceived(notification, payload) {
		if (this.identifier !== payload.id) {
			return;
		}

		if (notification === "CALENDAR_EVENTS") {
			if (this.hasCalendarURL(payload.url)) {
				this.calendarData[payload.url] = payload.events;
				this.loaded = true;

				if (this.config.broadcastEvents) {
					this.broadcastEvents();
				}
			}
		} else if (notification === "FETCH_ERROR") {
			Log.error("Calendar Error. Could not fetch calendar: " + payload.url);
			this.loaded = true;
		} else if (notification === "INCORRECT_URL") {
			Log.error("Calendar Error. Incorrect url: " + payload.url);
		}

		this.updateDom(this.config.animationSpeed);
	},

	// Override dom generator.
	getDom() {
		var _this2 = this;

		// Define second, minute, hour, and day constants
		var oneSecond = 1000; // 1,000 milliseconds
		var oneMinute = oneSecond * 60;
		var oneHour = oneMinute * 60;
		var oneDay = oneHour * 24;

		var events = this.createEventList();
		var wrapper = document.createElement("table");
		wrapper.className = this.config.tableClass;

		if (events.length === 0) {
			wrapper.innerHTML = this.loaded ? this.translate("EMPTY") : this.translate("LOADING");
			wrapper.className = this.config.tableClass + " dimmed";
			return wrapper;
		}

		var currentFadeStep = 0;
		var startFade = undefined;
		var fadeSteps = undefined;

		if (this.config.fade && this.config.fadePoint < 1) {
			if (this.config.fadePoint < 0) {
				this.config.fadePoint = 0;
			}
			startFade = events.length * this.config.fadePoint;
			fadeSteps = events.length - startFade;
		}

		var lastSeenDate = "";

		events.forEach(function (event, index) {
			var dateAsString = moment(event.startDate, "x").format(_this2.config.dateFormat);
			if (_this2.config.timeFormat === "dateheaders") {
				if (lastSeenDate !== dateAsString) {
					var dateRow = document.createElement("tr");
					dateRow.className = "normal";

					var dateCell = document.createElement("td");
					dateCell.colSpan = "3";
					dateCell.innerHTML = dateAsString;
					dateCell.style.paddingTop = "10px";
					dateRow.appendChild(dateCell);
					wrapper.appendChild(dateRow);

					if (_this2.config.fade && index >= startFade) {
						//fading
						currentFadeStep = index - startFade;
						dateRow.style.opacity = 1 - 1 / fadeSteps * currentFadeStep;
					}

					lastSeenDate = dateAsString;
				}
			}

			var eventWrapper = document.createElement("tr");

			if (_this2.config.colored && !_this2.config.coloredSymbolOnly) {
				eventWrapper.style.cssText = "color:" + _this2.colorForUrl(event.url);
			}

			eventWrapper.className = "normal event";

			var symbolWrapper = document.createElement("td");

			if (_this2.config.displaySymbol) {
				if (_this2.config.colored && _this2.config.coloredSymbolOnly) {
					symbolWrapper.style.cssText = "color:" + _this2.colorForUrl(event.url);
				}

				var symbolClass = _this2.symbolClassForUrl(event.url);
				symbolWrapper.className = "symbol align-right " + symbolClass;

				var symbols = _this2.symbolsForEvent(event);
				// If symbols are displayed and custom symbol is set, replace event symbol
				if (_this2.config.displaySymbol && _this2.config.customEvents.length > 0) {
					for (var ev in _this2.config.customEvents) {
						if (typeof _this2.config.customEvents[ev].symbol !== "undefined" && _this2.config.customEvents[ev].symbol !== "") {
							var needle = new RegExp(_this2.config.customEvents[ev].keyword, "gi");
							if (needle.test(event.title)) {
								symbols[0] = _this2.config.customEvents[ev].symbol;
								break;
							}
						}
					}
				}
				symbols.forEach(function (s, index) {
					var symbol = document.createElement("span");
					symbol.className = "fa fa-fw fa-" + s;
					if (index > 0) {
						symbol.style.paddingLeft = "5px";
					}
					symbolWrapper.appendChild(symbol);
				});
				eventWrapper.appendChild(symbolWrapper);
			} else if (_this2.config.timeFormat === "dateheaders") {
				var blankCell = document.createElement("td");
				blankCell.innerHTML = "&nbsp;&nbsp;&nbsp;";
				eventWrapper.appendChild(blankCell);
			}

			var titleWrapper = document.createElement("td");
			var repeatingCountTitle = "";

			if (_this2.config.displayRepeatingCountTitle && event.firstYear !== undefined) {
				repeatingCountTitle = _this2.countTitleForUrl(event.url);

				if (repeatingCountTitle !== "") {
					var thisYear = new Date(parseInt(event.startDate)).getFullYear(),
					    yearDiff = thisYear - event.firstYear;

					repeatingCountTitle = ", " + yearDiff + ". " + repeatingCountTitle;
				}
			}

			// Color events if custom color is specified
			if (_this2.config.customEvents.length > 0) {
				for (var ev in _this2.config.customEvents) {
					if (typeof _this2.config.customEvents[ev].color !== "undefined" && _this2.config.customEvents[ev].color !== "") {
						var needle = new RegExp(_this2.config.customEvents[ev].keyword, "gi");
						if (needle.test(event.title)) {
							// Respect parameter ColoredSymbolOnly also for custom events
							if (!_this2.config.coloredSymbolOnly) {
								eventWrapper.style.cssText = "color:" + _this2.config.customEvents[ev].color;
								titleWrapper.style.cssText = "color:" + _this2.config.customEvents[ev].color;
							}
							if (_this2.config.displaySymbol) {
								symbolWrapper.style.cssText = "color:" + _this2.config.customEvents[ev].color;
							}
							break;
						}
					}
				}
			}

			titleWrapper.innerHTML = _this2.titleTransform(event.title, _this2.config.titleReplace, _this2.config.wrapEvents, _this2.config.maxTitleLength, _this2.config.maxTitleLines) + repeatingCountTitle;

			var titleClass = _this2.titleClassForUrl(event.url);

			if (!_this2.config.colored) {
				titleWrapper.className = "title bright " + titleClass;
			} else {
				titleWrapper.className = "title " + titleClass;
			}

			if (_this2.config.timeFormat === "dateheaders") {
				if (event.fullDayEvent) {
					titleWrapper.colSpan = "2";
					titleWrapper.align = "left";
				} else {
					var timeWrapper = document.createElement("td");
					timeWrapper.className = "time light " + _this2.timeClassForUrl(event.url);
					timeWrapper.align = "left";
					timeWrapper.style.paddingLeft = "2px";
					timeWrapper.innerHTML = moment(event.startDate, "x").format("LT");
					eventWrapper.appendChild(timeWrapper);
					titleWrapper.align = "right";
				}

				eventWrapper.appendChild(titleWrapper);
			} else {
				var timeWrapper = document.createElement("td");

				eventWrapper.appendChild(titleWrapper);
				var now = new Date();

				if (_this2.config.timeFormat === "absolute") {
					// Use dateFormat
					timeWrapper.innerHTML = _this2.capFirst(moment(event.startDate, "x").format(_this2.config.dateFormat));
					// Add end time if showEnd
					if (_this2.config.showEnd) {
						timeWrapper.innerHTML += "-";
						timeWrapper.innerHTML += _this2.capFirst(moment(event.endDate, "x").format(_this2.config.dateEndFormat));
					}
					// For full day events we use the fullDayEventDateFormat
					if (event.fullDayEvent) {
						//subtract one second so that fullDayEvents end at 23:59:59, and not at 0:00:00 one the next day
						event.endDate -= oneSecond;
						timeWrapper.innerHTML = _this2.capFirst(moment(event.startDate, "x").format(_this2.config.fullDayEventDateFormat));
					}
					if (_this2.config.getRelative > 0 && event.startDate < now) {
						// Ongoing and getRelative is set
						timeWrapper.innerHTML = _this2.capFirst(_this2.translate("RUNNING", {
							fallback: _this2.translate("RUNNING") + " {timeUntilEnd}",
							timeUntilEnd: moment(event.endDate, "x").fromNow(true)
						}));
					} else if (_this2.config.urgency > 0 && event.startDate - now < _this2.config.urgency * oneDay) {
						// Within urgency days
						timeWrapper.innerHTML = _this2.capFirst(moment(event.startDate, "x").fromNow());
					}
					if (event.fullDayEvent && _this2.config.nextDaysRelative) {
						// Full days events within the next two days
						if (event.today) {
							timeWrapper.innerHTML = _this2.capFirst(_this2.translate("TODAY"));
						} else if (event.startDate - now < oneDay && event.startDate - now > 0) {
							timeWrapper.innerHTML = _this2.capFirst(_this2.translate("TOMORROW"));
						} else if (event.startDate - now < 2 * oneDay && event.startDate - now > 0) {
							if (_this2.translate("DAYAFTERTOMORROW") !== "DAYAFTERTOMORROW") {
								timeWrapper.innerHTML = _this2.capFirst(_this2.translate("DAYAFTERTOMORROW"));
							}
						}
					}
				} else {
					// Show relative times
					if (event.startDate >= now) {
						// Use relative  time
						if (!_this2.config.hideTime) {
							timeWrapper.innerHTML = _this2.capFirst(moment(event.startDate, "x").calendar());
						} else {
							timeWrapper.innerHTML = _this2.capFirst(moment(event.startDate, "x").calendar(null, {
								sameDay: "[" + _this2.translate("TODAY") + "]",
								nextDay: "[" + _this2.translate("TOMORROW") + "]",
								nextWeek: "dddd"
							}));
						}
						if (event.startDate - now < _this2.config.getRelative * oneHour) {
							// If event is within getRelative  hours, display 'in xxx' time format or moment.fromNow()
							timeWrapper.innerHTML = _this2.capFirst(moment(event.startDate, "x").fromNow());
						}
					} else {
						// Ongoing event
						timeWrapper.innerHTML = _this2.capFirst(_this2.translate("RUNNING", {
							fallback: _this2.translate("RUNNING") + " {timeUntilEnd}",
							timeUntilEnd: moment(event.endDate, "x").fromNow(true)
						}));
					}
				}
				timeWrapper.className = "time light " + _this2.timeClassForUrl(event.url);
				eventWrapper.appendChild(timeWrapper);
			}

			wrapper.appendChild(eventWrapper);

			// Create fade effect.
			if (index >= startFade) {
				currentFadeStep = index - startFade;
				eventWrapper.style.opacity = 1 - 1 / fadeSteps * currentFadeStep;
			}

			if (_this2.config.showLocation) {
				if (event.location !== false) {
					var locationRow = document.createElement("tr");
					locationRow.className = "normal xsmall light";

					if (_this2.config.displaySymbol) {
						var symbolCell = document.createElement("td");
						locationRow.appendChild(symbolCell);
					}

					var descCell = document.createElement("td");
					descCell.className = "location";
					descCell.colSpan = "2";
					descCell.innerHTML = _this2.titleTransform(event.location, _this2.config.locationTitleReplace, _this2.config.wrapLocationEvents, _this2.config.maxLocationTitleLength, _this2.config.maxEventTitleLines);
					locationRow.appendChild(descCell);

					wrapper.appendChild(locationRow);

					if (index >= startFade) {
						currentFadeStep = index - startFade;
						locationRow.style.opacity = 1 - 1 / fadeSteps * currentFadeStep;
					}
				}
			}
		});

		return wrapper;
	},

	/**
  * This function accepts a number (either 12 or 24) and returns a moment.js LocaleSpecification with the
  * corresponding timeformat to be used in the calendar display. If no number is given (or otherwise invalid input)
  * it will a localeSpecification object with the system locale time format.
  *
  * @param {number} timeFormat Specifies either 12 or 24 hour time format
  * @returns {moment.LocaleSpecification} formatted time
  */
	getLocaleSpecification(timeFormat) {
		switch (timeFormat) {
			case 12:
				{
					return { longDateFormat: { LT: "h:mm A" } };
				}
			case 24:
				{
					return { longDateFormat: { LT: "HH:mm" } };
				}
			default:
				{
					return { longDateFormat: { LT: moment.localeData().longDateFormat("LT") } };
				}
		}
	},

	/**
  * Checks if this config contains the calendar url.
  *
  * @param {string} url The calendar url
  * @returns {boolean} True if the calendar config contains the url, False otherwise
  */
	hasCalendarURL(url) {
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = this.config.calendars[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var calendar = _step.value;

				if (calendar.url === url) {
					return true;
				}
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator["return"]) {
					_iterator["return"]();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		return false;
	},

	/**
  * Creates the sorted list of all events.
  *
  * @returns {object[]} Array with events.
  */
	createEventList() {
		var now = new Date();
		var today = moment().startOf("day");
		var future = moment().startOf("day").add(this.config.maximumNumberOfDays, "days").toDate();
		var events = [];

		for (var calendarUrl in this.calendarData) {
			var calendar = this.calendarData[calendarUrl];
			for (var e in calendar) {
				var _event = JSON.parse(JSON.stringify(calendar[e])); // clone object

				if (_event.endDate < now) {
					continue;
				}
				if (this.config.hidePrivate) {
					if (_event["class"] === "PRIVATE") {
						// do not add the current event, skip it
						continue;
					}
				}
				if (this.config.hideOngoing) {
					if (_event.startDate < now) {
						continue;
					}
				}
				if (this.listContainsEvent(events, _event)) {
					continue;
				}
				_event.url = calendarUrl;
				_event.today = _event.startDate >= today && _event.startDate < today + 24 * 60 * 60 * 1000;

				/* if sliceMultiDayEvents is set to true, multiday events (events exceeding at least one midnight) are sliced into days,
     * otherwise, esp. in dateheaders mode it is not clear how long these events are.
     */
				var maxCount = Math.ceil((_event.endDate - 1 - moment(_event.startDate, "x").endOf("day").format("x")) / (1000 * 60 * 60 * 24)) + 1;
				if (this.config.sliceMultiDayEvents && maxCount > 1) {
					var splitEvents = [];
					var midnight = moment(_event.startDate, "x").clone().startOf("day").add(1, "day").format("x");
					var count = 1;
					while (_event.endDate > midnight) {
						var thisEvent = JSON.parse(JSON.stringify(_event)); // clone object
						thisEvent.today = thisEvent.startDate >= today && thisEvent.startDate < today + 24 * 60 * 60 * 1000;
						thisEvent.endDate = midnight;
						thisEvent.title += " (" + count + "/" + maxCount + ")";
						splitEvents.push(thisEvent);

						_event.startDate = midnight;
						count += 1;
						midnight = moment(midnight, "x").add(1, "day").format("x"); // next day
					}
					// Last day
					_event.title += " (" + count + "/" + maxCount + ")";
					splitEvents.push(_event);

					var _iteratorNormalCompletion2 = true;
					var _didIteratorError2 = false;
					var _iteratorError2 = undefined;

					try {
						for (var _iterator2 = splitEvents[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
							var splitEvent = _step2.value;

							if (splitEvent.endDate > now && splitEvent.endDate <= future) {
								events.push(splitEvent);
							}
						}
					} catch (err) {
						_didIteratorError2 = true;
						_iteratorError2 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
								_iterator2["return"]();
							}
						} finally {
							if (_didIteratorError2) {
								throw _iteratorError2;
							}
						}
					}
				} else {
					events.push(_event);
				}
			}
		}

		events.sort(function (a, b) {
			return a.startDate - b.startDate;
		});

		// Limit the number of days displayed
		// If limitDays is set > 0, limit display to that number of days
		if (this.config.limitDays > 0) {
			var newEvents = [];
			var lastDate = today.clone().subtract(1, "days").format("YYYYMMDD");
			var days = 0;
			var _iteratorNormalCompletion3 = true;
			var _didIteratorError3 = false;
			var _iteratorError3 = undefined;

			try {
				for (var _iterator3 = events[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
					var ev = _step3.value;

					var eventDate = moment(ev.startDate, "x").format("YYYYMMDD");
					// if date of event is later than lastdate
					// check if we already are showing max unique days
					if (eventDate > lastDate) {
						// if the only entry in the first day is a full day event that day is not counted as unique
						if (newEvents.length === 1 && days === 1 && newEvents[0].fullDayEvent) {
							days--;
						}
						days++;
						if (days > this.config.limitDays) {
							continue;
						} else {
							lastDate = eventDate;
						}
					}
					newEvents.push(ev);
				}
			} catch (err) {
				_didIteratorError3 = true;
				_iteratorError3 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
						_iterator3["return"]();
					}
				} finally {
					if (_didIteratorError3) {
						throw _iteratorError3;
					}
				}
			}

			events = newEvents;
		}

		return events.slice(0, this.config.maximumEntries);
	},

	listContainsEvent(eventList, event) {
		var _iteratorNormalCompletion4 = true;
		var _didIteratorError4 = false;
		var _iteratorError4 = undefined;

		try {
			for (var _iterator4 = eventList[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
				var evt = _step4.value;

				if (evt.title === event.title && parseInt(evt.startDate) === parseInt(event.startDate)) {
					return true;
				}
			}
		} catch (err) {
			_didIteratorError4 = true;
			_iteratorError4 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion4 && _iterator4["return"]) {
					_iterator4["return"]();
				}
			} finally {
				if (_didIteratorError4) {
					throw _iteratorError4;
				}
			}
		}

		return false;
	},

	/**
  * Requests node helper to add calendar url.
  *
  * @param {string} url The calendar url to add
  * @param {object} auth The authentication method and credentials
  * @param {object} calendarConfig The config of the specific calendar
  */
	addCalendar(url, auth, calendarConfig) {
		this.sendSocketNotification("ADD_CALENDAR", {
			id: this.identifier,
			url: url,
			excludedEvents: calendarConfig.excludedEvents || this.config.excludedEvents,
			maximumEntries: calendarConfig.maximumEntries || this.config.maximumEntries,
			maximumNumberOfDays: calendarConfig.maximumNumberOfDays || this.config.maximumNumberOfDays,
			fetchInterval: this.config.fetchInterval,
			symbolClass: calendarConfig.symbolClass,
			titleClass: calendarConfig.titleClass,
			timeClass: calendarConfig.timeClass,
			auth: auth,
			broadcastPastEvents: calendarConfig.broadcastPastEvents || this.config.broadcastPastEvents,
			selfSignedCert: calendarConfig.selfSignedCert || this.config.selfSignedCert
		});
	},

	/**
  * Retrieves the symbols for a specific event.
  *
  * @param {object} event Event to look for.
  * @returns {string[]} The symbols
  */
	symbolsForEvent(event) {
		var symbols = this.getCalendarPropertyAsArray(event.url, "symbol", this.config.defaultSymbol);

		if (event.recurringEvent === true && this.hasCalendarProperty(event.url, "recurringSymbol")) {
			symbols = this.mergeUnique(this.getCalendarPropertyAsArray(event.url, "recurringSymbol", this.config.defaultSymbol), symbols);
		}

		if (event.fullDayEvent === true && this.hasCalendarProperty(event.url, "fullDaySymbol")) {
			symbols = this.mergeUnique(this.getCalendarPropertyAsArray(event.url, "fullDaySymbol", this.config.defaultSymbol), symbols);
		}

		return symbols;
	},

	mergeUnique(arr1, arr2) {
		return arr1.concat(arr2.filter(function (item) {
			return arr1.indexOf(item) === -1;
		}));
	},

	/**
  * Retrieves the symbolClass for a specific calendar url.
  *
  * @param {string} url The calendar url
  * @returns {string} The class to be used for the symbols of the calendar
  */
	symbolClassForUrl(url) {
		return this.getCalendarProperty(url, "symbolClass", "");
	},

	/**
  * Retrieves the titleClass for a specific calendar url.
  *
  * @param {string} url The calendar url
  * @returns {string} The class to be used for the title of the calendar
  */
	titleClassForUrl(url) {
		return this.getCalendarProperty(url, "titleClass", "");
	},

	/**
  * Retrieves the timeClass for a specific calendar url.
  *
  * @param {string} url The calendar url
  * @returns {string} The class to be used for the time of the calendar
  */
	timeClassForUrl(url) {
		return this.getCalendarProperty(url, "timeClass", "");
	},

	/**
  * Retrieves the calendar name for a specific calendar url.
  *
  * @param {string} url The calendar url
  * @returns {string} The name of the calendar
  */
	calendarNameForUrl(url) {
		return this.getCalendarProperty(url, "name", "");
	},

	/**
  * Retrieves the color for a specific calendar url.
  *
  * @param {string} url The calendar url
  * @returns {string} The color
  */
	colorForUrl(url) {
		return this.getCalendarProperty(url, "color", "#fff");
	},

	/**
  * Retrieves the count title for a specific calendar url.
  *
  * @param {string} url The calendar url
  * @returns {string} The title
  */
	countTitleForUrl(url) {
		return this.getCalendarProperty(url, "repeatingCountTitle", this.config.defaultRepeatingCountTitle);
	},

	/**
  * Helper method to retrieve the property for a specific calendar url.
  *
  * @param {string} url The calendar url
  * @param {string} property The property to look for
  * @param {string} defaultValue The value if the property is not found
  * @returns {*} The property
  */
	getCalendarProperty(url, property, defaultValue) {
		var _iteratorNormalCompletion5 = true;
		var _didIteratorError5 = false;
		var _iteratorError5 = undefined;

		try {
			for (var _iterator5 = this.config.calendars[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
				var calendar = _step5.value;

				if (calendar.url === url && calendar.hasOwnProperty(property)) {
					return calendar[property];
				}
			}
		} catch (err) {
			_didIteratorError5 = true;
			_iteratorError5 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion5 && _iterator5["return"]) {
					_iterator5["return"]();
				}
			} finally {
				if (_didIteratorError5) {
					throw _iteratorError5;
				}
			}
		}

		return defaultValue;
	},

	getCalendarPropertyAsArray(url, property, defaultValue) {
		var p = this.getCalendarProperty(url, property, defaultValue);
		if (!(p instanceof Array)) p = [p];
		return p;
	},

	hasCalendarProperty: function hasCalendarProperty(url, property) {
		return !!this.getCalendarProperty(url, property, undefined);
	},

	/**
  * Shortens a string if it's longer than maxLength and add a ellipsis to the end
  *
  * @param {string} string Text string to shorten
  * @param {number} maxLength The max length of the string
  * @param {boolean} wrapEvents Wrap the text after the line has reached maxLength
  * @param {number} maxTitleLines The max number of vertical lines before cutting event title
  * @returns {string} The shortened string
  */
	shorten(string, maxLength, wrapEvents, maxTitleLines) {
		if (typeof string !== "string") {
			return "";
		}

		if (wrapEvents === true) {
			var words = string.split(" ");
			var temp = "";
			var currentLine = "";
			var line = 0;

			for (var i = 0; i < words.length; i++) {
				var word = words[i];
				if (currentLine.length + word.length < (typeof maxLength === "number" ? maxLength : 25) - 1) {
					// max - 1 to account for a space
					currentLine += word + " ";
				} else {
					line++;
					if (line > maxTitleLines - 1) {
						if (i < words.length) {
							currentLine += "&hellip;";
						}
						break;
					}

					if (currentLine.length > 0) {
						temp += currentLine + "<br>" + word + " ";
					} else {
						temp += word + "<br>";
					}
					currentLine = "";
				}
			}

			return (temp + currentLine).trim();
		} else {
			if (maxLength && typeof maxLength === "number" && string.length > maxLength) {
				return string.trim().slice(0, maxLength) + "&hellip;";
			} else {
				return string.trim();
			}
		}
	},

	/**
  * Capitalize the first letter of a string
  *
  * @param {string} string The string to capitalize
  * @returns {string} The capitalized string
  */
	capFirst(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	},

	/**
  * Transforms the title of an event for usage.
  * Replaces parts of the text as defined in config.titleReplace.
  * Shortens title based on config.maxTitleLength and config.wrapEvents
  *
  * @param {string} title The title to transform.
  * @param {object} titleReplace Pairs of strings to be replaced in the title
  * @param {boolean} wrapEvents Wrap the text after the line has reached maxLength
  * @param {number} maxTitleLength The max length of the string
  * @param {number} maxTitleLines The max number of vertical lines before cutting event title
  * @returns {string} The transformed title.
  */
	titleTransform(title, titleReplace, wrapEvents, maxTitleLength, maxTitleLines) {
		for (var needle in titleReplace) {
			var replacement = titleReplace[needle];

			var regParts = needle.match(/^\/(.+)\/([gim]*)$/);
			if (regParts) {
				// the parsed pattern is a regexp.
				needle = new RegExp(regParts[1], regParts[2]);
			}

			title = title.replace(needle, replacement);
		}

		title = this.shorten(title, maxTitleLength, wrapEvents, maxTitleLines);
		return title;
	},

	/**
  * Broadcasts the events to all other modules for reuse.
  * The all events available in one array, sorted on startdate.
  */
	broadcastEvents() {
		var eventList = [];
		for (var url in this.calendarData) {
			var _iteratorNormalCompletion6 = true;
			var _didIteratorError6 = false;
			var _iteratorError6 = undefined;

			try {
				for (var _iterator6 = this.calendarData[url][Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
					var ev = _step6.value;

					var _event2 = cloneObject(ev);
					_event2.symbol = this.symbolsForEvent(_event2);
					_event2.calendarName = this.calendarNameForUrl(url);
					_event2.color = this.colorForUrl(url);
					delete _event2.url;
					eventList.push(_event2);
				}
			} catch (err) {
				_didIteratorError6 = true;
				_iteratorError6 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion6 && _iterator6["return"]) {
						_iterator6["return"]();
					}
				} finally {
					if (_didIteratorError6) {
						throw _iteratorError6;
					}
				}
			}
		}

		eventList.sort(function (a, b) {
			return a.startDate - b.startDate;
		});

		this.sendNotification("CALENDAR_EVENTS", eventList);
	}
});
