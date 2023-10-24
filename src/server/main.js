import "dotenv/config";
import mongoose from "mongoose";
import User from "../models/User.js";
import Submission from "../models/HourSubmission.js";
import Event from "../models/Event.js";
import Attendance from "../models/Attendance.js";
import express from "express";
import session from "express-session";
import ViteExpress from "vite-express";
import passport from "passport";
import GitHubStrategy from "passport-github2";
import GoogleStrategy from "passport-google-oauth2";
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

// app.use(cookieParser);

const password = encodeURIComponent(process.env.PASS);

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${password}@${process.env.HOST}`
);

passport.serializeUser((user, done) => {
  console.log("SerializeUser:", user);
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    let user = await User.findById(id, "name email _id");
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("GitHub Authentication Successful");
      // console.log(profile); // Log the user profile for debugging
      try {
        const user = await User.findOne({ user_id: profile.id });
        console.log("github user: ", user);
        if (user != null) {
          console.log("found the user");
          return done(null, user);
        } else {
          const newUser = new User({
            email: profile.email,
            name: profile.displayName,
            password: "auto",
            user_id: profile.id,
          });

          const savedUser = await newUser.save();
          console.log("Saved a new user");
          return done(null, savedUser);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ user_id: profile.id });
        console.log("google user: ", user);
        if (user != null) {
          console.log("found the user");
          return done(null, user);
        } else {
          const newUser = new User({
            email: profile.email,
            name: profile.displayName,
            password: "auto",
            user_id: profile.id,
          });

          const savedUser = await newUser.save();
          console.log("Saved a new user");
          return done(null, savedUser);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
// GitHub OAuth2 login route
app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// GitHub OAuth2 callback route
app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/", session: true }),
  async function (req, res) {
    req.session.user = await User.findById(req.session.passport.user._id);
    console.log(req.session);
    res.redirect("/home");
  }
);

//Google OAuth2 login route

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

//Google OAuth2 Callback

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: true }),
  async function (req, res) {
    req.session.user = await User.findById(req.session.passport.user._id);
    console.log(req.session);
    res.redirect("/home");
  }
);

//__________________________________________________________________________

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

app.get("/login", function (req, res) {
  if (req.session.login == true) {
    console.log("Signing in normally");
    console.log(req.session);
    res.redirect("/home");
  }
});

app.get("/signout", function (req, res) {
  req.session = null;
  res.redirect("/");
});

app.get("/getData", async (req, res) => {
  const result = await Submission.find({ person: req.session.user._id });
  let body = JSON.stringify(result);
  console.log("gotten data: ", result);
  res.send(body);
});

app.get("/getProfile", async (req, res) => {
  console.log(req.session.user._id);
  const result = await User.find({ _id: req.session.user._id });

  let body = JSON.stringify(result);
  console.log("gotten data: ", result);
  res.send(body);
});

app.get("/getEvents", async (req, res) => {
  const result = await Event.find();

  let body = JSON.stringify(result);
  console.log("gotten data: ", result);
  res.send(body);
});

app.post("/add", async (req, res) => {
  let data = req.body;
  debugger;
  console.log("addition data: ", data);
  let submission = new Submission({
    date: data.date,
    person: req.session.user._id,
    numHours: data.numHours,
    reason: data.reason,
  });
  await submission.save();
  res.redirect("/getData");
  console.log("saved an entry");
});

app.post("/addEvent", async (req, res) => {
  let data = req.body;
  debugger;
  console.log("addition data: ", data);
  let submission = new Event({
    title: data.title,
    password: data.password,
    date: data.date,
    description: data.description,
  });
  await submission.save();
  res.redirect("/getEvents");
  console.log("saved an entry");
});

app.post("/delete", async (req, res) => {
  let data = req.body;
  console.log("deletion data: ", data);
  await Submission.findByIdAndDelete(data.submissionID);
  res.redirect("/getData");
});

app.post("/deleteEvent", async (req, res) => {
  let data = req.body;
  console.log("deletion data: ", data);
  const temp = await Event.findByIdAndDelete(data.submissionID);
  res.redirect("/getEvents");
});

app.post("/update", async (req, res) => {
  let data = req.body;
  console.log("edited data: ", data);
  data.map(async (item) => {
    const result = await Submission.updateOne(
      { _id: item._id },
      {
        $set: {
          numHours: item.numHours,
          date: item.date,
          reason: item.reason,
        },
      }
    );
    console.log("result:", result);
  });
  console.log("should have updated");
  res.redirect("/getData");
});

app.post("/updateProfile", async (req, res) => {
  let data = req.body;
  console.log("edited data: ", data);
  data.map(async (item) => {
    const result = await User.updateOne(
      { user_id: item.user_id },
      {
        $set: {
          name: item.name,
          pronouns: item.pronouns,
          bio: item.bio,
          email: item.email,
          iqp_term: item.iqp_term,
        },
      }
    );
    console.log("result:", result);
  });
  console.log("should have updated");
  res.redirect("/getProfile");
});

app.post("/updateEvents", async (req, res) => {
  let data = req.body;
  console.log("edited data: ", data);
  data.map(async (item) => {
    const result = await Event.updateOne(
      { _id: item._id },
      {
        $set: {
          title: item.title,
          password: item.password,
          date: item.date,
          description: item.description,
        },
      }
    );
    console.log("result:", result);
  });
  console.log("should have updated");
  res.redirect("/getEvents");
});

app.post("/addAttendance", async (req, res) => {
  let data = req.body;
  console.log("attendance: ", data);
  let attendance = new Attendance({
    date: data.date,
    person: req.session.user_id,
    excused: data.excused,
    reason: data.reason,
  });
  await Attendance.save(attendance);
  console.log("submitted attendance");
});

app.post("/addExcused ", async (req, res) => {
  let data = req.body;
  console.log("attendance: ", data);
  let attendance = new Attendance({
    date: data.date,
    person: req.session.user_id,
    excused: data.excused,
    reason: data.reason,
  });
  await Attendance.save(attendance);
  console.log("submitted attendance");
});

const logger = (req, res, next) => {
  // console.log("url:", req.url);
  next();
};

app.use(logger);
ViteExpress.listen(app, 8080, () => {
  console.log("Listening");
});
