import React, { useEffect, useState, useContext } from "react";
import { TaskContext } from "../../../context/TaskProvider";
import styles from "./ListTasks.module.css";
import { getTasks, deleteTasks, editTask } from "../../../api/TasksApi/TaskApi";
import EditTask from "../Edit/EditTask";

const ListTasks = () => {
  const [allTasks, setAllTasks] = useState([]);
  const { taskadded, setTaskadded } = useContext(TaskContext);

  const handleStatus = async (title, description, status, id) => {
    const values = { title, description, status };
    const response = await editTask({ values, id });
    if (response.message === "success") {
      setTaskadded((prev) => !prev);
    }
  };

  const removeTask = async (task_id) => {
    const response = await deleteTasks(task_id);
    console.log(response);
    if (response === "success") {
      setTaskadded((prev) => !prev);
    }
  };

  const taskList = async () => {
    const response = await getTasks();
    if (response.data.message === "success") {
      setTimeout(() => {
        setAllTasks(response.data.tasks);
      }, 1000);
    }
  };

  useEffect(() => {
    taskList();
  }, [taskadded]);

  return (
    <div className="mt-5">
      {allTasks ? (
        <>
          {allTasks.map((task, index) => (
            <div className="card mb-3 mt-3" key={`${task.title}${index}`}>
              <div className="card-header d-flex justify-content-end">
                <span>
                  <span
                    style={{ backgroundColor: "transparent" }}
                    className="border-0"
                  >
                    <EditTask
                      id={task.task_id}
                      title={task.title}
                      description={task.description}
                    />
                  </span>
                  <button
                    onClick={() => removeTask(task.task_id)}
                    className="btn btn-danger rounded-0 ms-2"
                  >
                    Delete
                  </button>
                </span>
              </div>
              <div className="card-body">
                <h5 className="card-title"> {task.title}</h5>
                <p className="card-text">{task.description}</p>
                <button
                  href="#"
                  onClick={() =>
                    handleStatus(
                      task.title,
                      task.description,
                      !task.status,
                      task.task_id
                    )
                  }
                  className={
                    task.status ? "btn btn-success" : "btn btn-warning"
                  }
                >
                  {task.status ? "Completed" : "Pending"}
                </button>
              </div>
              <div className="card-footer text-body-secondary p-3"></div>
            </div>
          ))}
        </>
      ) : (
        <h3 className="text-center">Loading data ....</h3>
      )}
    </div>
  );
};

export default ListTasks;
