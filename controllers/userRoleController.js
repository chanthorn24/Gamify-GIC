const User_roles = require("../models/UserRoles");

const getAll = async(req, res) => {
    try {
        const user_role = await User_roles.find({ is_delete: false });

        res.status(200).json({ success: true, data: user_role });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};

const getById = async(req, res) => {
    const { id } = req.params;
    try {
        const user_role = await User_roles.findById(id);

        //check exist data
        if (!user_role || user_role.is_delete) {
            throw "Data not exist!";
        }

        res.status(200).json({ success: true, data: user_role });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};

const create = async(req, res) => {
    const { name } = req.body;
    try {
        const role = {
            name: name,
            is_delete: false,
        };

        const user_role = await User_roles.create(role);
        await user_role.save();

        res.status(200).json({
            success: true,
            message: "Created successfully!",
            data: user_role,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};

const update = async(req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const user_role = await User_roles.findById(id);

        if (!user_role || user_role.is_delete) {
            throw "Data not exist!";
        }

        //update dynamic
        if (name) user_role.name = name;

        await user_role.save();
        res.status(200).json({ success: true, message: "Updated successfully!" });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};

const deleteOne = async(req, res) => {
    const { id } = req.params;
    try {
        const user_role = await User_roles.findById(id);

        if (!user_role || user_role.is_delete) {
            throw "Data not exist!";
        }

        //delete
        user_role.is_delete = true;
        user_role.save();

        res.status(200).json({ success: true, message: "Deleted successfully!" });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};

module.exports = { getAll, getById, create, deleteOne, update };