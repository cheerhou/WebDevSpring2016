var mongoose = require("mongoose");

module.exports = function () {
    var ReservationSchema = mongoose.Schema(
        {
            userId: String,
            revDate: Date,
            seats: Number,
            note: String,
            created: {type: Date, default: Date.now}

        }, {collection: 'project.reservation'}
    );

    return ReservationSchema;

};