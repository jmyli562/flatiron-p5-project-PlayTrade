import React, { useState } from "react";
import Modal from "./Modal";

function Login() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return <Modal />;
}

export default Login;
