(function() {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope) {
        $scope.sayHello = "Hello from HeaderController";
    }

}) ();