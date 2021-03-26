/* Magic Mirror
 * Vendor File Definition
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
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
