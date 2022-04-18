const NodeHelper = require("node_helper");
const BringClient = require("./BringClient");

var lists;
var currentList;
var client;
var config;

module.exports = NodeHelper.create({
    start: function () {
    },

    socketNotificationReceived: function (notification, payload) {
        var that=this
        if (notification === "GET_LIST") {
            if (!this.client) {
                this.initClient(payload);
            } else {
                this.getList(payload);
                this.config = payload;
            }
            return true;
        } else if (notification === "PURCHASED_ITEM") {
            if (payload.purchase) {
                this.client.recently(payload.name, payload.listId).then(function() {
                    that.sendSocketNotification("RELOAD_LIST");
                });
            } else {
                this.client.purchase(payload.name, payload.listId).then(function(){
                    that.sendSocketNotification("RELOAD_LIST");
                });
            }

            return true;
        }
    },

    getList: function (payload) {
        var that = this;
        if (that.client.mustLogin()) {
            that.initClient(payload.config);
        } else {
            that.client.getList(true, payload.listName).then(function(list) {
                that.currentList = list;
                that.sendSocketNotification("LIST_DATA", {lists: that.lists, currentList: list});
            });
        }
    },

    initClient: function (payload) {
        this.client = new BringClient(payload, this.path);
        var that=this
        // Wait for Login
        setTimeout(function() {
            if (!this.client.mustLogin()) {
                this.client.getLists().then(function(lists) {
                    that.lists = lists;
                    that.getList(payload);
                });
            }
        }, 1500);
    }
});
