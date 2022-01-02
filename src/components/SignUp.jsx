import React, { useState } from "react";
import { auth, useAuth } from "../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
export const SignUp = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const currentUser = useAuth();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
    } catch {
      console.log("error");
    }
  };
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, user.email, user.password);
    } catch {
      console.log("error");
    }
  };
  return (
    <>
      {/* {currentUser && (
        <p style={{ textAlign: "center", margin: "1rem" }}> Login</p>
      )} */}
      <form className="form_field" onSubmit={handleSubmit}>
        <h2 className="form-title">Register </h2>
        <input
          className="form_input"
          type="email"
          name="email"
          id="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Enter Your Email"
        />
        <input
          className="form_input"
          type="password"
          name="password"
          id="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Enter Password"
        />
        <div className="button_group">
          <input
            className="input_button"
            disabled={currentUser}
            type="submit"
            value="SignUp"
          />
          <input
            className="input_button"
            disabled={currentUser}
            onClick={handleLogin}
            type="button"
            value="LogIn"
          />
        </div>
      </form>
    </>
  );
};
