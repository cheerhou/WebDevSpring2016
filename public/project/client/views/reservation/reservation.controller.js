(function () {
    angular
        .module("ResManageApp")
        .controller("ReservationController", ReservationController)
        .controller("ListReservationController", ListReservationController)
        .controller("DetailReservationController", DetailReservationController);

    function ReservationController(ReservationService, UserService) {
        var vm = this;
        vm.createReservation = createReservation;
        var currentUser;

        function init() {
            currentUser = UserService.getCurrentUser();
            vm.user = currentUser;
        }
        init();

        function createReservation(userId, rev) {
            if (!userId) {
                vm.error = "Please login.";
                return;
            }

            rev.userId = userId;
            ReservationService
                .createReservation(rev)
                .then(
                    function (respond) {
                        if (respond.data) {
                            vm.message = "Reservation is made successfully."
                        }
                    }, function (err) {
                        vm.error = "Fail to make an reservation." + err;
                    }
                );
        }
    }


    function ListReservationController(ReservationService, UserService) {
        var vm = this;

        function init() {
            var user = UserService.getCurrentUser();
            var userId = user._id;
            ReservationService.findReservationByUser(userId)
                .then(
                    function(respond) {
                        if(respond.data) {
                            vm.reservations = respond.data;
                        }
                    }
                );


        }
        init();

    }


    function DetailReservationController() {

    }

})();