(function () {
    angular
        .module("ResManageApp")
        .controller("ManagerController", ManagerController)
        .controller("ManagerTipsController", ManagerTipsController);

    function ManagerController(UserService) {
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

        function updateUser(user) {
            if (!user.username) {
                vm.error = "Please enter the username.";
                return;
            }
            if (!user.role) {
                vm.error = "Please select a user role.";
                return;
            }

            //set salary for different roles
            vm.user.salary = getSalaryByRole(user.role);

            UserService.updateUser(user._id, user)
                .then(
                    function (respond) {
                        if (respond.data) {
                            vm.message = "User updated successfully.";
                            vm.user = null;
                            init();
                        }
                    }, function (err) {
                        vm.error = "Fail to update a new user. " + err;
                    }
                );

        }

        function addUser(user) {
            if (!user.username) {
                vm.error = "Please enter the username.";
                return;
            }
            if (!user.role) {
                vm.error = "Please select a  user role.";
                return;
            }

            user.salary = getSalaryByRole(user.role);

            UserService.createUser(user)
                .then(
                    function (respond) {
                        if (respond.data) {
                            vm.message = "User created successfully.";
                            vm.user = null;
                            init();
                        }
                    }, function (err) {
                        vm.error = "Fail to create a new user. " + err;

                    }
                );
        }

        function deleteUser(user) {
            UserService.deleteUserById(user._id)
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

        function getSalaryByRole(role) {
            //set salary for different roles
            if (role == "Waiter") {
                return 2500;
            }
            if (role == "Receptionist") {
                return 3000;
            }
            if (role == "Cook") {
                return 4000;
            }
            if (role == "Deliveryman") {
                return 2000;
            }
        }
    }

    function ManagerTipsController(UserService) {

    }

})();