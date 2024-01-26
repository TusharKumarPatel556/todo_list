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
taskRouter.get("/edit/:id", isuserLoggedin, getaTask);
taskRouter.put("/update-task/:id", isuserLoggedin, updateaTask);
taskRouter.delete("/delete-task/:id", isuserLoggedin, deleteaTask);

module.exports = taskRouter;
