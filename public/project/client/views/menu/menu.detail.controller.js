(function() {
    angular
        .module("ResManageApp")
        .controller("MenuDetailController", MenuDetailController);


    function MenuDetailController($scope, $location, $routeParams, MenuService) {
        $scope.rId = $routeParams.rId;

        MenuService.findRecipeById(
            $scope.rId,
            function(respond) {
                $scope.recipe = respond.recipe;
        })
    }


}) ();