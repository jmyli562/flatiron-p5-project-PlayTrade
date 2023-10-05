import React from "react";
import "../components/css/Profile.css";
function Profile({ user }) {
  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1>Your Profile Page</h1>
        <img
          src="https://freesvg.org/img/abstract-user-flat-4.png"
          alt="template-img"
        ></img>
        <label>Username:</label>
        <input type="text" placeholder={user.username}></input>
        <label>Email:</label>
        <input type="text" placeholder={user.email}></input>
        <label>Password:</label>
        {/*obviously not the actual password of the user but a placeholder */}
        <input type="text" placeholder={"********"}></input>
        <button>Edit Profile</button>
      </div>
    </div>
  );
}

export default Profile;
