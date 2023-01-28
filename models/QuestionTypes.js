const mongoose = require("mongoose");

const questionTypeSchema = mongoose.Schema({
    name: {
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

module.exports = mongoose.model("Question_types", questionTypeSchema);