(function () {
    angular
        .module("ResManageApp")
        .controller("ListTaskController", ListTaskController);

    function ListTaskController(OrderService, UserService) {
        var vm = this;

        function init() {
            var currentUser = UserService.getCurrentUser();

            if (currentUser.role == "Deliveryman") {
                OrderService.findOrderByDeliveryMethod("deliver")
                    .then(
                        function (respond) {
                            if (respond.data) {
                                vm.orders = respond.data;
                            }

                        }, function (err) {
                            vm.error = "Can't load tasks.";
                        }
                    );

            }
        }

        init();
    }

})();