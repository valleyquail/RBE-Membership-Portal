import "dotenv/config";
import mongoose from "mongoose";
import User from "../models/User.js";

import express from "express";
import session from "express-session";
import ViteExpress from "vite-express";

import configurePassport from "./authentication.js";
import manageEvents from "./event_backend.js";
import manageHours from "./hours_backend.js";
import manageAttendance from "./attendance_backend.js";

import Crypto from "crypto";

// const cookieParser = require("cookie-parser");
const app = express();

ViteExpress.config({ mode: process.env.NODE_ENV });

app.use(express.static("src/"));
// app.use(ViteExpress.static("/"));
app.use(express.static("./index.html"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: false })
);

const password = encodeURIComponent(process.env.PASS);

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${password}@${process.env.HOST}`
);

// Backend components go here and are kept in separate corresponding files
configurePassport(app);
manageEvents(app);
manageHours(app);
manageAttendance(app);

app.post("/findUser", async function (req, res) {
  console.log("accessing the db");
  // debugger;
  let data = req.body;
  console.log("data: ", data);
  let username = data.username;
  try {
    const user = await User.findOne({ name: username }).exec();
    console.log("user: ", user);

    if (user != null) {
      if (user.password == data.password) {
        console.log("logging in the user");
        req.session.login = true;
        req.session.user = user;
        res.send(JSON.stringify("true"));
      } else {
        console.log("failed to log in due to password");
        res.send(JSON.stringify("false"));
      }
    } else {
      console.log("creating a new user");
      let randNum = Crypto.randomBytes(8).toString("hex");
      const newUser = new User({
        email: data.username,
        name: data.username,
        password: data.password,
        user_id: randNum,
      });

      await newUser.save();
      console.log("Saved a new user and logging in");
      req.session.login = true;
      req.session.user = newUser;
      res.send(JSON.stringify("true"));
    }
  } catch (error) {
    res.send(JSON.stringify("false"));
    console.log("Something went wrong");
    console.log(error);
  }
});

app.get("/signout", function (req, res) {
  req.session = null;
  res.redirect("/");
});

const logger = (req, res, next) => {
  // console.log("url:", req.url);
  next();
};

app.use(logger);
ViteExpress.listen(app, 8080, () => {
  console.log("Listening");
});
