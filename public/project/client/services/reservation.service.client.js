(function () {
    angular
        .module("ResManageApp")
        .factory("ReservationService", ReservationService);

    function ReservationService($http) {
        var api = {
            createReservation: createReservation,
            findAllReservation: findAllReservation,
            findReservationByUser: findReservationByUser

        };
        return api;

        function createReservation(userId, rev) {
            return $http.post("/api/project/reservation/" + userId, rev);
        }

        function findAllReservation() {
            return $http.get("/api/project/reservation");
        }

        function findReservationByUser(userId) {
            return $http.get("/api/project/reservation/" + userId);
        }
    }


}) ();