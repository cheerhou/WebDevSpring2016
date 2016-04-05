var mongoose = require("mongoose");

module.exports = function () {
    var SalarySchema = mongoose.Schema(
        {
            userId: String,
            amount: Number,
            penalty: Number,
            tips: Number,
            created: {type: Date, default: Date.now}

        }, {collection: 'project.reservation'}
    );

    return SalarySchema;

};