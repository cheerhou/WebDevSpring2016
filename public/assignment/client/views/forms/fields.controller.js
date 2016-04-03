(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", FieldsController);


    function FieldsController($scope, FormService, FieldService) {
        var vm = this;
        var formId;

        vm.dynamicPopover = {
            templateUrl: 'myPopoverTemplate'
        };

        ////constants used in the option selection
        //$scope.options = [
        //    "Single Line Text Field",
        //    "Multi Line Text Field",
        //    "Date Field",
        //    "Dropdown Field",
        //    "Checkboxes Field",
        //    "Radio Buttons Field"
        //];

        vm.addField = addField;
        vm.removeField = removeField;
        vm.updateField = updateField;


        function init() {
            var currentForm = FormService.getCurrentForm();
            formId = currentForm._id;
            console.log("current form id " + formId);

            //show existing fields in the form
            if (!formId) {
                vm.error = "Please select a form.";
                return;
            } else {
                FieldService
                    .getAllFieldsInForm(formId)
                    .then(function (respond) {
                        if (respond.data) {
                            vm.fields = respond.data;
                            updateTextarea(vm.fields);
                        }
                    });
            }
        }

        init();


        //var singleLineTextField = {
        //    "_id": null,
        //    "label": "New Text Field",
        //    "type": "TEXT",
        //    "placeholder": "New Field"
        //};
        //
        //var multiLineTextField = {
        //    "_id": null,
        //    "label": "New Text Field",
        //    "type": "TEXTAREA",
        //    "placeholder": "New Field"
        //};
        //
        //var dateField = {"_id": null, "label": "New Date Field", "type": "DATE"};
        //
        //var dropdownField = {
        //    "_id": null, "label": "New Dropdown", "type": "OPTIONS",
        //    "options": [
        //        {"label": "Option 1", "value": "OPTION_1"},
        //        {"label": "Option 2", "value": "OPTION_2"},
        //        {"label": "Option 3", "value": "OPTION_3"}
        //    ]
        //};
        //
        //var checkboxesField = {
        //    "_id": null, "label": "New Checkboxes", "type": "CHECKBOXES",
        //    "options": [
        //        {"label": "Option A", "value": "OPTION_A"},
        //        {"label": "Option B", "value": "OPTION_B"},
        //        {"label": "Option C", "value": "OPTION_C"}
        //    ]
        //};
        //
        //var radioButtonsField = {
        //    "_id": null, "label": "New Radio Buttons", "type": "RADIOS",
        //    "options": [
        //        {"label": "Option X", "value": "OPTION_X"},
        //        {"label": "Option Y", "value": "OPTION_Y"},
        //        {"label": "Option Z", "value": "OPTION_Z"}
        //    ]
        //};


        function addField(fieldType) {
            if (!formId) {
                vm.error = "Please add or select a form first.";
                return;
            }

            FieldService.createFieldInForm(formId, fieldType)
                .then(
                    function (respond) {
                        vm.message = "add field successfully";
                        init();
                    }
                );

            //switch (fieldType) {
            //    case "Single Line Text Field":
            //        //create single line field
            //
            //        FieldService
            //            .createFieldInForm(formId, singleLineTextField)
            //            .then(
            //                function (respond) {
            //                    vm.message = "Add Single Line Text Field successfully.";
            //                    init();
            //                }
            //            );
            //
            //        break;
            //    //
            //    //    case "Multi Line Text Field":
            //    //        FieldService
            //    //            .createFieldInForm(formId, multiLineTextField)
            //    //            .then(function (respond) {
            //    //                if (respond.data) {
            //    //                    $scope.fields = respond.data.fields;
            //    //
            //    //                    FormService.setCurrentForm(respond.data);
            //    //                }
            //    //            });
            //    //        break;
            //    //
            //    //    case "Date Field":
            //    //        FieldService
            //    //            .createFieldInForm(formId, dateField)
            //    //            .then(function (respond) {
            //    //                if (respond.data) {
            //    //                    $scope.fields = respond.data.fields;
            //    //
            //    //                    FormService.setCurrentForm(respond.data);
            //    //                }
            //    //            });
            //    //        break;
            //    //
            //    //    case "Dropdown Field":
            //    //        FieldService
            //    //            .createFieldInForm(formId, dropdownField)
            //    //            .then(function (respond) {
            //    //                if (respond.data) {
            //    //                    $scope.fields = respond.data.fields;
            //    //                    updateTextarea($scope.fields);
            //    //
            //    //                    FormService.setCurrentForm(respond.data);
            //    //                    $scope.message = "Add Dropdown Field successfully.";
            //    //                }
            //    //            });
            //    //        break;
            //    //
            //    //    case "Checkboxes Field":
            //    //        FieldService
            //    //            .createFieldInForm(formId, checkboxesField)
            //    //            .then(function (respond) {
            //    //                if (respond.data) {
            //    //                    $scope.fields = respond.data.fields;
            //    //                    updateTextarea($scope.fields);
            //    //
            //    //                    FormService.setCurrentForm(respond.data);
            //    //                    $scope.message = "Add Checkboxes Field successfully.";
            //    //                }
            //    //            });
            //    //        break;
            //    //
            //    //    case "Radio Buttons Field":
            //    //        FieldService
            //    //            .createFieldInForm(formId, radioButtonsField)
            //    //            .then(function (respond) {
            //    //                if (respond.data) {
            //    //                    $scope.fields = respond.data.fields;
            //    //                    updateTextarea($scope.fields);
            //    //
            //    //                    FormService.setCurrentForm(respond.data);
            //    //                    $scope.message = "Add Radio Buttons Field successfully.";
            //    //                }
            //    //            });
            //    //        break;
            //    //}
            //
            //
            //}
        }

        function removeField(field) {
            FieldService
                .deleteFieldInForm(formId, field._id)
                .then(
                    function (respond) {
                        vm.message = "Remove field successfully.";
                        init();
                    },
                    function (err) {
                        vm.error = err;
                    }
                );
        }


        function updateField(field, newOptions) {
            if (newOptions) {
                field.options = ToFieldOptions(newOptions);
            }

            FieldService
                .updateFieldInForm(formId, field._id, field)
                .then(
                    function (respond) {
                        vm.message = "Update field successfully.";
                    },
                    function (err) {
                        vm.error = err;
                    }
                );
        }


        function ToFieldOptions(newOptions) {
            var optionsArr = [];
            var options = newOptions.trim().split('\n');

            for (var i in options) {
                var option = options[i].split(':');
                console.log("new option : " + option[0] + ":" + option[1]);

                optionsArr.push({label: option[0].trim(), value: option[1].trim()});
            }
            return optionsArr;
        }

        //convert the option objects to string showing in the textarea
        function updateTextarea(fields) {
            for (var i in fields) {
                var options = fields[i].options;
                if (options) {
                    vm.newOptions = optionsToString(options)
                }
            }

        }

        function optionsToString(options) {
            var str = ""
            for (var j in options) {
                str = str + options[j].label + ":" + options[j].value + "\n"
            }
            return str;
        }


    }
})();