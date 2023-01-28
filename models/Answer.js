const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const answerSchema = mongoose.Schema({
    question_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Questions",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    is_correct: {
        type: Boolean,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    is_delete: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

answerSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Answers", answerSchema);