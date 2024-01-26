import axios from "axios";

const BaseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
const token = localStorage.getItem("token");

export const addTask = async (taskData) => {
  if (token) {
    try {
      const response = await axios({
        method: "post",
        url: `${BaseUrl}/task/create-task`,
        data: taskData,
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });

      return response.data.message;
    } catch (err) {
      return err;
    }
  } else {
    return "Task Creation Failed";
  }
};

export const getTasks = async (taskData) => {
  if (token) {
    try {
      const response = await axios({
        method: "get",
        url: `${BaseUrl}/task/all-task`,
        param: taskData,
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });

      return response;
    } catch (err) {
      return err;
    }
  } else {
    return "Task Creation Failed";
  }
};

export const deleteTasks = async (task_id) => {
  if (token) {
    try {
      const response = await axios({
        method: "delete",
        url: `${BaseUrl}/task/delete-task/${task_id}`,

        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });

      return response.data.message;
    } catch (err) {
      return err;
    }
  } else {
    return "Task Creation Failed";
  }
};

export const editTask = async ({ values, id }) => {
  if (token) {
    try {
      const response = await axios({
        method: "put",
        url: `${BaseUrl}/task/update-task/${id}`,
        params: values,
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });

      return response.data;
    } catch (err) {
      return err;
    }
  } else {
    return "Task Edit Failed";
  }
};
