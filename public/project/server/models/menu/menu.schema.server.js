var mongoose = require("mongoose");

module.exports = function () {

    var DishSchema = require("../dish/dish.schema.server.js")();
    var MenuSchema = mongoose.Schema(
        {
            title: String,
            dishes: [DishSchema],
            created: {type: Date, default: Date.now}

        }, {collection: 'project.menu'}
    );a

    return MenuSchema;

};