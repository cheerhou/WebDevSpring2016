(function () {
    angular
        .module("ResManageApp")
        .controller("MenuSearchController", MenuSearchController);

    function MenuSearchController($scope, $location, MenuService) {
        $scope.error = null;
        $scope.message = null;

        $scope.search = search;
        $scope.addDishToMenu = addDishToMenu;

        function search(title) {
            if (title) {
                MenuService.findMenuByTitle(
                    title,
                    function (response) {
                        console.log(response);
                        $scope.data = response.recipes;
                    });

                //make url
                $location.url("/search?title=" + $scope.title);
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