const Rooms = require("../models/Rooms");
const gpc = require("generate-pincode");

const getAll = async(req, res) => {
    try {
        const rooms = await Rooms.find({ is_delete: false }).populate([{
            path: "room_type_id",
            match: { is_delete: false },
            select: { _id: 1, name: 1 },
        }, ]);

        res.status(200).json({ success: true, data: rooms });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};

const getByUser = async(req, res) => {
    const { id } = req.params;

    try {
        const room = await Rooms.find({ user_id: id }).populate([{
            path: "room_type_id",
            match: { is_delete: false },
            select: { _id: 1, name: 1 },
        }, ]);

        if (!room || room.is_delete) {
            throw new Error("Room not found");
        }

        res.status(200).json({ success: true, data: room });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};
const getById = async(req, res) => {
    const { id } = req.params;

    try {
        const room = await Rooms.findById(id).populate([{
                path: "room_type_id",
                match: { is_delete: false },
                select: { _id: 1, name: 1 },
            },
            {
                path: "question_id",
                match: { is_delete: false },
                select: {
                    _id: 1,
                    question_type_id: 1,
                    name: 1,
                    chosen_answer: 1,
                    correct_answer: 1,
                    time: 1,
                    score: 1,
                },
                options: {
                    populate: {
                        path: "question_type_id",
                        match: { is_delete: false },
                        select: {
                            _id: 1,
                            name: 1,
                        },
                    },
                },
            },
        ]);

        if (!room || room.is_delete) {
            throw new Error("Room not found");
        }

        res.status(200).json({ success: true, data: room });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};

const create = async(req, res) => {
    try {
        // const { user_id, room_type_id, name, pin} = req.body
        // pin = gpc(6)

        const newRoom = new Rooms({
            user_id: req.body.user_id,
            room_type_id: req.body.room_type_id,
            name: req.body.name,
            pin: gpc(6),
        });

        const rooms = await Rooms.create(newRoom);
        await rooms.save();

        res.status(200).json({
            success: true,
            data: rooms,
            message: "Room created successfully",
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};

const update = async(req, res) => {
    const { id } = req.params;
    const { name, room_type_id, image, status } = req.body;
    console.log(name, room_type_id, image);
    try {
        const room = await Rooms.findById(id);

        // check if not exist
        if (!room || room.is_delete) {
            throw new Error("Room not found");
        }

        // update data
        if (name) room.name = name;
        if (room_type_id) room.room_type_id = room_type_id;
        if (image) room.image = image;
        if (status) room.status = !room.status;

        // save data
        await room.save();

        res
            .status(200)
            .json({ success: true, data: room, message: "Updated successfully" });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};

const deleteOne = async(req, res) => {
    const { id } = req.params;

    try {
        const room = await Rooms.findById(id);

        if (!room || room.is_delete) {
            throw new Error("Room not found");
        }

        room.is_delete = true;
        await room.save();

        res.status(200).json({ success: true, message: "Deleted successfully" });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};

const joinRoom = async(req, res) => {
    const pin = req.params.pin;
    try {
        const room = await Rooms.find({ pin: pin, status: true });

        if (room == "") {
            res.status(200).json({ success: false, data: "" });
        } else {
            res.status(200).json({ success: true, data: room });
        }
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
    joinRoom,
    getByUser,
};