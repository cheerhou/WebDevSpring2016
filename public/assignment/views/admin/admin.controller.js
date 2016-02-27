(function() {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope) {
        $scope.sayHello = "Hello from AdminController";
    }

}) ();