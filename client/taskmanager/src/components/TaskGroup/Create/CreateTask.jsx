import React, { useState, useContext } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./CreateTask.module.css";
import { TaskContext } from "../../../context/TaskProvider";
import { addTask } from "../../../api/TasksApi/TaskApi";
import ErrorMsg from "../../../utils/ErrorMsg/ErrorMsg";

const CreateTask = () => {
  const [message, setMessage] = useState("");
  const { taskadded, setTaskadded } = useContext(TaskContext);

  const InitialValues = {
    title: "",
    description: "",
  };

  const ValidationSchema = Yup.object({
    title: Yup.string().required("Title is Required"),
    description: Yup.string().required("Description is Required"),
  });

  const OnSubmit = async (values, { resetForm }) => {
    const response = await addTask(values);
    setMessage(response);
    setTimeout(() => {
      setTaskadded((prev) => !prev);
      setMessage("");
    }, 1000);

    resetForm();
  };

  return (
    <div>
      <h2>Add Task</h2>
      <div>
        <Formik
          initialValues={InitialValues}
          validationSchema={ValidationSchema}
          onSubmit={OnSubmit}
        >
          <Form className={styles.form}>
            <div className={styles.inputContainer}>
              <label className={styles.inputlabel} htmlFor="title">
                Title
              </label>
              <Field
                className={styles.inputBox}
                type="text"
                name="title"
                id="title"
              />
              <ErrorMessage component={ErrorMsg} name="title" />
            </div>

            <div className={styles.inputContainer}>
              <label className={styles.inputlabel} htmlFor="description">
                Description
              </label>
              <Field
                className={styles.inputBox}
                type="text"
                name="description"
                id="description"
              />
              <ErrorMessage component={ErrorMsg} name="description" />
            </div>

            <div>
              <button
                className={`btn btn-primary ${styles.continueBtn}`}
                variant="text"
                type="submit"
              >
                Add Task
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

export default CreateTask;
