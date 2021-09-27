/* Magic Mirror Config
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * see https://docs.magicmirror.builders/getting-started/configuration.html#general
 * and https://docs.magicmirror.builders/modules/configuration.html
 */
 
var config = {
	address: "0.0.0.0",
	port: 8081,
	basePath: "/",
	ipWhitelist: [],
	useHttps: false,
	httpsPrivateKey: "",
	httpsCertificate: "",

	language: "ro",
	locale: "ro-RO",
	timeFormat: 24,
	units: "metric",
	latitude: 44.4323,
	longitude: 26.1063,
	location: "București",
	locationID: 683506,
	timezone: "Europe/Bucharest",
	decimal: ",",
 	appid: '...',
	apiVersion: "2.5/",
	roundTemp: false,
	period: false,
	scale: true,
	delay: 2000,
	animation: 2000,
	header: true,
	notification: false,
	minVersion: "2.14.0",
	serverOnly: true,
	DeepMerge: true,
//	logLevel: ["DEBUG", "INFO", "LOG", "WARN", "ERROR"],

	modules: [
		{
			module: "timer",
			disabled: false,
			config: {
				bodysize: 1080,
				zoomMode: false,
				nightMode: false,
				background: false,

				dimmMode: true,
				fadeMode: true,
				dimming: 50,

				sharpMode: true,
				dateMode: true,
				name1: "",
				birthday1: "",
				name2: "",
				birthday2: "",
				name3: "",
				birthday3: ""
			}
		},
		{
			module: "notification",
			position: "top_center",
			classes: "night",
			disabled: false,
			config: {
				startTitle: "<i class=\"lime fa fa-wifi\"></i> Smart Board&sup3;&nbsp;",
				startNotification: "Modular smart mirror platform",
				timer: 8000,
			}
		},
		{
			module: "alert",
			disabled: true,
		},
		{
			module: "updatenotification",
			position: "top_bar",
			disabled: true,
		},
		{
			module: "clock",
			position: "top_center",
			classes: "analog night",
			disabled: false,
			config: {
				displayType: "analog",
				showDate: false,
				analogSize: "300px",
				analogFace: "none",
				secondsColor: "coral",
			}
		},
		{
			module: "monthly",
			position: "top_center",
			disabled: false,
			config: {
				startMonth: 0,
				monthCount: 2,
				monthsVertical: true,
				repeatWeekdaysVertical: true,
				weekNumbers: true,
				highlightWeekend: true
			}
		},
		{
			module: "clock",
			position: "top_left",
			classes: "digital night",
			disabled: false,
			config: {
				displayType: "digital",
				showWeek: true,
				dateFormat: "dddd, D MMMM Y",
				showSunTimes: true,
				showMoonTimes: true
			}
		},
		{
			module: "lunartic",
			position: "top_left",
			classes: "night",
			disabled: false,
			config: {
				mode: "static",
				image: "current",
				useHeader: false,
				distance: "km",
				sounds: "no",
				initialLoadDelay: 4000,
				retryDelay: 2500,
				updateInterval: 60 * 60 * 1000,
				rotateInterval: 60 * 1000
			}
		},
		{
			module: "lifecounter",
			position: "top_left",
			disabled: false,
			config: {
				birthday: "1970-01-01 00:00:00",
				counter: "seconds",
				before: "UNIX System Time:",
				after: "seconds",
				cssclass: "small"
			}
		},
		{
			module: "traffic",
			position: "top_left",
			classes: "work",
			disabled: false,
			config: {
				mode: "driving-traffic",
				loadingText: "Se încarcă...",
				firstLine: "Trafic estimat până la birou: {duration} minute",
				accessToken: "...",
				originCoords: "...",
				destinationCoords: "...",
				days: [1, 2, 3, 4, 5],
			}
		},
		{
			module: "traffic",
			position: "top_left",
			classes: "home",
			disabled: false,
			config: {
				mode: "driving-traffic",
				loadingText: "Se încarcă...",
				firstLine: "Trafic estimat până acasa: {duration} minute",
				accessToken: "...",
				originCoords: "...",
				destinationCoords: "...",
				days: [1, 2, 3, 4, 5],
			}
		},
		{
			module: "traffic",
			position: "top_left",
			classes: "parc",
			disabled: false,
			config: {
				loadingText: "Se încarcă...",
				firstLine: "Trafic până la parcul Titan: {duration} minute",
				accessToken: "...",
				originCoords: "...",
				destinationCoords: "...",
				days: [6, 7],
			}
		},
		{
			module: "traffic",
			position: "top_left",
			classes: "ikea",
			disabled: false,
			config: {
				loadingText: "Se încarcă...",
				firstLine: "Trafic până la Ikea Pallady: {duration} minute",
				accessToken: "...",
				originCoords: "...",
				destinationCoords: "...",
				days: [6, 7],
			}
		},
		{
			module: "swatch",
			position: "top_left",
			classes: "night",
			disabled: false,
			config: {
				logo_height: 27
			}
		},
		{
			module: "calendar",
			position: "top_left",
			header: "Calendar evenimente și aniversări",
			disabled: false,
			config: {
				maximumEntries: 15,
				displayRepeatingCountTitle: true,
				fetchInterval: 60 * 1000,
				fade: false,
				dateFormat: "ddd D MMM",
				fullDayEventDateFormat: "ddd D MMM",
				getRelative: 48,
				coloredSymbolOnly: true,
				titleReplace: {
					"Ziua Internațională a Femeii": "Ziua femeii",
					"Zi Constantin Brancusi": "Ziua Constantin Brancuși",
					"New moon": "Lună nouă la",
					"First quarter": "Primul pătrar la",
					"Full moon": "Lună plină la",
					"Last quarter": "Ultimul pătrar la",
				},
				locationTitleReplace: {},
				excludedEvents: [
					"Orthodox Good Friday",
					"Doua zi de Rusalii",
					"Ziua Sfîntului Andrei",
					"Adormirea Maicii Domnului",
					"Rusalii",
					"Doua zi de Rusalii",
					],
				nextDaysRelative: true,

				calendars: [
					{
						symbol: "calendar-check-o", symbolClass: "skyblue", // titleClass: "skyblue", timeClass: "skyblue", color: "normal",
						url: "https://calendar.google.com/calendar/ical/ro.romanian%23holiday%40group.v.calendar.google.com/public/basic.ics"
					},
					{
						symbol: "moon", symbolClass: "normal", // titleClass: "normal", timeClass: "normal", color: "normal",
						url: "https://calendar.google.com/calendar/ical/ht3jlfaac5lfd6263ulfh4tql8%40group.calendar.google.com/public/basic.ics"
					},
					{
						symbol: "registered", symbolClass: "lightgreen", // titleClass: "lightgreen", timeClass: "lightgreen", color: "normal",
						url: "https://calendar.google.com/calendar/ical/.../basic.ics"
					},
					{
						symbol: "product-hunt", symbolClass: "tomato", // titleClass: "tomato", timeClass: "tomato", color: "normal",
						url: "https://calendar.google.com/calendar/ical/.../basic.ics"
					},
					{
						symbol: "birthday-cake", symbolClass: "gold", // titleClass: "gold", timeClass: "gold", color: "normal",
						url: "https://calendar.google.com/calendar/ical/.../basic.ics"
					},
					{
						symbol: "film", symbolClass: "magenta", // titleClass: "magenta", timeClass: "magenta", color: "normal",
						url: "https://calendar.google.com/calendar/ical/.../basic.ics"
					},
					{
						symbol: "suitcase", symbolClass: "coral", // titleClass: "coral",timeClass: "coral", color: "normal",
						url: "https://calendar.google.com/calendar/ical/.../basic.ics"
					},
				]
			}
		},
		{
			module: "currentweather",
			position: "top_right",
			classes: "night current",
			disabled: false,
			config: {
				// modified module with own settings
			}
		},
		{
			module: "weatherforecast",
			position: "top_right",
			header: "Vremea în următoarele ore la",
			classes: "hourly forecast ipad",
			disabled: false,
			config: {
				maxNumberOfDays: 4,
				forecastEndpoint: "/forecast",
				extra: false,
				fallBack: true,
				fullday: "HH [h]",
				initialLoadDelay: 2000,
				showRainAmount: true,
				fade: false,
			}
		},
		{
			module: "weatherforecast",
			position: "top_right",
			header: "Vremea în următoarele zile la",
			classes: "daily forecast ipad",
			disabled: false,
			config: {
				maxNumberOfDays: 15,
//				locationID: false,
//				forecastEndpoint: "/onecall",
//				excludes: "current,minutely,hourly",
				extra: false,
				fallBack: false,
				fullday: "ddd",
				initialLoadDelay: 3000,
				showRainAmount: true,
				fade: false,

			}
		},
		{
			module: "weather",	// not fully operational
			position: "top_right",
			classes: "night currentweather current",
			disabled: true,
			config: {
				type: "current",
				degreeLabel: false,
				showPrecipitationAmount: false,
			}
		},
		{
			module: "weather",
			position: "top_right",
			header: "Vremea în următoarele ore",
			classes: "hourly weatherforecast forecast",
			disabled: true,
			config: {
				type: "hourly",
				maxEntries: 4,
				initialLoadDelay: 1000,
				tableClass: "small",
			}
		},
		{
			module: "weather",
			position: "top_right",
			header: "Vremea în următoarele zile",
			classes: "daily weatherforecast forecast",
			disabled: true,
			config: {
				type: "daily",
				maxNumberOfDays: 15,
				initialLoadDelay: 2000,
				tableClass: "small",
			}
		},
		{
			module: "compliments",
			position: "middle_center",
			classes: "night",
			disabled: false,
			config: {
				classes: "thin large pre-line complimentz skyblue",
				morning: 5,
				noon: 12,
				afternoon: 14,
				evening: 18,
				night: 22,
				midnight: 1,
				compliments: {
					anytime : [
						function() {return moment().locale(config.language).format("dddd, D MMMM");}
					],
					morning : [
						"Dimineață frumoasă!",
						"Bună dimineața!",
						"Să ai poftă la cafea!"
					],
					noon : [
						"Un prânz excelent!",
						"Poftă bună la prânz!",
						"O zi fantastică!"
					],
					afternoon : [
						"O după amiază bună!",
						"O zi cât mai bună!",
						"O zi excelentă!"
					],
					evening : [
						"O seară minunată!",
						"O seară liniștită!",
						"O seară plăcută!"
					],
					night : [
						"Somn ușor!",
						"Noapte bună!",
						"Vise plăcute!",
						"Să visezi frumos!"
					],
					midnight : [
						"De ce nu dormi?",
						"Știi cât este ceasul?",
						"Ai vreun coșmar?"
					],
					day_sunny : [
						"<i class=\"gold wi wi-day-sunny\"></i> Este senin",
						"<i class=\"gold wi wi-day-sunny\"></i> Vreme senină"
					],
					day_cloudy : [
						"<i class=\"lightblue wi wi-day-cloudy\"></i> Sunt câțiva nori",
						"<i class=\"lightblue wi wi-day-cloudy\"></i> Nori împrăștiați"
					],
					cloudy : [
						"<i class=\"skyblue wi wi-cloudy\"></i> Este înorat",
						"<i class=\"skyblue wi wi-cloudy\"></i> Vreme înorată"
					],
					day_cloudy_windy : [
						"<i class=\"powderblue wi wi-day-cloudy-windy\"></i> Este înorat și vânt",
						"<i class=\"powderblue wi wi-day-cloudy-windy\"></i> Este vânt și înorat"
					],
					day_showers : [
						"<i class=\"skyblue wi wi-day-showers\"></i> Ploaie ușoasă",
						"<i class=\"skyblue wi wi-day-showers\"></i> Plouă ușor"
					],
					day_rain : [
						"<i class=\"deepskyblue wi wi-day-rain\"></i> Vreme ploioasă",
						"<i class=\"deepskyblue wi wi-day-rain\"></i> Vreme cu ploaie"
					],
					day_thunderstorm : [
						"<i class=\"dodgerblue wi wi-day-thunderstorm\"></i> Este furtună!",
						"<i class=\"dodgerblue wi wi-day-thunderstorm\"></i> Atenție, furtună!"
					],
					day_snow : [
						"<i class=\"normal wi wi-day-snow\"></i> Ninsoare",
						"<i class=\"normal wi wi-day-snow\"></i> Ninge!"
					],
					day_fog : [
						"<i class=\"bright wi wi-day-fog\"></i> Vreme cu ceață",
						"<i class=\"bright wi wi-day-fog\"></i> Ceață!"
					],
					night_clear : [
						"<i class=\"dimmed wi wi-night-clear\"></i> Noapte senină",
						"<i class=\"dimmed wi wi-night-clear\"></i> Cer senin"
					],
					night_cloudy : [
						"<i class=\"powderblue wi wi-night-alt-cloudy\"></i> Noapte înorată",
						"<i class=\"powderblue wi wi-night-alt-cloudy\"></i> Este înorat"
					],
					night_showers : [
						"<i class=\"skyblue wi wi-night-alt-showers\"></i> Ploaie ușoară",
						"<i class=\"skyblue wi wi-night-alt-showers\"></i> Ploaie măruntă"
					],
					night_rain : [
						"<i class=\"deepskyblue wi wi-night-rain\"></i> Noapte ploioasă",
						"<i class=\"deepskyblue wi wi-night-rain\"></i> Ploaie!"
					],
					night_thunderstorm : [
						"<i class=\"royalblue wi wi-night-thunderstorm\"></i> Noapte furtunoasă!",
						"<i class=\"royalblue wi wi-night-thunder-storm\"></i> Furtuna!"
					],
					night_snow : [
						"<i class=\"normal wi wi-night-alt-snow\"></i> Noapte cu ninsoare",
						"<i class=\"normal wi wi-night-alt-snow\"></i> Ninge!"
					],
					night_alt_cloudy_windy : [
						"<i class=\"skyblue wi wi-night-alt-cloudy-windy\"></i> Nori și ceață",
						"<i class=\"skyblue wi wi-night-alt-cloudy-windy\"></i> Ceață și nori"
					],
					"14-02-...." : [
						"<i class=\"orangered fa fa-heart\"></i> Happy Valentine's Day!"
					],
					"30-10-...." : [
						"<i class=\"gold fa fa-ghost\"></i> Happy Halloween!"
					],
					"01-12-...." : [
						"<i class=\"gold fa fa-glass-cheers\"></i> La mulți ani România!"
					],
					"25-12-...." : [
						"<i class=\"bright fa fa-snowman\"></i> Crăciun fericit!",
						"<i class=\"gold fa fa-gifts\"></i> Sărbători fericite!"
					],
					"26-12-...." : [
						"<i class=\"bright fa fa-snowman\"></i> Crăciun fericit!",
						"<i class=\"gold fa fa-gifts\"></i> Sărbători fericite!"
					],
					"01-01-...." : [
						"<i class=\"gold fa fa-glass-cheers\"></i> Un An Nou fericit!",
						function() {return "La mulți ani! " + moment().format("YYYY");}
					],
					"02-01-...." : [
						"<i class=\"gold fa fa-glass-cheers\"></i> Un An Nou fericit!",
						function() {return "La mulți ani! " + moment().format("YYYY");}
					],
					"..-..-...." : [
						"Orice faci, fă-o bine!",
						"Fi sexy, fi tu însuți!"
					],
				}
			}
		},
		{
			module: "quotes",
			position: "lower_third",
			disabled: false,
			config: {
				updateInterval: 20000,
				category: "random",
				className: "medium"
			}
		},
		{
			module: "newsfeed",
			position: "bottom_bar",
			disabled: false,
			config: {
				showDescription: true,
				hideLoading: true,
				updateInterval: 60 * 1000,
				ignoreOlderThan: 12 * 60 * 60 * 1000,
				removeStartTags: "both",
				removeEndTags: "both",
				startTags: ["VIDEO","FOTO","horoscop"],
				endTags: ["VIDEO","FOTO","horoscop"],
				prohibitedWords: ["VIDEO","FOTO","Marius Tucă Show","Bancul zilei"],

				feeds: [
					{
						title: "ProTV",
						url: "https://rss.stirileprotv.ro",
						encoding: "UTF-8"
					},
					{
						title: "MediaFax",
						url: "https://www.mediafax.ro/rss/",
						encoding: "UTF-8"
					},
					{
						title: "Agerpress",
						url: "https://www.agerpres.ro/home.rss",
						encoding: "UTF-8"
					},
					{
						title: "Digi24",
						url: "https://www.digi24.ro/rss",
						encoding: "UTF-8"
					},
					{
						title: "HotNews",
						url: "https://www.hotnews.ro/rss",
						encoding: "UTF-8"
					},
					{
						title: "NewsIn",
						url: "https://newsin.ro/feed/",
						encoding: "UTF-8"
					},
					{
						title: "MainNews",
						url: "https://mainnews.ro/feed/",
						encoding: "UTF-8"
					},
					{
						title: "News.ro",
						url: "https://www.news.ro/rss",
						encoding: "UTF-8"
					},
					{
						title: "Ziare.com",
						url: "https://www.ziare.com/rss/12h.xml",
						encoding: "UTF-8"
					}
				]
			}
		},
		{
			module: "newsfeed",
			position: "bottom_bar",
			classes: "international",
			disabled: true,
			config: {
				showDescription: true,
				hideLoading: true,
				updateInterval: 60 * 1000,
				ignoreOlderThan: 12 * 60 * 60 * 1000,

				feeds: [
					{
						title: "Discovery",
						url: "https://discovery.ro/feed/",
						encoding: "UTF-8"
					},
					{
						title: "NASA",
						url: "https://www.nasa.gov/rss/dyn/breaking_news.rss",
						encoding: "UTF-8"
					},
					{
						title: "BBC World",
						url: "http://feeds.bbci.co.uk/news/world/rss.xml",
						encoding: "UTF-8"
					},
					{
						title: "NY Times",
						url: "https://rss.nytimes.com/services/xml/rss/nyt/World.xml",
						encoding: "UTF-8"
					},
					{
						title: "WP World",
						url: "http://feeds.washingtonpost.com/rss/world?itid=lk_inline_manual_43",
						encoding: "UTF-8"
					},
					{
						title: "CNN World",
						url: "http://rss.cnn.com/rss/edition.rss",
						encoding: "UTF-8"
					},
					{
						title: "Reuters",
						url: "https://www.reutersagency.com/feed/?taxonomy=best-topics&post_type=best",
						encoding: "UTF-8"
					},
				]
			}
		},
		{
			module: "yframe",
			position: "upper_third",
			classes: "night",
			disabled: true,
			config: {
				url: "https://cristea13.ro/video/fishtank.mp4",
				media: true,
				width: "1080",
				height: "607",
				aspect: 9/16,
				cssClass: "fishtank"
			}
		},
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
