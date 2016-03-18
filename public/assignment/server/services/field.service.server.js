module.exports = function(app, formModel, db) {
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
        for(var i in fields) {
            if(fields[i]._id === fieldId) {
                res.json(fields[i]);
            }
        }
    }

    function deleteFieldFromForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var form = formModel.findFormById(formId);
        var fields = form.fields;
        for(var i in fields) {
            if(fields[i]._id === fieldId) {
                fields.splice(i, 1);
            }
        }
        res.json(form);
    }

    function createFieldInForm(req, res) {
        var newForm = req.body;
        var forms = formModel.createForm(newForm);
        res.json(forms);
    }

    function updateFieldInForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var newField = req.body;
        var form = formModel.findFormById(formId);
        var fields = form.fields;
        for(var i in fields) {
            if(fields[i]._id === fieldId) {
                fields.label = newField.label;
                fields.type = newField.type;
                fields.placeholder = newField.placeholder;
            }
        }
        res.json(form);
    }
}