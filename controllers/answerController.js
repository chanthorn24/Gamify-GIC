const Answer = require("../models/Answer");
const Question = require("../models/Question");
const UserAnswerHistory = require("../models/UserAnswerHistory");
const UserInRooms = require("../models/UserInRooms");

const getAll = async(req, res) => {
    try {
        const answers = await Answer.find({ is_delete: false });

        res.status(200).json({ success: true, data: answers });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};

const getById = async(req, res) => {
    const { id } = req.params;

    try {
        const answer = await Answer.findById(id);

        if (!answer || answer.is_delete) {
            throw new Error("Data Not Found");
        }

        res.status(200).json({ success: true, data: answer });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};

const create = async(req, res) => {
    const { question_id, name, room_id, user_id, score } = req.body;
    try {
        const data = {
            question_id: question_id,
            name: name.toString(),
            score: 0,
            is_correct: 0,
        };
        let increase = 0;

        const history = {
            user_id: user_id,
            room_id: room_id,
            answer_id: "",
        };

        const question = await Question.findById(question_id);
        if (question.correct_answer == name) {
            data.is_correct = 1;
            data.score = score;
            increase++;
        }
        // console.log(question.correct_answer, name);

        const player = await UserInRooms.findById(user_id);
        // console.log(player, user_id);
        player.score = data.score + player.score;
        player.totalCorrect = player.totalCorrect + increase;
        // console.log(player.score, data.score);
        await player.save();

        const answers = await Answer.create(data);
        await answers.save();

        history.answer_id = answers._id.toString();
        const user_answer_history = await UserAnswerHistory.create(history);

        await user_answer_history.save();

        res
            .status(200)
            .json({ success: true, data: answers, message: "Created successful" });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};

const update = async(req, res) => {
    const { id } = req.params;
    const { name, is_correct, score } = req.body;

    try {
        const answer = await Answer.findById(id);

        if (!answer || answer.is_delete) {
            throw new Error("Data Not Found");
        }

        // update data
        if (is_correct) answer.is_correct = is_correct;
        if (score) answer.score = score;
        if (name) answer.name = name;

        await answer.save();

        res.status(200).json({ success: true, message: "Updated Successful" });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};

const deleteOne = async(req, res) => {
    const { id } = req.params;

    try {
        const answer = await Answer.findById(id);

        if (!answer || answer.is_delete) {
            throw new Error("Data Not Found");
        }

        answer.is_delete = true;
        await answer.save();

        res.status(200).json({ success: true, message: "Deleted Successful" });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};

module.exports = { create, getAll, getById, update, deleteOne };