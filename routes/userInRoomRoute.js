const express = require("express");
const router = express.Router();

const userInRoomController = require("../controllers/userInRoomController");

router.get("/get-all", userInRoomController.getAll);
router.get("/get/:id", userInRoomController.getById);
router.get("/getroom/:id", userInRoomController.getByRoom);
router.get("/room/:id", userInRoomController.getRoom);
router.post("/create", userInRoomController.create);
router.put("/update/:id", userInRoomController.update);
router.delete("/delete/:id", userInRoomController.deleteOne);

module.exports = router;