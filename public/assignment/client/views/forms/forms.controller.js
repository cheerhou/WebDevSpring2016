(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormsController", FormsController);

    function FormsController($scope, FormService, UserService) {
        $scope.error = null;
        $scope.message = null;
        $scope.selectedFormId;

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;


        $scope.currentUser = UserService.getCurrentUser();
        FormService
            .findAllForm()
            .then(function(respond) {
                $scope.forms = respond.data;
            });


        function addForm(form) {
            if(!form.title) {
                $scope.error = "Please provide a form name.";
                return;
            }
            if($scope.currentUser == null) {
                $scope.error = "Please login.";
                return;
            }
            FormService
                .createFormForUser($scope.currentUser._id, form)
                .then(function(respond) {
                    if(respond.data) {
                        $scope.forms = respond.data;
                        $scope.message = "Create form successfully.";
                    } else {
                        $scope.error = "Fail to create form."
                    }
                });

        }

        function updateForm(form) {
            if($scope.selectedFormId == null) {
                $scope.error = "Please select a form.";
                return;
            }

            FormService
                .updateFormById($scope.selectedFormId, form)
                .then(function(respond) {
                    if(respond.data) {
                        $scope.message = "Update form successfully.";
                    } else {
                        $scope.error = "Fail to update form."
                    }
                });

            //clear the header fields
            $scope.selectedFormId = null;
            form.title = "";
        }

        function deleteForm(index) {
            var fromId = $scope.forms[index]._id;
            FormService
                .deleteFormById(fromId)
                .then(function(respond) {
                    if(respond.data) {
                        $scope.message = "Delete form successfully.";
                    } else {
                        $scope.error = "Fail to delete form."
                    }
                });
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