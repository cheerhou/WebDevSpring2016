(function () {
    angular
        .module("ResManageApp")
        .factory("OrderService", OrderService);

    function OrderService($http) {
        var api = {
            setCurrentOrder: setCurrentOrder,
            getCurrentOrder: getCurrentOrder,
            createOrder: createOrder,
            addDishToCurrentOrder: addDishToCurrentOrder
        };
        return api;


        function setCurrentOrder(order) {
            $rootScope.currentOrder = order;
        }

        function getCurrentOrder() {
            return $rootScope.currentOrder;
        }
        function createOrder(order) {
            //return $http.post("/api/project/order", order);
        }

        function addDishToCurrentOrder(dish) {
            $rootScope.currentOrder.dishes.push(dish);
        }
    }

})();