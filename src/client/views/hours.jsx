import React from "react";
import { useState, useEffect } from "react";
import { Form, Button, Table } from "react-bootstrap";

class hourEntry {
  constructor(date, num, reasoning) {
    this.date = date;
    this.numHours = num;
    this.reason = reasoning;
  }
  setDate(date) {
    this.date = date;
  }
  setNumHours(num) {
    this.numHours = num;
  }

  setReason(reason) {
    this.reason = reason;
  }

  setID(id) {
    this.id = id;
  }
}

function Hours() {
  const [hours, setHours] = useState("");
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [submissions, setSubmissions] = useState([]);
  const [editable, setEditable] = useState(false);
  const [content, setContent] = useState("Edit");
  let totalHours = 0;
  //gets data from the server on load
  useEffect(() => {
    fetch("/getData", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("recieved data: ", data);
        setSubmissions(data);
      });
  }, []);

  const submitData = async function (event) {
    event.preventDefault();
    let newSubmission = new hourEntry(date, hours, reason);
    const body = JSON.stringify(newSubmission);
    console.log("New submission: ", body);
    const response = await fetch("/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    });

    const text = await response.text();
    const data = JSON.parse(text);
    setSubmissions(data);
    console.log("gonna print data:", data);
  };

  const deleteEntry = async (event) => {
    const elemID =
      event.currentTarget.parentElement.parentElement.dataset.internal_id;
    console.log("target to delete id: ", elemID);
    const response = await fetch("/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ submissionID: elemID }),
    });
    const text = await response.text();
    const newData = JSON.parse(text);
    setSubmissions(newData);
  };

  const controlEdit = async () => {
    // console.log(editable);
    if (editable) {
      const response = await fetch("/getData", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const text = await response.text();
      const newData = JSON.parse(text);
      setSubmissions(newData);

      setContent("Submit Edits");
    } else {
      console.log("Gonna update");
      const response = await fetch("/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissions),
      });
      const text = await response.text();
      const newData = JSON.parse(text);
      setSubmissions(newData);
      setContent("Edit");
    }
    totalHours = 0;
    setEditable(!editable);
    // console.log(editable);
  };

  const onChangeInput = (e, entryID) => {
    e.preventDefault();
    let evt = e.currentTarget;
    const name = evt.name;
    const value = evt.value;
    const rowID = evt.parentElement.parentElement.dataset.internal_id;
    const edited = submissions.map((item) =>
      item._id === entryID && name ? { ...item, [name]: value } : item
    );
    setSubmissions(edited);
  };

  return (
    <div style={{ maxWidth: "700px" }}>
      <Form
        style={{
          border: "1px solid",
          padding: "10px",
          borderRadius: "5px",
          maxWidth: "600px",
        }}
      >
        <Form.Group className="mb-3">
          <Form.Label htmlFor="hourSubmission">
            Number of Hours Completed
          </Form.Label>
          <Form.Control
            type="number"
            id="hourSubmission"
            required
            onChange={(event) => setHours(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="dateSubmission">Date Completed</Form.Label>
          <Form.Control
            type="date"
            id="dateSubmission"
            required
            onChange={(event) => setDate(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="reasonSubmission">Reason for Hours</Form.Label>
          <Form.Control
            required
            as="textarea"
            id="reasonSubmission"
            rows={5}
            onChange={(event) => {
              setReason(event.target.value);
              // console.log(reason);
            }}
          />
        </Form.Group>
        <Button
          type="submit"
          className="btn-primary"
          id="submissionButton"
          onClick={submitData}
        >
          Submit
        </Button>
      </Form>
      <hr />
      <div
        style={{
          maxHeight: "300px",
          overflow: "auto",
          // paddingBottom: "25px",
        }}
      >
        <Table striped hover bordered id="submissionTable">
          <thead>
            <tr>
              <th style={{ width: "100px" }}># of Hours</th>
              <th style={{ width: "100px" }}>Date</th>
              <th style={{ width: "200px" }}>Reason</th>
              <th style={{ width: "100px" }}>Delete</th>
            </tr>
          </thead>
          <tbody id="dataRepresentation">
            {submissions.map((entry) => {
              totalHours += parseInt(entry.numHours);
              return (
                <tr key={entry._id} data-internal_id={entry._id}>
                  <td key="numHours" style={{ maxWidth: "100px" }}>
                    <input
                      name="numHours"
                      required
                      value={entry.numHours}
                      type="text"
                      plaintext="true"
                      readOnly={editable}
                      style={{
                        border: "none", // Remove border
                        boxShadow: "none", // Remove box shadow
                        background: "transparent", // Make background transparent
                      }}
                      onChange={(e) => onChangeInput(e, entry._id)}
                    ></input>
                  </td>
                  <td key="date">
                    <input
                      name="date"
                      required
                      value={entry.date.split("T")[0]}
                      type="date"
                      plaintext={(!editable).toString()}
                      readOnly={editable}
                      style={{
                        border: "none", // Remove border
                        boxShadow: "none", // Remove box shadow
                        background: "transparent", // Make background transparent
                      }}
                      onChange={(e) => onChangeInput(e, entry._id)}
                    ></input>
                  </td>
                  <td key="reason">
                    <input
                      name="reason"
                      required
                      value={entry.reason}
                      type="text"
                      plaintext="true"
                      readOnly={editable}
                      style={{
                        border: "none", // Remove border
                        boxShadow: "none", // Remove box shadow
                        background: "transparent", // Make background transparent
                      }}
                      onChange={(e) => onChangeInput(e, entry._id)}
                    ></input>
                  </td>
                  <td>
                    <Button
                      className="btn-dark"
                      style={{ marginLeft: "25px" }}
                      onClick={deleteEntry}
                    >
                      X
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <div>
        <Button className="btn-primary" onClick={controlEdit}>
          {content}
        </Button>
        <hr />
        <Table striped bordered id="totalHoursTable">
          <thead>
            <tr>
              <th style={{ width: "150px" }}>Total Hours:</th>
              <th>{totalHours}</th>
            </tr>
          </thead>
        </Table>
      </div>
    </div>
  );
}

export default Hours;
