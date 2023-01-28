const User_answer_history = require('../models/UserAnswerHistory')

const getAll = async(req, res) => {
    try {
        const user_answer_history = await User_answer_history.find({ is_delete: false });

        res.status(200).json({ success: true, data: user_answer_history})
    } catch (error) {
        res.status(400).json({ success: false, message: error })
    }
}

const getById = async(req, res) => {
    const { id } = req.params;

    try {
        const user_answer_history = await User_answer_history.findById(id);

        if (!user_answer_history || user_answer_history.is_delete) {
            throw new Error('Data Not Found')
        }

        res.status(200).json({ success: true, data: user_answer_history})
    } catch (error) {
        res.status(400).json({ success: false, message: error })
    }
}

const create = async(req, res) => {
    try {
        const user_answer_history = await User_answer_history.create(req.body);
        await user_answer_history.save();

        res.status(200).json({ success: true, data: user_answer_history, message: "Created Successful" })

    } catch (error) {
        res.status(400).json({ success: false, message: error })
    }
}

const update = async(req, res) => {
    const { id } = req.params;
    const { user_email } = req.body;

    try {
        const user_answer_history = await User_answer_history.findById(id);

        if( !user_answer_history || user_answer_history.is_delete) {
            throw new Error('Data Not Found')
        }

        if ( user_email ) user_answer_history.user_email = user_email;

        await user_answer_history.save();

        res.status(200).json({ success: true, message: "Updated successful" });
    } catch (error) {
        res.status(400).json({ success: false, message: error })
    }
}

const deleteOne = async(req, res) => {
    const { id } = req.params;

    try {
        const user_answer_history = await User_answer_history.findById(id);

        if( !user_answer_history || user_answer_history.is_delete) {
            throw new Error('Data Not Found')
        }

        user_answer_history.is_delete = true;
        await user_answer_history.save();

        res.status(200).json({ success: true, message: "Deleted successful" });
    } catch (error) {
        res.status(400).json({ success: false, message: error })
    }
}

module.exports = { create, getAll, getById, update, deleteOne };