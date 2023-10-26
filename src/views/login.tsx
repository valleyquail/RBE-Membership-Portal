import React from "react";
import Logo from "../Theming/Logo.png";
import { Image, Form, Button, Navbar } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const Login = () => {
  return (
    <div>
      <Navbar
        className="d-flex flex-wrap py-3 border-bottom primary-color"
        fixed="top"
      >
        <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis">
          {<Image src={Logo} alt="Logo" width="100vw" height="100vh" />}
          <div className="fs-1" style={{ color: "white" }}>
            Member Portal
          </div>
        </div>
      </Navbar>

      <div
        className="modal show"
        style={{ display: "block", position: "static", marginTop: "20vh" }}
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
                  //   onChange={(e) => setUsername(e.target.value)}
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
                  //   onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="passwordBox">Password</label>
              </Form.Floating>
              <Button
                variant="primary"
                type="submit"
                name="sign_in_button"
                className="w-100 mb-2 rounded-3"
                size="lg"
                // onClick={handleSubmit}
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
              //   onClick={googleOAuth}
            >
              Sign in with Google
            </Button>
            <Button
              variant="secondary"
              id="githubButton"
              className="w-100 py-2 mb-2 rounded-3"
              //   onClick={githubOAuth}
            >
              Sign in with GitHub
            </Button>
          </Modal.Body>
        </Modal.Dialog>
      </div>
    </div>
  );
};

export default Login;
