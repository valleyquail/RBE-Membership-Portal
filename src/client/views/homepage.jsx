import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col, Stack, Modal } from "react-bootstrap";
import { determineEventType } from "../../Theming/site_control";
function Homepage() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetch("/getEvents", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("recieved data: ", data);
        data = data.filter((a) => new Date(a.date) >= Date.now());
        data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setEvents(data);
      });
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>Upcoming Events</h1>
          <Stack
            className="col-md-10"
            style={{
              overflowY: "auto",
              maxHeight: "70%",
            }}
          >
            {events.map((event) => (
              <div key={self.crypto.randomUUID()}>
                <div
                  className="modal show fluid"
                  style={{
                    display: "block",
                    position: "initial",
                    maxWidth: "850px",
                    paddingRight: "20px",
                  }}
                >
                  <Modal.Dialog>
                    <Modal.Header
                      className={`${determineEventType(event.title).style}`}
                    >
                      <Modal.Title>{event.title}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                      <p>{event.description}</p>
                    </Modal.Body>

                    <Modal.Footer>
                      {"Date: " + new Date(event.date).toDateString()}
                    </Modal.Footer>
                  </Modal.Dialog>
                </div>
              </div>
            ))}
          </Stack>
        </Col>
        <Col>
          <h1>Links and Resources</h1>
          <br />
          <h4>
            <ul>
              <li>
                <a href="https://www.wpi.edu/" target="_blank">
                  Link 1
                </a>
              </li>
              <li>
                <a href="https://hub.wpi.edu/" target="_blank">
                  Link 2
                </a>
              </li>
              <li>
                <a href="/home" target="_blank">
                  Link 3
                </a>
              </li>
              <li>
                <a href="/home" target="_blank">
                  Link 4
                </a>
              </li>
              <li>
                <a href="/home" target="_blank">
                  Link 5
                </a>
              </li>
              <li>
                <a href="/home" target="_blank">
                  Link 6
                </a>
              </li>
            </ul>
          </h4>
        </Col>
      </Row>
    </Container>
  );
}

export default Homepage;
