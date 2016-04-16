(function () {
    angular
        .module("ResManageApp")
        .controller("OrderController", OrderController);

    function OrderController($location, OrderService, UserService) {
        var vm = this;

        vm.updateItemTotal = updateItemTotal;
        vm.deleteItemInOrder = deleteItemInOrder;
        vm.createOrder = createOrder;

        function init() {
            vm.order = OrderService.getCurrentOrder();
            vm.order.total = 0;

            var items = vm.order.items;
            for (var i in items) {
                vm.order.total += items[i].total;
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
            var userId = UserService.getCurrentUser();

            if (!userId) {
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