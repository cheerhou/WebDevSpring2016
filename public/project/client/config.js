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
                controllerAs: "model"
                //resolve: {loggedin: checkLoggedin}
            })
            .when("/order/detail", {
                templateUrl: "views/order/order-list.view.html",
                controller: "ListOrderController",
                controllerAs: "model"
                //resolve: {loggedin: checkLoggedin}
            })
            .when("/order/detail/:orderId", {
                templateUrl: "views/order/order-detail.view.html",
                controller: "DetailOrderController",
                controllerAs: "model"
                //resolve: {loggedin: checkLoggedin}
            })
            .when("/reservation", {
                templateUrl: "views/reservation/reservation-new.view.html",
                controller: "ReservationController",
                controllerAs: "model"
                //resolve: {loggedin: checkLoggedin}
            })
            .when("/reservation/detail", {
                templateUrl: "views/reservation/reservation-list.view.html",
                controller: "ListReservationController",
                controllerAs: "model"
                //resolve: {loggedin: checkLoggedin}
            })
            .when("/reservation/detail/:revId", {
                templateUrl: "views/reservation/reservation-detail.view.html",
                controller: "DetailReservationController",
                controllerAs: "model"
                //resolve: {loggedin: checkLoggedin}
            })
            .when("/manage", {
                templateUrl: "views/manager/manager.view.html",
                controller: "ManagerController",
                controllerAs: "model"
                //resolve: {loggedin: checkAdmin}
            })
            .when("/manage/menu", {
                templateUrl: "views/menu/menu.update.view.html",
                controller: "MenuController",
                controllerAs: "model"
                //resolve: {loggedin: checkAdmin}
            })
            .when("/manage/tips", {
                templateUrl: "views/manager/manager-tips.view.html",
                controllerAs: "model"
                //resolve: {loggedin: checkAdmin}
            })
            .when("/manage/review", {
                templateUrl: "views/manager/manager-review.view.html",
                controllerAs: "model",
                //resolve: {loggedin: checkAdmin}
            })
            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller: "MenuSearchController",
                controllerAs: "model"
                //resolve: {loggedin: checkAdmin}
            })
            .when("/dish/:id", {
                templateUrl: "views/dish/dish.view.html",
                controller: "DishController",
                controllerAs: "model"
            })
            .when("/profile/:username", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model"
                //resolve: {loggedin: checkLoggedin}
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
            .otherwise("/menu", {
                redirectTo: "/menu"
            })

    }
})();