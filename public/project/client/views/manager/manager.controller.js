(function() {
    angular
        .module("ResManageApp")
        .controller("ManagerController", ManagerController);

    function ManagerController($scope) {
        $scope.sayHello = "Hello from ManagerController";
    }

}) ();