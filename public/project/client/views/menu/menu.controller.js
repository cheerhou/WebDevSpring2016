(function () {
    angular
        .module("ResManageApp")
        .controller("MenuController", MenuController);

    function MenuController($scope, $location, MenuService, OrderService) {
        var vm = this;

        vm.closeError = closeError;
        vm.closeMessage = closeMessage;

        vm.order = order;
        vm.addDish = addDish;
        vm.updateDish = updateDish;
        vm.selectDish = selectDish;
        vm.deleteDish = deleteDish;


        function init() {
            var currentOrder = OrderService.getCurrentOrder();
            if (!currentOrder) {
                OrderService.emptyCurrentOrder();
            }

            MenuService
                .findAllDishes()
                .then(function (respond) {
                    vm.dishes = respond.data;
                });
        }

        init();

        function closeError() {
            vm.error = null;
        }

        function closeMessage() {
            vm.message = null;
        }

        function order(dish) {
            var newDish = {
                quantity: "1",
                price: dish.price,
                title: dish.title,
                total: dish.price,
                image_url: dish.image_url
            };

            OrderService.addDishToCurrentOrder(newDish);
        }

        function addDish(dish) {
            MenuService.addDishToMenu(dish)
                .then(
                    function (respond) {
                        if (respond.data) {
                            vm.message = "Dish added successfully."
                            vm.dish = null;
                            init();
                        }
                    }, function (err) {
                        vm.error = err;
                    }
                );

        }

        function updateDish(dish) {
            MenuService.updateDish(dish._id, dish)
                .then(
                    function (respond) {
                        if (respond.data) {
                            vm.message = "Dish updated successfully."
                            vm.dish = null;
                            init();
                        }
                    }, function (err) {
                        vm.error = err;
                    }
                );

        }

        function selectDish(dish) {
            vm.dish = dish;
        }

        function deleteDish(dish) {
            MenuService.deleteDish(dish._id)
                .then(
                    function (respond) {
                        if (respond.data) {
                            vm.message = "Dish delete successfully."
                            vm.dish = null;
                            init();
                        }
                    }, function (err) {
                        vm.error = err;
                    }
                );
        }




    }

})();