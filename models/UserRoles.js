const mongoose = require("mongoose");

const userRoleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    is_delete: {
        type: Boolean,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("User_roles", userRoleSchema);