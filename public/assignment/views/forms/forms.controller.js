(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormsController", FormsController);

    function FormsController($scope) {
        $scope.sayHello = "Hello from FormsController";
    }

}) ();