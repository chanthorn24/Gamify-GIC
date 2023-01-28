const mongoose = require("mongoose");

const roomTypeSchema = mongoose.Schema({
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

module.exports = mongoose.model("Room_types", roomTypeSchema);