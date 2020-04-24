import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const UserRegistration = () => {
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
  });

  const { push } = useHistory();

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/auth/register", newUser)
      .then((res) => {
        console.log("POST RESPONSE FROM USER REGISTRATION", res);
        localStorage.setItem("token", JSON.stringify(res.data.token));
        push("/jokes");
      })
      .catch((err) => console.log(err.message));

    setNewUser({ username: "", password: "" });
  };

  return (
    <div>
      <h1>User Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Your Desired Username:
          <input
            onChange={handleChange}
            name="username"
            value={newUser.username}
          />
        </label>
        <label>
          Enter A Password To Protect Your Account:
          <input
            onChange={handleChange}
            name="password"
            value={newUser.password}
          />
        </label>
        <button>Create New User Account</button>
      </form>
    </div>
  );
};

export default UserRegistration;
