(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope) {
        $scope.sayHello = "Hello from RegisterController";
    }

}) ();