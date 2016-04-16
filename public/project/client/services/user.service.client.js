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
            updateUser: updateUser,
            findUserProfileByUsername: findUserProfileByUsername
        };
        return api;


        function setCurrentUser(user) {
            $rootScope.currentUser = user;

        }

        function getCurrentUser() {
            return $rootScope.currentUser;
        }

        function createUser(user) {
            return $http.post("/api/project/user", user);
        }

        function findUserByUsername(username) {
            return $http.get("/api/project/user?username=" + username);

        }

        function findUserByCredentials(credentials) {
            return $http.post("/api/project/user/login", credentials);
        }

        function findAllUsers() {
            return $http.get("/api/project/user");
        }

        function deleteUserById(userId) {
            return $http.delete("/api/project/user/" + userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/project/user/" + userId, user);
        }

        function findUserProfileByUsername(username) {
            return $http.get("/api/project/profile/" + username);
        }
    }
})();