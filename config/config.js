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
	port: 8080,
	basePath: "/",
	ipWhitelist: [],
	useHttps: false,
	httpsPrivateKey: "",
	httpsCertificate: "",

	language: "fr",
	locale: "fr-FR",
	timeFormat: 24,
	units: "metric",
	latitude: 48.782,
	longitude: 2.194,
	location: "Vélizy-Villacoublay",
	locationID: 683506,
	timezone: "Europe/Paris",
	decimal: ",",
	backup: '',
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
			module: "clock",
			position: "top_left",
			classes: "digital night",
			disabled: false,
			config: {
				displayType: "digital",
				showWeek: false,
				dateFormat: "dddd, D MMMM Y",
				showSunTimes: false,
				showMoonTimes: false
			}
		},
		{
			module: "calendar",
			position: "top_left",
			classes: "day ical",
			header: "Calendar evenimente și aniversări",
			disabled: false,
			config: {
				maximumEntries: 2,
				displayRepeatingCountTitle: true,
				fetchInterval: 5*60 * 1000,
				fade: false,
				dateFormat: "ddd D MMM",
				fullDayEventDateFormat: "ddd D MMM",
				getRelative: 48,
				coloredSymbolOnly: true,
				locationTitleReplace: {},
				nextDaysRelative: true,

				calendars: [
					{
						symbol: "calendar-check-o", symbolClass: "skyblue", // titleClass: "skyblue", timeClass: "skyblue", color: "normal",
						url: "webcal://nominis.cef.fr/ical/nominis.php",
					}
				]
			}
		},
		{
			module: "onecall/loader",
			config: {
				lat: "48.782",                               // your location latitude,
				lon: "2.194",                               // your location longitude,
				appid: "23b8abe22f9b5a591e7cafbe33a2bbc3",                             // your Openweathermap appid
				appid2: "",                            // optional for Pollution module
				backup: "",                            // optional backup appid
				dayUpdateInterval: 10 * 60 * 1000,     // every 10 minutes
				nightUpdateInterval: 15 * 60 * 1000,   // every 15 minutes
			}
		},
		{
			module: "onecall",
			position: "top_right",
			classes: "current weather",
			config: {
				flexDayForecast: false,     // show Flex Day Forecast, set maxNumberOfDays to 3 or 6
				maxNumberOfHours: 1,
				maxNumberOfDays: 4,
				extraHourly: false,          // snow extra hourly humidity, dew point, pressure, real feel and rain or snow,
				extraDaily: true,           // snow extra daily humidity, dew point, pressure, real feel and rain or snow,
				endpointType: "onecall",    // "current", "hourly", "daily" or "onecall"
				oneLoader: true,            // very important for just one API call
				showWindDirection: false,
		showWindDirectionAsArrow: false,
		useBeaufort: false,
		useKMPHwind: false,
		showFeelsLike: false,
		showVisibility: false,
		showHumidity: false,
		showPressure: false,
		showDew: false,              // dew point
		showUvi: false,              // UV index
		showDescription: false,
		showAlerts: false,
		defaultIcons: true,        // with or without default icons
		showRainAmount: false,       // snow show only in winter months 
			}
		},
		{
			module: "yframe",
			position: "bottom_left",
			config: {
				url: "http://www.sytadin.fr/frame/cartographie.jsp.html?largeur=596",
	
			// HTML5 Video mode example url: "path/folder/file.mp4"
			// http or local mp4, webm and ogg media
	
			// Youtube & Web iframe mode example url: "https://cristea13.ro"
			// "https://cristea13.ro/video/landscape_demo.mp4"
			// "https://www.dailymotion.com/embed/video/x7urdc7"
			// "https://www.youtube.com/embed/eKFTSSKCzWA"
			// Could be any website without X-Frame-Options deny and sameorigin activated
			// or media stream from Youtube, Dailymotion, DTube, Metacafe, Ted, lbry.tv etc.
	
			// Vimeo iframe mode example url: "https://player.vimeo.com/video/54511177"
			// Soundcloud iframe mode example url: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/653929878"
			// Soundcloud playlist tracks must have embeded-player code active to be displayed publicly
			// Badcamp iframe mode example url: "https://bandcamp.com/EmbeddedPlayer/album=3096747879"
			// Audiomack iframe mode example url: "https://audiomack.com/embed/playlist/razvanh/love-of-future"
	
			media: false,				// false for websites that do not need player options
			width: "600",				// use without px unit for video or media
			height: "300",				// ignored for video or media
			aspect: 9/16,				// height is set to be 9:16 ratio (h/w) for video or media
			cssClass: "video",			// custom className
			loop: 1,				// loop video
			autoplay: 1,				// for video mode autoplay you need controls: 0 and muted: 1
			controls: 0,				// for video mode without controls you need autoplay: 1
			muted: 1,				// for video mode not muted you need autoplay: 0 and controls: 1
	
		// HTML5 Video mode
			poster: "",				// custom poster image
			preload: "auto",
	
		// Youtube & Web iframe
			start: "04",				// seconds to start
			allow: "autoplay; fullscreen; encrypted-media; picture-in-picture",
			border: "0",				// css style, width, color
			style: "",
			overflow: "hidden",
			origin: "strict-origin",
			related: 0,
				// "RRGGBB" custom colors or false
			},
		},
		{
			module: "MMM-Bring",
			position: "bottom_right",
			config: {
			   email: "aurelio-siles@hotmail.fr",
			   password: "bringMMM1",
			   updateInterval: 5, // in Minutes
			   listName: "Brasseur", // optional
			   showListName: false,
			   activeItemColor: "#EE524F",
			   latestItemColor: "#4FABA2",
			   showLatestItems: false,
			   maxItems: 21,
			   maxLatestItems: 0,
			   locale: "fr-FR",
			   useKeyboard: false,
			   customHeader: "My shopping list", // optional
			   listDropdown: true
			}
		}
	
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
