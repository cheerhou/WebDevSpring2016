var mongoose = require("mongoose");

module.exports = function () {
    var OrderSchema = mongoose.Schema(
        {
            userId: String,
            waiter: String,
            items: [{
                title: String,
                price: Number,
                quantity: Number,
                total: Number,
                image_url: String
            }],
            total: Number,
            tableNum: String,
            paymentType: String,
            delivery: String,
            address: String,
            created: {type: Date, default: Date.now}

        }, {collection: 'project.order'}
    );

    return OrderSchema;

};