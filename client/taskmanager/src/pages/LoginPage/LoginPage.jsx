import React from "react";
import Login from "../../Components/Login/Login";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <div className={styles.loginPage}>
      <Login />

      <div className={styles.createAcount}>
        <h5>Create Your account</h5>
      </div>
    </div>
  );
};

export default LoginPage;
