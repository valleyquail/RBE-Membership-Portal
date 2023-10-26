import "../Theming/theming.css";
import Logo from "../Theming/Logo.png";
// import { organizationName } from "../Theming/site_control";
import "../css/sidebar.css";
import React, { ReactElement, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Outlet } from "react-router-dom";

interface LayoutProps {
  children: ReactElement[] | ReactNode[];
}

const Layout = () => {
  let location = useLocation();

  return (
    <Container fluid>
      <Row>
        <Col
          sm={3}
          className=" text-white min-vh-100 p-3 primary-color"
          style={{ width: "30vw" }}
        >
          <Navbar.Brand
            href="/home"
            className="d-flex align-items-center mb-3 mb-md-0 text-decoration-none"
          >
            <img src={Logo} alt="Rho Beta Epsilon Logo" width="100vh" />
            <span className="fs-4">yeet</span>
          </Navbar.Brand>
          <hr />
          <Nav
            activeKey={location.pathname}
            className="flex-column mb-auto"
            variant="pills"
          >
            <Nav.Item>
              <Nav.Link
                href="/home"
                style={{ color: "white", textDecoration: "none" }}
              >
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href="/attendance"
                style={{ color: "white", textDecoration: "none" }}
                // variant="sidebarLink"
              >
                Attendance
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href="/hours"
                style={{ color: "white", textDecoration: "none" }}
              >
                Hours
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href="/history"
                style={{ color: "white", textDecoration: "none" }}
              >
                History
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <hr />
          <NavDropdown
            title="Options"
            id="options-dropdown"
            className="btn-dark"
            // fixed="bottom"
          >
            <NavDropdown.Item href="/userpage">Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/signout" disabled>
              Sign out
            </NavDropdown.Item>
          </NavDropdown>
        </Col>

        <Col style={{ marginLeft: "2vw", marginTop: "5vh", overflow: "auto" }}>
          {/* <Outlet>{children}</Outlet> */}
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
