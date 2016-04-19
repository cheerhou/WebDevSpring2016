(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormsController", FormsController);

    function FormsController($location, FormService, UserService) {
        var vm = this;
        var userId;
        var selectedFormId;

        vm.addForm = addForm;
        vm.deleteForm = deleteForm;
        vm.updateForm = updateForm;
        vm.selectForm = selectForm;

        function init() {
            var currentUser = UserService.getCurrentUser();
            userId = currentUser._id;
            //console.log("userId " + userId);

            if (userId) {
                FormService
                    .findAllFormsForUser(userId)
                    .then(function (respond) {
                            vm.forms = respond.data;
                        }
                    );
            } else {
                vm.error = "Please log in.";
            }
        }

        init();


        function addForm(form) {
            if (!form.title) {
                vm.error = "Please provide a form name.";
                return;
            }
            if (!userId) {
                vm.error = "Please login.";
                return;
            }

            form.userId = userId;
            FormService
                .createFormForUser(form)
                .then(function (respond) {
                    if (respond.data) {
                        var currentForm = respond.data;
                        //console.log("currentForm " + currentForm._id);
                        FormService.setCurrentForm(currentForm);
                        vm.message = "Create form successfully.";

                        form.title = null;
                        init();
                    } else {
                        vm.error = "Fail to create form."
                    }
                });
        }

        function deleteForm(form) {
            var fromId = form._id;
            FormService
                .deleteFormById(fromId)
                .then(
                    function (respond) {
                        vm.message = "Delete form successfully.";
                        init();
                    },
                    function (err) {
                        vm.error = err;
                    }
                );
        }


        function updateForm(form) {
            if (!selectedFormId) {
                vm.error = "Please select a form.";
                return;
            }

            FormService
                .updateFormById(selectedFormId, form)
                .then(
                    function (respond) {
                        vm.message = "Update form successfully.";

                        init();
                        //clear the header fields
                        selectedFormId = null;
                        form.title = "";
                    },
                    function (err) {
                        vm.error = err;
                    }
                );


        }


        function selectForm(form) {
            vm.form = form;
            selectedFormId = form._id;
            //console.log("selectedFormId " + selectedFormId);
            FormService.setCurrentForm(form);
            //console.log("current from " + form._id);
        }

    }

})();