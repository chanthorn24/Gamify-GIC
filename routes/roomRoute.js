const express = require("express");
const router = express.Router();

const roomController = require("../controllers/roomController");

router.get("/get-all", roomController.getAll);
router.get("/get/:id", roomController.getById);
router.get("/get/by/:id", roomController.getByUser);
router.post("/create", roomController.create);
router.put("/update/:id", roomController.update);
router.delete("/delete/:id", roomController.deleteOne);
router.post("/join/:pin", roomController.joinRoom);

module.exports = router;