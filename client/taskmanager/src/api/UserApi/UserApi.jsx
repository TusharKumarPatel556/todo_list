import axios from "axios";

const BaseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

export const Register = async (userData) => {
  try {
    const response = await axios({
      method: "post",
      url: `${BaseUrl}/user/register-user`,
      data: userData,
      headers: {
        "Content-Type": "application/json",
      },
    });

    localStorage.setItem("token", response.data.token);

    return response.data.message;
  } catch (err) {
    return err;
  }
};

export const LoginUser = async (userData) => {
  try {
    const response = await axios({
      method: "get",
      url: `${BaseUrl}/user/login-user`,
      params: userData,
      headers: {
        "Content-Type": "application/json",
      },
    });

    localStorage.setItem("token", response.data.token);
    console.log(response.data);
    return response.data.message;
  } catch (err) {
    return err.message;
  }
};
