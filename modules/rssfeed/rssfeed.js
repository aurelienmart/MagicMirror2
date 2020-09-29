/* Magic Mirror
 *
 * https://github.com/jangellx/MagicMirror
 * MIT Licensed.
 *
 * Redesigned by Răzvan Cristea
 * for iPad 3 & HD display
 * https://github.com/hangorazvan
 */
var lang = "ro";
var feedURLs = {
//		"NewsIn"	: "https://newsin.ro/feed",
//		"Discovery"	: "https://discovery.ro/feed/",
//		"Agerpress"	: "https://www.agerpres.ro/home.rss",
//		"Digi24"	: "https://m.digi24.ro/rss",
		"ProTV"		: "https://rss.stirileprotv.ro",
		"Mediafax"	: "https://www.mediafax.ro/rss",
		"HotNews"	: "https://www.hotnews.ro/rss",
		"News.ro"	: "https://www.news.ro/rss",
		"MainNews"	: "https://mainnews.ro/feed",
		"Ziare.com"	: "https://www.ziare.com/rss/12h.xml"
	};
var feedMaxAge = {
        days: 0, 
        hours: 12
    };

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
if(typeof feedURLs == "undefined"){
	if(typeof feed == "undefined")
		var feedURLs;
	else
		var feedURLs = {"News" : feed};
}
$(document).ready(function($){
	var news = [];
	var newsFeedIndex  = 0;
	var newsStoryIndex = 0;
	for(var key in feedURLs){
		news.push(new Array(0));
	}
	function fetchNews(){
		var cachebuster = new Date().getTime();
		var index	   = 0;
		for(var key in feedURLs){
			var url = feedURLs[key] + "&_nocache=" + cachebuster;
			fetchNewsForURL(index++, "rssfeed.php?url=" + encodeURI(url));
		}
		setTimeout(fetchNews, 60 * 1000);
	}
	fetchNews();
	function fetchNewsForURL(index, url)
	{
		$.get( url, function(rssData, textStatus){
			var oldestDate = moment().subtract(feedMaxAge.days, "days").subtract(feedMaxAge.hours, "hours");
			var stories = [];
			$(rssData).find("item").each(function(){
				addStoryForFeed(stories, oldestDate, $(this));
			});
			$(rssData).find("entry").each(function(){
				addStoryForFeed(stories, oldestDate, $(this));
			});
			news[ index ] = stories;
			var newsCountTotal = 0;
			for(var i=0; i < news.length; i++){
				newsCountTotal += news[i].length;
			}
			var rssinfo = newsCountTotal + " stiri din " + news.length + " surse";
//			$(".RSS").updateWithTextForce(rssinfo, 2000);
		});
	}
	function addStoryForFeed(stories, oldestDate, story){
		var pubDate = moment(story.find("pubDate").text(), "ddd, DD MMM YYYY HH:mm:ss Z");
		var title = story.find("title").text().replace("VIDEO","").replace("FOTO","");
		var desc = story.find("description").text().substring(0,600).trim().replace("div>","span>").replace("<br","<base").replace(/&#8230;|]]>/,"...").replace(/--|__/,"");
		var counter = "<span class=\"count\">" + (title.length + desc.length) + "</span>";
		var update = "<span class=\"update\">(" + counter + "/" + moment().format("HH:mm") + ")</span>";
		if(oldestDate.diff(pubDate) < 0){
			stories.push("<span class=\"date\">- " + pubDate.locale(this.lang).fromNow() + ":</span><br><span class=\"title\">" + title + "</span> &bull; <span class=\"desc\">" + desc + "</span>");
		}
	}
	(function showNews(){
		var initialFeed = newsFeedIndex;
		if(news.length == 0){
			return;
		}
		for(var i=0; i < news.length+1; i++){
			var newsFeed = news[newsFeedIndex];
			if(newsFeed === undefined)
				continue;
			if(newsFeed.length == 0){
				if(++newsFeedIndex == news.length)
					newsFeedIndex = 0;
				newsStoryIndex = 0;
				continue;
			}
			if(newsStoryIndex >= newsFeed.length){
				newsStoryIndex = 0;
				if(++newsFeedIndex >= news.length){
					newsFeedIndex = 0;
					continue;
				}
			}
		}
		if(news[newsFeedIndex].length == 0){
			setTimeout(showNews, 4000);
			return;
		}
		var i = 0;
		for(var key in feedURLs){
			if(i == newsFeedIndex)
				break;
			i++;
		}
		$(".source").updateWithTextForce("<i class=\"fa fa-rss-square\"></i> " + key, 4000, true);
		var newsFeed = news[newsFeedIndex];
		newsStory = newsFeed[newsStoryIndex];
		newsStoryIndex++;

		var nextTimeout = 10000 + (newsStory.length * 100);
		if( typeof newsStory != "undefined"){
			$(".news").updateWithTextForce(newsStory, 4000);
		}
		setTimeout(showNews, nextTimeout);
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
		$(".dots").updateWithTextForce(dots, 4000, true);
	})();
});