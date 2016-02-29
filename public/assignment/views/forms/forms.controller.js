(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormsController", FormsController);

    function FormsController($scope, FormService, UserService) {
        $scope.error = null;
        $scope.currentUser = UserService.getCurrentUser();
        $scope.forms = FormService.findAllForms();
        $scope.selectedFormId;
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;


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

        function updateForm(form) {
            if($scope.selectedFormId == null) {
                $scope.error = "Please select a form.";
                return;
            }
            FormService.updateFormById($scope.selectedFormId, form);
        }

        function deleteForm(index) {
            var fromId = $scope.forms[index]._id;
            FormService.deleteFormById(fromId);
        }

        function selectForm(index) {
            $scope.form = {
                _id:$scope.forms[index]._id,
                title:$scope.forms[index].title
            };
            $scope.selectedFormId = $scope.form._id;
            console.log("selectedFormId: " +  $scope.selectedFormId);
        }
    }

}) ();