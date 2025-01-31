const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//db
mongoose
  .connect("mongodb://127.0.0.1:27017/iNodebook")
  .then(() => console.log("mongodb Connected!"))
  .catch((err) => {
    console.log(err);
  });
//models
const User = require("./models/user");
const Note = require("./models/notes");

//routes
app.use("/api/auth", require("./router/auth.js"));
app.use("/api/notes", require("./router/notes.js"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
