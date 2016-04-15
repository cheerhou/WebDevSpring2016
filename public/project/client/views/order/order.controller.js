(function () {
    angular
        .module("ResManageApp")
        .controller("OrderController", OrderController);

    function OrderController($location, OrderService, UserService) {
        var vm = this;
        var userId;

        vm.calculateTotal = calculateTotal;
        vm.deleteItemInOrder = deleteItemInOrder;
        vm.createOrder = createOrder;

        function init() {
            vm.order = OrderService.getCurrentOrder();
            userId = UserService.getCurrentUser();
        }

        init();


        function deleteItemInOrder(dish) {
            vm.order = OrderService.deleteItemInOrder(dish.recipe_id);

            //re-calculate total
            var items = vm.order.items;
            vm.order.total = 0;
            for (var i in items) {
                calculateTotal(items[i]);
            }
        }

        function calculateTotal(item) {
            var total = vm.order.total;
            total += item.quantity * item.price;

            vm.order.total = total;
        }

        function createOrder(order) {
            if(!userId) {
                vm.error = "Please register or login."
            } else {
                order.userId = userId;

                OrderService.createOrder
                    .then(
                        function (respond) {
                            if (repond.data) {
                                vm.message = "Order created successfully."
                            }
                        }, function (err) {
                            vm.error = err;
                        }
                    );
            }
        }
    }

})();