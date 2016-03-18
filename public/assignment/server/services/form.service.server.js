module.exports = function(app, formModel, db) {
    app.get("/api/assignment/user/:userId/form", findFormByUser);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteForm);
    app.post("api/assignment/user/:userId/form", createForm);
    app.put("/api/assignment/form/:formId", updateForm);


    function findFormByUser(req, res) {
        var userId = req.params.userId;
        var forms = formModel.findFormByUser(userId);
        res.json(forms);
    }

    function findFormById(req, res) {
        var formId = req.params.formId;
        var form = formModel.findFormById(formId);
        res.json(form);
    }

    function deleteForm(req, res) {
        var formId = req.params.formId;
        var forms = formModel.deleteForm(formId)
        res.json(forms);
    }

    function createForm(req, res) {
        var form = req.body;
        var forms = formModel.createForm(form);
        res.json(forms);
    }

    function updateForm(req, res) {
        var formId = req.params.formId;
        var newForm = req.body;
        var forms = formModel.updateForm(formId, newForm);
        res.json(forms);
    }
}