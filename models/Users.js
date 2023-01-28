const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const userSchema = mongoose.Schema({
    user_role_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User_roles",
        required: true,
    },
    department_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Departments",
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    is_delete: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Users", userSchema);