(function() {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope) {
        $scope.sayHello = "Hello from LoginController";
    }

}) ();