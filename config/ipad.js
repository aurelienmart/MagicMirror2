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
	timeFormat: 24,
	units: "metric",
	latitude: 44.4323,
	longitude: 26.1063,
	location: "București",
	locationID: 683506,
	timezone: "Europe/Bucharest",
	decimal: ",",
	appid: "9d7f18c178753b75e21e704c7c7c51f3",
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
	logLevel: ["DEBUG", "INFO", "LOG", "WARN", "ERROR"],

	modules: [
		{
			module: "notification",
			position: "top_center",
			classes: "night",
			disabled: false,
			config: {
        		startTitle: "<i class=\"lime fa fa-wifi\"></i> Magic iPad&sup3; &nbsp;",
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
				dimming: 50,

				sharpMode: true,
				dateMode: true,
				name1: "Paula!",
				birthday1: "22.08",
				name2: "Răzvan!",
				birthday2: "13.10",
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
			    timeFrame: "future",
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
							url: "https://calendar.google.com/calendar/ical/razvanh255%40gmail.com/private-979060f6d5c0d779570808b4a4969de2/basic.ics"
						},
						{
							symbol: "product-hunt",
							url: "https://calendar.google.com/calendar/ical/paulica.cristea%40gmail.com/private-c93832bb438f119012440a217530b19f/basic.ics"
						},
						{
							symbol: "birthday-cake",
							url: "https://calendar.google.com/calendar/ical/9vmkbga8nv9gqpmip6pa7f2mpo%40group.calendar.google.com/private-262a0803e45ba6786530c29d59b0d223/basic.ics"
						},
						{
							symbol: "film",
							url: "https://calendar.google.com/calendar/ical/emm3k4f4t7dihvfb0c65st0ijo%40group.calendar.google.com/private-caeb9a5112b8aea911cbbb38baac1a77/basic.ics"
						},
						{
							symbol: "suitcase",
							url: "https://calendar.google.com/calendar/ical/msinsm98i57dm5gcfb60d2peao%40group.calendar.google.com/private-6a6b7086728e0a5dba102d94721c28c0/basic.ics"
						},
					]
				}
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
			position: 'top_center',
			disabled: false,
			config: {
				startMonth: 0,
				monthCount: 1,
				monthsVertical: true,
				repeatWeekdaysVertical: true,
				weekNumbers: true,
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
			header: "Vremea în următoarele ore",
			classes: "hourly",
			disabled: false,
			config: {
				maxNumberOfDays: 3,
				showRainAmount: true,
				showSnowAmount: false,
				updateInterval: 10 * 60 * 1000,
				appendLocationNameToHeader: false,
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
			header: "Vremea în următoarele zile",
			classes: "daily",
			disabled: false,
			config: {
				maxNumberOfDays: 12,
				showRainAmount: true,
				showSnowAmount: false,
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
					"31-10-...." : [
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
			module: "kamasutra",
			position: "top_center",
			header: "Kama Sutra Sex Positions",
			disabled: true
		}
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}