var q = require("q");
var mongoose = require("mongoose");


module.exports = function (db) {

    var DishSchema = require("./dish.schema.server.js")();
    var DishModel = mongoose.model("DishModel", DishSchema);

    var api = {
        createDish: createDish,
        deleteDish: deleteDish,
        upDateDish: upDateDish,
        findDishByName: findDishByName,
        findAllDishes: findAllDishes
    };

    return api;

    function createDish(dish) {
        var defferred = q.defer();
        DishModel.create(dish,
            function (err, dish) {
                if (err) {
                    defferred.reject(err);
                } else {
                    defferred.resolve(dish);
                }
            }
        );
        return defferred.promise;
    }

    function deleteDish(dishId) {
        var defferred = q.defer();
        DishModel.remove({_id: dishId},
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

    function upDateDish(dishId, newDish) {
        var deferred = q.defer();
        DishModel
            .update({_id: dishId}, {$set: newDish},
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

    function findDishByName(title) {
        var deferred = q.defer();
        DishModel
            .findOne({title: title},
                function (err, dish) {
                    if (!err) {
                        deferred.resolve(dish);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

    function findAllDishes() {
        var deferred = q.defer();
        DishModel.find(
            function (err, dishes) {
                if (!err) {
                    deferred.resolve(dishes);
                } else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }


}