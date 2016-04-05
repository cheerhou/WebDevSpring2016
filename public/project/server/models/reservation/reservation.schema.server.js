var mongoose = require("mongoose");

module.exports = function () {
    var ReservationSchema = mongoose.Schema(
        {
            userId: String,
            revDate: {type: Date, default: Date.now},
            revSeates: Number,
            note: String,
            created: {type: Date, default: Date.now}

        }, {collection: 'project.reservation'}
    );a

    return ReservationSchema;

};