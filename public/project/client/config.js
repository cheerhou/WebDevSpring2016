(function () {
    angular
        .module("ResManageApp")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/menu", {
                templateUrl: "views/menu/menu-list.view.html",
                controller: "MenuController",
                controllerAs: "model"
            })
            .when("/order", {
                templateUrl: "views/order/order-new.view.html",
                controller: "OrderController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })
            .when("/order/detail", {
                templateUrl: "views/order/order-list.view.html",
                controller: "ListOrderController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })
            .when("/order/detail/:orderId", {
                templateUrl: "views/order/order-detail.view.html",
                controller: "DetailOrderController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })
            .when("/reservation", {
                templateUrl: "views/reservation/reservation-new.view.html",
                controller: "ReservationController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })
            .when("/reservation/detail", {
                templateUrl: "views/reservation/reservation-list.view.html",
                controller: "ListReservationController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })
            .when("/reservation/detail/:revId", {
                templateUrl: "views/reservation/reservation-detail.view.html",
                controller: "DetailReservationController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })
            .when("/manage", {
                templateUrl: "views/manager/manager-user-list.view.html",
                controller: "ManagerController",
                controllerAs: "model",
                resolve: {loggedin: checkAdmin}
            })
            .when("/manage/menu", {
                templateUrl: "views/menu/menu.update.view.html",
                controller: "MenuController",
                controllerAs: "model",
                resolve: {loggedin: checkAdmin}
            })
            .when("/manage/salary", {
                templateUrl: "views/manager/manager-salary.view.html",
                controller: "ManagerSalaryController",
                controllerAs: "model",
                resolve: {loggedin: checkAdmin}
            })
            .when("/manage/review", {
                templateUrl: "views/manager/manager-review.view.html",
                controller: "ManagerReviewController",
                controllerAs: "model",
                resolve: {loggedin: checkAdmin}
            })
            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller: "MenuSearchController",
                controllerAs: "model",
                resolve: {loggedin: checkAdmin}
            })
            .when("/dish/:id", {
                templateUrl: "views/dish/dish.view.html",
                controller: "DishController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })
            .when("/profile/:username", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/task/delivery", {
                templateUrl: "views/task/task-list.view.html",
                controller: "ListTaskController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })
            .otherwise("/menu", {
                redirectTo: "/menu"
            })
    }


    var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function (user) {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0') {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else {
                $rootScope.error = 'You need to log in.';
                deferred.reject();
                $location.url('/');
            }
        });

        return deferred.promise;
    };


    var checkAdmin = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.get('/api/project/loggedin').success(function (user) {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.role == 'admin') {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
        });

        return deferred.promise;
    };

})();