const pool = require("../model/dbcon");

const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const newTask = await pool.query(
      "INSERT INTO task (title, description, status) VALUES($1, $2, $3) RETURNING *",
      [title, description, status]
    );
    console.log(req.body);
    res.status(200).json({
      task: newTask.rows[0],
      message: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Task Creation Failed",
    });
  }
};

const getallTask = async (req, res) => {
  try {
    const allTasks = await pool.query("SELECT * FROM task");

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

const getaTask = async (req, res) => {
  try {
    const { id } = req.params;
    const editTask = await pool.query("SELECT * FROM task WHERE task_id=$1", [
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

const updateaTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title = null, description = null, status = null } = req.body;
    const updateTask = await pool.query(
      "UPDATE task SET title=$1, description=$2, status=$3 WHERE task_id=$4",
      [title, description, status, id]
    );
    res.status(200).json({
      task: updateTask,
      message: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Updated task",
    });
  }
};

const deleteaTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTask = await pool.query("DELETE FROM task WHERE task_id=$1", [
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
