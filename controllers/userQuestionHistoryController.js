const User_question_history = require('../models/UserQuestionHistory')

const getAll = async(req, res) => {
    try {
        const user_question_history = await User_question_history.find({ is_delete: false });

        res.status(200).json({ success: true, data: user_question_history });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};

const getById = async(req, res) => {
    const { id } = req.params;
    
    try {
        const user_question_history = await User_question_history.findById(id);

        if (!user_question_history || user_question_history.is_delete) {
            throw new Error("Data Not Found");
        }

        res.status(200).json({ success: true, data: user_question_history })
    } catch (error) {
        res.status(400).json({ success: false, message: error })
    }
}

const create = async(req, res) => {
    try {
        const user_question_history = await User_question_history.create(req.body);
        await user_question_history.save();

        res.status(200).json({ success: true, data: user_question_history, message: "Created successful"})
    } catch (error) {
        res.status(400).json({ success: false, message: error })
    }
}

const update = async(req, res) => {
    const { id } = req.params;
    const { total_score } = req.body;

    try {
        const user_question_history = await User_question_history.findById(id);

        if(!user_question_history || user_question_history.is_delete) {
            throw new Error("Data Not Found");
        }

        if (total_score) user_question_history.total_score = total_score;

        await user_question_history.save();

        res.status(200).json({ success: true, message: "Updated Successful" });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
}

const deleteOne = async(req, res) => {
    const { id } = req.params;

    try {
        const user_question_history = await User_question_history.findById(id);

        if(!user_question_history || user_question_history.is_delete) {
            throw new Error("Data Not Found");
        }

        user_question_history.is_delete = true;
        await user_question_history.save();

        res.status(200).json({ success: true, message: "Deleted Successful" })
    } catch (error) {
        res.status(400).json({ success: false, message: error })
    }
}

module.exports = { create, getAll, getById, update, deleteOne}