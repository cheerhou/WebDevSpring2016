(function () {
    angular
        .module("ResManageApp")
        .controller("MenuController", MenuController);

    function MenuController($scope, $location, MenuService, OrderService) {
        var vm = this;

        vm.order = order;
        vm.addDish = addDish;
        vm.updateDish = updateDish;
        vm.selectDish = selectDish;
        vm.deleteDish = deleteDish;


        function init() {
            if(!OrderService.getCurrentOrder()) {
                var currentOrder = {
                    userId: "",
                    items: [],
                    total: 0,
                    delivery: "",
                    paymentType: ""
                };

                OrderService.setCurrentOrder(currentOrder);
            }

            MenuService
                .findAllDishes()
                .then(function (respond) {
                    vm.dishes = respond.data;
                });
        }

        init();

        function order(dish) {
            OrderService.addDishToCurrentOrder(dish);
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