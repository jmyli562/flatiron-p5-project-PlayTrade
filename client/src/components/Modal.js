import React, { useContext, useState } from "react";
import "../components/css/Modal.css";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { AppContext } from "../context/AppProvider";
function Modal({ onClose, title, show, content }) {
  const { currUser, setCurrUser } = useContext(AppContext);
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
      })
        .then((resp) => {
          if (resp.ok) {
            resetForm({ values: "" });
            onClose();
            history.push("/home");
          } else {
            resp
              .json()
              .then((err) =>
                window.alert("Username or password is incorrect.")
              );
          }
        })
        .then((user) => setCurrUser(user));
      console.log(currUser);
    },
  });
  return (
    <div className={`modal ${show ? "show" : ""}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header" style={{ padding: "10px 50px" }}>
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
              <input
                type="checkbox"
                id="show-password"
                name="show-password"
                value="password"
                onChange={handleChange}
              ></input>
              <label for="show-password">Show Password?</label>
              <br></br>
              <button>Login</button>
              <a href="/register">Don't have an account?</a>
            </form>
          ) : (
            <p>{content}</p>
          )}
        </div>
        <div className="modal-footer">
          <button type="submit" onClick={onClose} className="button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
