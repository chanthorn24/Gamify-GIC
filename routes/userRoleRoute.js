const express = require("express");
const router = express.Router();

const userRoleController = require("../controllers/userRoleController");

router.get("/get-all", userRoleController.getAll);
router.get("/get/:id", userRoleController.getById);
router.post("/create", userRoleController.create);
router.put("/update/:id", userRoleController.update);
router.delete("/delete/:id", userRoleController.deleteOne);

module.exports = router;