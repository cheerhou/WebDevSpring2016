var mockRevs = require("./reservation.mock.json");
var uuid = require("node-uuid");

module.exports = function(app) {
    var api = {
        createReservation: createReservation,
        deleteRev: deleteRev,
        updateRev: updateRev,
        findRevByUserId: findRevByUserId,
        findAllRev: findAllRev
    };
    return api;

    function createReservation(userId, rev) {
        var newRev = {
            _id: uuid.v4(),
            userId: userId,
            revDate: rev.revDate,
            date: new Date(),
            peopleNum: rev.peopleNum,
            note: rev.note
        };
        mockRevs.push(newRev);
        return mockRevs;
    }

    function deleteRev(revId) {
        for (var i in mockRevs) {
            if (mockRevs[i]._id === revId) {
                mockRevs.splice(i, 1);
            }
        }
        return mockRevs;
    }

    function updateRev(revId, newRev) {
        for (var i in mockRevs) {
            if (mockRevs[i]._id === revId) {
                mockRevs[i].userId = newRev.userId;
                mockRevs[i].date = newRev.date;
                mockRevs[i].peopleNum = newRev.peopleNum;
            }
        }
        return mockRevs;
    }

    function findRevByUserId(userId) {
        var rev = [];
        for (var i in mockRevs) {
            if (mockRevs[i].userId === userId) {
                rev.push(mockRevs[i]);
            }
        }
        return rev;
    }

    function findAllRev() {
        return mockRevs;
    }
}