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
			config: {
				startTitle: "<i class=\"lime fa fa-wifi\"></i> [ MagicMirror&sup2; ] &nbsp;",
				startNotification: "Modular smart mirror platform",
				timer: 8000,
			}
		},
		{
			module: "timer",
			disabled: false,
			config: {
				bodysize: 1050,
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
				logo_height: 27
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
				fetchInterval: 5 * 60 * 1000,
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
						"<i class=\"gold far fa-sun\"></i> Este însorit afară",
						"<i class=\"gold fas fa-sun\"></i> Este frumos afară"
					],
					day_cloud : [
						"<i class=\"lightblue fa fa-cloud-sun\"></i> Sunt câțiva nori",
						"<i class=\"lightblue fa fa-cloud-sun\"></i> Nori împrăștiați"
					],
					cloudy : [
						"<i class=\"skyblue fa fa-cloud\"></i> Este înorat afară",
						"<i class=\"skyblue fa fa-cloud\"></i> Este cam înorat"
					],
					cloudy_windy : [
						"<i class=\"powderblue fa fa-cloud\"></i> Este înorat și vânt",
						"<i class=\"powderblue fa fa-cloud\"></i> Este vânt și înorat"
					],
					showers : [
						"<i class=\"skyblue fa fa-cloud-sun-rain\"></i> Afară plouă puțin",
						"<i class=\"skyblue fa fa-cloud-sun-rain\"></i> Plouă puțin pe afară"
					],
					rain : [
						"<i class=\"deepskyblue fa fa-cloud-rain\"></i> Vreme ploioasă",
						"<i class=\"deepskyblue fa fa-cloud-rain\"></i> Ploaie ușoară"
					],
					thunderstorm : [
						"<i class=\"dodgerblue fa fa-poo-storm\"></i> Afară este furtună!",
						"<i class=\"dodgerblue fa fa-umbrella\"></i> Atenție, furtună!"
					],
					snow : [
						"<i class=\"normal far fa-snowflake\"></i> Afară ninge!",
						"<i class=\"normal fas fa-snowflake\"></i> Este ninsoare"
					],
					fog : [
						"<i class=\"bright fa fa-smog\"></i> Afară este ceață",
						"<i class=\"bright fa fa-smog\"></i> Vreme cu ceață"
					],
					night_clear : [
						"<i class=\"dimmed fas fa-moon\"></i> Noapte senină",
						"<i class=\"dimmed far fa-moon\"></i> Este senin afară"
					],
					night_cloudy : [
						"<i class=\"powderblue fa fa-cloud-moon\"></i> Este înorat afară",
						"<i class=\"powderblue fa fa-cloud-moon\"></i> Noapte înorată"
					],
					night_showers : [
						"<i class=\"skyblue fa fa-cloud-moon-rain\"></i> Afară plouă mărunt",
						"<i class=\"skyblue fa fa-cloud-moon-rain\"></i> Ploaie măruntă"
					],
					night_rain : [
						"<i class=\"deepskyblue fa fa-cloud-shower-heavy\"></i> Afară plouă",
						"<i class=\"deepskyblue fa fa-cloud-shower-heavy\"></i> Noapte ploioasă"
					],
					night_thunderstorm : [
						"<i class=\"royalblue fa fa-wind\"></i> Noapte furtunoasă!",
						"<i class=\"royalblue fa fa-poo-storm\"></i> Nu e vreme de ieșit!"
					],
					night_snow : [
						"<i class=\"normal fas fa-snowflake\"></i> Noapte cu ninsoare",
						"<i class=\"normal far fa-snowflake\"></i> Afară ninge!"
					],
					night_alt_cloudy_windy : [
						"<i class=\"skyblue fa fa-cloud-moon\"></i> Nori și ceață",
						"<i class=\"skyblue fa fa-cloud-moon\"></i> Ceață și nori"
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
