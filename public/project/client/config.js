(function () {
    angular
        .module("ResManageApp")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/menu", {
                templateUrl: "views/menu/menu.view.html",
                controller: "MenuController"
            })
            .when("/order", {
                templateUrl: "views/order/order.view.html",
                controller: "OrderController"
            })
            .when("/order/summary", {
                templateUrl: "views/order/order.summary.view.html"
            })
            .when("/order/detail", {
                templateUrl: "views/order/order.detail.view.html"
            })
            .when("/reservation", {
                templateUrl: "views/reservation/reservation.view.html",
                controller: "ReservationController"
            })
            .when("/reservation/detail", {
                templateUrl: "views/reservation/reservation.detail.view.html"
            })
            .when("/manage", {
                templateUrl: "views/manager/manager.view.html",
                controller: "ManagerController"
            })
            .when("/manage/tips", {
                templateUrl: "views/manager/manage.tips.view.html"
            })
            .when("/manage/review", {
                templateUrl: "views/manager/manager.review.view.html"
            })
            .when("/search", {
                templateUrl: "views/menu/menu.search.view.html",
                controller: "MenuSearchController"
            })
            .when("/search?title=:title", {
                templateUrl: "views/menu/menu.search.view.html",
                controller: "MenuSearchController"
            })
            .when("/detail/:rId", {
                templateUrl: "views/menu/menu.detail.view.html",
                controller: "MenuDetailController"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController"
            })
            .otherwise("/menu", {
                redirectTo: "/menu"
            })

    }
})();