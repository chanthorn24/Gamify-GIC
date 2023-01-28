const Questions = require("../models/Question");
const Rooms = require("../models/Rooms");

const getAll = async(req, res) => {
    try {
        const questions = await Questions.find({ is_delete: false });

        res.status(200).json({ success: true, data: questions });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};

const getById = async(req, res) => {
    const { id } = req.params;

    try {
        const question = await Questions.findById(id);

        if (!question || question.is_delete) {
            throw new Error("Data Not Found");
        }

        res.status(200).json({ success: true, data: question });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};

const create = async(req, res) => {
    try {
        console.log(req.body);
        const questions = await Questions.create(req.body);
        let room = await Rooms.findById(req.body.room_id);
        if (room) {
            await room.question_id.push(questions._id.toString());
            await questions.save();
            await room.save();
        }

        res
            .status(200)
            .json({ success: true, data: questions, message: "Created successful" });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};

const update = async(req, res) => {
    const { id } = req.params;
    const { name, chosen_answer, correct_answer, time, score } = req.body;

    try {
        const question = await Questions.findById(id);

        if (!question || question.is_delete) {
            throw new Error("Data Not Found");
        }

        if (name) question.name = name;
        if (chosen_answer) question.chosen_answer = chosen_answer;
        if (correct_answer) question.correct_answer = correct_answer;
        if (time) question.time = time;
        if (score) question.score = score;

        await question.save();

        res.status(200).json({ success: true, message: "Updated Successful" });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};

const deleteOne = async(req, res) => {
    const { id } = req.params;

    try {
        const question = await Questions.findById(id);

        if (!question || question.is_delete) {
            throw new Error("Data Not Found");
        }

        question.is_delete = true;
        await question.save();

        res.status(200).json({ success: true, message: "Deleted successful" });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};

module.exports = { create, getAll, getById, update, deleteOne };