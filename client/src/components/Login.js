import React from "react";
import { useFormik } from "formik";
function Login() {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log("form data", values);
    },
    validate: (values) => {
      let errors = {};

      if (!values.username) {
        errors.name = "Required";
      }
      if (!values.email) {
        errors.email = "Required";
      } else if (
        //regex validation for email
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email format";
      }
      if (!values.password) {
        errors.password = "Required";
      }

      return errors;
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
        />

        {formik.errors.username ? <div>formik.errors.username</div> : null}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />

        {formik.errors.email ? <div>formik.errors.email</div> : null}

        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />

        {formik.errors.password ? <div>formik.errors.password</div> : null}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
