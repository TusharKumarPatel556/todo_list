const pool = require("../model/dbcon");
//create a task Api
const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const { user_id } = req.body.user;
    console.log(user_id);
    const newTask = await pool.query(
      "INSERT INTO tasks (user_id,title, description, status) VALUES($1, $2, $3,$4) RETURNING *",
      [user_id, title, description, status]
    );
    console.log(req.body);
    res.status(200).json({
      task: newTask.rows[0],
      message: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
//Get All tasks Api
const getallTask = async (req, res) => {
  try {
    const { user_id } = req.body.user;
    const allTasks = await pool.query("SELECT * FROM tasks WHERE user_id=$1 ", [
      user_id,
    ]);

    res.status(200).json({
      tasks: allTasks.rows,
      message: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "failed",
    });
  }
};
//Get a Task
const getaTask = async (req, res) => {
  try {
    const { id } = req.params;
    const editTask = await pool.query("SELECT * FROM tasks WHERE task_id=$1", [
      id,
    ]);
    res.status(200).json({
      task: editTask,
      message: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "id did not match",
    });
  }
};
//Update a Task Api
const updateaTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await pool.query("SELECT * FROM tasks WHERE task_id=$1", [id]);
    console.log(task);
    const prev_title = task.rows[0].title;
    const prev_description = task.rows[0].description;
    const prev_status = task.rows[0].status;

    const {
      title = prev_title,
      description = prev_description,
      status = prev_status,
    } = req.body;
    const updateTask = await pool.query(
      "UPDATE tasks SET title=$1, description=$2, status=$3 WHERE task_id=$4 RETURNING *",
      [title, description, status, id]
    );
    res.status(200).json({
      task: updateTask.rows[0],
      message: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
//delete a Task api
const deleteaTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTask = await pool.query("DELETE FROM tasks WHERE task_id=$1", [
      id,
    ]);
    res.status(200).json({
      task: deleteTask,
      message: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Updated task",
    });
  }
};

module.exports = { createTask, getallTask, getaTask, updateaTask, deleteaTask };
