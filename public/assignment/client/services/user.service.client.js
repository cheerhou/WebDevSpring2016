(function () {
    angular
        .module("FormBuilderApp")
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
            logout: logout,
            getProfile: getProfile
        };
        return api;


        function setCurrentUser(user) {
            $rootScope.currentUser = user;

        }

        function getCurrentUser() {
            //return $http.get("/api/assignment/loggedin");
            return $rootScope.currentUser;
        }

        function createUser(user) {
            return $http.post("/api/assignment/user", user);
        }

        function findUserByUsername(username) {
            return $http.get("/api/assignment/user?username=" + username);
        }


        function findUserByCredentials(credentials) {
            return $http.post("/api/assignment/user/login", credentials);
        }

        function findAllUsers() {
            return $http.get("/api/assignment/user");
        }

        function deleteUserById(userId) {
            return $http.delete("/api/assignment/user/" + userId);
        }

        function updateUser(user) {
            //console.log("updateUser : " + userId + " " + user.username);
            return $http.put("/api/assignment/user/" + user._id, user);
        }

        function logout() {
            return $http.post("/api/assignment/logout");
        }

        function getProfile() {
            return $http.get("/api/assignment/profile/" + $rootScope.currentUser._id);
        }

    }
})();