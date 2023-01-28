const Question_types = require('../models/QuestionTypes');

const getAll = async(req, res) => {
    try {
        const question_types = await Question_types.find({ is_delete: false });

        res.status(200).json({ success: true, data: question_types})
    } catch (error) {
        res.status(400).json({ success: false, message: error })
    }
}

const getById = async(req, res) => {
    const { id } = req.params;

    try {
        const question_type = await Question_types.findById(id);

        if (!question_type || question_type.is_delete) {
            throw new Error("Data Not Found")
        }

        res.status(200).json({ success: true, data: question_type })
    } catch (error) {
        res.status(400).json({ success: false, message: error })
    }
}

const create = async(req, res) => {
    try {
        const question_types = await Question_types.create(req.body)
        await question_types.save()

        res.status(200).json({ success: true, data: question_types, message: "Created successful" })
    } catch (error) {
        res.status(400).json({ success: false, message: error })
    }
}

const update = async(req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const question_type = await Question_types.findById(id);

        if (!question_type || question_type.is_delete) {
            throw new Error("Data Not Found")
        }
    
        if (name) question_type.name = name;
    
        await question_type.save();
    
        res.status(200).json({ success: true, message: 'Updated Successful' })
    } catch (error) {
        res.status(400).json({ success: false, message: error })
    }

}

const deleteOne = async(req, res) => {
    const { id } = req.params
    
    try {
       const question_type = await Question_types.findById(id);
       
       if (!question_type || question_type.is_delete) {
            throw new Error("Data Not Found")
       }

       question_type.is_delete = true;
       
       await question_type.save();

       res.status(200).json({ success: true, message: "Deleted successful"})
    } catch (error) {
        res.status(400).json({ success: false, message: error })
    }
}

module.exports = { create, getAll, getById, update, deleteOne}