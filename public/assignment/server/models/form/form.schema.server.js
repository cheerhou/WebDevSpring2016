var mongoose = require("mongoose");

module.exports = function () {
    var FieldSchema = require("../field/field.schema.server.js")();

    var FormSchema = mongoose.Schema(
        {
            title: String,
            fields: [FieldSchema],
            userId: String,
            created: {type: Date, default: Date.now},
            updated: {type: Date, default: Date.now}
        }, {collection: 'form'}
    );

    return FormSchema;
}