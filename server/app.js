const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./Routes/router");
const dotenv = require('dotenv');

dotenv.config() 
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log(process.env.DB)
const db = "mongodb://localhost:27017/local";
mongoose
  .connect(db)
  .then(() => {
    console.log("DB is connected");
  })
  .catch((e) => {
    console.log("DB error " + e);
  });


  app.use('/images', express.static('upload/images'))

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use(router);

app.listen(8080, () => {
  console.log("Server is running at port no 8080");
});







