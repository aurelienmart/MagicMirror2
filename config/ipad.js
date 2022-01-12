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
 	appid: '', // ios9 ipad3
	apiBase: "http://api.openweathermap.org/data/",
	apiVersion: "2.5/",
	roundTemp: false,
	period: false,
	scale: true,
	delay: 2000,
	animation: 2000,
	transition: 1000,
	customAnimation: false,
	header: true,
	notification: false,
	minVersion: "2.1.0",
	DeepMerge: true,

	modules: [
		{
			module: "alert",
			config: {
				display_time: 5000,
				welcome_message: true
			}
		},
		{
			module: "notification",
			position: "top_center",
			classes: "night",
			disabled: false,
			config: {
				startImage: "wifi lime",
				startTitle: "Magic Board&sup2;&nbsp;",
				startTablet: "Magic iPad&sup3;&nbsp;",
				startNotification: "Modular smart mirror platform",
				timer: 8000
			}
		},
		{
			module: "notification/timer",
			classes: "night",
			disabled: false,
			config: {
				bodysize: 1080,
				zoomMode: true,
				nightMode: true,
				fadeMode: true,
				dimming: 50,
				background: false, // "/css/background.jpg",
				monochrome: false, // 100,
				resetMM: false,

				sharpMode: true,
				dateMode: true,

				birthday1: "22.08",
				customTitle1: "La mulți ani Paula!",
				customText1: "Multă sănătate și să fi fericită!",
				birthday2: "13.10",
				customTitle2: "La mulți ani Răzvan!",
				customText2: "Multă sănătate și să fi fericit!",
				birthday3: "01.12",
				customTitle3: "La mulți ani România!",
				customText3: "La mulți ani tuturor românilor!"
			}
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
				secondsColor: "coral"
			}
		},
		{
			module: "monthly",
			position: "top_center",
			classes: "day",
			disabled: false,
			config: {
				startMonth: 0,
				monthCount: 2,
				monthsVertical: true,
				repeatWeekdaysVertical: true,
				weekNumbers: true,
				highlightWeekend: true,
				fade: false
			}
		},
		{
			module: "lifecounter",
			position: "top_center",
			classes: "day",
			disabled: false,
			config: {
				birthday: "2023-01-01 00:00:00",
				counter: "days",
				before: "<br>Mai sunt",
				after: "de zile până la Anul Nou",
				cssclass: "midget"
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
			module: "swatch",
			position: "top_left",
			classes: "day",
			disabled: false,
			config: {
				logo_height: 28
			}
		},
		{
			module: "simpletext",
			position: "top_left",
			classes: "day",
			header: "Calendar evenimente și aniversări",
			disabled: false,
			config: {
				text: "",
				cssClass: "small"
			}
		},
		{
			module: "icalendar",
			position: "top_left",
			classes: "day",
			disabled: false,
			config: {
				maximumEntries: 20,
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
							url: "http://calendar.google.com/calendar/ical/ro.romanian%23holiday%40group.v.calendar.google.com/public/basic.ics",
							maximumEntries: 5
						},
						{
							symbol: "moon",
							url: "http://calendar.google.com/calendar/ical/ht3jlfaac5lfd6263ulfh4tql8%40group.calendar.google.com/public/basic.ics",
							maximumEntries: 5
						},
					]
				}
			}
		},
		{
			module: 'jsontable',
			position: 'top_left',
			header: 'Consum casnic în ultimile luni',
			classes: "day",
			disabled: true,
			config: {
				url: "data.json",
				arrayName: "2021",
				tableClass: "small",
				descriptiveRow: "<tr><td>Luna</td><td>Apa calda</td><td>Apa rece</td><td>Energie</td></tr>"
			}
		},
		{
			module: "simpletext",
			position: "top_left",
			classes: "day",
			disabled: true,
			config: {
				text: "&nbsp;<br><header class=\"module-header\">Scanează-mă pentru acces la Wi-Fi</header><img width=\"160px\" src=\"modules/simpletext/wifi.png\"> &nbsp; &nbsp; <img width=\"160px\" src=\"modules/simpletext/wifi2.png\">",
				cssClass: "jsontable midget"
			}
		},
		{
			module: "onecall",
			position: "top_right",
			classes: "night current weather",
			disabled: false,
			config: {
				appendLocationNameToHeader: false,
			}
		},
		{
			module: "onecall",
			position: "top_right",
			header: "Vremea în următoarele ore la",
			classes: "hourly forecast ipad day",
			disabled: false,
			config: {
				maxNumberOfDays: 4,
				endpointType: "hourly",
				fullday: "HH [h]",
				initialLoadDelay: 2000,
			}
		},
		{
			module: "onecall",
			position: "top_right",
			header: "Vremea în următoarele zile la",
			classes: "daily forecast ipad day",
			disabled: false,
			config: {
				endpointType: "daily",
				extra: true,
				initialLoadDelay: 4000,
			}
		},
		{
			module: "compliments",
			position: "middle_center",
			classes: "night",
			disabled: false,
			config: {
				classes: "thin large pre-line complimentz skyblue",
				compliments: {
					anytime : [
						"Orice faci, fă-o bine!",
						"Fi sexy, fi tu însuți!",
						"O zi cât mai frumoasă!",
						"Azi arăți foarte bine!",
						"Să te simți excelent!",
						"Arăți minunat, succes!",
						"Să ai multă sănătate!",
						"Fă-o astăzi, nu mâine!",
						"Întotdeauna ai dreptate!",
						"Zâmbește, trăiește!",
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
						"<i class=\"skyblue wi wi-night-showers\"></i> Ploaie ușoară",
						"<i class=\"skyblue wi wi-night-showers\"></i> Ploaie măruntă"
					],
					night_rain : [
						"<i class=\"deepskyblue wi wi-night-rain\"></i> Noapte ploioasă",
						"<i class=\"deepskyblue wi wi-night-rain\"></i> Plouă!"
					],
					night_thunderstorm : [
						"<i class=\"royalblue wi wi-night-thunderstorm\"></i> Noapte furtunoasă!",
						"<i class=\"royalblue wi wi-night-thunderstorm\"></i> Furtuna!"
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
					"31-10-...." : [
						"<i class=\"gold fa fa-ghost\"></i> Happy Halloween!"
					],
					"01-12-...." : [
						"<i class=\"gold fa fa-glass-cheers\"></i> La mulți ani România!"
					],
					"..-12-...." : [
						"<i class=\"bright fa fa-snowman\"></i> Vin sărbătorile!",
						"<i class=\"gold fa fa-gifts\"></i> Luna cadourilor!"
					],
					"25-12-...." : [
						"<i class=\"gold fa fa-holly-berry\"></i> Crăciun fericit!",
						"<i class=\"gold fa fa-gift\"></i> Sărbători fericite!"
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
					]
				}
			}
		},
		{
			module: "quotes",
			position: "lower_third",
			classes: "day",
			disabled: false,
			config: {
				updateInterval: 22500,
				category: "random",
				className: "medium"
			}
		},
		{
			module: "rssfeed",
			position: "bottom_bar",
			classes: "day",
			disabled: false,
			config: {
				lengthDescription: 600,
				fetchNewsTime: 5 * 60 * 1000,
				feedURLs: {
					"ProTV"		: "http://rss.stirileprotv.ro",
					"Mediafax"	: "http://www.mediafax.ro/rss",
					"NewsIn"	: "http://newsin.ro/feed",
					"News.ro"	: "http://www.news.ro/rss",
					"MainNews"	: "http://mainnews.ro/feed",
					"Ziare.com"	: "http://www.ziare.com/rss/12h.xml",
				//	"HotNews"	: "http://www.hotnews.ro/rss",
				//	"Digi24"	: "http://www.digi24.ro/rss",
					},
				feedMaxAge: {days: 0, hours: 12}
			}
		},
		{
			module: "yframe",
			position: "upper_third",
			classes: "night",
			disabled: true,
			config: {
				url: "http://cristea13.ro/video/fishtank.mp4",
				media: true,
				width: "1080",
				height: "607",
				aspect: 9/16,
				cssClass: "fishtank"
			}
		},
		{
			module: 'snow',
			position: 'fullscreen_above',
			disabled: false,
		}
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
