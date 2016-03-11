(function() {
    angular
        .module("ResManageApp")
        .controller("MenuSearchController", MenuSearchController);

    function MenuSearchController($scope, $location, $routeParams, MenuService) {
        $scope.search = search;
        $scope.title = $routeParams.title;

        if($scope.title) {
            search($scope.title);
        }

        function search(title) {
            $location.url("/search/"+$scope.title);
            console.log(title);

            MenuService.findMenuByTitle(
                title,
                function(response){
                    console.log(response);
                    $scope.data = response.recipes;
                });
        }


    }

}) ();