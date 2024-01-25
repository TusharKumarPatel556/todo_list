import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./Signup.module.css";
import ErrorMsg from "../../utils/ErrorMsg/ErrorMsg";
import { Register } from "../../api/UserApi/UserApi";

const Signup = () => {
  const [message, setMessage] = useState("");

  const InitialValues = {
    name: "",
    email: "",
    mobile: "",
    password: "",
  };

  const ValidationSchema = Yup.object({
    name: Yup.string().required("Name is Required"),
    email: Yup.string().required("Email is Required"),
    mobile: Yup.string().required("Mobile Number Required"),
    password: Yup.string().required("Password is Required"),
  });

  const OnSubmit = async (values) => {
    const res = await Register(values);
    setMessage(res);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.signinContainer}>
        <h3 className={styles.signin}>Create Account</h3>
        <Formik
          initialValues={InitialValues}
          validationSchema={ValidationSchema}
          onSubmit={OnSubmit}
        >
          <Form className={styles.form}>
            <div className={styles.inputContainer}>
              <label className={styles.inputlabel} htmlFor="name">
                Your name
              </label>
              <Field
                className={styles.inputBox}
                type="text"
                name="name"
                id="name"
              />
              <ErrorMessage component={ErrorMsg} name="name" />
            </div>

            <div className={styles.inputContainer}>
              <label className={styles.inputlabel} htmlFor="mobile">
                Mobile number
              </label>
              <Field
                className={styles.inputBox}
                type="text"
                name="mobile"
                id="mobile"
              />
              <ErrorMessage component={ErrorMsg} name="mobile" />
            </div>

            <div className={styles.inputContainer}>
              <label className={styles.inputlabel} htmlFor="email">
                Email Id
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

            <h3 className={styles.message}>{message}</h3>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
