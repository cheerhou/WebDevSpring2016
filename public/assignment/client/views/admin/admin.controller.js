(function () {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController(UserService) {
        var vm = this;

        vm.addUser = addUser;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.selectUser = selectUser;

        function init() {
            UserService.findAllUsers()
                .then(function (respond) {
                        vm.users = respond.data;
                    }
                );
        }

        init();

        function addUser(user) {
            if (!user.username) {
                vm.error = "Please enter the username.";
                return;
            }
            if (!user.password) {
                vm.error = "Please enter the password.";
                return;
            }
            if (!user.firstName) {
                vm.error = "Please enter the first name.";
                return;
            }
            if (!user.lastName) {
                vm.error = "Please enter the last name.";
                return;
            }
            UserService.createUser(user)
                .then(function (respond) {
                        if (respond.data) {
                            vm.message = "User created successfully.";
                            vm.user = null;
                            init();
                        } else {
                            vm.error = "Fail to create a new user.";
                        }
                    }
                );
        }


        function updateUser(user) {
            if (!user.username) {
                vm.error = "Please enter the username.";
                return;
            }
            if (!user.password) {
                vm.error = "Please enter the password.";
                return;
            }
            if (!user.firstName) {
                vm.error = "Please enter the first name.";
                return;
            }
            if (!user.lastName) {
                vm.error = "Please enter the last name.";
                return;
            }
            if (!user._id) {
                vm.error = "Please create the user first.";
                return;
            }

            UserService.updateUser(user)
                .then(
                    function (respond) {
                        if (respond.data) {
                            vm.message = "User updated successfully.";
                            vm.user = null;
                            init();
                        } else {
                            vm.error = "Fail to update the user.";
                        }
                    }
                );


        }

        function deleteUser(user) {
            console.log(user._id);
            UserService.deleteUser(user._id)
                .then(
                    function (respond) {
                        if (respond.data) {
                            vm.message = "User deleted successfully.";
                            init();
                        }
                    },
                    function(err) {
                        vm.error = "Fail to delete user. " + err;
                    }
                );

        }

        function selectUser(user) {
            vm.user = user;
        }
    }

})();