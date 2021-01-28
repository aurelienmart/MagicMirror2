const NodeHelper = require("node_helper");
const Log = require("../../../js/logger");

module.exports = NodeHelper.create({
	// Override start method.
	start: function () {
		Log.warn(`The module '${this.name}' is not deprecated in favor of the 'weather'-module, no migration path`);
	}
});
