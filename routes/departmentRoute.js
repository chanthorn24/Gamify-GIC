const express = require("express");
const route = express.Router();
const departmentController = require("../controllers/departmentController");

route.get("/get-all", departmentController.getall);
route.get("/get/:id", departmentController.getById);
route.post("/create", departmentController.create);
route.put("/update/:id", departmentController.update);
route.delete("/delete/:id", departmentController.deleteOne);

module.exports = route;