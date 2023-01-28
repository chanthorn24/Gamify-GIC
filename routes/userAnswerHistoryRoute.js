const express = require("express");
const router = express.Router();

const userAnswerHistoryController = require("../controllers/userAnswerHistoryController");

router.get("/get-all", userAnswerHistoryController.getAll);
router.get("/get/:id", userAnswerHistoryController.getById);
router.post("/create", userAnswerHistoryController.create);
router.put("/update/:id", userAnswerHistoryController.update);
router.delete("/delete/:id", userAnswerHistoryController.deleteOne);

module.exports = router;