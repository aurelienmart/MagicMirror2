/* Magic Mirror
 *
 * json table
 *
 * Redesigned by Răzvan Cristea
 * for iPad 3 & HD display
 * https://github.com/hangorazvan
 */

Module.register("jsontable", {
	// Default module config.
	defaults: {
		url: "",
		arrayName: null,
		keepColumns: [],
		size: 0,
		tryFormatDate: false,
		updateInterval: 60 * 60 * 1000,
		descriptiveRow: null
	},

	jsonData: null,

	getStyles: function () {
		return ["jsontable.css"];
	},

	getScripts: function () {
		return ["moment.js"];
	},

	getHeader: function () {
		return this.data.header;
	},

	start: function () {
		Log.info("Starting module: " + this.name);
		this.getJson();
		this.scheduleUpdate();
	},

	scheduleUpdate: function () {
		var self = this;
		setInterval(function () {
			self.getJson();
		}, this.config.updateInterval);
	},

	// Request node_helper to get json from url
	getJson: function () {
		var self = this;
		this.jsonFile(function (response) {
			self.jsonData = JSON.parse(response);
        //    console.log(self.jsonData); // for checking
			self.updateDom(1000);
		});
	},

	jsonFile: function (callback) {
		var xobj = new XMLHttpRequest(),
		isRemote = this.config.url.indexOf("http://") === 0 || this.config.url.indexOf("https://") === 0,
		path = isRemote ? this.config.url : this.file(this.config.url);
		xobj.overrideMimeType("application/json");
		xobj.open("GET", path, true);
		xobj.onreadystatechange = function () {
			if (xobj.readyState === 4 && xobj.status === 200) {
				callback(xobj.responseText);
			//	console.log("Response " + xobj.responseText); // for checking
			}
		};
		xobj.send(null);
	},

	// Override dom generator.
	getDom: function () {
		var self = this;
		var wrapper = document.createElement("div");
		wrapper.className = this.config.tableClass;

		if (!this.jsonData) {
			wrapper.innerHTML = "Awaiting json data...";
			return wrapper;
		}
		
		var table = document.createElement("table");
		var tbody = document.createElement("tbody");
		
		var items = [];
		if (this.config.arrayName) {
			items = this.jsonData[this.config.arrayName];
		}
		else {
			items = this.jsonData;
		}

		// Check if items is of type array
		if (!(items instanceof Array)) {
			wrapper.innerHTML = "Json data is not of type array! " +
				"Maybe the config arrayName is not used and should be, or is configured wrong";
			return wrapper;
		}

		items.forEach(function (element) {
			var row = self.getTableRow(element);
			tbody.appendChild(row);
		});
		
		// Add in Descriptive Row Header
		if (this.config.descriptiveRow) {
			var header = table.createTHead();
			header.innerHTML = this.config.descriptiveRow;
		}

		table.appendChild(tbody);
		wrapper.appendChild(table);
		return wrapper;
	},

	getTableRow: function (jsonObject) {
		var row = document.createElement("tr");
		for (var key in jsonObject) {
			var cell = document.createElement("td");
			
			var valueToDisplay = "";
			if (key === "icon") {
				cell.classList.add("fa", jsonObject[key]);
			}
			else if (this.config.tryFormatDate) {
				valueToDisplay = this.getFormattedValue(jsonObject[key]);
			}
			else {
				if ( this.config.keepColumns.length == 0 || this.config.keepColumns.indexOf(key) >= 0 ){
					valueToDisplay = jsonObject[key];
				}
			}

			var cellText = document.createTextNode(valueToDisplay);
			cell.appendChild(cellText);
			row.appendChild(cell);
		}
		return row;
	},

	// Format a date string or return the input
	getFormattedValue: function (input) {
		var m = moment(input);
		if (typeof input === "string" && m.isValid()) {
			// Show a formatted time if it occures today
			if (m.isSame(new Date(), "day") && m.hours() !== 0 && m.minutes() !== 0 && m.seconds() !== 0) {
				return m.format("HH:mm:ss");
			}
			else {
				return m.format("YYYY-MM-DD");
			}
		}
		else {
			return input;
		}
	}
});