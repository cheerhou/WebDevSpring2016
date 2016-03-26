(function() {
    angular
        .module("ResManageApp")
        .controller("MenuController", MenuController);

    function MenuController($scope, $location, MenuService) {
        MenuService
            .findAllDishes()
            .then(function(respond) {
                $scope.dishes = respond.data;
            });
    }

}) ();