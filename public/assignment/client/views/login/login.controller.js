(function() {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(user) {
            if(!user) {
                vm.error = "No user exist!"
                return;
            }
            UserService
                .findUserByCredentials({username: user.username, password: user.password})
                .then(function(respond) {
                    if(respond.data) {
                        var currentUser = respond.data;
                        console.log("currentUser " + currentUser._id);
                        UserService.setCurrentUser(currentUser);
                        $location.url("/profile");
                    } else {
                        vm.error = "Please verify your user name or password."
                    }
                });

        }
    }

}) ();