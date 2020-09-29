/* Magic Mirror
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * Redesigned by Răzvan Cristea
 * for iPad 3 & HD display
 * https://github.com/hangorazvan
 */
var vendor = {
	"moment.js"				: "../js/cdn.js",
	"moment-timezone.js"	: "../js/cdn.js",
	"suncalc.js"			: "../js/cdn.js",
	"nunjucks.js"			: "../js/cdn.js",
	"jquery.js"				: "../js/cdn.js",
	"weather-icons.css"		: "../fonts/fonts.css",
	"weather-icons-wind.css": "../fonts/fonts.css",
	"font-awesome.css"		: "../fonts/fonts.css",
};

if (typeof module !== "undefined") {
	module.exports = vendor;
}
