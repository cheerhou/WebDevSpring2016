module.exports = function (mongoose) {

    var FormSchema = new mongoose.Schema(
        {
            title: String,
            fields: [],
            created: {type: Date, default: Date.now},
            updated: {type: Date, default: Date.now}
        },
        {
            collection: 'form'
        }
    );

    return FormSchema;
}