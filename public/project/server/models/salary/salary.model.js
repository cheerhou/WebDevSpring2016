var mockSalarys = require("./salary.mock.json");
var uuid = require("node-uuid");

module.exports = function(db) {
    var api = {
        createSalary: createSalary,
        deleteSalary: deleteSalary,
        updateSalary: updateSalary,
        findSalaryByUserId: findSalaryByUserId,
        findAllSalary: findAllSalary
    };
    return api;

    function createSalary(userId, salary) {
        var newSalary = {
            _id: uuid.v4(),
            userId: userId,
            amount: salary.amount,
            penalty: salary.penalty,
            tips: salary.tips,
            date: new Date()
        };
        mockSalarys.push(newSalary);
        return mockSalarys;
    }

    function deleteSalary(salId) {
        for (var i in mockSalarys) {
            if (mockSalarys[i]._id === salId) {
                mockSalarys.splice(i, 1);
            }
        }
        return mockSalarys;
    }

    function updateSalary(salId, newSal) {
        for (var i in mockSalarys) {
            if (mockSalarys[i]._id === salId) {
                mockSalarys[i].userId = newSal.userId;
                mockSalarys[i].amount = newSal.amount;
                mockSalarys[i].penalty = newSal.penalty;
                mockSalarys[i].tips = newSal.tips;
                mockSalarys[i].date = newSal.date;
            }
        }
        return mockSalarys;
    }

    function findSalaryByUserId(userId) {
        for (var i in mockSalarys) {
            if (mockSalarys[i].userId === userId) {
                return mockSalarys[i];
            }
        }
        return null;
    }

    function findAllSalary() {
        return mockSalarys;
    }

}