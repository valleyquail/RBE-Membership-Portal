import React from "react";
import { useState, useEffect } from "react";
import { Form, Button, Table } from "react-bootstrap";

class eventEntry {
  constructor(title, password, date, description) {
    this.title = title;
    this.password = password;
    this.date = date;
    this.description = description;
  }

  setTitle(title) {
    this.title = title;
  }

  setPassword(password) {
    this.password = password;
  }
  setDate(date) {
    this.date = date;
  }

  setDescription(description) {
    this.description = description;
  }

  setID(id) {
    this.id = id;
  }
}

function AdminPage() {
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [events, setEvents] = useState([]);
  const [editable, setEditable] = useState(false);
  const [content, setContent] = useState("Edit");
  let totalHours = 0;
  //gets data from the server on load
  useEffect(() => {
    fetch("/getEvents", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("recieved data: ", data);
        setEvents(data);
      });
  }, []);

  const submitData = async function (event) {
    event.preventDefault();
    let newSubmission = new eventEntry(title, password, date, description);
    const body = JSON.stringify(newSubmission);
    console.log("New submission: ", body);
    const response = await fetch("/addEvent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    });

    const text = await response.text();
    const data = JSON.parse(text);
    setEvents(data);
    console.log("gonna print data:", data);
  };

  //probably not gonna work at first
  const deleteEntry = async (event) => {
    const elemID =
      event.currentTarget.parentElement.parentElement.dataset.internal_id;
    console.log("target to delete id: ", elemID);
    const response = await fetch("/deleteEvent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ submissionID: elemID }),
    });
    const text = await response.text();
    const newData = JSON.parse(text);
    setEvents(newData);
  };

  const controlEdit = async () => {
    // console.log(editable);
    if (editable) {
      const response = await fetch("/getEvents", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const text = await response.text();
      const newData = JSON.parse(text);
      setEvents(newData);

      setContent("Submit Edits");
    } else {
      console.log("Gonna update");
      const response = await fetch("/updateEvents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(events),
      });
      const text = await response.text();
      const newData = JSON.parse(text);
      setEvents(newData);
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
    const edited = events.map((item) =>
      item._id === entryID && name ? { ...item, [name]: value } : item
    );
    setEvents(edited);
  };

  return (
    <div style={{ maxWidth: "800px" }}>
      <h1>Admin</h1>
      <br />
      <h2>Add Event</h2>
      <Form
        style={{
          border: "1px solid",
          padding: "10px",
          borderRadius: "5px",
          maxWidth: "600px",
        }}
      >
        <Form.Group className="mb-3">
          <Form.Label htmlFor="titleSubmission">Event to Add</Form.Label>
          <Form.Control
            type="textarea"
            id="titleSubmission"
            required
            onChange={(event) => setTitle(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="passwordSubmission">
            Password - Optional
          </Form.Label>
          <Form.Control
            type="textarea"
            id="passwordSubmission"
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="dateSubmission">Event Date</Form.Label>
          <Form.Control
            type="date"
            id="dateSubmission"
            required
            onChange={(event) => setDate(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="descriptionSubmission">Description</Form.Label>
          <Form.Control
            required
            as="textarea"
            id="descriptionSubmission"
            rows={5}
            onChange={(event) => {
              setDescription(event.target.value);
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
              <th style={{ width: "150px" }}>Title</th>
              <th style={{ width: "150px" }}>Password</th>
              <th style={{ width: "100px" }}>Date</th>
              <th style={{ width: "200px" }}>Description</th>
              <th style={{ width: "100px" }}>Delete</th>
            </tr>
          </thead>
          <tbody id="dataRepresentation">
            {events.map((entry) => {
              return (
                <tr key={entry._id} data-internal_id={entry._id}>
                  <td key="title" style={{ maxWidth: "100px" }}>
                    <input
                      name="title"
                      required
                      value={entry.title}
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
                  <td key="password" style={{ maxWidth: "100px" }}>
                    <input
                      name="password"
                      required
                      value={entry.password}
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
                  <td key="description">
                    <input
                      name="description"
                      required
                      value={entry.description}
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
      </div>
    </div>
  );
}

export default AdminPage;
