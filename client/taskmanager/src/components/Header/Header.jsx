import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { TaskContext } from "../../context/TaskProvider";
import styles from "./Header.module.css";

const Header = () => {
  const { loggedIn, setLoggedin } = useContext(TaskContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    setTimeout(() => {
      setLoggedin(!loggedIn);
      navigate("/");
    }, 800);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark mb-3">
      <div className="container-fluid">
        <a className="navbar-brand text-light" href="#">
          Task Manager
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {loggedIn ? (
              <>
                <li className="nav-item rounded-0 me-2 ">
                  <button
                    onClick={handleLogout}
                    className="btn btn-warning rounded-0"
                  >
                    {" "}
                    LogOut
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item rounded-0 me-2 btn btn-warning">
                  <NavLink to="/signup" className="nav-link ">
                    SignUp
                  </NavLink>
                </li>

                <li className="nav-item rounded-0   btn btn-warning">
                  <NavLink to="/" className="nav-link ">
                    LogIn
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
