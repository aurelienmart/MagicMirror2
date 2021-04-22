"use strict";

var SimpleGit = require("simple-git");
var simpleGits = [];
var fs = require("fs");
var path = require("path");
var defaultModules = require(__dirname + "/../defaultmodules.js");
var Log = require("logger");
var NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
	config: {},

	updateTimer: null,
	updateProcessStarted: false,

	start: function start() {},

	configureModules: function configureModules(modules) {
		var moduleName, moduleFolder, git;
		return regeneratorRuntime.async(function configureModules$(context$1$0) {
			while (1) switch (context$1$0.prev = context$1$0.next) {
				case 0:
					// Push MagicMirror itself , biggest chance it'll show up last in UI and isn't overwritten
					// others will be added in front
					// this method returns promises so we can't wait for every one to resolve before continuing
					simpleGits.push({ module: "default", git: this.createGit(path.normalize(__dirname + "/../../../")) });

					context$1$0.t0 = regeneratorRuntime.keys(modules);

				case 2:
					if ((context$1$0.t1 = context$1$0.t0()).done) {
						context$1$0.next = 20;
						break;
					}

					moduleName = context$1$0.t1.value;

					if (this.ignoreUpdateChecking(moduleName)) {
						context$1$0.next = 18;
						break;
					}

					moduleFolder = path.normalize(__dirname + "/../../" + moduleName);
					context$1$0.prev = 6;

					Log.info("Checking git for module: " + moduleName);
					// Throws error if file doesn't exist
					fs.statSync(path.join(moduleFolder, ".git"));
					// Fetch the git or throw error if no remotes
					context$1$0.next = 11;
					return regeneratorRuntime.awrap(this.resolveRemote(moduleFolder));

				case 11:
					git = context$1$0.sent;

					// Folder has .git and has at least one git remote, watch this folder
					simpleGits.unshift({ module: moduleName, git: git });
					context$1$0.next = 18;
					break;

				case 15:
					context$1$0.prev = 15;
					context$1$0.t2 = context$1$0["catch"](6);
					return context$1$0.abrupt("continue", 2);

				case 18:
					context$1$0.next = 2;
					break;

				case 20:
				case "end":
					return context$1$0.stop();
			}
		}, null, this, [[6, 15]]);
	},

	socketNotificationReceived: function socketNotificationReceived(notification, payload) {
		var _this = this;

		if (notification === "CONFIG") {
			this.config = payload;
		} else if (notification === "MODULES") {
			// if this is the 1st time thru the update check process
			if (!this.updateProcessStarted) {
				this.updateProcessStarted = true;
				this.configureModules(payload).then(function () {
					return _this.performFetch();
				});
			}
		}
	},

	resolveRemote: function resolveRemote(moduleFolder) {
		var git, remotes;
		return regeneratorRuntime.async(function resolveRemote$(context$1$0) {
			while (1) switch (context$1$0.prev = context$1$0.next) {
				case 0:
					git = this.createGit(moduleFolder);
					context$1$0.next = 3;
					return regeneratorRuntime.awrap(git.getRemotes(true));

				case 3:
					remotes = context$1$0.sent;

					if (!(remotes.length < 1 || remotes[0].name.length < 1)) {
						context$1$0.next = 6;
						break;
					}

					throw new Error("No valid remote for folder " + moduleFolder);

				case 6:
					return context$1$0.abrupt("return", git);

				case 7:
				case "end":
					return context$1$0.stop();
			}
		}, null, this);
	},

	performFetch: function performFetch() {
		var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, sg, fetchData, logData;

		return regeneratorRuntime.async(function performFetch$(context$1$0) {
			while (1) switch (context$1$0.prev = context$1$0.next) {
				case 0:
					_iteratorNormalCompletion = true;
					_didIteratorError = false;
					_iteratorError = undefined;
					context$1$0.prev = 3;
					_iterator = simpleGits[Symbol.iterator]();

				case 5:
					if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
						context$1$0.next = 23;
						break;
					}

					sg = _step.value;
					context$1$0.prev = 7;
					context$1$0.next = 10;
					return regeneratorRuntime.awrap(sg.git.fetch(["--dry-run"]).status());

				case 10:
					fetchData = context$1$0.sent;
					context$1$0.next = 13;
					return regeneratorRuntime.awrap(sg.git.log({ "-1": null }));

				case 13:
					logData = context$1$0.sent;

					if (logData.latest && "hash" in logData.latest) {
						this.sendSocketNotification("STATUS", {
							module: sg.module,
							behind: fetchData.behind,
							current: fetchData.current,
							hash: logData.latest.hash,
							tracking: fetchData.tracking
						});
					}
					context$1$0.next = 20;
					break;

				case 17:
					context$1$0.prev = 17;
					context$1$0.t0 = context$1$0["catch"](7);

					Log.error("Failed to fetch git data for " + sg.module + ": " + context$1$0.t0);

				case 20:
					_iteratorNormalCompletion = true;
					context$1$0.next = 5;
					break;

				case 23:
					context$1$0.next = 29;
					break;

				case 25:
					context$1$0.prev = 25;
					context$1$0.t1 = context$1$0["catch"](3);
					_didIteratorError = true;
					_iteratorError = context$1$0.t1;

				case 29:
					context$1$0.prev = 29;
					context$1$0.prev = 30;

					if (!_iteratorNormalCompletion && _iterator["return"]) {
						_iterator["return"]();
					}

				case 32:
					context$1$0.prev = 32;

					if (!_didIteratorError) {
						context$1$0.next = 35;
						break;
					}

					throw _iteratorError;

				case 35:
					return context$1$0.finish(32);

				case 36:
					return context$1$0.finish(29);

				case 37:

					this.scheduleNextFetch(this.config.updateInterval);

				case 38:
				case "end":
					return context$1$0.stop();
			}
		}, null, this, [[3, 25, 29, 37], [7, 17], [30,, 32, 36]]);
	},

	scheduleNextFetch: function scheduleNextFetch(delay) {
		if (delay < 60 * 1000) {
			delay = 60 * 1000;
		}

		var self = this;
		clearTimeout(this.updateTimer);
		this.updateTimer = setTimeout(function () {
			self.performFetch();
		}, delay);
	},

	createGit: function createGit(folder) {
		return SimpleGit({ baseDir: folder, timeout: { block: this.config.timeout } });
	},

	ignoreUpdateChecking: function ignoreUpdateChecking(moduleName) {
		// Should not check for updates for default modules
		if (defaultModules.indexOf(moduleName) >= 0) {
			return true;
		}

		// Should not check for updates for ignored modules
		if (this.config.ignoreModules.indexOf(moduleName) >= 0) {
			return true;
		}

		// The rest of the modules that passes should check for updates
		return false;
	}
});

// Default modules are included in the main MagicMirror repo

// Error when directory .git doesn't exist or doesn't have any remotes
// This module is not managed with git, skip