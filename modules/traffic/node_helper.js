/* Magic Mirror
 * Module: MMM-Traffic
 *
 * By Sam Lewis https://github.com/SamLewis0602
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
var fetch = require("node-fetch");

module.exports = NodeHelper.create({
  start() {
    console.log("Traffic helper started...");
  },

  getCommute(api_url) {
    var self = this;
    fetch(api_url)
      .then(self.checkStatus)
      .then(function(json) {
        var duration = Math.round(json.routes[0].duration / 60);
        self.sendSocketNotification("TRAFFIC_DURATION", { duration: duration, url: api_url });
      })
      .catch(function(e) {
        self.sendSocketNotification("TRAFFIC_ERROR", { error: e, url: api_url });
      });

  },

  checkStatus(res) {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then(function(json) {
        throw new TrafficError(`API Error - ${json.code}`, json.message);
      });
    }
  },

  socketNotificationReceived(notification, payload) {
    // this.setTimeConfig(payload.timeConfig);

    if (notification === "TRAFFIC_URL") {
      this.getCommute(payload.url);
    } else if (notification === "LEAVE_BY") {
      this.getTiming(payload.url, payload.arrival);
    }
  }

});

class TrafficError extends Error {
  constructor(message, description, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params)

    this.name = "Traffic_Error"
    // Custom debugging information
    this.message = message;
    this.description = description;
  }
}