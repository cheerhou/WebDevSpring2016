module.exports = function (db, mongoose) {

    var FormSchema = require("./form.schema.server.js")(mongoose);
    var FormModel = mongoose.model('FormModel', FormSchema);

    var api = {
        createFormForUser: createFormForUser,
        findAllForms: findAllForms,
        findFormById: findFormById,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormByTitle: findFormByTitle,
        findFormByUser: findFormByUser

    };
    return api;

    function createFormForUser(form) {
        var deferred = q.defer();
        FormModel.create(form,
            function (err, user) {
                if (!err) {
                    deferred.resolve(user);
                } else {
                    deferred.reject(err);
                }

            });
        return deferred.promise;
    }

    function findAllForms() {
        var deferred = q.defer();
        FormModel.find(function (err, forms) {
            if (!err) {
                deferred.resolve(forms);
            } else {
                deferred.reject(err);
            }
        });
        return deferred.promise;
    }

    function findFormById(formId) {
        var deferred = q.defer();
        FormModel.findById(formId,
            function (err, form) {
                if (!err) {
                    deferred.resolve(form);
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;
    }

    function updateForm(formId, newForm) {
        var deferred = q.defer();
        FormModel.update({_id: formId}, {$set: newForm},
            function (err, stats) {
                if (!err) {
                    deferred.resolve(stats);
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;
    }

    function deleteForm(formId) {
        var deferred = q.defer();
        UserModel.remove({_id: formId},
            function (err, stats) {
                if (!err) {
                    deferred.resolve(stats);
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;
    }

    function findFormByTitle(title) {
        var deferred = q.defer();
        FormModel.find({title: title},
            function (err, forms) {
                if (!err) {
                    deferred.resolve(forms);
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;
    }

    function findFormByUser(userId) {
        var deferred = q.defer();
        FormModel.find({userId: userId},
            function (err, forms) {
                if (!err) {
                    deferred.resolve(forms);
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;
    }
}