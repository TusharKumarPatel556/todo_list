import React, { useState, useContext } from "react";
import { TaskContext } from "../../../context/TaskProvider";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ErrorMsg from "../../../utils/ErrorMsg/ErrorMsg";
import styles from "./EditTask.module.css";
import { editTask } from "../../../api/TasksApi/TaskApi";

const EditTask = ({ title, description, id }) => {
  const [message, setMessage] = useState("");
  const { taskadded, setTaskadded } = useContext(TaskContext);

  const InitialValues = {
    title: title,
    description: description,
  };

  const ValidationSchema = Yup.object({
    title: Yup.string().required("Title is Required"),
    description: Yup.string().required("Description is Required"),
  });

  const OnSubmit = async (values, { resetForm }) => {
    const response = await editTask({ values, id });
    setMessage(response);
    setTimeout(() => {
      setTaskadded((prev) => !prev);
      setMessage("");
    }, 1000);

    resetForm();
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary rounded-0"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Edit
      </button>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
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
                    <div className="modal-footer">
                      <button
                        type="submit"
                        className="btn btn-success btn-lg"
                        data-bs-dismiss="modal"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTask;

{
  /* <button
className={`btn btn-primary ${styles.continueBtn}`}
variant="text"
type="submit"
>
Continue
</button> */
}
