const Room_types = require("../models/RoomTypes")

const getAll = async(req, res) => {
    try {
        const room_types = await Room_types.find({ is_delete: false });
        
        res.status(200).json({ success: true, data: room_types });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};

const getById = async(req, res) => {
    const { id } = req.params;
    try {
        const room_type = await Room_types.findById(id);

        //check exist data
        if (!room_type || room_type.is_delete) {
            throw new Error("Data Not Found");
        }

        res.status(200).json({ success: true, data: room_type });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};

const create = async(req, res) => {
    try {
        const room_types = await Room_types.create(req.body);
        await room_types.save();

        res
            .status(200)
            .json({ success: true, data: room_types, message: "Created successfully!" });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};

const update = async(req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const room_type = await Room_types.findById(id);

        if (!room_type || room_type.is_delete) {
            throw new Error("Data Not Found");
        }

        if (name) room_type.name = name;

        //save data to database
        await room_type.save();

        res.status(200).json({ success: true, message: "Updated successfully!" });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};

const deleteOne = async(req, res) => {
    const { id } = req.params;
    try {
        const room_type = await Room_types.findById(id);

        if (!room_type || room_type.is_delete) {
            throw new Error("Data Not Found");
        }

        //delete data
        room_type.is_delete = true;
        await room_type.save();

        res.status(200).json({ success: true, message: "Deleted successfully!" });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};

module.exports = { create, getAll, getById, update, deleteOne };