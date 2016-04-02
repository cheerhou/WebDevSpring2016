module.exports = function (db, mongoose) {
    var FieldSchema = require("./field.schema.server.js")(mongoose);
    var FieldModel = mongoose.model('FieldModel', FieldSchema);

    var api = {
        createField: createField,
        findAllFileds: findAllFileds,
        findFieldById: findFieldById,
        updateField: updateField,
        deleteField: deleteField
    };
    return api;


    function createField(field) {
        var deferred = q.defer();
        FieldModel.create(field,
            function (err, user) {
                if (!err) {
                    deferred.resolve(user);
                } else {
                    deferred.reject(err);
                }

            });
        return deferred.promise;
    }

    function findAllFileds() {
        var deferred = q.defer();
        FieldModel.find(function (err, fields) {
            if (!err) {
                deferred.resolve(fields);
            } else {
                deferred.reject(err);
            }
        });
        return deferred.promise;
    }

    function findFieldById(fieldId) {
        var deferred = q.defer();
        FieldModel.findById(fieldId,
            function (err, field) {
                if (!err) {
                    deferred.resolve(field);
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;
    }

    function updateField(fieldId, newField) {
        var deferred = q.defer();
        FieldModel.update({_id: fieldId}, {$set: newField},
            function (err, stats) {
                if (!err) {
                    deferred.resolve(stats);
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;
    }

    function deleteField(fieldId){
        var deferred = q.defer();
        UserModel.remove({_id: fieldId},
            function (err, stats) {
                if (!err) {
                    deferred.resolve(stats);
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;
    }


};