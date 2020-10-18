/* Magic Mirror Config Sample
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * See https://github.com/MichMich/MagicMirror#configuration
 *
 */
 
var config = {
	address: "0.0.0.0",
	port: 8255,
	basePath: "/",
	ipWhitelist: [],
	useHttps: false,
	httpsPrivateKey: "",
	httpsCertificate: "",

	language: "ro",
	timeFormat: 24,
	units: "metric",
	latitude: 44.4323,
	longitude: 26.1063,
	location: "București",
	locationID: 683506,
	timezone: "Europe/Bucharest",
	decimal: ",",
	appid: "xxxxxxxxxxxxxxxxxxxxxxxxxxx",
	apiBase: "https://api.openweathermap.org/data/",
	apiVersion: "2.5",
	roundTemp: false,
	period: false,
	scale: true,
	delay: 2500,
	animation: 2000,
	header: true,
	notification: false,
	customCss: "css/custom.css",
	minVersion: "2.1.0",
	serverOnly: true,
	logLevel: ["INFO", "LOG", "WARN", "ERROR"],

	modules: [
		{
			module: "notification",
			position: "top_center",
			classes: "night",
			disabled: false,
		},
		{
			module: "timer",
			disabled: false,
			config: {
				bodysize: 1080,
				nightMode: true,

				fadeMode: true,
				dimmMode: true,
				dimming: 40,

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
			module: "clock",
			position: "top_left",
			classes: "digital night",
			disabled: false,
			config: {
				displayType: "digital",
				displaySeconds: true,
				clockBold: false,
				showDate: true,
				showWeek: true,
				dateFormat: "dddd, D MMMM Y",
				showSunTimes: true,
				showMoonTimes: true
			}
		},
		{
			module: "lifecounter",
			position: "top_left",
			disabled: true,
			config: {
				birthday: "1970-01-01 00:00:00",
				counter: "seconds",
				before: "UNIX System Time:",
				after: "secunde",
				cssclass: "ssmall"
			}
		},
		{
			module: "swatch",
			position: "top_left",
			classes: "night",
			disabled: false,
			config: {
				logo_height: 28
			}
		},
		{
			module: "simpletext",
			position: "top_left",
			header: "Calendar evenimente și aniversări",
			disabled: true,
			config: {
				text: "",
				cssClass: "empty",
			}
		},
		{
			module: "icalendar",
			position: "top_left",
			disabled: true,
			config: {
				maximumEntries: 14,
				calendarClass: "icalendar",
				defaultSymbol: "calendar",
				displaySymbol: true,
				updateInterval: 1000,
				updateDataInterval: 60 * 1000,

				calendar: {
					urls: [
						{
							symbol: "calendar-check-o",
							url: "https://calendar.google.com/calendar/ical/ro.romanian%23holiday%40group.v.calendar.google.com/public/basic.ics"
						},
						{
							symbol: "moon",
							url: "https://calendar.google.com/calendar/ical/ht3jlfaac5lfd6263ulfh4tql8%40group.calendar.google.com/public/basic.ics"
						},
					]
				}
			}
		},
		{
			module: "calendar",
			position: "top_left",
			classes: "calendarz",
			header: "Calendar evenimente și aniversări",
			disabled: false,
			config: {
				maximumEntries: 14,
				maximumNumberOfDays: 365,
				displaySymbol: true,
				defaultSymbol: "calendar",
				showLocation: false,
				displayRepeatingCountTitle: true,
				defaultRepeatingCountTitle: "",
				maxTitleLength: 25,
				maxLocationTitleLength: 25,
				wrapEvents: false,
				wrapLocationEvents: false,
				maxTitleLines: 3,
				maxEventTitleLines: 3,
				fetchInterval: 60 * 1000,
				fade: true,
				fadePoint: 0.25,
				colored: false,
				coloredSymbolOnly: true,
				urgency: 10,
				timeFormat: "relative",
				sliceMultiDayEvents: false,
				dateFormat: "MMM Do",				
				dateEndFormat: "LT",
				fullDayEventDateFormat: "ddd D MMM",
				showEnd: false,
				getRelative: 24,
				hidePrivate: false,
				hideOngoing: false,
				tableClass: "qsmall",
				titleReplace: {
					"Ziua Internațională a Femeii": "Ziua femeii",
					"Zi Constantin Brancusi": "Ziua Constantin Brancuși",
					"New moon": "Lună nouă la",
					"First quarter": "Primul pătrar la",
					"Full moon": "Lună plină la",
					"Last quarter": "Ultimul pătrar la",
				},
				locationTitleReplace: {},
				broadcastEvents: true,
				excludedEvents: [
					"Orthodox Good Friday",
					"Doua zi de Rusalii",
					"Ziua Sfîntului Andrei",
					"Adormirea Maicii Domnului",
					"Rusalii",
					"Doua zi de Rusalii",
					],
				broadcastPastEvents: false,
				nextDaysRelative: true,

				calendars: [
					{
						symbol: "calendar-check-o", symbolClass: "skyblue", titleClass: "skyblue", timeClass: "skyblue", color: "normal",
						url: "https://calendar.google.com/calendar/ical/ro.romanian%23holiday%40group.v.calendar.google.com/public/basic.ics"
					},
					{
						symbol: "moon", symbolClass: "normal", titleClass: "normal", timeClass: "normal", color: "normal",
						url: "https://calendar.google.com/calendar/ical/ht3jlfaac5lfd6263ulfh4tql8%40group.calendar.google.com/public/basic.ics"
					},
			]
			}
		},

		{
			module: "clock",
			position: "top_center",
			classes: "analog night",
			disabled: false,
			config: {
				displayType: "analog",
				analogSize: "300px",
				analogFace: "none",
				secondsColor: "coral",
				displaySeconds: true
			}
		},
		{
			module: "monthly",
			position: "top_center",
			disabled: false,
			config: {
				startMonth: 0,
				monthCount: 1,
				monthsVertical: true,
				repeatWeekdaysVertical: true,
				weekNumbers: true
			}
		},
				{
			module: "kamasutra",
			position: "top_center",
			header: "Kama Sutra Sex Positions",
			disabled: true
		},
		{
			module: "currentweather",
			position: "top_right",
			classes: "night",
			disabled: false,
			config: {
				updateInterval: 10 * 60 * 1000,
				showWindDirection: true,
				showWindDirectionAsArrow: true,
				appendLocationNameToHeader: false,
				useLocationAsHeader: false,
				useBeaufort: false,
				useKMPHwind: true,
				showPressure: true,
				showVisibility: true,
				showHumidity: true,
				showMinMax: false,
				showFeelsLike: true,
				realFeelsLike: true,
				showDescription: true,
				showSun: false,
				weatherEndpoint: "weather",
				calendarClass: "calendar",
				tableClass: "xmedium",
				onlyTemp: false,
				hideTemp: false
			}
		},
		{
			module: "weatherforecast",
			position: "top_right",
			header: "Vremea în următoarele ore la",
			classes: "hourly",
			disabled: false,
			config: {
				maxNumberOfDays: 3,
				showRainAmount: true,
				showSnowAmount: false,
				updateInterval: 10 * 60 * 1000,
				appendLocationNameToHeader: true,
				fade: false,
				fadePoint: 0.25,
				colored: true,
				initialLoadDelay: 3500,
				reload: false,
				forecastEndpoint: "forecast",
				calendarClass: "calendar",
				tableClass: "qsmall",
				fallBack: false,
				fullday: "HH [h]"
			}
		},
		{
			module: "weatherforecast",
			position: "top_right",
			header: "Vremea în următoarele zile la",
			classes: "daily",
			disabled: false,
			config: {
				maxNumberOfDays: 13,
				showRainAmount: true,
				showSnowAmount: false,
				updateInterval: 10 * 60 * 2000,
				appendLocationNameToHeader: true,
				fade: true,
				fadePoint: 0.25,
				colored: true,
				initialLoadDelay: 4500,
				reload: false,
//				locationID: false,
//				forecastEndpoint: "onecall",
				forecastEndpoint: "forecast/daily",
				calendarClass: "calendar",
				tableClass: "qsmall",
				fallBack: true,
				fullday: "ddd"
			}
		},
		{
			module: "compliments",
			position: "middle_center",
			classes: "night",
			disabled: false,
			config: {
				updateInterval: 30000,
				remoteFile: null,
				random: true,
				mockDate: null,
				classes: "complimentz thin large pre-line skyblue",

				morning: 5,
				noon: 12,
				afternoon: 14,
				evening: 18,
				night: 22,
				midnight: 1,
				compliments: {
					anytime : [
						"Orice faci, fă-o bine!",
						"Fi sexy, fi tu însuți!"
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
						"<i class=\"gold wi wi-day-sunny\"></i> Este însorit afară",
						"<i class=\"gold wi wi-day-sunny\"></i> Este frumos afară"
					],
					day_cloud : [
						"<i class=\"lightblue wi wi-day-cloudy\"></i> Sunt câțiva nori",
						"<i class=\"lightblue wi wi-day-cloudy\"></i> Nori împrăștiați"
					],
					cloudy : [
						"<i class=\"skyblue wi wi-cloudy\"></i> Este înorat afară",
						"<i class=\"skyblue wi wi-cloudy\"></i> Este cam înorat"
					],
					cloudy_windy : [
						"<i class=\"powderblue wi wi-day-cloudy-windy\"></i> Este înorat și vânt",
						"<i class=\"powderblue wi wi-day-cloudy-windy\"></i> Este vânt și înorat"
					],
					showers : [
						"<i class=\"skyblue wi wi-day-showers\"></i> Afară plouă puțin",
						"<i class=\"skyblue wi wi-day-showers\"></i> Plouă puțin pe afară"
					],
					rain : [
						"<i class=\"deepskyblue wi wi-day-rain\"></i> Vreme ploioasă",
						"<i class=\"deepskyblue wi wi-day-rain\"></i> Ploaie ușoară"
					],
					thunderstorm : [
						"<i class=\"dodgerblue wi wi-day-thunderstorm\"></i> Afară este furtună!",
						"<i class=\"dodgerblue wi wi-day-thunderstorm\"></i> Atenție, furtună!"
					],
					snow : [
						"<i class=\"normal wi wi-day-snow\"></i> Afară ninge!",
						"<i class=\"normal wi wi-day-snow\"></i> Este ninsoare"
					],
					fog : [
						"<i class=\"bright wi wi-day-fog\"></i> Afară este ceață",
						"<i class=\"bright wi wi-day-fog\"></i> Vreme cu ceață"
					],
					night_clear : [
						"<i class=\"dimmed wi wi-night-clear\"></i> Noapte senină",
						"<i class=\"dimmed wi wi-night-clear\"></i> Este senin afară"
					],
					night_cloudy : [
						"<i class=\"powderblue wi wi-night-cloudy\"></i> Este înorat afară",
						"<i class=\"powderblue wi wi-night-cloudy\"></i> Noapte înorată"
					],
					night_showers : [
						"<i class=\"skyblue wi wi-night-showers\"></i> Afară plouă mărunt",
						"<i class=\"skyblue wi wi-night-showers\"></i> Ploaie măruntă"
					],
					night_rain : [
						"<i class=\"deepskyblue wi wi-night-rain\"></i> Afară plouă",
						"<i class=\"deepskyblue wi wi-night-rain\"></i> Noapte ploioasă"
					],
					night_thunderstorm : [
						"<i class=\"royalblue wi wi-night-thunderstorm\"></i> Noapte furtunoasă!",
						"<i class=\"royalblue wi wi-night-thunderstorm\"></i> Nu e vreme de ieșit!"
					],
					night_snow : [
						"<i class=\"normal wi wi-night-snow\"></i> Noapte cu ninsoare",
						"<i class=\"normal wi wi-night-snow\"></i> Afară ninge!"
					],
					night_alt_cloudy_windy : [
						"<i class=\"skyblue wi wi-night-cloudy-windy\"></i> Nori și ceață",
						"<i class=\"skyblue wi wi-night-cloudy-windy\"></i> Ceață și nori"
					],
					"14-02-...." : [
						"<i class=\"orangered fa fa-heart\"></i> Happy Valentine's Day!"
					],
					"31-10-...." : [
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
						function() {return moment().locale(config.language).format("dddd, D MMMM");}
					]
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
				className: "small"
			}
		},
		{
			module: "rssfeed",
			position: "bottom_bar",
			disabled: true,
			config: {
				lengthDescription: 600,
				fetchNewsTime: 60 * 60 * 1000,
				feeds: {
				//	"NewsIn"    : "https://newsin.ro/feed",
				//	"Discovery" : "https://discovery.ro/feed/",
				//	"Agerpress" : "https://www.agerpres.ro/home.rss",
				//	"Digi24"    : "https://m.digi24.ro/rss",
					"ProTV"     : "https://rss.stirileprotv.ro",
					"Mediafax"  : "https://www.mediafax.ro/rss",
					"HotNews"   : "https://www.hotnews.ro/rss",
					"News.ro"   : "https://www.news.ro/rss",
					"MainNews"  : "https://mainnews.ro/feed",
					"Ziare.com" : "https://www.ziare.com/rss/12h.xml"
				},
				feedMaxAge: {
					days: 0,
					hours: 12
				},
			}
		},
		{
			module: "newsfeed",
			position: "bottom_bar",
			disabled: false,
			config: {
				showSourceTitle: true,
				showPublishDate: true,
				broadcastNewsFeeds: true,
				broadcastNewsUpdates: true,
				showDescription: true,
				wrapTitle: true,
				wrapDescription: true,
				truncDescription: true,
				lengthDescription: 400,
				hideLoading: false,
				reloadInterval: 5 * 60 * 1000,
				updateInterval: 60 * 1000,
				maxNewsItems: 0,
				ignoreOldItems: false,
				ignoreOlderThan: 12 * 60 * 60 * 1000,
				removeStartTags: "",
				removeEndTags: "",
				startTags: ["VIDEO","FOTO","horoscop"],
				endTags: ["VIDEO","FOTO","horoscop"],
				prohibitedWords: ["VIDEO","FOTO","Marius Tucă Show"],
				scrollLength: 500,
				logFeedWarnings: false,

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
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
