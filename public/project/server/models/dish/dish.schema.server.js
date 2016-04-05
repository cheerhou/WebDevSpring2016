var mongoose = require("mongoose");

module.exports = function () {

    var DishSchema = mongoose.Schema(
        {
            recipe_id: String,
            title: String,
            image_url: String,
            social_rank: Number
        }, {collection: 'project.dish'}
    );

    return DishSchema;

};