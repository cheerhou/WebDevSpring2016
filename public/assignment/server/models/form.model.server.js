//use the mock data for testing
var mockForms = require("./form.mock.json");
var uuid = require("node-uuid");

module.exports = function(db, mongoose) {

    var FormSchema = require("./form.schema.server.js")(mongoose);
    var FormModel = mongoose.model('FormModel', FormSchema);

    var api = {
        createFormForUser: createFormForUser,
        createFieldInForm: createFieldInForm,
        findAllForms: findAllForms,
        findFormById: findFormById,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormByTitle: findFormByTitle,
        findFormByUser: findFormByUser

    };
    return api;

    function createFormForUser(userId, form) {
        form._id = uuid.v4();
        form.userId = userId;
        form.fields = [];
        mockForms.push(form);
        return mockForms;
    }

    function createFieldInForm(formId, field) {
        var form = findFormById(formId);
        field._id = uuid.v4();
        form.fields.push(field);
        return form;
    }

    function findAllForms() {
        return mockForms;
    }

    function findFormById(formId) {
        for(var i in mockForms) {
            if(mockForms[i]._id === formId) {
                return mockForms[i];
            }
        }
        return null;
    }

    function updateForm(formId, newForm) {
        for(var i in mockForms) {
            if (mockForms[i]._id === formId) {
                mockForms[i].title = newForm.title;
                mockForms[i].userId = newForm.userId;
                mockForms[i].fields = newForm.fields;
            }
        }
        return mockForms;
    }

    function deleteForm(formId) {
        for(var i in mockForms) {
            if (mockForms[i]._id === formId) {
                mockForms.splice(i, 1);
            }
        }
        return mockForms;
    }

    function findFormByTitle(title) {
        for(var i in mockForms) {
            if (mockForms[i].title === title) {
                return mockForms[i];
            }
        }
        return null;
    }

    function findFormByUser(userId) {
        var forms = [];
        for(var i in mockForms) {
            if (mockForms[i].userId === userId) {
                forms.push(mockForms[i]);
            }
        }
        return forms;
    }
}