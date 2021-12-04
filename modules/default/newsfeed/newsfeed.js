/* Magic Mirror
 * Module: NewsFeed
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 */
"use strict";

Module.register("newsfeed", {
	// Default module config.
	defaults: {
        feeds: [],
        showAsList: false,
        showSourceTitle: true,
        showPublishDate: true,
        broadcastNewsFeeds: true,
        broadcastNewsUpdates: true,
        showDescription: false,
        wrapTitle: true,
        wrapDescription: true,
        truncDescription: true,
        lengthDescription: 300,
        hideLoading: false,
        reloadInterval: 5 * 60 * 1000, // every 5 minutes
        updateInterval: 10 * 1000,
        animationSpeed: config.animation,
        maxNewsItems: 1, // 0 for unlimited
        ignoreOldItems: false,
        ignoreOlderThan: 24 * 60 * 60 * 1000, // 1 day
        removeStartTags: "",
        removeEndTags: "",
        startTags: [],
        endTags: [],
        prohibitedWords: [],
        scrollLength: 500,
        logFeedWarnings: false
	},

    // Define required scripts.
    getScripts: function () {
        return ["moment.js"];
    },

    //Define required styles.
    getStyles: function () {
        return ["newsfeed.css"];
    },

    // Define required translations.
    getTranslations: function () {
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
        this.isShowingDescription = this.config.showDescription;
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
        }
        else if (notification === "NEWSFEED_ERROR") {
            this.error = this.translate(payload.error_type);
            this.scheduleUpdateInterval();
        }
    },

    //Override fetching of template name
    getTemplate: function () {
        if (this.config.feedUrl) {
            return "oldconfig.njk";
        }
        else if (this.config.showFullArticle) {
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
        var item = this.newsItems[this.activeItem];
        var items = this.newsItems.map(function (item) {
            item.publishDate = moment(new Date(item.pubdate)).fromNow();
            return item;
        });
        return {
            loaded: true,
            config: this.config,
            sourceTitle: item.sourceTitle,
            publishDate: moment(new Date(item.pubdate)).fromNow(),
            title: item.title,
            description: item.description,
            items: items
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
        var self = this;
        var newsItems = [];
        for (var feed in feeds) {
            var feedItems = feeds[feed];
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
            var dateA = new Date(a.pubdate);
            var dateB = new Date(b.pubdate);
            return dateB - dateA;
        });
        if (this.config.maxNewsItems > 0) {
            newsItems = newsItems.slice(0, this.config.maxNewsItems);
        }
        if (this.config.prohibitedWords.length > 0) {
            newsItems = newsItems.filter(function (item) {
                for (var word of this.config.prohibitedWords) {
                    if (item.title.toLowerCase().indexOf(word.toLowerCase()) > -1) {
                        return false;
                    }
                }
                return true;
            }, this);
        }
        newsItems.forEach(function (item) {
            //Remove selected tags from the beginning of rss feed items (title or description)
            if (self.config.removeStartTags === "title" || self.config.removeStartTags === "both") {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = self.config.startTags[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var startTag = _step.value;

                        if (item.title.slice(0, startTag.length) === startTag) {
                            item.title = item.title.slice(startTag.length, item.title.length);
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
            }

            if (self.config.removeStartTags === "description" || self.config.removeStartTags === "both") {
                if (self.isShowingDescription) {
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = self.config.startTags[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var startTag = _step2.value;

                            if (item.description.slice(0, startTag.length) === startTag) {
                                item.description = item.description.slice(startTag.length, item.description.length);
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
                }
            }

            //Remove selected tags from the end of rss feed items (title or description)

            if (self.config.removeEndTags) {
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = self.config.endTags[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var endTag = _step3.value;

                        if (item.title.slice(-endTag.length) === endTag) {
                            item.title = item.title.slice(0, -endTag.length);
                        }
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

                if (self.isShowingDescription) {
                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = undefined;

                    try {
                        for (var _iterator4 = self.config.endTags[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            var endTag = _step4.value;

                            if (item.description.slice(-endTag.length) === endTag) {
                                item.description = item.description.slice(0, -endTag.length);
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
                }
            }
        });
        // get updated news items and broadcast them
        var updatedItems = [];
        newsItems.forEach(function (value) {
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
        var self = this;
        this.updateDom(this.config.animationSpeed);
        // Broadcast NewsFeed if needed
        if (this.config.broadcastNewsFeeds) {
            this.sendNotification("NEWS_FEED", { items: this.newsItems });
        }

        // #2638 Clear timer if it already exists
        if (this.timer) {
            clearInterval(this.timer);
        }

        this.timer = setInterval(function () {
            self.activeItem++;
            self.updateDom(self.config.animationSpeed);
            // Broadcast NewsFeed if needed
            if (self.config.broadcastNewsFeeds) {
                self.sendNotification("NEWS_FEED", { items: self.newsItems });
            }
        }, this.config.updateInterval);
    },

    resetDescrOrFullArticleAndTimer: function () {
        this.isShowingDescription = this.config.showDescription;
        this.config.showFullArticle = false;
        this.scrollPosition = 0;
        // reset bottom bar alignment
        document.getElementsByClassName("region bottom bar")[0].classList.remove("newsfeed-fullarticle");
        if (!this.timer) {
            this.scheduleUpdateInterval();
        }
    },

    notificationReceived: function (notification, payload, sender) {
        var before = this.activeItem;
        if (notification === "MODULE_DOM_CREATED" && this.config.hideLoading) {
            this.hide();
        }
        else if (notification === "ARTICLE_NEXT") {
            this.activeItem++;
            if (this.activeItem >= this.newsItems.length) {
                this.activeItem = 0;
            }
            this.resetDescrOrFullArticleAndTimer();
            Log.debug(this.name + " - going from article #" + before + " to #" + this.activeItem + " (of " + this.newsItems.length + ")");
            this.updateDom(100);
        }
        else if (notification === "ARTICLE_PREVIOUS") {
            this.activeItem--;
            if (this.activeItem < 0) {
                this.activeItem = this.newsItems.length - 1;
            }
            this.resetDescrOrFullArticleAndTimer();
            Log.debug(this.name + " - going from article #" + before + " to #" + this.activeItem + " (of " + this.newsItems.length + ")");
            this.updateDom(100);
        }
        else if (notification === "ARTICLE_MORE_DETAILS") {
            // full article is already showing, so scrolling down
            if (this.config.showFullArticle === true) {
                this.scrollPosition += this.config.scrollLength;
                window.scrollTo(0, this.scrollPosition);
                Log.debug(this.name + " - scrolling down");
                Log.debug(this.name + " - ARTICLE_MORE_DETAILS, scroll position: " + this.config.scrollLength);
            }
            else {
                this.showFullArticle();
            }
        }
        else if (notification === "ARTICLE_SCROLL_UP") {
            if (this.config.showFullArticle === true) {
                this.scrollPosition -= this.config.scrollLength;
                window.scrollTo(0, this.scrollPosition);
                Log.debug(this.name + " - scrolling up");
                Log.debug(this.name + " - ARTICLE_SCROLL_UP, scroll position: " + this.config.scrollLength);
            }
        }
        else if (notification === "ARTICLE_LESS_DETAILS") {
            this.resetDescrOrFullArticleAndTimer();
            Log.debug(this.name + " - showing only article titles again");
            this.updateDom(100);
        }
        else if (notification === "ARTICLE_TOGGLE_FULL") {
            if (this.config.showFullArticle) {
                this.activeItem++;
                this.resetDescrOrFullArticleAndTimer();
            }
            else {
                this.showFullArticle();
            }
        }
        else if (notification === "ARTICLE_INFO_REQUEST") {
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
        this.isShowingDescription = !this.isShowingDescription;
        this.config.showFullArticle = !this.isShowingDescription;
        // make bottom bar align to top to allow scrolling
        if (this.config.showFullArticle === true) {
            document.getElementsByClassName("region bottom bar")[0].classList.add("newsfeed-fullarticle");
        }
        clearInterval(this.timer);
        this.timer = null;
        Log.debug(this.name + " - showing " + this.isShowingDescription ? "article description" : "full article");
        this.updateDom(100);
    }
});