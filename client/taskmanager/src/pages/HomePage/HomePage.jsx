import React from "react";
import styles from "./HomePage.module.css";
import CreateTask from "../../components/TaskGroup/Create/CreateTask";
import ListTasks from "../../components/TaskGroup/List/ListTasks";

const HomePage = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4">
          <CreateTask />
        </div>
        <div className="col-lg-8">
          <ListTasks />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
