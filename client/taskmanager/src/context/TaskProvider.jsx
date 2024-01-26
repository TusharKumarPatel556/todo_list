import React, { useState } from "react";
import { createContext } from "react";

export const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [taskadded, setTaskadded] = useState(false);
  const [loggedIn, setLoggedin] = useState(false);

  const initialState = {
    taskadded,
    setTaskadded,
    loggedIn,
    setLoggedin,
  };

  return (
    <TaskContext.Provider value={initialState}>{children}</TaskContext.Provider>
  );
};

export default TaskProvider;
