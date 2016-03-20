module.exports = function (app, formModel, db) {
    app.get("/api/assignment/form/:formId/field", findFieldsByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldInForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldFromForm);
    app.post("/api/assignment/form/:formId/field", createFieldInForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldInForm)

    function findFieldsByFormId(req, res) {
        var formId = req.params.formId;
        var fields = formModel.findFormById(formId).fields;
        res.json(fields);
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

    function deleteFieldFromForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var form = formModel.findFormById(formId);
        var fields = form.fields;
        for (var i in fields) {
            if (fields[i]._id === fieldId) {
                fields.splice(i, 1);
            }
        }
        res.json(form);
    }

    function createFieldInForm(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        var form = formModel.createFieldInForm(formId, field);
        res.json(form);
    }


    function updateFieldInForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var newField = req.body;

        var form = formModel.findFormById(formId);
        var fields = form.fields;

        //no options is text field
        if (!fields.options) {
            for (var i in fields) {
                if (fields[i]._id === fieldId) {
                    fields[i].label = newField.label;
                    fields[i].placeholder = newField.placeholder;
                }
            }
            res.json(form);
            console.log("from serverside:" + formId + "   " + fieldId + "   " + newField.label + "  " + newField.placeholder);

        } else {
            for (var i in fields) {
                fields[i].options = newField.options;
            }
            res.json(form);
            console.log("from serverside: new options" + newField.options.toSource());

        }


    }
}