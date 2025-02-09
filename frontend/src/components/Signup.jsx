import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  let navigate = useNavigate();

  let [state, setState] = useState({ name: "", email: "", password: "" });

  let handleInp = (e) => {
    setState((user) => {
      return { ...user, [e.target.name]: e.target.value };
    });
  };
  let handleSubmit = async (e) => {
    e.preventDefault();
    let res = await fetch("http://localhost:8080/api/auth/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: state.name,
        email: state.email,
        password: state.password,
      }),
    });
    let resData = await res.json();
    console.log(resData.token);
    if (resData.success) {
      localStorage.setItem("token", resData.token);
      navigate("/");
    } else {
      alert("something went wrong ");
    }
  };

  return (
    <div className="flex flex-col m-auto justify-center item-center">
      <h1 className="text-2xl text-center">Signup</h1>
      <form action="" className="text-center" onSubmit={handleSubmit}>
        <TextField
          label="name"
          variant="standard"
          required
          name="name"
          onChange={handleInp}
          value={state.name}
        />
        <br />
        <br />
        <TextField
          label="email"
          variant="standard"
          required
          name="email"
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

export default Signup;
