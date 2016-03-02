(function() {
    angular
        .module("ResManageApp")
        .controller("MainController", MainController);

    function MainController($scope, $location) {
        $scope.$location = $location;
    }

}) ();