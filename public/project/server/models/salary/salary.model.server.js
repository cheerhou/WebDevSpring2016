var q = require("q");

module.exports = function (db) {
    var SalarySchema = require("./salary.schema.server.js")();
    var SalaryModel = mongoose.model("SalaryModel", SalarySchema);

    var api = {
        createSalary: createSalary,
        deleteSalary: deleteSalary,
        updateSalary: updateSalary,
        findSalaryByUserId: findSalaryByUserId,
        findAllSalary: findAllSalary
    };
    return api;

    function createSalary(salary) {
        var defferred = q.defer();
        DishModel.create(salary,
            function (err, salary) {
                if (err) {
                    defferred.reject(err);
                } else {
                    defferred.resolve(salary);
                }
            }
        );
        return defferred.promise;
    }

    function deleteSalary(salId) {
        var defferred = q.defer();
        DishModel.remove({_id: salId},
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

    function updateSalary(salId, newSal) {
        var deferred = q.defer();
        DishModel.update({_id: salId}, {$set: newSal},
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

    function findSalaryByUserId(userId) {
        var deferred = q.defer();
        DishModel.find({userId: userId},
            function (err, sal) {
                if (!err) {
                    deferred.resolve(sal);
                } else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }

    function findAllSalary() {
        var deferred = q.defer();
        DishModel.find(
            function (err, sal) {
                if (!err) {
                    deferred.resolve(sal);
                } else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }

}