const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/get-all", userController.getAll);
router.get("/get/:id", userController.getById);
router.post("/create", userController.create);
router.put("/update/:id", userController.update);
router.delete("/delete/:id", userController.deleteOne);
router.post("/auth/login", userController.login);
router.post("/auth/reset", userController.resetPassword);

module.exports = router;