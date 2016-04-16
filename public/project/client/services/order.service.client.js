(function () {
    angular
        .module("ResManageApp")
        .factory("OrderService", OrderService);

    function OrderService($http, $rootScope) {

        var api = {
            setCurrentOrder: setCurrentOrder,
            getCurrentOrder: getCurrentOrder,
            emptyCurrentOrder: emptyCurrentOrder,
            createOrder: createOrder,
            addDishToCurrentOrder: addDishToCurrentOrder,
            deleteItemInOrder: deleteItemInOrder,
            findOrdersByUser: findOrdersByUser,
            findOrderByOrderId: findOrderByOrderId
        };
        return api;


        function setCurrentOrder(order) {
            $rootScope.currentOrder = order;
        }

        function getCurrentOrder() {
            return $rootScope.currentOrder;
        }

        function emptyCurrentOrder() {
            var currentOrder = {
                userId: "",
                items: [],
                total: 0,
                delivery: "",
                paymentType: ""
            };

            $rootScope.currentOrder = currentOrder;
            return currentOrder;
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

        function findOrdersByUser(userId) {
            return $http.get("/api/project/order/" + userId);
        }

        function findOrderByOrderId(orderId) {
            return $http.get("/api/project/order/detail/" + orderId);
        }

    }

})();