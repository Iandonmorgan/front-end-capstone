import React from "react";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { withRouter } from "react-router-dom";

const NavBar = props => {
  const handleLogout = () => {
    props.clearUser();
    props.history.push("/");
  };
  return (
    <Navbar bg="dark" variant="dark" expand="md" sticky="top">
      <Navbar.Brand href="/">Commissioner Mordan</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Artists</Nav.Link>
          <Nav.Link href="/">Projects</Nav.Link>
          <Nav.Link href="/">Contacts</Nav.Link>
          <Nav.Link href="/">Shoots</Nav.Link>
          <Nav.Link href="/">Edits</Nav.Link>
          <Nav.Link onClick={handleLogout} href="/">Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default withRouter(NavBar);
