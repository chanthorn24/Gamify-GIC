const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const roomSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    room_type_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room_types",
        required: true,
    },
    question_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Questions",
    }, ],
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "",
    },
    status: {
        type: Boolean,
        default: 0,
    },
    pin: {
        type: String,
        required: true,
    },
    hidden: {
        type: Boolean,
        default: false,
    },
    is_delete: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

roomSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Rooms", roomSchema);