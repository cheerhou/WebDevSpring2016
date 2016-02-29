(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormsController", FormsController);

    function FormsController($scope, FormService, UserService) {
        $scope.error = null;
        $scope.selectedFormId = null;
        $scope.currentUser = UserService.getCurrentUser();
        $scope.forms = FormService.findAllForms();

        $scope.addForm = addForm;
        //$scope.updateForm = updateForm;
        //$scope.deleteForm = deleteForm;
        //$scope.selectForm = selectForm;


        function addForm(form) {
            if(!form.title) {
                $scope.error = "Please provide a form name.";
                return;
            }
            if($scope.currentUser == null) {
                $scope.error = "Please login.";
                return;
            }
            var newForm = FormService.createFormForUser($scope.currentUser._id, form);
            console.log("new from: " + newForm.title);
        }

        //function updateForm(form) {
        //    FormService.updateFormById($scope.selectedFormId, form);
        //}
        //
        //function deleteForm(index) {
        //    var fromId = $scope.forms[index]._id;
        //    FormService.deleteFormById(fromId);
        //}
        //
        //function selectForm(index) {
        //    $scope.selectedFormId = $scope.forms[index]._id;
        //    $scope.form = {
        //        title:$scope.forms[index].title
        //    }
        //}
    }

}) ();