(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", FieldsController);


    function FieldsController($scope, FormService, FieldService) {
        var currentForm = FormService.getCurrentForm();

        $scope.addField = addField;
        $scope.removeField = removeField;
        $scope.updateField = updateField;

        $scope.message = null;
        $scope.error = null;

        $scope.dynamicPopover = {
            templateUrl: 'myPopoverTemplate'
        };



        //show existing fields in the form
        if(currentForm) {
            FieldService
                .getFieldsForForm(currentForm._id)
                .then(function (respond) {
                    if (respond.data) {
                        $scope.fields = respond.data;

                        $scope.newOptions = OptionsToString();
                    }
                });
        } else{
            $scope.error = "Please select a form.";
            return;
        }


        function OptionsToString() {
            var str = "";
            var fields = $scope.fields;
            for (var i in fields) {
                var options = fields[i].options;
                for (var j in options) {
                    str = str + options[j].label + ":" + options[j].value + "\n"
                }
            }
            return str;
        }

        $scope.options = [
            "Single Line Text Field",
            "Multi Line Text Field",
            "Date Field",
            "Dropdown Field",
            "Checkboxes Field",
            "Radio Buttons Field"
        ];

        var singleLineTextField = {
            "_id": null,
            "label": "New Text Field",
            "type": "TEXT",
            "placeholder": "New Field"
        };

        var multiLineTextField = {
            "_id": null,
            "label": "New Text Field",
            "type": "TEXTAREA",
            "placeholder": "New Field"
        };

        var dateField = {"_id": null, "label": "New Date Field", "type": "DATE"};

        var dropdownField = {
            "_id": null, "label": "New Dropdown", "type": "OPTIONS",
            "options": [
                {"label": "Option 1", "value": "OPTION_1"},
                {"label": "Option 2", "value": "OPTION_2"},
                {"label": "Option 3", "value": "OPTION_3"}
            ]
        };

        var checkboxesField = {
            "_id": null, "label": "New Checkboxes", "type": "CHECKBOXES",
            "options": [
                {"label": "Option A", "value": "OPTION_A"},
                {"label": "Option B", "value": "OPTION_B"},
                {"label": "Option C", "value": "OPTION_C"}
            ]
        };

        var radioButtonsField = {
            "_id": null, "label": "New Radio Buttons", "type": "RADIOS",
            "options": [
                {"label": "Option X", "value": "OPTION_X"},
                {"label": "Option Y", "value": "OPTION_Y"},
                {"label": "Option Z", "value": "OPTION_Z"}
            ]
        };


        function addField(fieldType) {
            if (!currentForm) {
                $scope.error = "Add or select a form first.";
                return;
            }

            console.log("current form: " + currentForm._id + "-" + currentForm.title);

            switch (fieldType) {
                case "Single Line Text Field":
                    FieldService
                        .createFieldInForm(currentForm._id, singleLineTextField)
                        .then(function (respond) {
                            if (respond.data) {
                                $scope.fields = respond.data.fields;
                                $scope.newOptions = OptionsToString();

                                FormService.setCurrentForm(respond.data);
                                $scope.message = "Add Single Line Text Field successfully.";
                                //addMsg("Add Single Line Text Field successfully.");
                            }
                        });

                    break;
                case "Multi Line Text Field":
                    FieldService
                        .createFieldInForm(currentForm._id, multiLineTextField)
                        .then(function (respond) {
                            if (respond.data) {
                                $scope.fields = respond.data.fields;
                                $scope.newOptions = OptionsToString();

                                FormService.setCurrentForm(respond.data);
                                $scope.message = "Add Multi Line Text Field successfully.";
                            }
                        });
                    break;
                case "Date Field":
                    FieldService
                        .createFieldInForm(currentForm._id, dateField)
                        .then(function (respond) {
                            if (respond.data) {
                                $scope.fields = respond.data.fields;
                                $scope.newOptions = OptionsToString();

                                FormService.setCurrentForm(respond.data);
                                $scope.message = "Add Date Field successfully.";
                            }
                        });
                    break;
                case "Dropdown Field":
                    FieldService
                        .createFieldInForm(currentForm._id, dropdownField)
                        .then(function (respond) {
                            if (respond.data) {
                                $scope.fields = respond.data.fields;
                                $scope.newOptions = OptionsToString();

                                FormService.setCurrentForm(respond.data);
                                $scope.message = "Add Dropdown Field successfully.";
                            }
                        });
                    break;
                case "Checkboxes Field":
                    FieldService
                        .createFieldInForm(currentForm._id, checkboxesField)
                        .then(function (respond) {
                            if (respond.data) {
                                $scope.fields = respond.data.fields;
                                $scope.newOptions = OptionsToString();

                                FormService.setCurrentForm(respond.data);
                                $scope.message = "Add Checkboxes Field successfully.";
                            }
                        });
                    break;
                case "Radio Buttons Field":
                    FieldService
                        .createFieldInForm(currentForm._id, radioButtonsField)
                        .then(function (respond) {
                            if (respond.data) {
                                $scope.fields = respond.data.fields;
                                $scope.newOptions = OptionsToString();

                                FormService.setCurrentForm(respond.data);
                                $scope.message = "Add Radio Buttons Field successfully.";
                            }
                        });
                    break;
            }

        }

        function removeField(field) {
            FieldService
                .deleteFieldFromForm(currentForm._id, field._id)
                .then(function (respond) {
                    if (respond.data) {
                        $scope.fields = respond.data.fields;
                        $scope.message = "Remove field successfully.";
                    }
                });
        }


        function updateField(field, newOptions) {
            if (newOptions) {
                field.options = ToFieldOptions(newOptions);
            }

            FieldService
                .updateFieldInForm(currentForm._id, field._id, field)
                .then(function (respond) {
                    if (respond.data) {
                        $scope.fields = respond.data.fields;
                        $scope.newOptions = OptionsToString();
                        $scope.message = "Update field successfully.";

                        //test
                        console.log(currentForm._id + "   " + field._id);
                    }
                });
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


    }
})();