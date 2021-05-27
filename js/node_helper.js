/* Magic Mirror
 * Node Helper Superclass
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 */
const Class = require("./class.js");
const Log = require("./logger.js");
const express = require("express");

var NodeHelper = Class.extend({
	init: function () {
		Log.log("Initializing new module helper ...");
	},

	loaded: function (callback) {
		Log.log("Module helper loaded: " + this.name);
		callback();
	},

	start: function () {
		Log.log("Starting module helper: " + this.name);
	},

	/* stop()
	 * Called when the MagicMirror server receives a `SIGINT`
	 * Close any open connections, stop any sub-processes and
	 * gracefully exit the module.
	 *
	 */
	stop: function () {
		Log.log("Stopping module helper: " + this.name);
	},

	/* socketNotificationReceived(notification, payload)
	 * This method is called when a socket notification arrives.
	 *
	 * argument notification string - The identifier of the notification.
	 * argument payload mixed - The payload of the notification.
	 */
	socketNotificationReceived: function (notification, payload) {
		Log.log(this.name + " received a socket notification: " + notification + " - Payload: " + payload);
	},

	/* setName(name)
	 * Set the module name.
	 *
	 * argument name string - Module name.
	 */
	setName: function (name) {
		this.name = name;
	},

	/* setPath(path)
	 * Set the module path.
	 *
	 * argument path string - Module path.
	 */
	setPath: function (path) {
		this.path = path;
	},

	/* sendSocketNotification(notification, payload)
	 * Send a socket notification to the node helper.
	 *
	 * argument notification string - The identifier of the notification.
	 * argument payload mixed - The payload of the notification.
	 */
	sendSocketNotification: function (notification, payload) {
		this.io.of(this.name).emit(notification, payload);
	},

	/* setExpressApp(app)
	 * Sets the express app object for this module.
	 * This allows you to host files from the created webserver.
	 *
	 * argument app Express app - The Express app object.
	 */
	setExpressApp: function (app) {
		this.expressApp = app;

		var publicPath = this.path + "/public";
		app.use("/" + this.name, express.static(publicPath));
	},

	/* setSocketIO(io)
	 * Sets the socket io object for this module.
	 * Binds message receiver.
	 *
	 * argument io Socket.io - The Socket io object.
	 */
	setSocketIO: function (io) {
		var self = this;
		this.io = io;

		Log.log("Connecting socket for: " + this.name);
		var namespace = this.name;
		io.of(namespace).on("connection", function (socket) {
			// add a catch all event.
			var onevent = socket.onevent;
			socket.onevent = function (packet) {
				var args = packet.data || [];
				onevent.call(this, packet); // original call
				packet.data = ["*"].concat(args);
				onevent.call(this, packet); // additional call to catch-all
			};

			// register catch all.
			socket.on("*", function (notification, payload) {
				if (notification !== "*") {
					//Log.log('received message in namespace: ' + namespace);
					self.socketNotificationReceived(notification, payload);
				}
			});
		});
	}
});

NodeHelper.checkFetchStatus = function (response) {
	// response.status >= 200 && response.status < 300
	if (response.ok) {
		return response;
	} else {
		throw Error(response.statusText);
	}
};

/**
 * Look at the specified error and return an appropriate error type, that
 * can be translated to a detailed error message
 *
 * @param {Error} error the error from fetching something
 * @returns {string} the string of the detailed error message in the translations
 */
NodeHelper.checkFetchError = function (error) {
	var error_type = "MODULE_ERROR_UNSPECIFIED";
	if (error.code === "EAI_AGAIN") {
		error_type = "MODULE_ERROR_NO_CONNECTION";
	} else if (error.message === "Unauthorized") {
		error_type = "MODULE_ERROR_UNAUTHORIZED";
	}
	return error_type;
};

NodeHelper.create = function (moduleDefinition) {
	return NodeHelper.extend(moduleDefinition);
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
module.exports = NodeHelper;
