(function () {
    angular
        .module("ResManageApp")
        .controller("OrderController", OrderController);

    function OrderController($location, OrderService) {
        var vm = this;
        vm.calculateTotal = calculateTotal;
        vm.deleteItemInOrder = deleteItemInOrder;

        function init(){
            vm.order = OrderService.getCurrentOrder();
        }
        init();


        function deleteItemInOrder(dish) {
            vm.order = OrderService.deleteItemInOrder(dish.recipe_id);

            //re-calculate total
            var items = vm.order.items;
            vm.order.total = 0;
            for(var i in items) {
                calculateTotal(items[i]);
            }
        }

        function calculateTotal(item) {
            var total = vm.order.total;
            total += item.quantity * item.price;

            vm.order.total = total;
        }
    }

})();