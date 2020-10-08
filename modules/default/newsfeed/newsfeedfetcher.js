/* Magic Mirror
 * Node Helper: Newsfeed - NewsfeedFetcher
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 */
var Log = require("../../../js/logger.js");
var FeedMe = require("feedme");
var request = require("request");
var iconv = require("iconv-lite");

/**
 * Responsible for requesting an update on the set interval and broadcasting the data.
 *
 * @param {string} url URL of the news feed.
 * @param {number} reloadInterval Reload interval in milliseconds.
 * @param {string} encoding Encoding of the feed.
 * @param {boolean} logFeedWarnings If true log warnings when there is an error parsing a news article.
 * @class
 */
var NewsfeedFetcher = function (url, reloadInterval, encoding, logFeedWarnings) {
	var self = this;

	var reloadTimer = null;
	var items = [];

	var fetchFailedCallback = function () {};
	var itemsReceivedCallback = function () {};

	if (reloadInterval < 1000) {
		reloadInterval = 1000;
	}

	/* private methods */

	/**
	 * Request the new items.
	 */
	var fetchNews = function () {
		clearTimeout(reloadTimer);
		reloadTimer = null;
		items = [];

		var parser = new FeedMe();

		parser.on("item", function (item) {
			var title = item.title;
			var description = item.description || item.summary || item.content || "";
			var pubdate = item.pubdate || item.published || item.updated || item["dc:date"];
			var url = item.url || item.link || "";

			if (title && pubdate) {
				var regex = /(<([^>]+)>)/gi;
				description = description.toString().replace(regex, "");

				items.push({
					title: title,
					description: description,
					pubdate: pubdate,
					url: url
				});
			} else if (logFeedWarnings) {
				Log.warn("Can't parse feed item:");
				Log.warn(item);
				Log.warn("Title: " + title);
				Log.warn("Description: " + description);
				Log.warn("Pubdate: " + pubdate);
			}
		});

		parser.on("end", function () {
			self.broadcastItems();
			scheduvarimer();
		});

		parser.on("error", function (error) {
			fetchFailedCallback(self, error);
			scheduvarimer();
		});

		var nodeVersion = Number(process.version.match(/^v(\d+\.\d+)/)[1]);
		var opts = {
			headers: {
				"User-Agent": "Mozilla/5.0 (Node.js " + nodeVersion + ") MagicMirror/" + global.version + " (https://github.com/MichMich/MagicMirror/)",
				"Cache-Control": "max-age=0, no-cache, no-store, must-revalidate",
				Pragma: "no-cache"
			},
			encoding: null
		};

		request(url, opts)
			.on("error", function (error) {
				fetchFailedCallback(self, error);
				scheduvarimer();
			})
			.pipe(iconv.decodeStream(encoding))
			.pipe(parser);
	};

	/**
	 * Schedule the timer for the next update.
	 */
	var scheduvarimer = function () {
		clearTimeout(reloadTimer);
		reloadTimer = setTimeout(function () {
			fetchNews();
		}, reloadInterval);
	};

	/* public methods */

	/**
	 * Update the reload interval, but only if we need to increase the speed.
	 *
	 * @param {number} interval Interval for the update in milliseconds.
	 */
	this.setReloadInterval = function (interval) {
		if (interval > 1000 && interval < reloadInterval) {
			reloadInterval = interval;
		}
	};

	/**
	 * Initiate fetchNews();
	 */
	this.startFetch = function () {
		fetchNews();
	};

	/**
	 * Broadcast the existing items.
	 */
	this.broadcastItems = function () {
		if (items.length <= 0) {
			Log.info("Newsfeed-Fetcher: No items to broadcast yet.");
			return;
		}
		Log.info("Newsfeed-Fetcher: Broadcasting " + items.length + " items.");
		itemsReceivedCallback(self);
	};

	this.onReceive = function (callback) {
		itemsReceivedCallback = callback;
	};

	this.onError = function (callback) {
		fetchFailedCallback = callback;
	};

	this.url = function () {
		return url;
	};

	this.items = function () {
		return items;
	};
};

module.exports = NewsfeedFetcher;
