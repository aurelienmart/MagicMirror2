/* Magic Mirror
 * Module: MMM-Traffic
 *
 * By Sam Lewis https://github.com/SamLewis0602
 * MIT Licensed.
 */

Module.register('traffic', {
  defaults: {
    interval: 300000,
    showSymbol: true,
    firstLine: "Current duration is {duration} mins",
    loadingText: "Loading...",
    language: config.language,
    days: [0, 1, 2, 3, 4, 5, 6],
    hoursStart: "00:00:00",
    hoursEnd: "23:59:59"
  },

  start() {
    console.log('Starting module: ' + this.name);
    this.loading = true;
    this.hidden = false;
    this.errorMessage = undefined;
    this.errorDescription = undefined;
    if ([this.config.originCoords, this.config.destinationCoords, this.config.accessToken].includes(undefined)) {
      this.errorMessage = "Config error";
      this.errorDescription = "You must set originCoords, destinationCoords, and accessToken in your config";
      this.updateDom();
    } else {
      this.updateCommute(this);
    }    
  },

  updateCommute(self) {
    self.url = encodeURI(`https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${self.config.originCoords};${self.config.destinationCoords}?access_token=${self.config.accessToken}`);

    // only run getDom once at the start of a hidden period to remove the module from the screen, then just wait until time to unhide to run again
    if (self.shouldHide() && !self.hidden) {
      console.log("Hiding traffic");
      self.hidden = true;
      self.updateDom();
    } else if (!self.shouldHide()) {
      self.hidden = false;
      self.sendSocketNotification("TRAFFIC_URL", { "url": self.url });
    }
    // no network requests are made when the module is hidden, so check every 30 seconds during hidden
    // period to see if it's time to unhide yet
    setTimeout(self.updateCommute, self.hidden ? 3000 : self.config.interval, self);
  },

  getStyles() {
    return [];
  },

  getScripts() {
    return [];
  },

  getDom() {
    var wrapper = document.createElement("div");

    // hide when desired (called once on first update during hidden period)
    if (this.hidden) return wrapper;

    // base divs
    var firstLineDiv = document.createElement("div");
    firstLineDiv.className = "bright " + this.config.cssclass;
    var secondLineDiv = document.createElement("div");
    secondLineDiv.className = "normal " + this.config.cssclass2;

    // display any errors
    if (this.errorMessage) {
      firstLineDiv.innerHTML = this.errorMessage;
      secondLineDiv.innerHTML = this.errorDescription;
      wrapper.append(firstLineDiv);
      wrapper.append(secondLineDiv);
      return wrapper;
    }

    // symbol
    if (this.config.showSymbol) {
      var symbol = document.createElement("span");
      symbol.className = "fa fa-car symbol";
      symbol.style.marginRight = "10px";

      if (this.duration > 30) {
        symbol.style.color = "yellow";
      } else if (this.duration > 45) {
        symbol.style.color = "darkorange";
      } else if (this.duration > 60) {
        symbol.style.color = "orangered";
      } else symbol.style.color = "lawngreen";

      firstLineDiv.appendChild(symbol);
    }

    // first line
    var firstLineText = document.createElement("span");
    firstLineText.innerHTML = this.loading ? this.config.loadingText : this.replaceTokens(this.config.firstLine)
    firstLineDiv.appendChild(firstLineText);
    wrapper.appendChild(firstLineDiv);
    if (this.loading) return wrapper;

    // second line
    if (this.config.secondLine) {
      secondLineDiv.innerHTML = this.replaceTokens(this.config.secondLine);
      wrapper.appendChild(secondLineDiv);
    }

    return wrapper;
  },

  replaceTokens(text) {
    return text.replace("{duration}", this.duration);
  },

  shouldHide() {
    var hide = true;
    var now = moment();
    if (this.config.days.includes(now.day()) &&
      moment(this.config.hoursStart, "HH:mm:ss").isBefore(now) &&
      moment(this.config.hoursEnd, "HH:mm:ss").isAfter(now)
    ) {
      hide = false;
    }
    return hide;
  },

  socketNotificationReceived(notification, payload) {
    this.leaveBy = '';
    if (notification === 'TRAFFIC_DURATION' && payload.url === this.url) {
  //  console.log('received TRAFFIC_DURATION');
      this.duration = payload.duration;
      this.errorMessage = this.errorDescription = undefined;
      this.loading = false;
      this.updateDom(1000);
    } else if (notification === 'TRAFFIC_ERROR' && payload.url === this.url) {
  //  console.log('received TRAFFIC_ERROR');
      this.errorMessage = payload.error.message;
      this.errorDescription = payload.error.description;
      this.loading = false;
      this.updateDom(1000);
    }
  }

});