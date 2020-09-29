/* Magic Mirror
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * Redesigned by Răzvan Cristea
 * for iPad 3 & HD display
 * https://github.com/hangorazvan
 */
(function (root, factory) {
	if (typeof exports === "object") {
		// add timestamps in front of log messages
		require("console-stamp")(console, "yyyy-mm-dd HH:MM:ss.l");

		// Node, CommonJS-like
		module.exports = factory(root.config);
	} else {
		// Browser globals (root is window)
		root.Log = factory(root.config);
	}
})(this, function (config) {
	var logLevel = {
		info: Function.prototype.bind.call(console.info, console),
		log: Function.prototype.bind.call(console.log, console),
		error: Function.prototype.bind.call(console.error, console),
		warn: Function.prototype.bind.call(console.warn, console),
		group: Function.prototype.bind.call(console.group, console),
		groupCollapsed: Function.prototype.bind.call(console.groupCollapsed, console),
		groupEnd: Function.prototype.bind.call(console.groupEnd, console),
		time: Function.prototype.bind.call(console.time, console),
		timeEnd: Function.prototype.bind.call(console.timeEnd, console),
		timeStamp: Function.prototype.bind.call(console.timeStamp, console)
	};

	logLevel.setLogLevel = function (newLevel) {
		if (newLevel) {
			Object.keys(logLevel).forEach(function (key, index) {
				if (!newLevel.includes(key.toLocaleUpperCase())) {
					logLevel[key] = function () {};
				}
			});
		}
	};

	return logLevel;
});
