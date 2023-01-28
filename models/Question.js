const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const questionSchema = mongoose.Schema({
    question_type_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question_types",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    chosen_answer: {
        type: [String],
    },
    time: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        require: true,
    },
    correct_answer: {
        type: String,
        required: true,
    },
    is_delete: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

questionSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Questions", questionSchema);