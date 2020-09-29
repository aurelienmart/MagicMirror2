/* Magic Mirror
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * Redesigned by Răzvan Cristea
 * for iPad 3 & HD display
 * https://github.com/hangorazvan
 */
var address = "localhost";
var port = 8080;
if (typeof mmPort !== "undefined") {
	port = mmPort;
}
var defaults = {
	address: address,
	port: port,
	basePath: "/",
	kioskmode: false,
	electronOptions: {},
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"],

	language: "en",
	timeFormat: 24,
	units: "metric",
	zoom: 1,
	customCss: "css/custom.css",

	modules: [
		{
			module: "updatenotification",
			position: "top_center",
			disabled: true
		},
		{
			module: "simpletext",
			position: "upper_third",
			classes: "large thin",
			config: {
				text: "Magic Mirror<sup>2</sup>"
			}
		},
		{
			module: "simpletext",
			position: "middle_center",
			config: {
				text: "Please create a config file."
			}
		},
		{
			module: "simpletext",
			position: "middle_center",
			classes: "small dimmed",
			config: {
				text: "See README for more information."
			}
		},
		{
			module: "simpletext",
			position: "middle_center",
			classes: "xsmall",
			config: {
				text: "If you get this message while your config file is already<br>created, your config file probably contains an error.<br>Use a JavaScript linter to validate your file."
			}
		},
		{
			module: "simpletext",
			position: "bottom_bar",
			classes: "xsmall dimmed",
			config: {
				text: "www.michaelteeuw.nl"
			}
		}
	],

	paths: {
		modules: "modules",
	}
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {
	module.exports = defaults;
}
