import "../Theming/theming.css";
import Logo from "../Theming/Logo.png";
import { organizationName } from "../Theming/site_control";
import React from "react";
import { useState } from "react";
import { Image, Form, Button, Navbar } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

function Login() {
  const githubOAuth = () => {
    console.log("githubbing");
    window.location.href = "/auth/github";
  };

  const googleOAuth = () => {
    console.log("googling");
    window.location.href = "/auth/google";
  };

  const microsoftOAuth = () => {
    console.log("microsofting");
    window.location.href = "/auth/microsoft";
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
        style={{ display: "block", position: "center", marginTop: "30vh" }}
      >
        <Modal.Dialog>
          <Modal.Header className="p-5 pb-4 border-bottom-0 justify-content-center">
            <Modal.Title className="fw-bold mb-0 fs-2">
              Sign In to Rho Beta Epsilon
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="p-5 pt-0">
            <hr className="my-4" />
            <Button
              variant="primary"
              id="githubButton"
              className="w-100 py-2 mb-2 rounded-3"
              onClick={microsoftOAuth}
            >
              Sign in with Microsoft
            </Button>
            <Button
              variant="primary"
              id="googleButton"
              className="w-100 py-2 mb-2 rounded-3"
              onClick={googleOAuth}
            >
              Sign in with Google
            </Button>
            <Button
              variant="primary"
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
