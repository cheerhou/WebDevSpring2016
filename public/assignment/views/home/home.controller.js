(function() {
    angular
        .module("FormBuilderApp")
        .controller("HomeController", HomeController);

    function HomeController($scope) {
        $scope.homeHello = "Hello from HomeController";
    }

}) ();