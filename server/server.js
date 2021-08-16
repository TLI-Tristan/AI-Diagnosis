const express = require("express");
const cors = require("cors");
const { response } = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// express app
const app = express();

// routes
const mriRoute = require("./routes/mri_route");
const mainRoute = require("./routes/main_route");

// env variables
const hostname = "127.0.0.1";
const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());

app.use("/", mainRoute);
app.use("/mri", mriRoute);

// conntect to mongodb
/*
const dbURI = process.env.dbURI;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((result) => {
    console.log("connected to db");
    app.listen(PORT, () => {
      console.log(`Server running at http://${hostname}:${PORT}/`);
    });
  })
  .catch((err) => console.log(err));*/

  app.listen(PORT, () => {
    console.log(`Server running at http://${hostname}:${PORT}/`);
  });
