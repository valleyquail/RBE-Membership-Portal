import Submission from "../models/HourSubmission.js";

const manageHours = (app) => {
  app.get("/getData", async (req, res) => {
    const result = await Submission.find({ person: req.session.user._id });
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

  app.post("/delete", async (req, res) => {
    let data = req.body;
    console.log("deletion data: ", data);
    await Submission.findByIdAndDelete(data.submissionID);
    res.redirect("/getData");
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
};

export default manageHours;
