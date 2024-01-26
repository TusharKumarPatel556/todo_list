import React, { useState, useEffect, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import styles from "./Login.module.css";
import ErrorMsg from "../../utils/ErrorMsg/ErrorMsg";
import { LoginUser } from "../../api/UserApi/UserApi";
import { TaskContext } from "../../context/TaskProvider";

const Login = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const { loggedIn, setLoggedin } = useContext(TaskContext);

  const InitialValues = {
    email: "",
    password: "",
  };

  useEffect(() => {}, []);

  const ValidationSchema = Yup.object({
    email: Yup.string().required("Email Id or Phone Number is Required"),
    password: Yup.string().required("Password is Required"),
  });

  const OnSubmit = async (values) => {
    const response = await LoginUser(values);
    console.log(response);
    setMessage(response);

    setTimeout(() => {
      setLoggedin(true);
    }, 1000);

    if (response === "success") {
      navigate("/home");
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.signinContainer}>
        <h3 className={styles.signin}>Sign in</h3>
        <Formik
          initialValues={InitialValues}
          validationSchema={ValidationSchema}
          onSubmit={OnSubmit}
        >
          <Form className={styles.form}>
            <div className={styles.inputContainer}>
              <label className={styles.inputlabel} htmlFor="email">
                Enter your email or mobile number
              </label>
              <Field
                className={styles.inputBox}
                type="text"
                name="email"
                id="email"
              />
              <ErrorMessage component={ErrorMsg} name="email" />
            </div>

            <div className={styles.inputContainer}>
              <label className={styles.inputlabel} htmlFor="password">
                Password
              </label>
              <Field
                className={styles.inputBox}
                type="text"
                name="password"
                id="password"
              />
              <ErrorMessage component={ErrorMsg} name="password" />
            </div>

            <div>
              <button
                className={styles.continueBtn}
                variant="text"
                type="submit"
              >
                Continue
              </button>
            </div>

            <div className={styles.privacyPolicy}>
              <h3 className={styles.message}>{message}</h3>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
