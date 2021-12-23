import React, { useState } from "react";
import Layout from "../core/Layout";
import { signup } from "../auth";
import { Link } from "react-router-dom";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  // console.log(user)

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const formSubmit = (event) => {
    event.preventDefault();
    signup({
      name: user.name,
      email: user.email,
      password: user.password,
    }).then((data) => {
      if (data.error) {
        setUser({
          ...user,
          error: data.error[Object.keys(data.error)[0]].msg,
          success: false,
        });
      } else {
        setUser({
          ...user,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
      }
    });
  };

  const signupForm = () => {
    return (
      <div>
        <div className="form-group">
          <label className="text-muted" style={{ margin: ".5rem" }}>
            Name
          </label>
          <input
            name="name"
            type="text"
            className="form-control"
            placeholder="Name"
            style={{ margin: ".5rem" }}
            onChange={handleChange}
            value={user.name}
          ></input>
        </div>

        <div className="form-group">
          <label className="text-muted" style={{ margin: ".5rem" }}>
            Email Id
          </label>
          <input
            name="email"
            type="email"
            className="form-control"
            placeholder="Email Id"
            style={{ margin: ".5rem" }}
            onChange={handleChange}
            value={user.email}
          ></input>
        </div>

        <div className="form-group">
          <label className="text-muted" style={{ margin: ".5rem" }}>
            Password
          </label>
          <input
            name="password"
            type="password"
            className="form-control"
            placeholder="Password"
            style={{ margin: ".5em" }}
            onChange={handleChange}
            value={user.password}
          ></input>
        </div>

        <center>
          <button
            onClick={formSubmit}
            type="submit"
            className="btn btn-primary"
            style={{ margin: "1.5em" }}
          >
            Submit
          </button>
        </center>

        <div style={{ margin: "1.5em" }} align="center">
          <p>
            Already a user, <Link to="/signin">SignIn</Link>{" "}
          </p>
        </div>
      </div>
    );
  };

  const dispError = () => (
    <div
      className="alert alert-danger"
      style={{ display: user.error ? "" : "none" }}
    >
      {user.error}
    </div>
  );

  const dispSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: user.success ? "" : "none" }}
    >
      Successfully signed up. Please <Link to="/signin">SignIn</Link>
    </div>
  );

  return (
    <Layout
      title="Signup Page"
      description="Signup page, Enter your name, phone no. and email Id"
      className="container col-md-4 offset-md-4"
    >
      {dispError()}
      {dispSuccess()}
      {signupForm()}

      {/* {JSON.stringify(user)}  */}
    </Layout>
  );
};

export default Signup;
