import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();

  let [state, setState] = useState({ email: "", password: "" });

  let handleInp = (e) => {
    setState((user) => {
      return { ...user, [e.target.name]: e.target.value };
    });
  };
  let handleSubmit = async (e) => {
    e.preventDefault();
    let res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: state.email, password: state.password }),
    });
    let resData = await res.json();
    console.log(resData.token);
    if (resData.success) {
      localStorage.setItem("token", resData.token);
      navigate("/");
    } else {
      alert("wrong credentials");
    }
  };

  return (
    <div className="flex flex-col m-auto justify-center item-center">
      <h1 className="text-2xl text-center">Login</h1>
      <form action="" className="text-center" onSubmit={handleSubmit}>
        <TextField
          label="email"
          variant="standard"
          required
          name="email"
          type="email"
          onChange={handleInp}
          value={state.email}
        />
        <br />
        <br />
        <TextField
          label="password"
          variant="standard"
          required
          name="password"
          onChange={handleInp}
          value={state.password}
        />
        <br />
        <br />
        <Button variant="contained" color="success" type="submit">
          Success
        </Button>
      </form>
    </div>
  );
};

export default Login;
