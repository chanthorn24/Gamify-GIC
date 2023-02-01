const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");

const getAll = async(req, res) => {
    try {
        const users = await Users.find({ is_delete: false }, { password: 0 }).populate([{
                path: "user_role_id",
                match: { is_delete: false },
                select: { _id: 1, name: 1 },
            },
            {
                path: "department_id",
                match: { is_delete: false },
                select: { _id: 1, name: 1 },
            },
        ]);

        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};

const getById = async(req, res) => {
    const { id } = req.params;
    try {
        const user = await Users.findById(id, { password: 0 }).populate([{
                path: "user_role_id",
                match: { is_delete: false },
                select: { _id: 1, name: 1 },
            },
            {
                path: "department_id",
                match: { is_delete: false },
                select: { _id: 1, name: 1 },
            },
        ]);

        //check exist data
        if (!user || user.is_delete) {
            throw "Data not exist!";
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};

const create = async(req, res) => {
    //encrypt password
    bcrypt
        .hash(req.body.password, parseInt(process.env.SALT_ROUND))
        .then(async(hash) => {
            req.body.password = hash;

            try {
                const users = await Users.create(req.body);
                await users.save();

                res.status(200).json({
                    success: true,
                    data: users,
                    message: "Created successfully!",
                });
            } catch (error) {
                res.status(400).json({ success: false, message: error });
            }
        });
};

const update = async(req, res) => {
    const { id } = req.params;
    const {
        firstName,
        lastName,
        image,
        phone,
        gender,
        department_id,
        user_role_id,
        old_password,
        new_password,
    } = req.body;
    try {
        const user = await Users.findById(id);

        if (!user || user.is_delete) {
            throw "Data not exist!";
        }

        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (image) user.image = image;
        if (phone) user.phone = phone;
        if (gender) user.gender = gender;
        if (department_id) user.department_id = department_id;
        if (user_role_id) user.user_role_id = user_role_id;

        let is_match = false;
        if (old_password) {
            is_match = await bcrypt.compare(old_password, user.password);

            if (!is_match) {
                throw "Old password is incorrect";
            }

            bcrypt
                .hash(new_password, parseInt(process.env.SALT_ROUND))
                .then(async(hash) => {
                    try {
                        user.password = hash;
                        await user.save();

                        res.status(200).json({
                            success: true,
                            data: user,
                            message: "Created successfully!",
                        });
                    } catch (error) {
                        res.status(400).json({ success: false, message: error });
                    }
                });
        } else {
            //save data to database
            await user.save();

            res.status(200).json({ success: true, message: "Updated successfully!" });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};

const deleteOne = async(req, res) => {
    const { id } = req.params;
    try {
        const user = await Users.findById(id);

        if (!user || user.is_delete) {
            throw "Data not exist!";
        }

        //delete data
        user.is_delete = true;
        await user.save();

        res.status(200).json({ success: true, message: "Deleted successfully!" });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};

const login = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Users.findOne({ email: email }).populate([{
                path: "user_role_id",
                match: { is_delete: false },
                select: { _id: 1, name: 1 },
            },
            {
                path: "department_id",
                match: { is_delete: false },
                select: { _id: 1, name: 1 },
            },
        ]);
        if (!user) {
            throw "Email or password is incorrect!";
        }
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw "Email or password is incorrect!";
        }

        const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + 60 * 60,
                data: {
                    user: {
                        email: user.email,
                        id: user._id,
                        role: user.user_role_id.name,
                    },
                },
            },
            process.env.JWT_SECRET
        );

        res
            .status(200)
            .json({ success: true, message: "Login successfully!", data: token });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};

const resetPassword = async(req, res) => {
    const { email } = req.body;
    try {
        const user = await Users.findOne({ email: email }).populate([{
                path: "user_role_id",
                match: { is_delete: false },
                select: { _id: 1, name: 1 },
            },
            {
                path: "department_id",
                match: { is_delete: false },
                select: { _id: 1, name: 1 },
            },
        ]);

        if (!user) {
            throw "User not found!";
        }

        let mailTransporter = nodeMailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS,
            },
        });

        const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + 60 * 60,
                data: {
                    user: {
                        email: user.email,
                        role: user.user_role_id.name,
                        password: user.password,
                    },
                },
            },
            process.env.JWT_SECRET
        );

        //html form
        let html_form =
            `
            <html lang="en">
            <body>
                <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
                    <div style="width: 660px; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; padding: 10px 30px;">
                        <div style=" display: flex; flex-direction: column; align-items: center;">
                            <h1 style="font-weight: 900; color: rgb(3, 4, 4);">Password Reset Request</h1>
                        </div>
                        <div>
                            <p>Dear FunQuiz user,</p>
                            <p>We have received your request to reset your password. Please click the link below to complete the reset:</p>
                        </div>
                        <div style=" display: flex; flex-direction: column; align-items: center;">
                            ` +
            `<a href="http://localhost:4200/password/reset?verify=` +
            token +
            `">
                                <button style="padding: 10px 50px; border-radius: 10px; background-color: #0999AD; color: white;" type="button">
                                    <h4 style="margin: 0;">Reset My Password</h4>
                                </button>
                            </a>
                        </div>
                        <div style="display: flex; flex-direction: column; align-items: center; margin-top: 20px;">
                            <div>
                                <div>This email was sent to ` +
            email +
            `, <span style="color: #0999AD;">which is associated with a FunQuiz account.</span></div>
                            </div>
                        </div>
                    </div>
            
                </div>
            </body>
            </html>
        `;

        let mailDetails = {
            from: "webdevel2000@gmail.com",
            to: email,
            subject: "Reset password",
            html: html_form,
        };

        mailTransporter.sendMail(mailDetails, function(err, data) {
            if (err) {
                console.log("Error Occurs");
            } else {
                res
                    .status(200)
                    .json({ success: true, message: "Reset password successfully!" });
            }
        });
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
    login,
    resetPassword,
};