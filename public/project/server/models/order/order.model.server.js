var q = require("q");
var mongoose = require("mongoose");

module.exports = function (db) {

    var OrderSchema = require("./order.schema.server.js")();
    var OrderModel = mongoose.model("OrderModel", OrderSchema);

    var api = {
        createOrderForUser: createOrderForUser,
        updateOrder: updateOrder,
        deleteOrder: deleteOrder,
        findOrdersByUser: findOrdersByUser,
        findOrderByOrderId: findOrderByOrderId,
        findAllOrders: findAllOrders,
        findOrderByPaymentType: findOrderByPaymentType
    };
    return api;

    function createOrderForUser(order) {
        var defferred = q.defer();
        OrderModel.create(order,
            function (err, order) {
                if (err) {
                    defferred.reject(err);
                } else {
                    //console.log("model side created order " + order);
                    defferred.resolve(order);
                }
            }
        );
        return defferred.promise;
    }

    function updateOrder(orderId, newOrder) {
        var deferred = q.defer();
        OrderModel
            .update({_id: orderId}, {$set: newOrder},
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

    function deleteOrder(orderId) {
        var defferred = q.defer();
        OrderModel.remove({_id: orderId},
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


    function findOrderByOrderId(orderId) {
        var deferred = q.defer();
        OrderModel.findOne(
            {_id: orderId},
            function (err, order) {
                if (!err) {
                    deferred.resolve(order);
                } else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }

    function findOrdersByUser(userId) {
        var deferred = q.defer();
        OrderModel.find(
            {userId: userId},
            function (err, orders) {
                if (!err) {
                    deferred.resolve(orders);
                } else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }

    function findAllOrders() {
        var deferred = q.defer();
        OrderModel.find(
            function (err, orders) {
                if (!err) {
                    deferred.resolve(orders);
                } else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }

    function findOrderByPaymentType(paymentType) {
        var deferred = q.defer();
        OrderModel.find(
            {paymentType: paymentType},
            function (err, orders) {
                if (!err) {
                    deferred.resolve(orders);
                } else {
                    deferred.reject(err);
                }
            }
        );

        return deferred.promise;

    }


}