var q = require("q");
var mongoose = require("mongoose");

module.exports = function (db) {

    var ReservationSchema = require("./reservation.schema.server.js")(mongoose);
    var ReservationModel = mongoose.model("ReservationModel", ReservationSchema);

    var api = {
        createReservation: createReservation,
        deleteRev: deleteRev,
        updateRev: updateRev,
        findRevByUserId: findRevByUserId,
        findAllRev: findAllRev
    };
    return api;

    function createReservation(rev) {
        var defferred = q.defer();
        ReservationModel.create(rev,
            function (err, rev) {
                if (err) {
                    defferred.reject(err);
                } else {
                    defferred.resolve(rev);
                }
            }
        );
        return defferred.promise;
    }

    function deleteRev(revId) {
        var defferred = q.defer();
        ReservationModel.remove({_id: revId},
            function (err, stats) {
                if (err) {
                    defferred.reject(err);
                }
                else {
                    defferred.resolve(stats);
                }

            }
        );
        return defferred.promise;
    }

    function updateRev(revId, newRev) {
        var deferred = q.defer();
        ReservationModel
            .update({_id: revId}, {$set: newRev},
                function (err, stats) {
                    if (!err) {
                        deferred.resolve(stats);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

    function findRevByUserId(userId) {
        var deferred = q.defer();
        ReservationModel
            .find({userId: userId},
                function (err, rev) {
                    if (!err) {
                        deferred.resolve(rev);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

    function findAllRev() {
        var deferred = q.defer();
        ReservationModel(
                function (err, rev) {
                    if (!err) {
                        deferred.resolve(rev);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }
}