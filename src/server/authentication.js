import "dotenv/config";
import passport from "passport";
import User from "../models/User.js";
import GitHubStrategy from "passport-github2";
import GoogleStrategy from "passport-google-oauth2";
// import MicrosoftStrategy from "passport-microsoft";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const MicrosoftStrategy = require("passport-microsoft").Strategy;

function configurePassport(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  //Strategies:

  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL:
          "https://main.d558rrsf2rcm6.amplifyapp.com/auth/github/callback",
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

  passport.use(
    new MicrosoftStrategy(
      {
        clientID: process.env.MICROSOFT_CLIENT_ID,
        clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
        callbackURL:
          "https://main.d558rrsf2rcm6.amplifyapp.com/auth/microsoft/callback",
        scope: ["user.read"],
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("Microsoft Authentication Successful");
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

  //Microsoft OAuth2 login route

  app.get("/auth/microsoft", passport.authenticate("microsoft"));

  app.get("/auth/microsoft/callback", async function (req, res) {
    req.session.user = await User.findById(req.session.passport.user._id);
    console.log(req.session);
    res.redirect("/home");
  });

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
}

export default configurePassport;
