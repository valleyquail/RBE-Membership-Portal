import Attendance from "../models/Attendance.js";

const manageAttendance = (app) => {
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
};

export default manageAttendance;
