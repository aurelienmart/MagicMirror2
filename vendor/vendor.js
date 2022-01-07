/* Magic Mirror
 * Vendor File Definition
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 */
var vendor = {
	"moment.js"				: "../vendor/cdn.js",
	"moment-timezone.js"	: "../vendor/cdn.js",
	"suncalc.js"			: "../vendor/cdn.js",
	"nunjucks.js"			: "../vendor/cdn.js",
	"jquery.js"				: "../vendor/cdn.js",
	"weather-icons.css"		: "../fonts/fonts.css",
	"weather-icons-wind.css": "../fonts/fonts.css",
	"font-awesome.css"		: "../fonts/fonts.css"
};

if (typeof module !== "undefined") {
	module.exports = vendor;
}