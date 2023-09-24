import React, { useState } from "react";
import Modal from "./Modal";

function Login() {
  const [show, setShow] = useState(true);
  return (
    <div>
      <Modal
        onClose={() => setShow(false)}
        title={"Login into your Account"}
        show={show}
        content={""}
      />
    </div>
  );
}

export default Login;
