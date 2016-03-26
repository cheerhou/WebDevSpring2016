(function () {
    angular
        .module("ResManageApp")
        .controller("MenuSearchController", MenuSearchController);

    function MenuSearchController($scope, $location, $routeParams, MenuService) {
        $scope.error = null;
        $scope.message = null;

        $scope.search = search;
        $scope.addDishToMenu = addDishToMenu;
        $scope.title = $routeParams.title;

        if($scope.title) {
            search($scope.title);
        }


        function search(title) {
            $location.url("/search?title=" + $scope.title);

            if (title) {
                MenuService.findMenuByTitle(
                    title,
                    function (response) {
                        console.log(response);
                        $scope.data = response.recipes;
                    });
            }
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