var q = require("q");
var mongoose = require("mongoose");

module.exports = function (db) {

    var MenuSchema = require("./menu.schema.server.js")();
    var MenuModel = mongoose.model("MenuModel", MenuSchema);

    var api = {
        createMenu: createMenu,
        deleteMenu: deleteMenu,
        upDateMenu: upDateMenu,
        findMenuByName: findMenuByName,
        findAllMenus: findAllMenus
    };
    return api;

    function createMenu(menu) {
        var defferred = q.defer();
        MenuModel.create(menu,
            function (err, menu) {
                if (err) {
                    defferred.reject(err);
                } else {
                    defferred.resolve(menu);
                }
            }
        );
        return defferred.promise;
    }

    function deleteMenu(menuId) {
        var defferred = q.defer();
        MenuModel.remove({_id: menuId},
            function (err, stats) {
                if (err) {
                    defferred.reject(err);
                }
                else {
                    defferred.resolve(stats);
                }

            }
        );
        return defferred.promise;
    }

    function upDateMenu(menuId, newMenu) {
        var deferred = q.defer();
        MenuModel
            .update({_id: menuId}, {$set: newMenu},
                function (err, stats) {
                    if (!err) {
                        deferred.resolve(stats);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

    function findMenuByName(title) {
        var deferred = q.defer();
        MenuModel
            .findOne({title: title},
                function (err, menu) {
                    if (!err) {
                        deferred.resolve(menu);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;

    }

    function findAllMenus() {
        var deferred = q.defer();
        MenuModel.find(
            function (err, menus) {
                if (!err) {
                    deferred.resolve(menus);
                } else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }
}