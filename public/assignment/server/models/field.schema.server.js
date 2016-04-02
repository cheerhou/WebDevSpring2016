module.exports = function (mongoose) {

    var FildSchema = mongoose.Schema(
        {
            label: String,
            type: {type: String, default: "TEXT"},
            placeholder: String,
            options: [{label: String, value: String}]
        },
        {collection: 'field'}
    );

    return FildSchema;

};