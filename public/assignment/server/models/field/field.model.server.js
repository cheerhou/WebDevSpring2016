var q = require("q");
var mongoose = require("mongoose");

module.exports = function (db, formModel) {
    var FieldSchema = require("./field.schema.server.js")();
    var FieldModel = mongoose.model('FieldModel', FieldSchema);
    var FormModel = formModel.getFormModel();

    var api = {
        createField: createField,
        createFieldInForm: createFieldInForm,
        findAllFileds: findAllFileds,
        findFieldById: findFieldById,
        updateField: updateField,
        deleteFieldInForm: deleteFieldInForm,
        updateFieldInForm: updateFieldInForm
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

    function createFieldInForm(formId, fieldType) {
        var deferred = q.defer();
        //console.log("model formId + fieldType " + formId + fieldType);
        FormModel.findById(formId,
            function (err, form) {
                if (!err) {
                    form.fields.push({"type": fieldType});
                    form.save(function (err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                } else {
                    deferred.reject(err);
                }
            }
        );
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

    function deleteFieldInForm(formId, fieldId) {
        var deferred = q.defer();
        FormModel.findById(formId,
            function(err, form) {
                if (!err) {
                    form.fields.id(fieldId).remove();
                    form.save(function (err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                } else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }

    function updateFieldInForm(formId, fieldId, newField) {
        var deferred = q.defer();
        FormModel.findById(formId,
            function(err, form) {
                if (!err) {
                    var field = form.fields.id(fieldId);
                    field.label = newField.label;
                    field.placeholder = newField.placeholder;
                    field.options = newField.options;

                    form.save(function (err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                } else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }

};