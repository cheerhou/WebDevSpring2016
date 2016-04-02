module.exports = function (mongoose) {
    var FieldSchema = require("../models/field.schema.server.js");

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