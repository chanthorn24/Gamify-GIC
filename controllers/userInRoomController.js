const User_in_rooms = require("../models/UserInRooms");

const getAll = async(req, res) => {
    try {
        const user_in_rooms = await User_in_rooms.find({ is_delete: false });

        res.status(200).json({ success: true, data: user_in_rooms });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};

const getById = async(req, res) => {
    const { id } = req.params;

    try {
        const user_in_room = await User_in_rooms.findById(id);

        if (!user_in_room || user_in_room.is_delete) {
            throw new Error("Data Not Found");
        }

        res.status(200).json({ success: true, data: user_in_room });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};
const getByRoom = async(req, res) => {
    const { id } = req.params;

    try {
        const user_in_room = await User_in_rooms.find({
            room_id: id,
            status: 1,
        }).sort({ score: -1 });

        if (!user_in_room || user_in_room.is_delete) {
            throw new Error("Data Not Found");
        }

        res.status(200).json({ success: true, data: user_in_room });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};
const getRoom = async(req, res) => {
    const { id } = req.params;

    try {
        const user_in_room = await User_in_rooms.find({ room_id: id });

        if (!user_in_room || user_in_room.is_delete) {
            throw new Error("Data Not Found");
        }

        res.status(200).json({ success: true, data: user_in_room });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};

const create = async(req, res) => {
    try {
        const user_in_rooms = await User_in_rooms.create(req.body);
        await user_in_rooms.save();

        res.status(200).json({
            success: true,
            data: user_in_rooms,
            message: "Created successful",
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};

const update = async(req, res) => {
    const { id } = req.params;
    const { name, email, score, status, room_id } = req.body;

    try {
        const user_in_room = await User_in_rooms.findById(id);

        if (!user_in_room || user_in_room.is_delete) {
            throw new Error("Data Not Found");
        }

        if (name) user_in_room.name = name;
        if (email) user_in_room.email = email;
        if (score) user_in_room.score = score;
        if (room_id) user_in_room.status = status;

        await user_in_room.save();

        res.status(200).json({ success: true, message: "Updated Successful" });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};

const deleteOne = async(req, res) => {
    const { id } = req.params;

    try {
        const user_in_room = await User_in_rooms.findById(id);

        if (!user_in_room || user_in_room.is_delete) {
            throw new Error("Data Not Found");
        }

        user_in_room.is_delete = true;
        await user_in_room.save();

        res.status(200).json({ success: true, message: "Deleted Successful" });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    deleteOne,
    getByRoom,
    getRoom,
};