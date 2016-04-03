var mongoose = require("mongoose");

module.exports = function () {
    var FildSchema = mongoose.Schema({
            label: {
                type: String,
                default: "New Field"
            },
            type: {
                type: String,
                default: "TEXT",
                enum: ["TEXT", "EMAIL", "OPTIONS", "DATE", "RADIOS", "CHECKBOXES", "TEXTAREA"]
            },
            placeholder: {
                type: String,
                default: "New Field"
            },
            options: [{lable: String, value: String}]
        }
    );

    return FildSchema;
};