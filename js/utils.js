/* Magic Mirror
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * Redesigned by Răzvan Cristea
 * for iPad 3 & HD display
 * https://github.com/hangorazvan
 */
var colors = require("colors/safe");

var Utils = {
	colors: {
		warn: colors.yellow,
		error: colors.red,
		info: colors.blue,
		pass: colors.green
	}
};

if (typeof module !== "undefined") {
	module.exports = Utils;
}
