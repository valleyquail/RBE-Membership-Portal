import "../Theming/theming.css";
import Logo from "../Theming/Logo.png";
import { organizationName } from "../Theming/site_control";
import React from "react";
import { useState } from "react";
import { Image, Form, Button, Navbar } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = {
      username: username,
      password: password,
    };
    const response = await fetch("/findUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const text = await response.text();
    const validation = JSON.parse(text);
    if (validation == "true") {
      console.log("Normal login");
      window.location.href = "/login";
    } else {
      console.log("failed to log in");
    }
  };
  const githubOAuth = (event) => {
    console.log("githubbing");
    window.location.href = "/auth/github";
  };

  const googleOAuth = (event) => {
    console.log("googling");
    window.location.href = "/auth/google";
  };
  return (
    <div>
      <Navbar
        className="d-flex flex-wrap py-3 border-bottom primary-color"
        fixed="top"
      >
        <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
          <Image src={Logo} alt="Logo" width="100px" height="116px" />
          <div className="fs-1" style={{ color: "white" }}>
            {organizationName} Member Portal
          </div>
        </div>
      </Navbar>

      <div
        className="modal show"
        style={{ display: "block", position: "center", marginTop: "200px" }}
      >
        <Modal.Dialog>
          <Modal.Header className="p-5 pb-4 border-bottom-0 justify-content-center">
            <Modal.Title className="fw-bold mb-0 fs-2">Sign In</Modal.Title>
          </Modal.Header>

          <Modal.Body className="p-5 pt-0">
            <Form>
              <Form.Floating className="mb-3">
                <Form.Control
                  type="email"
                  className="rounded-3"
                  name="emailBox"
                  placeholder="name@example.com"
                  autoComplete="username"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="emailBox">Email address</label>
              </Form.Floating>
              <Form.Floating className="mb-3">
                <Form.Control
                  type="password"
                  className="rounded-3"
                  name="passwordBox"
                  placeholder="Password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="passwordBox">Password</label>
              </Form.Floating>
              <Button
                variant="primary"
                type="submit"
                name="sign_in_button"
                className="w-100 mb-2 rounded-3"
                size="lg"
                onClick={handleSubmit}
              >
                Sign In
              </Button>
            </Form>
            <hr className="my-4" />
            <h2 className="fs-5 fw-bold mb-3">Or use a third-party</h2>
            <Button
              variant="secondary"
              id="googleButton"
              className="w-100 py-2 mb-2 rounded-3"
              onClick={googleOAuth}
            >
              Sign in with Google
            </Button>
            <Button
              variant="secondary"
              id="githubButton"
              className="w-100 py-2 mb-2 rounded-3"
              onClick={githubOAuth}
            >
              Sign in with GitHub
            </Button>
          </Modal.Body>
        </Modal.Dialog>
      </div>
    </div>
  );
}

export default Login;
