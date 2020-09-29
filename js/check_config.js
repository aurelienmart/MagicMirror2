/* Magic Mirror
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * Redesigned by Răzvan Cristea
 * for iPad 3 & HD display
 * https://github.com/hangorazvan
 */
var Linter = require("eslint").Linter;
var linter = new Linter();

var path = require("path");
var fs = require("fs");

var rootPath = path.resolve(__dirname + "/../");
var Log = require(rootPath + "/js/logger.js");
var Utils = require(rootPath + "/js/utils.js");

/**
 * Returns a string with path of configuration file.
 * Check if set by environment variable MM_CONFIG_FILE
 *
 * @returns {string} path and filename of the config file
 */
function getConfigFile() {
	// FIXME: This function should be in core. Do you want refactor me ;) ?, be good!
	let configFileName = path.resolve(rootPath + "/config/config.js");
	if (process.env.MM_CONFIG_FILE) {
		configFileName = path.resolve(process.env.MM_CONFIG_FILE);
	}
	return configFileName;
}

/**
 * Checks the config file using eslint.
 */
function checkConfigFile() {
	var configFileName = getConfigFile();

	// Check if file is present
	if (fs.existsSync(configFileName) === false) {
		Log.error(Utils.colors.error("File not found: "), configFileName);
		throw new Error("No config file present!");
	}

	// Check permission
	try {
		fs.accessSync(configFileName, fs.F_OK);
	} catch (e) {
		Log.log(Utils.colors.error(e));
		throw new Error("No permission to access config file!");
	}

	// Validate syntax of the configuration file.
	Log.info(Utils.colors.info("Checking file... "), configFileName);

	// I'm not sure if all ever is utf-8
	fs.readFile(configFileName, "utf-8", function (err, data) {
		if (err) {
			throw err;
		}
		var messages = linter.verify(data);
		if (messages.length === 0) {
			Log.info(Utils.colors.pass("Your configuration file doesn't contain syntax errors :)"));
		} else {
			Log.error(Utils.colors.error("Your configuration file contains syntax errors :("));
			// In case the there errors show messages and return
			messages.forEach(function (error) {
				Log.error("Line", error.line, "col", error.column, error.message);
			});
		}
	});
}

checkConfigFile();
