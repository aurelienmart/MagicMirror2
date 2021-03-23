/* Magic Mirror
 * Module: NewsFeed
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 */
Module.register("newsfeed", {
	// Default module config.
	defaults: {
		animationSpeed: config.animation,
	},

	// Define required scripts.
	getScripts() {
		return ["moment.js"];
	},

	// Define required styles.
	getStyles() {
		return ["newsfeed.css"];
	},

	// Define required translations.
	getTranslations() {
		// The translations for the default modules are defined in the core translation files.
		// Therefor we can just return false. Otherwise we should have returned a dictionary.
		// If you're trying to build your own module including translations, check out the documentation.
		return false;
	},

	// Define start sequence.
	start: function () {
		Log.info("Starting module: " + this.name);

		// Set locale.
		moment.locale(config.language);

		this.newsItems = [];
		this.loaded = false;
		this.error = null;
		this.activeItem = 0;
		this.scrollPosition = 0;
		this.registerFeeds();
	},

	// Override socket notification handler.
	socketNotificationReceived: function (notification, payload) {
		if (notification === "NEWS_ITEMS") {
			this.generateFeed(payload);

			if (!this.loaded) {
				if (this.config.hideLoading) {
					this.show();
				}
				this.scheduleUpdateInterval();
			}

			this.loaded = true;
			this.error = null;
		} else if (notification === "INCORRECT_URL") {
			this.error = `Incorrect url: ${payload.url}`;
			this.scheduleUpdateInterval();
		}
	},

	// Override dom generator. Keep for compatibility.
	getDom: function () {
		const wrapper = document.createElement("div");

		if (this.config.feedUrl) {
			wrapper.className = "small bright";
			wrapper.innerHTML = this.translate("MODULE_CONFIG_CHANGED", { MODULE_NAME: "Newsfeed" });
			return wrapper;
		}

		if (this.activeItem >= this.newsItems.length) {
			this.activeItem = 0;
		}

		if (this.newsItems.length > 0) {
			// this.config.showFullArticle is a run-time configuration, triggered by optional notifications
			if (!this.config.showFullArticle && (this.config.showSourceTitle || this.config.showPublishDate)) {
				const sourceAndTimestamp = document.createElement("div");
				sourceAndTimestamp.className = "newsfeed-source light small dimmed";

				if (this.config.showSourceTitle && this.newsItems[this.activeItem].sourceTitle !== "") {
					sourceAndTimestamp.innerHTML = this.newsItems[this.activeItem].sourceTitle;
				}
				if (this.config.showSourceTitle && this.newsItems[this.activeItem].sourceTitle !== "" && this.config.showPublishDate) {
					sourceAndTimestamp.innerHTML += ", ";
				}
				if (this.config.showPublishDate) {
					sourceAndTimestamp.innerHTML += moment(new Date(this.newsItems[this.activeItem].pubdate)).fromNow();
				}
				if ((this.config.showSourceTitle && this.newsItems[this.activeItem].sourceTitle !== "") || this.config.showPublishDate) {
					sourceAndTimestamp.innerHTML += ":";
				}

				wrapper.appendChild(sourceAndTimestamp);
			}

			//Remove selected tags from the beginning of rss feed items (title or description)

			if (this.config.removeStartTags === "title" || this.config.removeStartTags === "both") {
				for (let f = 0; f < this.config.startTags.length; f++) {
					if (this.newsItems[this.activeItem].title.slice(0, this.config.startTags[f].length) === this.config.startTags[f]) {
						this.newsItems[this.activeItem].title = this.newsItems[this.activeItem].title.slice(this.config.startTags[f].length, this.newsItems[this.activeItem].title.length);
					}
				}
			}

			if (this.config.removeStartTags === "description" || this.config.removeStartTags === "both") {
				if (this.config.showDescription) {
					for (let f = 0; f < this.config.startTags.length; f++) {
						if (this.newsItems[this.activeItem].description.slice(0, this.config.startTags[f].length) === this.config.startTags[f]) {
							this.newsItems[this.activeItem].description = this.newsItems[this.activeItem].description.slice(this.config.startTags[f].length, this.newsItems[this.activeItem].description.length);
						}
					}
				}
			}

			//Remove selected tags from the end of rss feed items (title or description)

			if (this.config.removeEndTags) {
				for (let f = 0; f < this.config.endTags.length; f++) {
					if (this.newsItems[this.activeItem].title.slice(-this.config.endTags[f].length) === this.config.endTags[f]) {
						this.newsItems[this.activeItem].title = this.newsItems[this.activeItem].title.slice(0, -this.config.endTags[f].length);
					}
				}

				if (this.config.showDescription) {
					for (let f = 0; f < this.config.endTags.length; f++) {
						if (this.newsItems[this.activeItem].description.slice(-this.config.endTags[f].length) === this.config.endTags[f]) {
							this.newsItems[this.activeItem].description = this.newsItems[this.activeItem].description.slice(0, -this.config.endTags[f].length);
						}
					}
				}
			}

			if (!this.config.showFullArticle) {
				const title = document.createElement("div");
				title.className = "newsfeed-title bright medium light" + (!this.config.wrapTitle ? " no-wrap" : "");
				title.innerHTML = this.newsItems[this.activeItem].title;
				wrapper.appendChild(title);
			}

			if (this.config.showDescription) {
				const description = document.createElement("div");
				description.className = "newsfeed-desc small light" + (!this.config.wrapDescription ? " no-wrap" : "");
				const txtDesc = this.newsItems[this.activeItem].description;
				description.innerHTML = this.config.truncDescription ? (txtDesc.length > this.config.lengthDescription ? txtDesc.substring(0, this.config.lengthDescription) + "..." : txtDesc) : txtDesc;
				wrapper.appendChild(description);
			}

			if (this.config.showFullArticle) {
				const fullArticle = document.createElement("iframe");
				fullArticle.className = "";
				fullArticle.style.width = "100vw";
				// very large height value to allow scrolling
				fullArticle.height = "3000";
				fullArticle.style.height = "3000";
				fullArticle.style.top = "0";
				fullArticle.style.left = "0";
				fullArticle.style.border = "none";
				fullArticle.src = this.getActiveItemURL();
				fullArticle.style.zIndex = 1;
				wrapper.appendChild(fullArticle);
			}

			if (this.config.hideLoading) {
				this.show();
			}
		} else {
			if (this.config.hideLoading) {
				this.hide();
			} else {
				wrapper.innerHTML = this.translate("LOADING");
				wrapper.className = "small dimmed";
			}
		}

		return wrapper;
	},

	//Override fetching of template name
	getTemplate: function () {
		if (this.config.feedUrl) {
			return "oldconfig.njk";
		} else if (this.config.showFullArticle) {
			return "fullarticle.njk";
		}
		return "newsfeed.njk";
	},

	//Override template data and return whats used for the current template
	getTemplateData: function () {
		// this.config.showFullArticle is a run-time configuration, triggered by optional notifications
		if (this.config.showFullArticle) {
			return {
				url: this.getActiveItemURL()
			};
		}
		if (this.error) {
			return {
				error: this.error
			};
		}
		if (this.newsItems.length === 0) {
			return {
				loaded: false
			};
		}
		if (this.activeItem >= this.newsItems.length) {
			this.activeItem = 0;
		}

		const item = this.newsItems[this.activeItem];

		return {
			loaded: true,
			config: this.config,
			sourceTitle: item.sourceTitle,
			publishDate: moment(new Date(item.pubdate)).fromNow(),
			title: item.title,
			description: item.description
		};
	},

	getActiveItemURL: function () {
		return typeof this.newsItems[this.activeItem].url === "string" ? this.newsItems[this.activeItem].url : this.newsItems[this.activeItem].url.href;
	},

	/**
	 * Registers the feeds to be used by the backend.
	 */
	registerFeeds: function () {
		for (var feed of this.config.feeds) {
			this.sendSocketNotification("ADD_FEED", {
				feed: feed,
				config: this.config
			});
		}
	},

	/**
	 * Generate an ordered list of items for this configured module.
	 *
	 * @param {object} feeds An object with feeds returned by the node helper.
	 */
	generateFeed: function (feeds) {
		var newsItems = [];
		for (var feed in feeds) {
			const feedItems = feeds[feed];
			if (this.subscribedToFeed(feed)) {
				for (var item of feedItems) {
					item.sourceTitle = this.titleForFeed(feed);
					if (!(this.config.ignoreOldItems && Date.now() - new Date(item.pubdate) > this.config.ignoreOlderThan)) {
						newsItems.push(item);
					}
				}
			}
		}
		newsItems.sort(function (a, b) {
			const dateA = new Date(a.pubdate);
			const dateB = new Date(b.pubdate);
			return dateB - dateA;
		});
		if (this.config.maxNewsItems > 0) {
			newsItems = newsItems.slice(0, this.config.maxNewsItems);
		}

		if (this.config.prohibitedWords.length > 0) {
			newsItems = newsItems.filter(function (value) {
				for (var word of this.config.prohibitedWords) {
					if (value["title"].toLowerCase().indexOf(word.toLowerCase()) > -1) {
						return false;
					}
				}
				return true;
			}, this);
		}

		var self = this;
		newsItems.forEach(function(item) {
			//Remove selected tags from the beginning of rss feed items (title or description)
			if (self.config.removeStartTags === "title" || self.config.removeStartTags === "both") {
				for (var startTag of self.config.startTags) {
					if (item.title.slice(0, startTag.length) === startTag) {
						item.title = item.title.slice(startTag.length, item.title.length);
					}
				}
			}

			if (self.config.removeStartTags === "description" || self.config.removeStartTags === "both") {
				if (self.config.showDescription) {
					for (var startTag of this.config.startTags) {
						if (item.description.slice(0, startTag.length) === startTag) {
							item.description = item.description.slice(startTag.length, item.description.length);
						}
					}
				}
			}

			//Remove selected tags from the end of rss feed items (title or description)

			if (self.config.removeEndTags) {
				for (var endTag of this.config.endTags) {
					if (item.title.slice(-endTag.length) === endTag) {
						item.title = item.title.slice(0, -endTag.length);
					}
				}

				if (self.config.showDescription) {
					for (var endTag of this.config.endTags) {
						if (item.description.slice(-endTag.length) === endTag) {
							item.description = item.description.slice(0, -endTag.length);
						}
					}
				}
			}
		});

		// get updated news items and broadcast them
		const updatedItems = [];
		newsItems.forEach(function(value) {
			if (self.newsItems.findIndex(function (value1) { return value1 === value; }) === -1) {
			    // Add item to updated items list
			    updatedItems.push(value);
			}
		});

		// check if updated items exist, if so and if we should broadcast these updates, then lets do so
		if (this.config.broadcastNewsUpdates && updatedItems.length > 0) {
			this.sendNotification("NEWS_FEED_UPDATE", { items: updatedItems });
		}

		this.newsItems = newsItems;
	},

	/**
	 * Check if this module is configured to show this feed.
	 *
	 * @param {string} feedUrl Url of the feed to check.
	 * @returns {boolean} True if it is subscribed, false otherwise
	 */
	subscribedToFeed: function (feedUrl) {
		for (var feed of this.config.feeds) {
			if (feed.url === feedUrl) {
				return true;
			}
		}
		return false;
	},

	/**
	 * Returns title for the specific feed url.
	 *
	 * @param {string} feedUrl Url of the feed
	 * @returns {string} The title of the feed
	 */
	titleForFeed: function (feedUrl) {
		for (var feed of this.config.feeds) {
			if (feed.url === feedUrl) {
				return feed.title || "";
			}
		}
		return "";
	},

	/**
	 * Schedule visual update.
	 */
	scheduleUpdateInterval: function () {
		this.updateDom(this.config.animationSpeed);

		// Broadcast NewsFeed if needed
		if (this.config.broadcastNewsFeeds) {
			this.sendNotification("NEWS_FEED", { items: this.newsItems });
		}

		var self = this;
		this.timer = setInterval(function() {
			self.activeItem++;
			self.updateDom(this.config.animationSpeed);

			// Broadcast NewsFeed if needed
			if (self.config.broadcastNewsFeeds) {
				self.sendNotification("NEWS_FEED", { items: this.newsItems });
			}
		}, self.config.updateInterval);
	},

	resetDescrOrFullArticleAndTimer: function () {
		this.config.showDescription = this.config.showDescription;
		this.config.showFullArticle = false;
		this.scrollPosition = 0;
		// reset bottom bar alignment
		document.getElementsByClassName("region bottom bar")[0].classList.remove("newsfeed-fullarticle");
		if (!this.timer) {
			this.scheduleUpdateInterval();
		}
	},

	notificationReceived: function (notification, payload, sender) {
		const before = this.activeItem;
		if (notification === "MODULE_DOM_CREATED" && this.config.hideLoading) {
			this.hide();
		} else if (notification === "ARTICLE_NEXT") {
			this.activeItem++;
			if (this.activeItem >= this.newsItems.length) {
				this.activeItem = 0;
			}
			this.resetDescrOrFullArticleAndTimer();
			Log.debug(this.name + " - going from article #" + before + " to #" + this.activeItem + " (of " + this.newsItems.length + ")");
			this.updateDom(100);
		} else if (notification === "ARTICLE_PREVIOUS") {
			this.activeItem--;
			if (this.activeItem < 0) {
				this.activeItem = this.newsItems.length - 1;
			}
			this.resetDescrOrFullArticleAndTimer();
			Log.debug(this.name + " - going from article #" + before + " to #" + this.activeItem + " (of " + this.newsItems.length + ")");
			this.updateDom(100);
		}
		// if "more details" is received the first time: show article summary, on second time show full article
		else if (notification === "ARTICLE_MORE_DETAILS") {
			// full article is already showing, so scrolling down
			if (this.config.showFullArticle === true) {
				this.scrollPosition += this.config.scrollLength;
				window.scrollTo(0, this.scrollPosition);
				Log.debug(this.name + " - scrolling down");
				Log.debug(this.name + " - ARTICLE_MORE_DETAILS, scroll position: " + this.config.scrollLength);
			} else {
				this.showFullArticle();
			}
		} else if (notification === "ARTICLE_SCROLL_UP") {
			if (this.config.showFullArticle === true) {
				this.scrollPosition -= this.config.scrollLength;
				window.scrollTo(0, this.scrollPosition);
				Log.debug(this.name + " - scrolling up");
				Log.debug(this.name + " - ARTICLE_SCROLL_UP, scroll position: " + this.config.scrollLength);
			}
		} else if (notification === "ARTICLE_LESS_DETAILS") {
			this.resetDescrOrFullArticleAndTimer();
			Log.debug(this.name + " - showing only article titles again");
			this.updateDom(100);
		} else if (notification === "ARTICLE_TOGGLE_FULL") {
			if (this.config.showFullArticle) {
				this.activeItem++;
				this.resetDescrOrFullArticleAndTimer();
			} else {
				this.showFullArticle();
			}
		} else if (notification === "ARTICLE_INFO_REQUEST") {
			this.sendNotification("ARTICLE_INFO_RESPONSE", {
				title: this.newsItems[this.activeItem].title,
				source: this.newsItems[this.activeItem].sourceTitle,
				date: this.newsItems[this.activeItem].pubdate,
				desc: this.newsItems[this.activeItem].description,
				url: this.getActiveItemURL()
			});
		}
	},

	showFullArticle: function () {
		this.config.showDescription = !this.config.showDescription;
		this.config.showFullArticle = !this.config.showDescription;
		// make bottom bar align to top to allow scrolling
		if (this.config.showFullArticle === true) {
			document.getElementsByClassName("region bottom bar")[0].classList.add("newsfeed-fullarticle");
		}
		clearInterval(this.timer);
		this.timer = null;
		Log.debug(this.name + " - showing " + this.config.showDescription ? "article description" : "full article");
		this.updateDom(100);
	}
});