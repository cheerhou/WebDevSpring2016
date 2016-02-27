(function() {
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", FieldsController);

    function FieldsController($scope) {
        $scope.sayHello = "Hello from FieldsController";
    }

}) ();