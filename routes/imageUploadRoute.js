const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + ".png"); //Appending .jpg
    },
});

const imageUploadController = require("../controllers/imageUploadController");

const upload = multer({ storage: storage });

router.post(
    "/upload",
    upload.single("image_file"),
    imageUploadController.upload
);

module.exports = router;