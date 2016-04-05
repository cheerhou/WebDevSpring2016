var mongoose = require("mongoose");

module.exports = function () {
    var DishSchema = require("../dish/dish.schema.server.js")();
    var OrderSchema = mongoose.Schema(
        {
            customerId: String,
            waiter: String,
            dishes: [DishSchema],
            amount: Number,
            tableNum: String,
            deliveryMethod: String,
            created: {type: Date, default: Date.now}

        }, {collection: 'project.order'}
    );a

    return OrderSchema;

};