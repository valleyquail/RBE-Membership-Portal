import { set } from "mongoose";
import React from "react";
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

class attendanceEntry {
  constructor(date, reason, excused) {
    this.date = date;
    this.excused = excused;
    this.reason = reason;
  }
}

function AttendancePage() {
  const [events, setEvents] = useState([]);
  const [reason, setReason] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetch("/getEvents", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("recieved data: ", data);
        data = data.filter(
          (a) =>
            new Date(a.date) >= Date.now() && a.title.toLowerCase() === "gbm"
        );
        data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setEvents(data);
      });
  }, []);

  const submitData = async function (event) {
    event.preventDefault();
    const data = event.target;

    console.log(formData);
    return;
    if (password !== date.password) {
      console.log("did not log in, password: ", date.password);
      console.log("submitted password: ", password);
      return;
    }

    let newSubmission = new attendanceEntry(date, "", false);
    const body = JSON.stringify(newSubmission);
    console.log("New submission: ", body);
    const response = await fetch("/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    });
  };

  const submitExcused = async function (event) {
    event.preventDefault();
    let data = event.value;
    let formData = new FormData(data);
    console.log(formData);

    let newSubmission = new attendanceEntry(excusedDate, reason, true);
    const body = JSON.stringify(newSubmission);
    console.log("New submission: ", body);
    const response = await fetch("/addExcuse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    });
  };

  return (
    <div>
      <h1>Attendance Tracking</h1>
      <br />
      <h2>Submit Attendance</h2>
      <Form
        style={{
          border: "1px solid",
          padding: "10px",
          borderRadius: "5px",
          maxWidth: "500px",
        }}
        // onSubmit={submitData}
      >
        {/* <Form.Group className="mb-3"> */}
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control type="text" name="gbmPassword" id="password" required />
        {/* </Form.Group> */}

        {/* <Form.Group className="mb-3"> */}
        <Form.Label htmlFor="dateSubmission">GBM Attended</Form.Label>
        <Form.Select name="targetGBM">
          <option>GBM Date</option>
          {events.map((event) => (
            <option
              key={new Date(event.date).toDateString()}
              value={{
                date: new Date(event.date),
                pass: event.password,
              }}
            >
              {new Date(event.date).toDateString()}
            </option>
          ))}
        </Form.Select>
        {/* </Form.Group> */}

        <Button type="submit" className="btn-primary">
          Submit
        </Button>
      </Form>
      <br />
      <h2>Excused Absence</h2>
      <Form
        style={{
          border: "1px solid",
          padding: "10px",
          borderRadius: "5px",
          maxWidth: "500px",
        }}
        // onSubmit={submitExcused}
      >
        {/* <Form.Group className="mb-3"> */}
        <Form.Label htmlFor="excusedAbsence">Meeting Missed</Form.Label>
        <Form.Select name="targetExcusedGBM">
          <option>GBM Date</option>
          {events.map((event) => (
            <option
              key={self.crypto.randomUUID()}
              value={new Date(event.date).toDateString()}
            >
              {new Date(event.date).toDateString()}
            </option>
          ))}
        </Form.Select>
        {/* </Form.Group> */}
        {/* <Form.Group className="mb-3" > */}
        <Form.Label htmlFor="excuse">Reason</Form.Label>
        <Form.Control
          required
          as="textarea"
          id="excuse"
          rows={5}
          value={reason}
          name="excusedReason"
          onChange={(e) => setReason(e.target.value)}
        />
        {/* </Form.Group> */}
        <Button type="submit" className="btn-primary">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AttendancePage;
