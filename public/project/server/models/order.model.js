var mockOrders = require("./order.mock.json");
var uuid = require("node-uuid");

module.exports = function (app) {
    var api = {
        createOrderForUser: createOrderForUser,
        updateOrder: updateOrder,
        deleteOrder: deleteOrder,
        findOrderByUser: findOrderByUser,
        findAllOrders: findAllOrders
    };
    return api;

    function createOrderForUser(userId, order) {
        var newOrder = {
            _id: uuid.v4(),
            userId: userId,
            dishes: order.dishes
        };

        mockOrders.push(newOrder);
        return mockOrders
    }

    function updateOrder(orderId, newOrder) {
        for (var i in mockOrders) {
            if (mockOrders[i]._id === orderId) {
                mockForms[i].userId = newOrder.userId;
                mockForms[i].dishes = newOrder.dishes;
            }
        }
        return mockOrders;
    }

    function deleteOrder(orderId) {
        for (var i in mockOrders) {
            if (mockOrders[i]._id === orderId) {
                mockOrders.splice(i, 1);
            }
        }
        return mockOrders;
    }


    function findOrderByUser(userId) {
        var orders = [];
        for (var i in mockOrders) {
            if (mockOrders[i].userId === userId) {
                orders.push(mockOrders[i]);
            }
        }
        return forms;
    }

    function findAllOrders() {
        return mockOrders;
    }


}