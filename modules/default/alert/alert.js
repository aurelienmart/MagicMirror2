/* global NotificationFx */
var self = this;
/* Magic Mirror
 * Module: alert
 *
 * By Paul-Vincent Roll https://paulvincentroll.com/
 * MIT Licensed.
 */
Module.register("alert", {
    alerts: {},
    defaults: {
        effect: "slide",
        alert_effect: "jelly",
        display_time: 3500,
        position: "center",
        welcome_message: false // shown at startup
    },
    getScripts: function () {
        return ["notificationFx.js"];
    },
    getStyles: function () {
        return ["font-awesome.css", this.file("./styles/notificationFx.css"), this.file("./styles/" + this.config.position + ".css")];
    },
    getTranslations: function () {
        return {
            en: "translations/en.json",
            ro: "translations/ro.json"
        };
    },
    getTemplate: function (type) {
        return "templates/" + type + ".njk";
    },
    start: function () {
        Log.info("Starting module: " + this.name);
        if (this.config.effect === "slide") {
            this.config.effect = this.config.effect + "-" + this.config.position;
        }
        if (this.config.welcome_message) {
            var message_1 = this.config.welcome_message === true ? this.translate("welcome") : this.config.welcome_message;
            this.showNotification({ title: this.translate("sysTitle"), message: message_1 });
        }
    },
    notificationReceived: function (notification, payload, sender) {
        if ((notification === "SHOW_ALERT") || (notification === "DAY_NOTIFICATION")) {
            if (payload.type === "notification") {
                this.showNotification(payload);
            }
            else {
                this.showAlert(payload, sender);
            }
        }
        else if (notification === "HIDE_ALERT") {
            this.hideAlert(sender);
        }
    },

    async showNotification(notification) {
		const message = await this.renderMessage("notification", notification);

		new NotificationFx({
			message,
			layout: "growl",
			effect: this.config.effect,
			ttl: notification.timer || this.config.display_time
		}).show();
	},

	async showAlert(alert, sender) {
		// If module already has an open alert close it
		if (this.alerts[sender.name]) {
			this.hideAlert(sender, false);
		}

		// Add overlay
		if (!Object.keys(this.alerts).length) {
			this.toggleBlur(true);
		}

		const message = await this.renderMessage("alert", alert);

		// Store alert in this.alerts
		var self = this;
		this.alerts[sender.name] = new NotificationFx({
			message,
			effect: this.config.alert_effect,
			ttl: alert.timer,
			onClose: function() {return self.hideAlert(sender)},
			al_no: "ns-alert"
		});

		// Show alert
		this.alerts[sender.name].show();

		// Add timer to dismiss alert and overlay
		var self = this;
		if (alert.timer) {
			setTimeout(function() {
				self.hideAlert(sender);
			}, alert.timer);
		}
	},

	hideAlert(sender, close = true) {
		// Dismiss alert and remove from this.alerts
		if (this.alerts[sender.name]) {
			this.alerts[sender.name].dismiss(close);
			delete this.alerts[sender.name];
			// Remove overlay
			if (!Object.keys(this.alerts).length) {
				this.toggleBlur(false);
			}
		}
	},

	renderMessage(type, data) {
		var self = this;
		return new Promise(function(resolve) {
			self.nunjucksEnvironment().render(self.getTemplate(type), data, function (err, res) {
				if (err) {
					Log.error("Failed to render alert", err);
				}

				resolve(res);
			});
		});
	},

	toggleBlur(add = false) {
		const method = add ? "add" : "remove";
		const modules = document.querySelectorAll(".module");
		for (const module of modules) {
			module.classList[method]("alert-blur");
		}
	}
});
