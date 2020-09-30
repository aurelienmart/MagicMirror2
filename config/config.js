/* Magic Mirror
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * Redesigned by Răzvan Cristea
 * for iPad 3 & HD display
 * https://github.com/hangorazvan
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
	appid: "",
	apiBase: "https://api.openweathermap.org/data/",
	apiVersion: "2.5",
	roundTemp: false,
	period: false,
	scale: true,
	delay: 2500,
	animation: 2000,
	header: true,
	notification: false,
	customCss: 	"css/custom.css",
	minVersion: "2.11.0",
	serverOnly: true,
	logLevel: ["INFO", "LOG", "WARN", "ERROR"],

	modules: [
		{
			module: "alert",
			disabled: false,
			config: {
				effect: "genie",
				alert_effect: "genie",
				position: "center",
				display_time: 5000,
				welcome_message: true,
				title: "[ MagicMirror&sup2; ]", 
				message: "Redesigned by Răzvan Cristea<br>Framework successfully started!"
			}
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
			classes: "digital",
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
			disabled: false,
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
			disabled: false,
			config: {
				logo_height: 28
			}
		},
		{
			module: "yframe",
			position: "top_left",
			classes: "icalendar",
			header: "Calendar evenimente și aniversări",
			disabled: true,
			config: {
				url: "modules/icalendar/icalendar.html",
				media: false,
				allow: "",
				width: "100%",
				height: "700px",
				cssClass: "icalendar"
			}
		},
		{
			module: "calendar",
			position: "top_left",
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
				animationSpeed: 2000,
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
					"Orthodox Good Friday": "Vinerea Mare",
					"Doua zi de Rusalii": "A doua zi de Rusalii",
					"Ziua Sfîntului Andrei": "Ziua Sf. Andrei",
					"Adormirea Maicii Domnului": "Adormirea M.D.",
					"Ziua Internațională a Femeii": "Ziua femeii",
					"Zi Constantin Brancusi": "Ziua Constantin Brancuși",
				},
				locationTitleReplace: {},
				broadcastEvents: true,
				excludedEvents: [],
				broadcastPastEvents: false,
				nextDaysRelative: true,

				calendars: [
					{
						symbol: "calendar-check-o", symbolClass: "skyblue", titleClass: "skyblue", timeClass: "skyblue",
						url: "https://calendar.google.com/calendar/ical/ro.romanian%23holiday%40group.v.calendar.google.com/public/basic.ics"
					},
				]
			}
		},
		{
			module: "simpletext",
			position: "top_center",
			disabled: false,
			config: {
				text: "[ MagicMirror&sup2; ]",
				cssClass: "xmedium bright"
			}
		},
		{
			module: "connection",
			position: "top_center",
			disabled: false,
			config: {
				updateInterval: 1000,
				cssClass: "smart small light",
				onLine: "Platformă modulară inteligentă",
				onNight: "Mod nocturn estompat activat",
				offLine: "Fără conexiune la internet!"
			}
		},
		{
			module: "clock",
			position: "top_center",
			classes: "analog",
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
			classes: "current_month",
//			classes: "monthSecond monthPosition",
			disabled: false,
			config: {
				monthOffset: 0,
				showHeader: true,
				tableClass: "qsmall monthly"
			}
		},
		{
			module: "currentweather",
			position: "top_right",
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
				showMinMax: true,
				showFeelsLike: true,
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
			header: "Vremea în următoarele ore",
			classes: "hourly",
			disabled: false,
			config: {
				maxNumberOfDays: 3,
				showRainAmount: true,
				showSnowAmount: true,
				updateInterval: 10 * 60 * 1000,
				appendLocationNameToHeader: false,
				fade: false,
				fadePoint: 0.25,
				colored: true,
				initialLoadDelay: 3500,
				reload: true,
				forecastEndpoint: "forecast",
				calendarClass: "calendar",
				tableClass: "qsmall",
				fullday: "HH [h]"
			}
		},
		{
			module: "weatherforecast",
			position: "top_right",
			header: "Vremea în următoarele zile",
			classes: "daily",
			disabled: false,
			config: {
				maxNumberOfDays: 14,
				showRainAmount: true,
				showSnowAmount: true,
				updateInterval: 10 * 60 * 2000,
				appendLocationNameToHeader: false,
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
				fullday: "ddd"
			}
		},
		{
			module: "compliments",
			position: "middle_center",
			disabled: false,
			config: {
				updateInterval: 30000,
				remoteFile: null,
				random: true,
				mockDate: null,
				classes: "compliments thin large pre-line skyblue",

				morning: 5,
				noon: 12,
				afternoon: 14,
				evening: 18,
				night: 22,
				midnight: 1,
				compliments: {
					anytime : [
						"Fi tu însuți, sexy!",
						"Orice faci, fă-o bine!"
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
					day_cloudy_windy : [
						"<i class=\"powderblue wi wi-day-cloudy-windy\"></i> Este înorat și vânt",
						"<i class=\"powderblue wi wi-day-cloudy-windy\"></i> Bate vântul și e înorat"
					],
					day_showers : [
						"<i class=\"skyblue wi wi-day-showers\"></i> Afară plouă puțin",
						"<i class=\"skyblue wi wi-day-showers\"></i> Plouă puțin pe afară"
					],
					day_rain : [
						"<i class=\"deepskyblue wi wi-day-rain\"></i> Vreme ploioasă",
						"<i class=\"deepskyblue wi wi-day-rain\"></i> Ploaie ușoară"
					],
					day_thunderstorm : [
						"<i class=\"dodgerblue wi wi-day-thunderstorm\"></i> Afară este furtună!",
						"<i class=\"dodgerblue wi wi-day-thunderstorm\"></i> Atenție, furtună!"
					],
					day_snow : [
						"<i class=\"normal wi wi-day-snow\"></i> Afară ninge!",
						"<i class=\"normal wi wi-day-snow\"></i> Este ninsoare"
					],
					day_fog : [
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
						"<i class=\"skyblue wi wi-night-cloudy-windy\"></i> Noapte noroasă cu ceață",
						"<i class=\"skyblue wi wi-night-cloudy-windy\"></i> Noapte cu ceață și nori"
					],
					"14-02-...." : [
						"<span class=\"orangered\"><i class=\"fa fa-heart\"></i> Happy Valentine's Day!</span>"
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
						"<i class=\"gold fas fa-glass-cheers\"></i> Un An Nou fericit!",
						function() {return "La mulți ani! " + moment().format("YYYY");}
					],
					"02-01-...." : [
						"<i class=\"gold fas fa-glass-cheers\"></i> Un An Nou fericit!",
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
			module: "yframe",
			position: "bottom_bar",
			classes: "rssfeed",
			disabled: true,
			config: {
				url: "modules/rssfeed/rssfeed.html",
				media: false,
				allow: "",
				width: "99%",
				height: "300px",
				cssClass: "rssfeed"
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
				lengthDescription: 500,
				hideLoading: false,
				reloadInterval: 5 * 60 * 1000,
				updateInterval: 60 * 1000,
				animationSpeed: 2.5 * 1000,
				maxNewsItems: 0,
				ignoreOldItems: false,
				ignoreOlderThan: 12 * 60 * 60 * 1000,
				removeStartTags: "",
				removeEndTags: "",
				startTags: ["VIDEO","FOTO","FOTO, VIDEO","VIDEO, FOTO","presă","presa","horoscop"],
				endTags: ["VIDEO","FOTO","FOTO, VIDEO","VIDEO, FOTO","presă","presa","horoscop"],
				prohibitedWords: ["VIDEO","FOTO","FOTO, VIDEO","VIDEO, FOTO, Marius Tucă Show"],
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
					},
					{
						title: "NASA",
						url: "https://www.nasa.gov/rss/dyn/breaking_news.rss",
						encoding: "UTF-8"
					}
				]
			}
		},
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
