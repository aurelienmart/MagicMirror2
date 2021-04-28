/* Magic Mirror
 * Module: UpdateNotification
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 */
"use strict";

Module.register("updatenotification", {
	defaults: {
		updateInterval: 10 * 60 * 1000, // every 10 minutes
		refreshInterval: 24 * 60 * 60 * 1000, // one day
		ignoreModules: [],
		timeout: 5000
	},

	suspended: false,
	moduleList: {},

	start: function () {
		var self = this;
		Log.info("Starting module: " + this.name);
		setInterval(function () {
			self.moduleList = {};
			self.updateDom(2);
		}, self.config.refreshInterval);
	},

	notificationReceived: function (notification, payload, sender) {
		if (notification === "DOM_OBJECTS_CREATED") {
			this.sendSocketNotification("CONFIG", this.config);
			this.sendSocketNotification("MODULES", Module.definitions);
			//this.hide(0, { lockString: self.identifier });
		}
	},

	socketNotificationReceived: function (notification, payload) {
		if (notification === "STATUS") {
			this.updateUI(payload);
		}
	},

	updateUI: function (payload) {
		var self = this;
		if (payload && payload.behind > 0) {
			// if we haven't seen info for this module
			if (this.moduleList[payload.module] === undefined) {
				// save it
				this.moduleList[payload.module] = payload;
				self.updateDom(2);
			}
			//self.show(1000, { lockString: self.identifier });
		} else if (payload && payload.behind === 0) {
				// if the module WAS in the list, but shouldn't be
				if (this.moduleList[payload.module] !== undefined) {
					// remove it
					delete this.moduleList[payload.module];
					self.updateDom(2);
				}
			}
	},

	diffLink: function (module, text) {
		var localRef = module.hash;
		var remoteRef = module.tracking.replace(/.*\//, "");
		return '<a href="https://github.com/MichMich/MagicMirror/compare/' + localRef + "..." + remoteRef + '" ' + 'class="xsmall dimmed" ' + 'style="text-decoration: none;" ' + 'target="_blank" >' + text + "</a>";
	},

	// Override dom generator.
	getDom: function () {
		var wrapper = document.createElement("div");
		if (this.suspended === false) {
			// process the hash of module info found
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = Object.keys(this.moduleList)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var key = _step.value;

					var m = this.moduleList[key];

					var message = document.createElement("div");
					message.className = "small bright";

					var icon = document.createElement("i");
					icon.className = "fa fa-exclamation-circle";
					icon.innerHTML = "&nbsp;";
					message.appendChild(icon);

					var updateInfoKeyName = m.behind === 1 ? "UPDATE_INFO_SINGLE" : "UPDATE_INFO_MULTIPLE";

					var subtextHtml = this.translate(updateInfoKeyName, {
						COMMIT_COUNT: m.behind,
						BRANCH_NAME: m.current
					});

					var text = document.createElement("span");
					if (m.module === "default") {
						text.innerHTML = this.translate("UPDATE_NOTIFICATION");
						subtextHtml = this.diffLink(m, subtextHtml);
					} else {
						text.innerHTML = this.translate("UPDATE_NOTIFICATION_MODULE", {
							MODULE_NAME: m.module
						});
					}
					message.appendChild(text);

					wrapper.appendChild(message);

					var subtext = document.createElement("div");
					subtext.innerHTML = subtextHtml;
					subtext.className = "xsmall dimmed";
					wrapper.appendChild(subtext);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator["return"]) {
						_iterator["return"]();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		}
		return wrapper;
	},

	suspend: function () {
		this.suspended = true;
	},
	resume: function () {
		this.suspended = false;
		this.updateDom(2);
	}
});