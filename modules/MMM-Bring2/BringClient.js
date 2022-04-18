const axios = require("axios");
const Store = require("data-store");
const querystring = require("querystring");

class BringClient {

    constructor(opts, modulePath) {
        this.userId = undefined;
        this.articles = undefined;
        this.defaultListId = "";
        this.store = new Store({path: modulePath + "/bring.config.json", cwd: "store"});
        this._init(opts);
    }

    _init(opts) {
        axios.defaults.headers.common["X-BRING-API-KEY"] = "cof4Nc6D8saplXjE3h3HXqHH8m7VU2i1Gs0g85Sp";
        this.locale = "de-DE";
        if (opts.locale) {
            this.locale = opts.locale;
        }
        if (this.mustLogin()) {
            this.login(opts.email, opts.password).then(function() {
                this.userId = this.store.get("user_id");
                this.defaultListId = this.store.get("default_list_id");
                axios.defaults.headers.common["Authorization"] = "Bearer " + this.store.get("access_token");
            });
        } else {
            this.userId = this.store.get("user_id");
            this.defaultListId = this.store.get("default_list_id");
            axios.defaults.headers.common["Authorization"] = "Bearer " + this.store.get("access_token");
        }
    }

    mustLogin() {
        return !this.store.get("access_token") || !this.store.get("valid_until") || new Date().getTime() > this.store.get("valid_until");
    }

    login(email, password) {
        var that=this
        return axios.post("https://api.getbring.com/rest/v2/bringauth", querystring.stringify({
            email: email,
            password: password
        })).then(function(response) {
                const loginObj = response.data;
                that.store.set("user_id", loginObj["uuid"]);
                that.store.set("default_list_id", loginObj["bringListUUID"]);
                that.store.set("access_token", loginObj["access_token"]);
                that.store.set("valid_until", new Date().getTime() + (loginObj["expires_in"] * 1000));
            },
            function(error) {
                console.error("Error while Logging-in with Bring-Client in MMM-Bring:", "HTTP" + error.response.status, error.response.data);
            });
    }

    getLists() {
        var that=this
        return axios.get("https://api.getbring.com/rest/v2/bringusers/" + this.userId + "/lists").then(function(response) {
                // Remember the names of the Lists
                for (var i = 0, len = response.data.lists.length; i < len; i++) {
                    that.store.set("list_name_" + response.data.lists[i].listUuid, response.data.lists[i].name);
                    that.store.set("list_id_" + response.data.lists[i].name, response.data.lists[i].listUuid);
                }
                return response.data.lists;
            }
        );
    }

    getList(withDetails, listName) {
        var listId = this.defaultListId;
        var that = this;
        if (!!listName) {
            listId = this.store.get("list_id_" + listName);
        }
        return axios.get("https://api.getbring.com/rest/v2/bringlists/" + listId).then(function(response) {
                const list = response.data;
                if (list && list.uuid) {
                    list.name = that.store.get("list_name_" + list.uuid);
                }
                return list;
            }
        ).then(function(list) {
            if (withDetails && !that.articles) {
                return that.getArticles().then(function(articles) {
                        that.articles = articles;
                        return list;
                    }
                );
            } else {
                return list;
            }
        }).then(function(list){
            if (withDetails) {
                return that.getListDetails(listId).then(function(details) {
                        const detailsMap = {};
                        for (var i = 0, len = details.length; i < len; i++) {
                            detailsMap[details[i].itemId] = details[i];
                        }
                        for (var i = 0, len = list.purchase.length; i < len; i++) {
                            list.purchase[i].details = detailsMap[list.purchase[i].name];
                            // Translate it
                            if (that.articles[list.purchase[i].name] != null) {
                                list.purchase[i].name = that.articles[list.purchase[i].name];
                            }
                        }
                        for (var i = 0, len = list.recently.length; i < len; i++) {
                            list.recently[i].details = detailsMap[list.recently[i].name];
                            // Translate it
                            if (that.articles[list.recently[i].name] != null) {
                                list.recently[i].name = that.articles[list.recently[i].name];
                            }
                        }
                        return list;
                    }
                );
            } else {
                return list;
            }
        }).catch('error');
    }

    getListDetails(listId) {
        return axios.get("https://api.getbring.com/rest/v2/bringlists/" + listId + "/details").then(function(response) {
                return response.data;
            }
        );
    }

    getArticles(locale) {
        if (!locale) {
            locale = this.locale;
        }
        return axios.get("https://web.getbring.com/locale/articles." + locale + ".json").then(function(response) {
                return response.data;
            }
        );
    }


    purchase(itemName, listId) {
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        return axios.put("https://api.getbring.com/rest/v2/bringlists/" + listId, querystring.stringify({
            uuid: listId,
            purchase: itemName
        }), config);
    }

    recently(itemName, listId) {
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        return axios.put("https://api.getbring.com/rest/v2/bringlists/" + listId, querystring.stringify({
            uuid: listId,
            recently: itemName
        }), config);
    }
}

module.exports = BringClient;
