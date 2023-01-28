const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const userQuestionHistorySchema = mongoose.Schema({
    room_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rooms",
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User_in_rooms",
        required: true,
    },
    total_score: {
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

userQuestionHistorySchema.plugin(mongoosePaginate);

module.exports = mongoose.model(
    "User_question_history",
    userQuestionHistorySchema
);