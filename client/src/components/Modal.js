import React, { useContext, useState } from "react";
import "../components/css/Modal.css";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { AppContext } from "../context/AppProvider";
function Modal({ onClose, title, show, content }) {
  const { currUser, setCurrUser, isLoggedIn, setLoggedIn } =
    useContext(AppContext);
  const history = useHistory();
  const [checked, setChecked] = useState(false);
  function handleChange(e) {
    setChecked(e.target.checked);
  }
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values, { resetForm }) => {
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((resp) => {
        if (resp.ok) {
          resp.json().then((user) => {
            setCurrUser(user);
            setLoggedIn((isLoggedIn) => !isLoggedIn);
          });
          resetForm({ values: "" });
          onClose();
          history.push("/home");
        } else {
          resp.json().then((err) => window.alert(err["error"]));
        }
      });
    },
  });
  return (
    <div className={`modal ${show ? "show" : ""}`}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h1 className="modal-title">{title}</h1>
          <br></br>
        </div>
        <div className="modal-body">
          {content === "" ? (
            <form onSubmit={formik.handleSubmit}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
              ></input>
              <label htmlFor="password">Password</label>
              <input
                type={checked ? "text" : "password"}
                id="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              ></input>
              <div className="form-group">
                <label htmlFor="show-password">Show Password?</label>
                <input
                  type="checkbox"
                  id="show-password"
                  name="show-password"
                  value="password"
                  onChange={handleChange}
                ></input>
              </div>
              <button>Login</button>
              <a href="/register">Don't have an account?</a>
            </form>
          ) : (
            <p>{content}</p>
          )}
        </div>
        <div className="modal-footer"></div>
      </div>
    </div>
  );
}

export default Modal;
