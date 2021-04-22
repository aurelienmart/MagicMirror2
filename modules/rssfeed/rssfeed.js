/* Magic Mirror
 *
 * MIT Licensed.
 *
 * Redesigned by Răzvan Cristea
 * for iPad 3 & HD display
 * https://github.com/hangorazvan
 */
Module.register("rssfeed", {

	defaults: {},

	getScripts: function() {
		return ["jquery.js"];
	},

	getStyles: function () {
		return ["font-awesome.css"];
	},
	
	start: function() {
		Log.info("Starting module: " + this.name);
			this.newsfeed();
	},

	getDom: function() {
		var wrapper = document.createElement("div");
		wrapper.className = "feed normal";
		var RSS = document.createElement("span");
		RSS.className = "RSS dimmed";
		wrapper.appendChild(RSS);
		var source = document.createElement("span");
		source.className = "source dimmed";
		wrapper.appendChild(source);
		var news = document.createElement("span");
		news.className = "news bright";
		wrapper.appendChild(news);
		var story = document.createElement("span");
		story.className = "story normal";
		wrapper.appendChild(story);
		var dots = document.createElement("span");
		dots.className = "dots shade";
		wrapper.appendChild(dots);
		return wrapper;
	},

	newsfeed: function() {
		var lengthDescription = this.config.lengthDescription;
		var fetchNewsTime = this.config.fetchNewsTime;
		var feedURLs = this.config.feedURLs;
		var feedMaxAge = this.config.feedMaxAge;
		
		$.fn.updateWithTextForce = function(text, speed, force) {
			var news = $("<div/>").html(text);
			if (force || ($(this).html() != news.html())) {
				$(this).fadeOut(speed/2, function() {
					$(this).html(text);
					$(this).fadeIn(speed/2, function() {
					});
				});
			}
		};
		if(typeof feedURLs == "undefined") {
			if(typeof feed == "undefined")
				feedURLs;
			else
				feedURLs = {"News" : feed};
		}
		$(document).ready(function($) {
			var news = [];
			var newsFeedIndex = 0;
			var newsStoryIndex = 0;
			for(var key in feedURLs) {
				news.push(new Array(0));
			}
			function fetchNews() {
				var cachebuster = new Date().getTime();
				var index = 0;
				for(var key in feedURLs) {
					var url = feedURLs[key] + "&_nocache=" + cachebuster;
					fetchNewsForURL(index++, "php/rssfeed.php?url=" + encodeURI(url));
				}
				setTimeout(fetchNews, fetchNewsTime);
			} fetchNews();
			function fetchNewsForURL(index, url) {
				$.get(url, function(rssData, textStatus) {
					var oldestDate = moment().subtract(feedMaxAge.days, "days").subtract(feedMaxAge.hours, "hours");
					var stories = [];
					$(rssData).find("item").each(function() {
						addStoryForFeed(stories, oldestDate, $(this));
					});
					$(rssData).find("entry").each(function() {
						addStoryForFeed(stories, oldestDate, $(this));
					});
					news[ index ] = stories;
					var newsCountTotal = 0;
					for(var i=0; i < news.length; i++) {
						newsCountTotal += news[i].length;
					}
					var rssinfo = newsCountTotal + " stiri din " + news.length + " surse";
				//	$(".RSS").updateWithTextForce(rssinfo, 2000);
				});
			}
			function addStoryForFeed(stories, oldestDate, story) {
				var pubDate = moment(story.find("pubDate").text(), "HH:mm:ss Z");
				var title = story.find("title").text().replace("VIDEO","").replace("FOTO","");
				var desc = story.find("description").text().substring(0,600).trim().replace("div>","span>").replace("<br","<base").replace(/&#8230;|]]>/,"...").replace(/--|__/,"");
				var counter = "<span class=\"count\">" + (title.length + desc.length) + "</span>";
				var update = "<span class=\"update\">(" + counter + "/" + moment().format("HH:mm") + ")</span>";
				if(oldestDate.diff(pubDate) < 0) {
					stories.push("<span class=\"date\"> - " + pubDate.toNow().replace("peste","în urmă cu") + ":</span><br><span class=\"title\">" + title + "</span> &bull; <span class=\"desc\">" + desc + "</span>");
				}
			}(
			function showNews() {
				var initialFeed = newsFeedIndex;
				if(news.length === 0) {
					return;
				}
				for(var i=0; i < news.length+1; i++) {
					var newsFeed = news[newsFeedIndex];
					if(newsFeed === undefined)
						continue;
					if(newsFeed.length === 0) {
						if(++newsFeedIndex == news.length)
							newsFeedIndex = 0;
						newsStoryIndex = 0;
						continue;
					}
					if(newsStoryIndex >= newsFeed.length) {
						newsStoryIndex = 0;
						if(++newsFeedIndex >= news.length) {
							newsFeedIndex = 0;
							continue;
						}
					}
				}
				if(news[newsFeedIndex].length === 0) {
					setTimeout(showNews, 2000);
					return;
				}
				i = 0;
				for(var key in feedURLs) {
					if(i == newsFeedIndex)
						break;
					i++;
				}
				$(".source").updateWithTextForce("<i class=\"fa fa-rss-square\"></i> " + key, 2000, true);
				var dots = "";
				for(i=0; i < news.length; i++) {
					if(i == newsFeedIndex)
						dots += "";
					else
						dots += "";
				}
				dots += "";
				for(i=0; i < news[newsFeedIndex].length; i++) {
					if( i == newsStoryIndex)
						dots += "";
					else
						dots += "";
				}
			//	$(".dots").updateWithTextForce(dots, 2000, true);
				newsFeed = news[newsFeedIndex];
				newsStory = newsFeed[newsStoryIndex];
				var nextTimeout = 1000;
				if( typeof newsStory != "undefined") {
					$(".news").updateWithTextForce(newsStory, 2000);
					nextTimeout = 10000 + (newsStory.length * 100);
				}
				newsStoryIndex++;
				setTimeout(showNews, nextTimeout);
			})();
		});
	}
});