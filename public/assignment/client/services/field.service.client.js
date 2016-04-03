(function() {
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http) {
        var api = {
            createFieldInForm: createFieldInForm,
            getAllFieldsInForm: getAllFieldsInForm,
            getFieldForForm: getFieldForForm,
            deleteFieldInForm: deleteFieldInForm,
            updateFieldInForm: updateFieldInForm
        };

        return api;


        function createFieldInForm(formId, fieldType) {
            return $http.post("/api/assignment/form/" + formId + "/field?fieldType=" + fieldType);
        }

        function getAllFieldsInForm(formId) {
            return $http.get("/api/assignment/form/" + formId + "/field");
        }

        function getFieldForForm(formId, fieldId) {
            return $http.get("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        function deleteFieldInForm(formId, fieldId) {
            return $http.delete("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        function updateFieldInForm(formId, fieldId, field) {
            return $http.put("/api/assignment/form/" + formId + "/field/" + fieldId, field);
        }
    }
})();