import React from "react";
import Signup from "../../components/Signup/Signup";

import styles from "./SignupPage.module.css";

const SignupPage = () => {
  return (
    <div className={styles.loginPage}>
      <Signup />
      <div className={styles.haveanAccount}>
        <h5>
          Already have an account? <u>Sign in</u>
        </h5>
      </div>
    </div>
  );
};

export default SignupPage;
