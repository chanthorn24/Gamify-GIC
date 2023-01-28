const express = require("express");
const router = express.Router();

const userQuestionHistoryController = require("../controllers/userQuestionHistoryController");

router.get("/get-all", userQuestionHistoryController.getAll);
router.get("/get/:id", userQuestionHistoryController.getById);
router.post("/create", userQuestionHistoryController.create);
router.put("/update/:id", userQuestionHistoryController.update);
router.delete("/delete/:id", userQuestionHistoryController.deleteOne);

module.exports = router;