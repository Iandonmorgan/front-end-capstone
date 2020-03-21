import React from "react";
import { Navbar, Nav } from 'react-bootstrap';
import { withRouter } from "react-router-dom";


const NavBar = props => {
  const clearUser = () => {
    sessionStorage.clear();
    localStorage.clear();
  };
  const handleLogout = () => {
    clearUser();
    props.history.push("/");
  };
  return (
    <Navbar bg="dark" variant="dark" expand="md" sticky="top">
      <Navbar.Brand href="/">Commissioner Mordan</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/artists">Artists</Nav.Link>
          <Nav.Link href="/projects">Projects</Nav.Link>
          <Nav.Link href="/contacts">Contacts</Nav.Link>
          <Nav.Link href="/shoots">Shoots</Nav.Link>
          <Nav.Link href="/edits">Edits</Nav.Link>
          <Nav.Link onClick={handleLogout} href="/">Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default withRouter(NavBar);
