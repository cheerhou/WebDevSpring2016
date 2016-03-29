(function () {
    angular
        .module("ResManageApp")
        .controller("DishController", DishController);


    function DishController($scope, $routeParams, MenuService) {
        var id = $routeParams.id;
        $scope.error = null;
        $scope.message = null;
        $scope.addDishToMenu = addDishToMenu;


        //show dish detail
        MenuService
            .findRecipeById(id)
            .then(function(respond) {
                if(respond.data) {
                    console.log(respond.data);
                    $scope.recipe = respond.data.recipe;
                }
            });


        function addDishToMenu(dish) {
            var newDish = {
                recipe_id: dish.recipe_id,
                title: dish.title,
                image_url: dish.image_url,
                social_rank: dish.social_rank
            };

            MenuService
                .addDishToMenu(newDish)
                .then(function(respond) {
                    if(respond.data) {
                        $scope.message = "dish added successfully.";
                    } else {
                        $scope.error = "fail to add dish."
                    }
                });
        }


    }


})();