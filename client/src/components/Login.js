import React from "react";
import { useFormik } from "formik";
function Login() {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      channel: "",
    },
  });
  return (
    <div>
      <form>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
        />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />

        <label htmlFor="password">Password</label>
        <input type="text" id="password" name="password" />

        <button>Submit</button>
      </form>
    </div>
  );
}

export default Login;
