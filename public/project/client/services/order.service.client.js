(function () {
    angular
        .module("ResManageApp")
        .factory("OrderService", OrderService);

    function OrderService($http, $rootScope) {

        var api = {
            setCurrentOrder: setCurrentOrder,
            getCurrentOrder: getCurrentOrder,
            createOrder: createOrder,
            addDishToCurrentOrder: addDishToCurrentOrder,
            deleteItemInOrder: deleteItemInOrder
        };
        return api;


        function setCurrentOrder(order) {
            $rootScope.currentOrder = order;
        }

        function getCurrentOrder() {
            return $rootScope.currentOrder;
        }

        function createOrder(order) {
            return $http.post("/api/project/order", order);
        }

        function addDishToCurrentOrder(dish) {
            $rootScope.currentOrder.items.push(dish);
        }

        function deleteItemInOrder(recipe_id) {
            var order = $rootScope.currentOrder;
            var items = order.items;
            for(var i in items) {
                if(items[i].recipe_id == recipe_id) {
                    order.items.splice(i, 1);
                    return order;
                }
            }
            return null;
        }

    }

})();