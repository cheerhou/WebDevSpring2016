(function() {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, UserService) {
        $scope.$location = $location;
        $scope.logout = logout;

        function logout() {
            UserService.setCurrentUser(null);
            $location.url("/home");

            console.log("logout by ng-click");
        }
    }

}) ();