const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const userInRoomSchema = mongoose.Schema({
    room_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rooms",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        default: 0,
    },
    totalCorrect: {
        type: Number,
        default: 0,
    },
    status: {
        type: Boolean,
        default: 1,
    },
    is_delete: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

userInRoomSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("User_in_rooms", userInRoomSchema);