import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import "../components/css/Profile.css";
import { AppContext } from "../context/AppProvider";
function Profile({ user }) {
  function handleImageUpload(e) {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  }

  const checkIfUnique = async (value, field) => {
    const endpoint = field === "username" ? "check-username" : "check-email";
    try {
      const response = await fetch(`/${endpoint}/${value}`);
      if (response.ok) {
        const data = await response.json();
        return data.found;
      }
    } catch (error) {
      console.error("There was an error with the server:", error);
    }
  };
  const { setCurrUser } = useContext(AppContext);
  const [toggleEditMode, setEditMode] = useState(false);
  const [file, setFile] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    onSubmit: (values, { resetForm }) => {
      const new_form = {};
      // Check if fields have been edited and include them in editedData
      if (values.username !== user.username && values.username !== "") {
        new_form.username = values.username;
      }

      if (values.email !== user.email && values.email !== "") {
        new_form.email = values.email;
      }

      if (values.password && values.password !== "" && values.password !== "") {
        new_form.password_hash = values.password;
      }

      if (file) {
        const imageURL = URL.createObjectURL(file);
        new_form.profile_picture = imageURL;
      }

      fetch(`/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(new_form),
      })
        .then((response) => response.json())
        .then((user) => {
          setCurrUser(user);
          resetForm({ values: "" });
          setEditMode(() => !toggleEditMode);
        });
    },
    validate: (values) => {
      let errors = {};
      /*need validations to make sure new username isn't the same as the old one, same with email (DONE)*/
      /*also need to check to make sure username and email are unique (not in the database already) (DONE)*/
      /*need to also check if the email is formatted properly using regex (DONE)*/
      /*need to verify that the new password matches the one that was re-entered (DONE)*/
      if (values.username === user.username) {
        errors.username = "Please enter a new username";
      }
      if (values.email === user.email) {
        errors.email = "Please enter a new email";
      }
      if (values.email === "") {
      } else if (
        //regex validation for email
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email format";
      }

      if (values.password !== values.confirm_password) {
        errors.password_mismatch = "Passwords don't match.";
      }

      return errors;
    },
  });

  return (
    <div className="profile-container">
      <div className="profile-card">
        {toggleEditMode ? (
          <>
            <h1>Editing Profile</h1>
            <form onSubmit={formik.handleSubmit}>
              <div
                className="circle-container"
                style={{
                  backgroundImage: `url(${
                    imagePreviewUrl ||
                    user.profile_picture ||
                    "https://freesvg.org/img/abstract-user-flat-4.png"
                  })`,
                }}
              ></div>
              <input
                id="photo-upload"
                type="file"
                onChange={handleImageUpload}
                accept="image/*"
              ></input>
              <label htmlFor="new-username">New Username:</label>
              <input
                placeholder={user.username}
                id="username"
                name="username"
                type="text"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={(e) => {
                  checkIfUnique(e.target.value, "username")
                    .then((isUnique) => {
                      if (isUnique) {
                        formik.setFieldError(
                          "username",
                          "Username already taken."
                        );
                      }
                    })
                    .catch((error) => {
                      console.error(
                        "Error checking username uniqueness:",
                        error
                      );
                    });
                }}
              ></input>
              {formik.errors.username ? (
                <p style={{ color: "red", textAlign: "left" }}>
                  {formik.errors.username}
                </p>
              ) : null}
              <label htmlFor="new-email">New Email:</label>
              <input
                placeholder={user.email}
                id="email"
                name="email"
                type="text"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={(e) => {
                  // Call your function to check email uniqueness here
                  checkIfUnique(e.target.value, "email")
                    .then((isUnique) => {
                      if (isUnique) {
                        // Handle the case where the email is not unique
                        // You can display an error message or set a formik error
                        formik.setFieldError("email", "Email already taken.");
                      }
                    })
                    .catch((error) => {
                      // Handle any errors that occur during the check
                      console.error("Error checking email uniqueness:", error);
                    });
                }}
              ></input>
              {formik.errors.email ? (
                <p style={{ color: "red", textAlign: "left" }}>
                  {formik.errors.email}
                </p>
              ) : null}
              <label htmlFor="new-password">New Password:</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              ></input>
              <label>Re-enter Password:</label>
              <input
                id="confirm_password"
                name="confirm_password"
                type="password"
                value={formik.values.confirm_password}
                onChange={formik.handleChange}
              ></input>
              {formik.errors.password_mismatch ? (
                <p style={{ color: "red", textAlign: "left" }}>
                  {formik.errors.password_mismatch}
                </p>
              ) : null}
              <button type="submit" className="save-profile">
                Save Profile
              </button>
              <button onClick={() => setEditMode(!toggleEditMode)}>
                Cancel
              </button>
            </form>
          </>
        ) : (
          <>
            <h1>Your Profile Page</h1>
            <div
              className="circle-container"
              style={{
                backgroundImage: user.profile_picture
                  ? `url(${user.profile_picture})`
                  : "url(https://freesvg.org/img/abstract-user-flat-4.png)",
              }}
            ></div>
            <div className="input-container">
              <label>Username:</label>
              <input
                type="text"
                placeholder={user.username}
                readOnly={true}
              ></input>
              <label>Email:</label>
              <input
                type="text"
                placeholder={user.email}
                readOnly={true}
              ></input>
              <label>Password:</label>
              <input
                type="text"
                placeholder={"********"}
                readOnly={true}
              ></input>
              <button onClick={() => setEditMode(!toggleEditMode)}>
                Edit Profile
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
