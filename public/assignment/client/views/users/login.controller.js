(function() {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, UserService) {
        $scope.message = null;
        $scope.error = null;
        $scope.login = login;

        function login(user) {
            if(!user) {
                $scope.error = "No user exist!"
                return;
            }
            UserService
                .findUserByCredentials({username: user.username, password: user.password})
                .then(function(respond) {
                    if(respond.data) {
                        UserService.setCurrentUser(respond.data);
                        $location.url("/profile");
                    }
                });

            //var aUser = UserService.findUserByCredentials(user.username, user.password);
            //if(aUser != null) {
            //    UserService.setCurrentUser(aUser);
            //    $location.url("/profile");
            //} else {
            //    $scope.error = "Please verify your user name or password."
            //}
        }
    }

}) ();