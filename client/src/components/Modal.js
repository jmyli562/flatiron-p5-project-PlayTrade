import React from "react";
import "../components/css/Modal.css";
function Modal({ props }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title">Login to your Account</h1>
          <br></br>
        </div>
        <div className="modal-body">
          <form>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username"></input>
            <label htmlFor="password">Password</label>
            <input type="text" id="password" name="username"></input>
          </form>
          <br></br>
          <button>Login</button>
        </div>
        <div className="modal-footer">
          <button className="button">Close</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
