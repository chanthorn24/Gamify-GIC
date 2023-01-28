const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
    cloud_name: "image-cloudinary-itc",
    api_key: "561286311783966",
    api_secret: "K26PG-6MwTJEjw-HTMrHhWqt2AU",
});

const upload = async(req, res) => {
    try {
        cloudinary.uploader.upload(req.file.path, function(error, result) {
            if (error) {
                removeFile(req.file.path); //remove file from folder
                return res.status(500).json({ success: false, error: error });
            } else {
                removeFile(req.file.path); //remove file from folder
                return res.status(200).json({ success: true, data: result.secure_url });
            }
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};

function removeFile(path) {
    try {
        fs.unlinkSync(path);
        //file removed
    } catch (err) {
        console.error(err);
    }
}
module.exports = { upload };