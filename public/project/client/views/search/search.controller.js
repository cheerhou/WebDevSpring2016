(function () {
    angular
        .module("ResManageApp")
        .controller("MenuSearchController", MenuSearchController);

    function MenuSearchController($location, MenuService) {
        var vm = this;

        vm.search = search;
        vm.addDishToMenu = addDishToMenu;


        function search(title) {
            MenuService
                .findMenuByTitle(title)
                .then(function (respond) {
                        if (respond.data) {
                            vm.recipes = respond.data;
                        }
                    }, function (error) {
                        vm.err = error;
                    }
                );

        }


        function addDishToMenu(dish) {
            var newDish = {
                recipe_id: dish.recipe_id,
                title: dish.title,
                image_url: dish.image_url,
                social_rank: dish.social_rank
            };

            MenuService
                .addDishToMenu(newDish)
                .then(function (respond) {
                    if (respond.data) {
                        vm.message = "dish added successfully.";
                    } else {
                        vm.error = "fail to add dish."
                    }
                });
        }
    }

})();