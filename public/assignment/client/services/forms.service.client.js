(function () {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($rootScope, $http) {
        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            findAllForm: findAllForm,
            setCurrentForm: setCurrentForm,
            getCurrentForm: getCurrentForm
        };

        return api;

        function setCurrentForm(form) {
            $rootScope.currentForm = form;
        }

        function getCurrentForm() {
            return $rootScope.currentForm;
        }

        function findAllForm() {
            return $http.get("/api/assignment/form");
        }

        function createFormForUser(userId, form) {
            return $http.post("/api/assignment/user/" + userId +"/form", form);
        }

        function findAllFormsForUser(userId) {
            return $http.get("/api/assignment/user/" + userId + "/form");
        }

        function deleteFormById(formId) {
            return $http.delete("/api/assignment/form/" + formId);
        }

        function updateFormById(formId, newForm) {
            return $http.put("/api/assignment/form/" + formId, newForm);
        }
    }
}) ();