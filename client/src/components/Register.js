import React from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
function Login() {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: (values, { resetForm }) => {
      fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      resetForm({ values: "" });
      history.push("/login");
    },
    validate: (values) => {
      let errors = {};

      if (!values.username) {
        errors.username = "Required";
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
      <h1>Register an Account</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="error">{formik.errors.username}</div>
          ) : null}
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />

          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
        </div>
        <button type="submit">Submit</button>
        <a href="/login">Already have an account?</a>
      </form>
    </div>
  );
}

export default Login;
