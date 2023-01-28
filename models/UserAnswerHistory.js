const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const userAnswerHistorySchema = mongoose.Schema({
    room_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rooms",
        required: true,
    },
    answer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answers",
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User_in_rooms",
        required: true,
    },
    is_delete: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

userAnswerHistorySchema.plugin(mongoosePaginate);

module.exports = mongoose.model("User_answer_history", userAnswerHistorySchema);