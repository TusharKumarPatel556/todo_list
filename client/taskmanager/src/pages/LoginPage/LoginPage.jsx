import React from "react";
import Login from "../../Components/Login/Login";
import styles from "./LoginPage.module.css";
import { NavLink } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className={styles.loginPage}>
      <Login />

      <div className={styles.createAcount}>
        <h5>
          <NavLink to="/signup">Create Your account</NavLink>
        </h5>
      </div>
    </div>
  );
};

export default LoginPage;
