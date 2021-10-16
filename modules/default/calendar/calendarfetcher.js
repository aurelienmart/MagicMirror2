/* Magic Mirror
 * Node Helper: Calendar - CalendarFetcher
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 */
"use strict";

var CalendarUtils = require("./calendarutils");
var Log = require("logger");
var NodeHelper = require("node_helper");
var ical = require("node-ical");
var fetch = require("node-fetch");
var digest = require("digest-fetch");
var https = require("https");

/**
 *
 * @param {string} url The url of the calendar to fetch
 * @param {number} reloadInterval Time in ms the calendar is fetched again
 * @param {string[]} excludedEvents An array of words / phrases from event titles that will be excluded from being shown.
 * @param {number} maximumEntries The maximum number of events fetched.
 * @param {number} maximumNumberOfDays The maximum number of days an event should be in the future.
 * @param {object} auth The object containing options for authentication against the calendar.
 * @param {boolean} includePastEvents If true events from the past maximumNumberOfDays will be fetched too
 * @param {boolean} selfSignedCert If true, the server certificate is not verified against the list of supplied CAs.
 * @class
 */
var CalendarFetcher = function(url, reloadInterval, excludedEvents, maximumEntries, maximumNumberOfDays, auth, includePastEvents, selfSignedCert) {
	var self = this;

	var reloadTimer = null;
	var events = [];

	var fetchFailedCallback = function() {};
	var eventsReceivedCallback = function() {};

	/**
  * Initiates calendar fetch.
  */
	var fetchCalendar = function() {
		clearTimeout(reloadTimer);
		reloadTimer = null;
		var nodeVersion = Number(process.version.match(/^v(\d+\.\d+)/)[1]);
		var fetcher = null;
		var httpsAgent = null;
		var headers = {
			"User-Agent": "Mozilla/5.0 (Node.js " + nodeVersion + ") MagicMirror/" + global.version + " (https://github.com/MichMich/MagicMirror/)"
		};

		if (selfSignedCert) {
			httpsAgent = new https.Agent({
				rejectUnauthorized: false
			});
		}
		if (auth) {
			if (auth.method === "bearer") {
				headers.Authorization = "Bearer " + auth.pass;
			} else if (auth.method === "digest") {
				fetcher = new digest(auth.user, auth.pass).fetch(url, { headers: headers, agent: httpsAgent });
			} else {
				headers.Authorization = "Basic " + Buffer.from(auth.user + ":" + auth.pass).toString("base64");
			}
		}
		if (fetcher === null) {
			fetcher = fetch(url, { headers: headers, agent: httpsAgent });
		}

		fetcher.then(NodeHelper.checkFetchStatus).then(function (response) {
			return response.text();
		}).then(function (responseData) {
			var data = [];

			try {
				data = ical.parseICS(responseData);
				Log.debug("parsed data=" + JSON.stringify(data));
				events = CalendarUtils.filterEvents(data, {
					excludedEvents: excludedEvents,
					includePastEvents: includePastEvents,
					maximumEntries: maximumEntries,
					maximumNumberOfDays: maximumNumberOfDays
				});
			} catch (error) {
				fetchFailedCallback(self, error);
				scheduleTimer();
				return;
			}
			self.broadcastEvents();
			scheduleTimer();
		})
			.catch(function(error) {
				fetchFailedCallback(this, error);
				scheduleTimer();
		});
	};

	/**
  * Schedule the timer for the next update.
  */
	var scheduleTimer = function() {
		clearTimeout(reloadTimer);
		reloadTimer = setTimeout(function () {
			fetchCalendar();
		}, reloadInterval);
	};

	/* public methods */

	/**
  * Initiate fetchCalendar();
  */
	this.startFetch = function() {
		fetchCalendar();
	};

	/**
  * Broadcast the existing events.
  */
	this.broadcastEvents = function() {
		Log.info("Calendar-Fetcher: Broadcasting " + events.length + " events.");
		eventsReceivedCallback(this);
	};

	/**
  * Sets the on success callback
  *
  * @param {Function} callback The on success callback.
  */
	this.onReceive = function(callback) {
		eventsReceivedCallback = callback;
	};

	/**
  * Sets the on error callback
  *
  * @param {Function} callback The on error callback.
  */
	this.onError = function(callback) {
		fetchFailedCallback = callback;
	};

	/**
  * Returns the url of this fetcher.
  *
  * @returns {string} The url of this fetcher.
  */
	this.url = function() {
		return url;
	};

	/**
  * Returns current available events for this fetcher.
  *
  * @returns {object[]} The current available events for this fetcher.
  */
	this.events = function() {
		return events;
	};
};

module.exports = CalendarFetcher;