const express = require("express");
const isuserLoggedin = require("../middlewares/authentication/UserAuth");

const {
  createTask,
  getallTask,
  getaTask,
  updateaTask,
  deleteaTask,
} = require("../controller/taskController");

const taskRouter = express.Router();

taskRouter.post("/create-task", isuserLoggedin, createTask);
taskRouter.get("/all-task", isuserLoggedin, getallTask);
taskRouter.get("/edit/:id", getaTask);
taskRouter.put("/update-task/:id", updateaTask);
taskRouter.delete("/delete-task/:id", deleteaTask);

module.exports = taskRouter;
