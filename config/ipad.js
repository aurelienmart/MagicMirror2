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
	DeepMerge: true,
	logLevel: ["INFO", "LOG", "WARN", "ERROR"], // "DEBUG", 

	modules: [
		{
			module: "timer",
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
			disabled: false,
			config: {
				startTitle: "<i class=\"lime fa fa-wifi\"></i> Smart iPad&sup3;&nbsp;",
				startNotification: "Modular smart mirror platform",
				timer: 8000,
			}
		},
		{
			module: "alert",
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
				repeatWeekdaysVertical: false,
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
			module: "lifecounter",
			position: "top_left",
			disabled: true,
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
			disabled: false,
			config: {
				mode: "driving-traffic",
				loadingText: "Se încarcă...",
				firstLine: "Trafic estimat spre birou: {duration} minute",
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
				firstLine: "Trafic estimat spre casa: {duration} minute",
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
			module: "simpletext",
			position: "top_left",
			header: "Calendar evenimente și aniversări",
			disabled: false,
			config: {
				text: "",
				cssClass: "small",
			}
		},
		{
			module: "icalendar",
			position: "top_left",
			disabled: false,
			config: {
				maximumEntries: 16,
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
				maxNumberOfDays: 5,
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
				maxNumberOfDays: 14,
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
			module: "weather",
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
			header: "Vremea în următoarele 4 ore",
			classes: "hourly weatherforecast forecast",
			disabled: false,
			config: {
				type: "hourly",
				maxEntries: 5,
				initialLoadDelay: 1000,
				tableClass: "small",
			}
		},
		{
			module: "weather",
			position: "top_right",
			header: "Vremea în următoarele 15 zile",
			classes: "daily weatherforecast forecast",
			disabled: false,
			config: {
				type: "daily",
				maxNumberOfDays: 14,
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
				classes: "thin pre-line complimentz large skyblue",
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
					"05-02-...." : [
						"<i class=\"gold fa fa-birthday-cake\"></i> La mulți ani Ștefania!"
					],
					"14-02-...." : [
						"<i class=\"orangered fa fa-heart\"></i> Happy Valentine's Day!"
					],
					"19-02-...." : [
						"<i class=\"gold fa fa-birthday-cake\"></i> La mulți ani Vlad!"
					],
					"21-02-...." : [
						"<i class=\"gold fa fa-birthday-cake\"></i> La mulți ani Preoteasa!"
					],
					"24-02-...." : [
						"<i class=\"gold fa fa-birthday-cake\"></i> La mulți ani Alexandra!"
					],
					"10-04-...." : [
						"<i class=\"gold fa fa-birthday-cake\"></i> La mulți ani Nelu!"
					],
					"01-07-...." : [
						"<i class=\"gold fa fa-birthday-cake\"></i> La mulți ani Gabi!"
					],
					"07-08-...." : [
						"<i class=\"gold fa fa-birthday-cake\"></i> La mulți ani Mariana!"
					],
					"22-08-...." : [
						"<i class=\"gold fa fa-birthday-cake\"></i> La mulți ani Paula!"
					],
					"13-10-...." : [
						"<i class=\"gold fa fa-birthday-cake\"></i> La mulți ani Răzvan!"
					],
					"27-10-...." : [
						"<i class=\"gold fa fa-birthday-cake\"></i> La mulți ani Vali!"
					],
					"30-10-...." : [
						"<i class=\"gold fa fa-ghost\"></i> Happy Halloween!"
					],
					"01-12-...." : [
						"<i class=\"gold fa fa-glass-cheers\"></i> La mulți ani România!"
					],
					"14-12-...." : [
						"<i class=\"gold fa fa-birthday-cake\"></i> La mulți ani Costin!"
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
			disabled: false,
			config: {
				updateInterval: 20000,
				category: "random",
				className: "medium"
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
