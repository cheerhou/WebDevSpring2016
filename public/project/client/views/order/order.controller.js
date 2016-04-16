(function () {
    angular
        .module("ResManageApp")
        .controller("OrderController", OrderController)
        .controller("ListOrderController", ListOrderController)
        .controller("DetailOrderController", DetailOrderController);

    function OrderController(OrderService, UserService) {
        var vm = this;

        vm.updateItemTotal = updateItemTotal;
        vm.deleteItemInOrder = deleteItemInOrder;
        vm.createOrder = createOrder;

        function init() {
            vm.order = OrderService.getCurrentOrder();
            if(!vm.order) {
                vm.order = OrderService.emptyCurrentOrder();
            } else{
                vm.order.total = 0;
                var items = vm.order.items;
                for (var i in items) {
                    vm.order.total += items[i].total;
                }
            }



        }

        init();


        function deleteItemInOrder(dish) {
            vm.order = OrderService.deleteItemInOrder(dish.recipe_id);

            //re-calculate total
            init();
        }

        function updateItemTotal(item) {
            item.total = item.price * item.quantity;
            init();
        }

        function createOrder(order) {
            var user = UserService.getCurrentUser();
            if (!user) {
                vm.error = "Please register or login.";
                return;
            }
            if (!order.paymentType) {
                vm.error = "Please select a payment type.";
            }
            if (!order.delivery) {
                vm.error = "Please select a delivery method.";
            }

            order.userId = user._id;
            OrderService.createOrder(order)
                .then(
                    function (respond) {
                        if (respond.data) {
                            vm.message = "Order created successfully.";
                            vm.order = OrderService.emptyCurrentOrder();


                        }
                    }, function (err) {
                        vm.error = err;
                    }
                );

        }
    }

    function ListOrderController(OrderService, UserService) {
        var vm = this;

        function init() {
            var currentUser = UserService.getCurrentUser();
            var userId = currentUser._id;
            console.log("current user id " + userId);

            OrderService.findOrdersByUser(userId)
                .then(
                    function (respond) {
                        if(respond.data) {
                            console.log("controller " + respond.data);
                            vm.orders = respond.data;
                        }
                    },
                    function (err) {
                        vm.error = err;
                    }
                );

        }

        init();

    }

    function DetailOrderController(OrderService, $routeParams) {
        var vm = this;

        function init() {
            var orderId = $routeParams.orderId;
            OrderService.findOrderByOrderId(orderId)
                .then(
                    function(respond) {
                        if(respond.data) {
                            vm.order = respond.data;
                        }
                    }
                );
        }
        init();

    }

})();