(function() {
    angular
        .module("ResManageApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, $rootScope, UserService) {
        $scope.logout = logout;

        function logout() {
            UserService.logout();
            $rootScope.currentUser = null;
            $location.url("/menu");
        }
    }

}) ();