//module.exports = function (mongoose) {
//
//    var FildSchema = mongoose.Schema(
//        {
//            label: String,
//            type: {
//                type: String,
//                default: "TEXT",
//                enum: ["TEXT", "EMAIL", "PASSWORD", "OPTIONS", "DATE", "RADIOS", "CHECKBOXES"]
//            },
//            placeholder: String,
//            options: [{label: String, value: String}]
//        }, {collection: 'field'}
//    );
//
//    return FildSchema;
//
//};