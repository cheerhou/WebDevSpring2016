(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http) {
        var api = {
            login: login,
            logout: logout,
            register: register,
            findAllUsers: findAllUsers,
            findUserProfileByUsername: findUserProfileByUsername,
            deleteUser: deleteUser,
            updateUser: updateUser
        };
        return api;

        function login(user) {
            return $http.post("/api/assignment/login", user);
        }

        function logout() {
            return $http.post("/api/assignment/logout");
        }

        function register(user) {
            return $http.post("/api/assignment/register", user);
        }

        function findAllUsers() {
            return $http.get("/api/assignment/user");
        }

        function findUserProfileByUsername(username) {
            return $http.get("/api/assignment/profile/" + username);
        }

        function deleteUser(userId) {
            return $http.delete("/api/assignment/user/" + userId);
        }

        function updateUser(user) {
            //console.log("updateUser : " + userId + " " + user.username);
            return $http.put("/api/assignment/user/" + user._id, user);
        }

    }
})();