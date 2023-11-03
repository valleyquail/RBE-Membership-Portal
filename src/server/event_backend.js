import Event from "../models/Event.js";
import express from "express";
import session from "express-session";

const manageEvents = (app) => {
  app.get("/getEvents", async (req, res) => {
    const result = await Event.find();

    let body = JSON.stringify(result);
    console.log("gotten data: ", result);
    res.send(body);
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

  app.post("/deleteEvent", async (req, res) => {
    let data = req.body;
    console.log("deletion data: ", data);
    const temp = await Event.findByIdAndDelete(data.submissionID);
    res.redirect("/getEvents");
  });
};

export default manageEvents;
