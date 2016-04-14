(function () {
    angular
        .module("ResManageApp")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/menu", {
                templateUrl: "views/menu/menu.view.html",
                controller: "MenuController",
                controllerAs: "model"
            })
            .when("/order", {
                templateUrl: "views/order/order.view.html",
                controller: "OrderController",
                controllerAs: "model"
            })
            .when("/order/summary", {
                templateUrl: "views/order/order.summary.view.html"
            })
            .when("/order/detail", {
                templateUrl: "views/order/order.detail.view.html"
            })
            .when("/reservation", {
                templateUrl: "views/reservation/reservation.view.html",
                controller: "ReservationController",
                controllerAs: "model"
            })
            .when("/reservation/detail", {
                templateUrl: "views/reservation/reservation.detail.view.html"
            })
            .when("/manage", {
                templateUrl: "views/manager/manager.view.html",
                controller: "ManagerController",
                controllerAs: "model"
            })
            .when("/manage/menu", {
                templateUrl: "views/menu/menu.update.view.html",
                controller: "MenuController",
                controllerAs: "model"
            })
            .when("/manage/tips", {
                templateUrl: "views/manager/manage.tips.view.html"
            })
            .when("/manage/review", {
                templateUrl: "views/manager/manager.review.view.html"
            })
            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller: "MenuSearchController",
                controllerAs: "model"
            })
            .when("/dish/:id", {
                templateUrl: "views/dish/dish.view.html",
                controller: "DishController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model"
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