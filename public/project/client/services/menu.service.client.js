(function () {
    angular
        .module("ResManageApp")
        .factory("MenuService", MenuService);

    function MenuService($http) {
        var api = {
            findMenuByTitle: findMenuByTitle,
            findRecipeById: findRecipeById,
            addDishToMenu: addDishToMenu,
            findAllDishes: findAllDishes,
            updateDish: updateDish,
            deleteDish: deleteDish
        };
        return api;


        function findMenuByTitle(title) {
            return $http.get("/api/project/search/" + title);
        }

        function findRecipeById(rId) {
            return $http.get("/api/project/search/recipe/" + rId);
        }

        function addDishToMenu(dish) {
            return $http.post("/api/project/menu/dish", dish);
        }

        function findAllDishes() {
           return $http.get("/api/project/menu");
        }

        function updateDish(id, newDish) {
            return $http.put("/api/project/menu/dish/" + id, newDish);
        }

        function deleteDish(id) {
            return $http.delete("/api/project/menu/dish/" + id);
        }

    }
})();