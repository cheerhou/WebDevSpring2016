(function () {
    angular
        .module("ResManageApp")
        .controller("ManagerReviewController", ManagerReviewController);

    function ManagerReviewController(OrderService) {
        var vm = this;
        vm.selectRow = selectRow;

        var cashOrders;
        var creditOrders;

        function init() {
            OrderService.findOrderByPaymentType("cash")
                .then(
                    function (respond) {
                        if (respond.data) {
                            var total = 0;
                            var counter = 0;
                            cashOrders = respond.data;

                            for (var i in cashOrders) {
                                total += cashOrders[i].total;
                                counter++;

                            }

                            vm.cashTotal = total;
                            vm.cashCounter = counter;
                        }
                    }
                );

            OrderService.findOrderByPaymentType("credit")
                .then(
                    function (respond) {
                        if (respond.data) {
                            var total = 0;
                            var counter = 0;
                            creditOrders = respond.data;

                            for (var i in creditOrders) {
                                total += creditOrders[i].total;
                                counter++;

                            }

                            vm.creditTotal = total;
                            vm.creditCounter = counter;
                        }
                    }
                );

        }

        init();

        function selectRow(type) {
            if(type == 'cash') {
                console.log("type " + type);
                vm.orders = cashOrders;;
            }
            if(type == 'credit') {
                console.log("type " + type);
                vm.orders = creditOrders;;
            }

        }
    }

})();