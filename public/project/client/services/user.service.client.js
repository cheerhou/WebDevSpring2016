(function () {
    angular
        .module("ResManageApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http) {
        var api = {
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return api;


        function setCurrentUser(user) {
            $rootScope.currentUser = user;

        }

        function getCurrentUser() {
            return $rootScope.currentUser;
        }

        function createUser(user) {
            return $http.post("/api/resmanagersys/user", user);
        }

        function findUserByUsername(username) {
            return $http.get("/api/resmanagersys/user?username=" + username);

        }

        function findUserByCredentials(credentials) {
            return $http.post("/api/resmanagersys/user/login", credentials);
        }

        function findAllUsers() {
            return $http.get("/api/resmanagersys/user");
        }

        function deleteUserById(userId) {
            return $http.delete("/api/resmanagersys/user/" + userId);
        }

        function updateUser(userId, user) {
            //console.log("updateUser : " + userId + " " + user.username);
            return $http.put("/api/resmanagersys/user/" + userId, user);
        }
    }
})();