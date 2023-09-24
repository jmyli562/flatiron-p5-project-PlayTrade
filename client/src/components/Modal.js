import React from "react";
import "../components/css/Modal.css";
function Modal({ onClose, title, show, content }) {
  if (!show) {
    return null;
  }
  return (
    <div className={`modal ${show} ? "show" : ""}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h1 className="modal-title">{title}</h1>
          <br></br>
        </div>
        <div className="modal-body">
          {content == "" ? (
            <form>
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username"></input>
              <label htmlFor="password">Password</label>
              <input type="text" id="password" name="username"></input>
              <br></br>
              <button>Login</button>
            </form>
          ) : (
            <p>{content}</p>
          )}
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
