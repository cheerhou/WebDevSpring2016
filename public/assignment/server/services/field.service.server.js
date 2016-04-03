module.exports = function (app, fieldModel, formModel) {
    app.get("/api/assignment/form/:formId/field", getAllFieldsInForm);
    app.post("/api/assignment/form/:formId/field", createFieldInForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldInForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldInForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldInForm)

    function getAllFieldsInForm(req, res) {
        var formId = req.params.formId;
        formModel.findFormById(formId)
            .then(
                function (form) {
                    console.log(form.fields);
                    res.json(form.fields);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function createFieldInForm(req, res) {
        var formId = req.params.formId;
        var fieldType = req.query.fieldType;
        console.log("formId + fieldType " + formId + " " + fieldType);
        fieldModel.createFieldInForm(formId, fieldType)
            .then(
                function (form) {
                    //console.log(form);
                    res.json(form);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findFieldInForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var form = formModel.findFormById(formId);
        var fields = form.fields;
        for (var i in fields) {
            if (fields[i]._id === fieldId) {
                res.json(fields[i]);
            }
        }
    }

    function deleteFieldInForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel.deleteFieldInForm(formId, fieldId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }


    function updateFieldInForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var newField = req.body;

        var form = formModel.findFormById(formId);
        var fields = form.fields;

        //no options is text field
        if (!newField.options) {
            for (var i in fields) {
                if (fields[i]._id === fieldId) {
                    fields[i].label = newField.label;
                    fields[i].placeholder = newField.placeholder;
                }
            }
            res.json(form);
            console.log("from serverside:" + formId + "   " + fieldId + "   " + newField.label + "  " + newField.placeholder);

        } else {//update fileds with options
            for (var i in fields) {
                if (fields[i]._id === fieldId) {
                    fields[i].label = newField.label;
                    fields[i].options = newField.options;
                }
            }
            res.json(form);
            console.log("from serverside: new options" + newField.options.toString());

        }


    }
}