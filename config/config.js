/* Magic Mirror Config
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
 	appid: '...', // ios9 ipad
 	appid2: '...', // magic mirror
	apiBase: "https://api.openweathermap.org/data/",
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
	logLevel: ["INFO", "LOG", "WARN", "ERROR"], // "DEBUG", 

	modules: [
		{
			module: "timer",
			configDeepMerge: true,
			disabled: false,
			config: {
				bodysize: 1080,
				zoomMode: false,
				nightMode: false,

				traffic: true,
				alternate: false,
				workStart: "06:00:00",
				workEnd: "10:59:59",
				homeStart: "15:00:00",
				homeEnd: "19:59:59",
				weekdays: 6,

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
			hiddenOnStartup: false,
			configDeepMerge: true,
			disabled: false,
			config: {
				startTitle: "<i class=\"lime fa fa-wifi\"></i> Smart Board&sup3;&nbsp;",
				startNotification: "Modular smart mirror platform",
				timer: 8000,
			}
		},
		{
			module: "alert",
			configDeepMerge: true,
			disabled: true,
		},
		{
			module: "updatenotification",
			position: "top_bar",
			hiddenOnStartup: true,
			configDeepMerge: true,
			disabled: false,
		},
		{
			module: "clock",
			position: "top_center",
			classes: "analog night",
			hiddenOnStartup: false,
			configDeepMerge: true,
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
			hiddenOnStartup: false,
			configDeepMerge: true,
			disabled: false,
			config: {
				startMonth: 0,
				monthCount: 2,
				monthsVertical: true,
				repeatWeekdaysVertical: false,
				weekNumbers: true,
				highlightWeekend: true
			}
		},
		{
			module: "clock",
			position: "top_left",
			classes: "digital night",
			hiddenOnStartup: false,
			configDeepMerge: true,
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
			module: "lifecounter",
			position: "top_left",
			hiddenOnStartup: false,
			configDeepMerge: true,
			disabled: false,
			config: {
				birthday: "1970-01-01 00:00:00",
				counter: "seconds",
				before: "UNIX System Time:",
				after: "seconds",
				cssclass: "ssmall"
			}
		},
		{
			module: "traffic",
			position: "top_left",
			classes: "work",
			hiddenOnStartup: false,
			configDeepMerge: true,
			disabled: false,
			config: {
				loadingText: "Se încarcă...",
				firstLine: "Trafic estimat spre birou: {duration} minute",
				accessToken: "...",
				originCoords: "...",
				destinationCoords: "...",
				cssclass: "ssmall",
				cssclass2: "xsmall"
			}
		},
		{
			module: "traffic",
			position: "top_left",
			classes: "home",
			hiddenOnStartup: false,
			configDeepMerge: true,
			disabled: false,
			config: {
				loadingText: "Se încarcă...",
				firstLine: "Trafic estimat spre casa: {duration} minute",
				accessToken: "...",
				originCoords: "...",
				destinationCoords: "...",
				cssclass: "ssmall",
				cssclass2: "xsmall"
			}
		},
		{
			module: "swatch",
			position: "top_left",
			classes: "night",
			hiddenOnStartup: false,
			configDeepMerge: true,
			disabled: false,
			config: {
				logo_height: 27
			}
		},
		{
			module: "simpletext",
			position: "top_left",
			header: "",
			hiddenOnStartup: true,
			configDeepMerge: true,
			disabled: false,
			config: {
				text: "",
				cssClass: "empty",
			}
		},
		{
			module: "calendar",
			position: "top_left",
			header: "Calendar evenimente și aniversări",
			hiddenOnStartup: false,
			configDeepMerge: true,
			disabled: false,
			config: {
				maximumEntries: 16,
				displayRepeatingCountTitle: true,
				fetchInterval: 60 * 1000,
				fade: false,
				urgency: 15,
				fullDayEventDateFormat: "ddd D MMM",
				getRelative: 48,
				hidePrivate: false,
				hideOngoing: false,
				hideTime: false,
				coloredSymbolOnly: true,
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
			module: "lunartic",
			position: "top_left",
			classes: "night",
			hiddenOnStartup: false,
			configDeepMerge: true,
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
			module: "network",
			position: "top_left",
			hiddenOnStartup: false,
			configDeepMerge: true,
			disabled: true,
			config: {
				network: "192.168.0.0/23",
				showUnknown: false,
				showOffline: true,
				keepAlive: 300,
				updateInterval: 5,
				showLastSeen: true,
				colored: true,
				coloredSymbolOnly: true,
				showLastSeenWhenOffline: true,
				devices: [
					{ macAddress: "", name: "Mirror server", icon: "laptop"},
					{ macAddress: "", name: "Magic iPad 3", icon: "mobile"},
					{ macAddress: "", name: "Desktop PC", icon: "desktop"},
					{ macAddress: "", name: "Razvan iPhone", icon: "male"},
					{ macAddress: "", name: "Paula Huawei", icon: "female"},
					{ macAddress: "", name: "Paula Samsung", icon: "female"},
					{ macAddress: "", name: "Google Nexus 7 ", icon: "mobile"},
					{ macAddress: "", name: "Sony Smart TV", icon: "mobile"},
				],
			}        
		},
		{
			module: "currentweather",
			position: "top_right",
			classes: "night current",
			hiddenOnStartup: false,
			configDeepMerge: true,
			disabled: false,
			config: {
				showWindDirectionAsArrow: true,
				useBeaufort: false,
				useKMPHwind: true,
				showVisibility: true,
				showHumidity: true,
				showSun: false,
				showFeelsLike: true,
				realFeelsLike: true,
				showPressure: true,
				showMinMax: false,
				showPrecip: true,
				showDescription: true,
				appendLocationNameToHeader: false,
				tableClass: "xmedium",
			}
		},
		{
			module: "weatherforecast",
			position: "top_right",
			header: "Vremea în următoarele ore la",
			classes: "hourly forecast ipad",
			hiddenOnStartup: false,
			configDeepMerge: true,
			disabled: false,
			config: {
				maxNumberOfDays: 3,
				forecastEndpoint: "/forecast",
				fallBack: false,
				fullday: "HH [h]",
				initialLoadDelay: 2000,
				showRainAmount: true,
				fade: false,
				colored: true,
				tableClass: "qsmall",
			}
		},
		{
			module: "weatherforecast",
			position: "top_right",
			header: "Vremea în următoarele zile la",
			classes: "daily forecast ipad",
			hiddenOnStartup: false,
			configDeepMerge: true,
			disabled: false,
			config: {
				maxNumberOfDays: 16,
//				locationID: false,
//				forecastEndpoint: "onecall",
				fallBack: true,
				fullday: "ddd",
				initialLoadDelay: 3000,
				showRainAmount: true,
				fade: false,
				colored: true,
				tableClass: "qsmall",
			}
		},
		{
			module: "weather",	// not fully operational
			position: "top_right",
			classes: "night currentweather current",
			hiddenOnStartup: false,
			configDeepMerge: true,
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
			header: "Vremea în următoarele 4 ore",
			classes: "hourly weatherforecast forecast",
			hiddenOnStartup: false,
			configDeepMerge: true,
			disabled: false,
			config: {
				type: "hourly",
				maxEntries: 4,
				initialLoadDelay: 1000,
				tableClass: "qsmall",
			}
		},
		{
			module: "weather",
			position: "top_right",
			header: "Vremea în următoarele 15 zile",
			classes: "daily weatherforecast forecast",
			hiddenOnStartup: false,
			configDeepMerge: true,
			disabled: false,
			config: {
				type: "daily",
				maxNumberOfDays: 16,
				initialLoadDelay: 2000,
				tableClass: "qsmall",
			}
		},
		{
			module: "kamasutra",
			position: "top_center",
			header: "Kama Sutra Sex Positions",
			hiddenOnStartup: false,
			configDeepMerge: true,
			disabled: true
		},
		{
			module: "yframe",
			position: "upper_third",
			classes: "night",
			hiddenOnStartup: false,
			configDeepMerge: true,
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
		{
			module: "compliments",
			position: "middle_center",
			classes: "night",
			hiddenOnStartup: false,
			configDeepMerge: true,
			disabled: false,
			config: {
				classes: "complimentz thin large pre-line skyblue",
				morning: 5,
				noon: 12,
				afternoon: 14,
				evening: 18,
				night: 22,
				midnight: 1,
				compliments: {
					anytime : [
//						"Orice faci, fă-o bine!",
//						"Fi sexy, fi tu însuți!",
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
						"<i class=\"gold far fa-sun\"></i> Este însorit afară",
//						"<i class=\"gold fas fa-sun\"></i> Este frumos afară"
					],
					day_cloud : [
						"<i class=\"lightblue fa fa-cloud-sun\"></i> Sunt câțiva nori",
//						"<i class=\"lightblue fa fa-cloud-sun\"></i> Nori împrăștiați"
					],
					cloudy : [
						"<i class=\"skyblue fa fa-cloud\"></i> Este înorat afară",
//						"<i class=\"skyblue fa fa-cloud\"></i> Este cam înorat"
					],
					cloudy_windy : [
						"<i class=\"powderblue fa fa-cloud\"></i> Este înorat și vânt",
//						"<i class=\"powderblue fa fa-cloud\"></i> Este vânt și înorat"
					],
					showers : [
						"<i class=\"skyblue fa fa-cloud-sun-rain\"></i> Afară plouă puțin",
//						"<i class=\"skyblue fa fa-cloud-sun-rain\"></i> Plouă puțin pe afară"
					],
					rain : [
						"<i class=\"deepskyblue fa fa-cloud-rain\"></i> Vreme ploioasă",
//						"<i class=\"deepskyblue fa fa-cloud-rain\"></i> Ploaie ușoară"
					],
					thunderstorm : [
						"<i class=\"dodgerblue fa fa-poo-storm\"></i> Afară este furtună!",
//						"<i class=\"dodgerblue fa fa-umbrella\"></i> Atenție, furtună!"
					],
					snow : [
						"<i class=\"normal far fa-snowflake\"></i> Afară ninge!",
//						"<i class=\"normal fas fa-snowflake\"></i> Este ninsoare"
					],
					fog : [
						"<i class=\"bright fa fa-smog\"></i> Afară este ceață",
//						"<i class=\"bright fa fa-smog\"></i> Vreme cu ceață"
					],
					night_clear : [
						"<i class=\"dimmed fas fa-moon\"></i> Noapte senină",
//						"<i class=\"dimmed far fa-moon\"></i> Este senin afară"
					],
					night_cloudy : [
						"<i class=\"powderblue fa fa-cloud-moon\"></i> Este înorat afară",
//						"<i class=\"powderblue fa fa-cloud-moon\"></i> Noapte înorată"
					],
					night_showers : [
						"<i class=\"skyblue fa fa-cloud-moon-rain\"></i> Afară plouă mărunt",
//						"<i class=\"skyblue fa fa-cloud-moon-rain\"></i> Ploaie măruntă"
					],
					night_rain : [
						"<i class=\"deepskyblue fa fa-cloud-shower-heavy\"></i> Afară plouă",
//						"<i class=\"deepskyblue fa fa-cloud-shower-heavy\"></i> Noapte ploioasă"
					],
					night_thunderstorm : [
						"<i class=\"royalblue fa fa-wind\"></i> Noapte furtunoasă!",
//						"<i class=\"royalblue fa fa-poo-storm\"></i> Nu e vreme de ieșit!"
					],
					night_snow : [
						"<i class=\"normal fas fa-snowflake\"></i> Noapte cu ninsoare",
//						"<i class=\"normal far fa-snowflake\"></i> Afară ninge!"
					],
					night_alt_cloudy_windy : [
						"<i class=\"skyblue fa fa-cloud-moon\"></i> Nori și ceață",
//						"<i class=\"skyblue fa fa-cloud-moon\"></i> Ceață și nori"
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
				}
			}
		},
		{
			module: "quotes",
			position: "lower_third",
			hiddenOnStartup: false,
			configDeepMerge: true,
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
			hiddenOnStartup: false,
			configDeepMerge: true,
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
				prohibitedWords: ["VIDEO","FOTO","Marius Tucă Show"],

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
			hiddenOnStartup: false,
			configDeepMerge: true,
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
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
