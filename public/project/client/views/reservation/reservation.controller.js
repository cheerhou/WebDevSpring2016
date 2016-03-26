(function() {
    angular
        .module("ResManageApp")
        .controller("ReservationController", ReservationController);

    function ReservationController($scope, $location, ReservationService, UserService) {
        $scope.error = null;
        $scope.message = null;
        $scope.user = UserService.getCurrentUser();
        $scope.createReservation = createReservation;

        if (!$scope.user) {
            $location.url("/login");
        }

        function createReservation(userId, rev) {
            ReservationService
                .createReservation(userId, rev)
                .then(function(respond){
                    if(respond.data) {
                        $scope.message = "Reservation is made successfully."
                    }else {
                        $scope.error = "Fail to make an reservation."
                    }
                });
        }
    }

}) ();