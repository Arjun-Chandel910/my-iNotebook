import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
const Signup = () => {
  return (
    <div className="flex flex-col m-auto justify-center item-center">
      <h1 className="text-2xl text-center">Signup</h1>
      <form action="" className="text-center">
        <TextField
          id="standard-basic"
          label="name"
          variant="standard"
          required
        />
        <br />
        <br />
        <TextField
          id="standard-basic"
          label="email"
          variant="standard"
          required
        />
        <br />
        <br />
        <TextField
          id="standard-basic"
          label="password"
          variant="standard"
          required
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
