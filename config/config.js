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
 	appid: '',
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
	serverOnly: true,
	DeepMerge: true,
	logLevel: ["INFO", "LOG", "WARN"], // "DEBUG", "INFO", "LOG", "WARN", "ERROR"

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
				zoomMode: false,
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
			classes: "day ",
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
			module: "calendar",
			position: "top_left",
			classes: "day ical",
			header: "Calendar evenimente și aniversări",
			disabled: false,
			config: {
				maximumEntries: 20,
				displayRepeatingCountTitle: true,
				fetchInterval: 60 * 1000,
				fade: false,
				dateFormat: "ddd D MMM",
				fullDayEventDateFormat: "ddd D MMM",
				getRelative: 48,
				coloredSymbolOnly: true,
				titleReplace: {
					"a doua zi de Crăciun": "A doua zi de Crăciun",
					"Ziua Internațională a Femeii": "Ziua femeii",
					"Zi Constantin Brancusi": "Ziua lui Brâncuși",
					"New moon": "Lună nouă la",
					"First quarter": "Primul pătrar la",
					"Full moon": "Lună plină la",
					"Last quarter": "Ultimul pătrar la"
				},
				locationTitleReplace: {},
				excludedEvents: [
					"Orthodox Good Friday",
					"Ziua Sfîntului Andrei",
					"Adormirea Maicii Domnului",
					"Rusalii",
					"Doua zi de Rusalii"
				],
				nextDaysRelative: true,

				calendars: [
					{
						symbol: "calendar-check-o", symbolClass: "skyblue", // titleClass: "skyblue", timeClass: "skyblue", color: "normal",
						url: "http://calendar.google.com/calendar/ical/ro.romanian%23holiday%40group.v.calendar.google.com/public/basic.ics",
						maximumEntries: 5
					},
					{
						symbol: "moon", symbolClass: "normal", // titleClass: "normal", timeClass: "normal", color: "normal",
						url: "http://calendar.google.com/calendar/ical/ht3jlfaac5lfd6263ulfh4tql8%40group.calendar.google.com/public/basic.ics",
						maximumEntries: 5
					},
				]
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
			module: "currentweather",
			position: "top_right",
			classes: "night current weather",
			disabled: false,
			config: {
				// modified module with own onecall settings
			}
		},
		{
			module: "weatherforecast",
			position: "top_right",
			header: "Vremea în următoarele ore la",
			classes: "hourly forecast ipad day",
			disabled: false,
			config: {
				maxNumberOfDays: 4,
				locationID: false,
				forecastEndpoint: "/onecall",
				excludes: "current,minutely,daily",
				extra: false,
				fallBack: true,
				fullday: "HH [h]",
				showRainAmount: true,
				fadePoint: 0.5,
				fade: false
			}
		},
		{
			module: "weatherforecast",
			position: "top_right",
			header: "Vremea în următoarele zile la",
			classes: "daily forecast ipad day",
			disabled: false,
			config: {
				maxNumberOfDays: 8,
				locationID: false,
				forecastEndpoint: "/onecall",
				excludes: "current,minutely,hourly",
				extra: true,
				fullday: "ddd",
				initialLoadDelay: 3000,
				showRainAmount: true,
				fadePoint: 0,
				fade: false
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
				showPrecipitationAmount: false
			}
		},
		{
			module: "weather",
			position: "top_right",
			header: "Vremea în următoarele zile la",
			classes: "daily weatherforecast forecast day",
			disabled: true,
			config: {
				appendLocationNameToHeader: true,
				type: "daily",
				maxNumberOfDays: 15,
				initialLoadDelay: 2000,
				tableClass: "small"
			}
		},
		{
			module: "weather",
			position: "top_right",
			header: "Vremea în următoarele ore la",
			classes: "hourly weatherforecast forecast day",
			disabled: true,
			config: {
				appendLocationNameToHeader: true,
				type: "hourly",
				maxEntries: 15,
				initialLoadDelay: 1000,
				tableClass: "small"
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
						"Arăți minunat, succes!",
						"Fă-o astăzi, nu mâine!",
						"Întotdeauna ai dreptate!",
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
			module: "newsfeed",
			position: "bottom_bar",
			classes: "day rss",
			disabled: false,
			config: {
				showDescription: true,
				lengthDescription: 300,
				hideLoading: true,
				updateInterval: 60 * 1000,
		        reloadInterval: 60 * 1000,
				ignoreOlderThan: 12 * 60 * 60 * 1000,
				ignoreOldItems: true,
				removeStartTags: "both",
				removeEndTags: "both",
				startTags: ["VIDEO","FOTO","horoscop"],
				endTags: ["VIDEO","FOTO","horoscop"],
				prohibitedWords: ["VIDEO","FOTO","Marius Tucă Show","Bancul zilei"],

				feeds: [
					{
						title: "ProTV",
						url: "http://rss.stirileprotv.ro",
						encoding: "UTF-8"
					},
					{
						title: "MediaFax",
						url: "http://www.mediafax.ro/rss/",
						encoding: "UTF-8"
					},
					{
						title: "Digi24",
						url: "http://www.digi24.ro/rss",
						encoding: "UTF-8"
					},
					{
						title: "HotNews",
						url: "http://www.hotnews.ro/rss",
						encoding: "UTF-8"
					},
					{
						title: "NewsIn",
						url: "http://newsin.ro/feed/",
						encoding: "UTF-8"
					},
					{
						title: "MainNews",
						url: "http://mainnews.ro/feed/",
						encoding: "UTF-8"
					},
					{
						title: "News.ro",
						url: "http://www.news.ro/rss",
						encoding: "UTF-8"
					},
					{
						title: "Ziare.com",
						url: "http://www.ziare.com/rss/12h.xml",
						encoding: "UTF-8"
					}
				]
			}
		},
		{
			module: "newsfeed",
			position: "bottom_bar",
			classes: "international day",
			disabled: true,
			config: {
				showDescription: true,
				lengthDescription: 300,
				hideLoading: true,
				updateInterval: 60 * 1000,
				ignoreOlderThan: 12 * 60 * 60 * 1000,
				ignoreOldItems: true,

				feeds: [
					{
						title: "Discovery",
						url: "http://discovery.ro/feed/",
						encoding: "UTF-8"
					},
					{
						title: "NASA",
						url: "http://www.nasa.gov/rss/dyn/breaking_news.rss",
						encoding: "UTF-8"
					},
					{
						title: "BBC World",
						url: "http://feeds.bbci.co.uk/news/world/rss.xml",
						encoding: "UTF-8"
					},
					{
						title: "NY Times",
						url: "http://rss.nytimes.com/services/xml/rss/nyt/World.xml",
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
						url: "http://www.reutersagency.com/feed/?taxonomy=best-topics&post_type=best",
						encoding: "UTF-8"
					}
				]
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
			disabled: true,
		}
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
