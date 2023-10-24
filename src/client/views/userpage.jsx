import React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  Table,
} from "react-bootstrap";


function UserPage() {
  const [user, setUser] = useState([]);
  const [editable, setEditable] = useState(false);
  const [content, setContent] = useState("Edit");
  //gets data from the server on load
  useEffect(() => {
    fetch("/getProfile", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("recieved data: ", data);
        setUser(data);
      });
  }, []);


  const controlEdit = async () => {
    console.log(editable);
    if (editable) {
      const response = await fetch("/getProfile", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const text = await response.text();
      const newData = JSON.parse(text);
      setUser(newData);

      setContent("Submit Edits");
    } else {
      console.log("Gonna update");

      let test = JSON.stringify(user);
      const response = await fetch("/updateProfile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const text = await response.text();
      const newData = JSON.parse(text);
      setUser(newData);

      setContent("Edit");
    }
    setEditable(!editable);
    console.log(editable);
  };

  const onChangeInput = (e, entryID) => {
    e.preventDefault();
    let evt = e.currentTarget;
    const name = evt.name;
    const value = evt.value;
    const rowID = evt.parentElement.parentElement.dataset.internal_id;
    const edited = user.map((item) =>
      item.user_id === entryID && name ? { ...item, [name]: value } : item
    );
    setUser(edited);
  };

  let totalHours = 0;
  return (
    <div>
      <Table striped hover bordered id="Name">
        <thead>
          <tr>
            <th style={{ width: "200px" }}>Name</th>
          </tr>
        </thead>
        <tbody id="dataName">
          {user.map((entry) => {
            return (
              <tr key={entry.user_id} data-internal_id={entry.user_id}>
                <td key="name">
                  <input
                    name="name"
                    required
                    value={entry.name}
                    type="text"
                    plaintext="true"
                    readOnly={editable}
                    style={{
                      border: "none", // Remove border
                      boxShadow: "none", // Remove box shadow
                      background: "transparent", // Make background transparent
                    }}
                    onChange={(e) => onChangeInput(e, entry.user_id)}
                  ></input>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Table striped hover bordered id="pronouns">
        <thead>
          <tr>
            <th style={{ width: "200px" }}>Pronouns</th>
          </tr>
        </thead>
        <tbody id="dataRepresentation">
          {user.map((entry) => {
            return (
              <tr key={entry.user_id} data-internal_id={entry.user_id}>
                <td key="pronouns">
                  <input
                    name="pronouns"
                    required
                    value={entry.pronouns}
                    type="text"
                    plaintext="true"
                    readOnly={editable}
                    style={{
                      border: "none", // Remove border
                      boxShadow: "none", // Remove box shadow
                      background: "transparent", // Make background transparent
                    }}
                    onChange={(e) => onChangeInput(e, entry.user_id)}
                  ></input>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Table striped hover bordered id="email">
        <thead>
          <tr>
            <th style={{ width: "200px" }}>Email</th>
          </tr>
        </thead>
        <tbody id="dataRepresentation">
          {user.map((entry) => {
            return (
              <tr key={entry.user_id} data-internal_id={entry.user_id}>
                <td key="email">
                  <input
                    name="email"
                    required
                    value={entry.email}
                    type="text"
                    plaintext="true"
                    readOnly={editable}
                    style={{
                      border: "none", // Remove border
                      boxShadow: "none", // Remove box shadow
                      background: "transparent", // Make background transparent
                    }}
                    onChange={(e) => onChangeInput(e, entry.user_id)}
                  ></input>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Table striped hover bordered id="bio">
        <thead>
          <tr>
            <th style={{ width: "200px" }}>Bio</th>
          </tr>
        </thead>
        <tbody id="dataRepresentation">
          {user.map((entry) => {
            return (
              <tr key={entry.user_id} data-internal_id={entry.user_id}>
                <td key="bio">
                  <input
                    name="bio"
                    required
                    value={entry.bio}
                    type="text"
                    plaintext="true"
                    readOnly={editable}
                    style={{
                      border: "none", // Remove border
                      boxShadow: "none", // Remove box shadow
                      background: "transparent", // Make background transparent
                    }}
                    onChange={(e) => onChangeInput(e, entry.user_id)}
                  ></input>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Table striped hover bordered id="iqp_term">
        <thead>
          <tr>
            <th style={{ width: "200px" }}>IQP Term</th>
          </tr>
        </thead>
        <tbody id="dataRepresentation">
          {user.map((entry) => {
            return (
              <tr key={entry.user_id} data-internal_id={entry.user_id}>
                <td key="iqp_term">
                  <input
                    name="iqp_term"
                    required
                    value={entry.iqp_term}
                    type="text"
                    plaintext="true"
                    readOnly={editable}
                    style={{
                      border: "none", // Remove border
                      boxShadow: "none", // Remove box shadow
                      background: "transparent", // Make background transparent
                    }}
                    onChange={(e) => onChangeInput(e, entry.user_id)}
                  ></input>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Button className="btn-primary" onClick={controlEdit}>
        {content}
      </Button>

      <Button className="btn-primary" href="/admin_page">
        Admin
      </Button>
    </div>
  );
}

export default UserPage;
