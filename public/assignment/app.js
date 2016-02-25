//self-invoking function
(function(){
    angular
        .module("FormBuilderApp", [])
        .controller("IndexController", IndexController);

    function IndexController($scope) {
        console.log("hello form index controller");
    }
}) ();