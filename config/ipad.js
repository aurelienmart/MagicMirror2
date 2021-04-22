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
 	appid: '...', // default
 	appid2: '...', // backup
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
			disabled: false,
			configDeepMerge: true,
			config: {
				bodysize: 1080,
				zoomMode: false,
				nightMode: true,

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
			configDeepMerge: true,
			disabled: false,
			config: {
				startTitle: "<i class=\"lime fa fa-wifi\"></i> Smart iPad&sup3;&nbsp;",
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
			position: "top_center",
			configDeepMerge: true,
			disabled: true,
		},
		{
			module: "clock",
			position: "top_center",
			classes: "analog night",
			configDeepMerge: true,
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
			configDeepMerge: true,
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
			module: "swatch",
			position: "top_left",
			classes: "night",
			configDeepMerge: true,
			disabled: false,
			config: {
				logo_height: 27
			}
		},
		{
			module: "simpletext",
			position: "top_left",
			header: "Calendar evenimente și aniversări",
			disabled: false,
			config: {
				text: "",
				cssClass: "empty",
			}
		},
		{
			module: "icalendar",
			position: "top_left",
			disabled: false,
			config: {
				maximumEntries: 14,
				calendarClass: "icalendar",
				defaultSymbol: "calendar",
				displaySymbol: true,
				updateInterval: 1000,
				updateDataInterval: 5 * 60 * 1000,
				fade: 0,

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
						{
							symbol: "registered",
							url: "https://calendar.google.com/calendar/ical/.../basic.ics"
						},
						{
							symbol: "product-hunt",
							url: "https://calendar.google.com/calendar/ical/.../basic.ics"
						},
						{
							symbol: "birthday-cake",
							url: "https://calendar.google.com/calendar/ical/.../basic.ics"
						},
						{
							symbol: "film",
							url: "https://calendar.google.com/calendar/ical/.../basic.ics"
						},
						{
							symbol: "suitcase",
							url: "https://calendar.google.com/calendar/ical/.../basic.ics"
						},
					]
				}
			}
		},
		{
			module: "currentweather",
			position: "top_right",
			classes: "night current",
			configDeepMerge: true,
			disabled: false,
		},
		{
			module: "weatherforecast",
			position: "top_right",
			header: "Vremea în următoarele ore la",
			classes: "hourly forecast ipad",
			configDeepMerge: true,
			disabled: false,
			config: {
				maxNumberOfDays: 3,
				forecastEndpoint: "/forecast",
				fallBack: false,
				fullday: "HH [h]",
				initialLoadDelay: 2000,
			}
		},
		{
			module: "weatherforecast",
			position: "top_right",
			header: "Vremea în următoarele zile la",
			classes: "daily forecast ipad",
			configDeepMerge: true,
			disabled: false,
			config: {
				maxNumberOfDays: 16,
//				locationID: false,
//				forecastEndpoint: "onecall",
				forecastEndpoint: "/forecast/daily",
				fallBack: true,
				fullday: "ddd",
				initialLoadDelay: 3000,
			}
		},
		{
			module: "weather",	// not fully operational
			position: "top_right",
			classes: "night currentweather current",
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
			configDeepMerge: true,
			disabled: true
		},
		{
			module: "yframe",
			position: "upper_third",
			classes: "night",
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
			configDeepMerge: true,
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
			configDeepMerge: true,
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
			disabled: false,
			config: {
				lengthDescription: 600,
				fetchNewsTime: 15 * 60 * 1000,
				feedURLs: {
					"ProTV"		: "https://rss.stirileprotv.ro",
					"Mediafax"	: "https://www.mediafax.ro/rss",
					"NewsIn"	: "https://newsin.ro/feed",
					"News.ro"	: "https://www.news.ro/rss",
					"MainNews"	: "https://mainnews.ro/feed",
					"Ziare.com"	: "https://www.ziare.com/rss/12h.xml",
					"Agerpress"	: "https://www.agerpres.ro/home.rss",
				//	"HotNews"	: "https://www.hotnews.ro/rss",
				//	"Digi24"	: "https://www.digi24.ro/rss",
					},
				feedMaxAge: {days: 0, hours: 12},
			}
		},
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
