const Department = require("../models/Department");

const getall = async(req, res) => {
    try {
        const departments = await Department.find({ is_delete: false });

        res.status(200).json({ success: true, data: departments });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};

const getById = async(req, res) => {
    const { id } = req.params;
    try {
        const department = await Department.findById(id);

        if (!department || department.is_delete) {
            throw "Data not exist!";
        }

        res.status(200).json({ success: true, data: department });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};

const create = async(req, res) => {
    try {
        const department = await Department.create(req.body);
        await department.save();

        res.status(200).json({ success: true, data: department });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};

const update = async(req, res) => {
    const { name, description } = req.body;
    const { id } = req.params;
    try {
        const department = await Department.findById(id);

        if (!department || department.is_delete) {
            throw "Data not exist!";
        }

        //upadate
        if (name) department.name = name;
        if (description) department.description = description;
        await department.save();

        res.status(200).json({
            success: true,
            message: "Updated successfully!",
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};

const deleteOne = async(req, res) => {
    const { id } = req.params;
    try {
        const department = await Department.findById(id);

        if (!department || department.is_delete) {
            throw "Data not exist!";
        }

        //delete
        department.is_delete = true;
        await department.save();

        res.status(200).json({ success: true, message: "Deleted successfully!" });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};

module.exports = { getall, getById, create, update, deleteOne };