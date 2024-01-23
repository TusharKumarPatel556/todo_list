const express = require("express");

const {
  createTask,
  getallTask,
  getaTask,
  updateaTask,
  deleteaTask,
} = require("../controller/taskController");

const taskRouter = express.Router();

taskRouter.post("/create-task", createTask);
taskRouter.get("/all-task", getallTask);
taskRouter.get("/edit/:id", getaTask);
taskRouter.put("/update-task/:id", updateaTask);
taskRouter.delete("/delete-task/:id", deleteaTask);

module.exports = taskRouter;
