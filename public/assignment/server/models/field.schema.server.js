module.exports = function(mongoose) {

    var FildSchema = new mongoose.schema({
        label: String,
        type: {type: String, default: "TEXT"},
        placeholder: String,
        options: [{label:String, value:String}]
    }, {collection: field});
}