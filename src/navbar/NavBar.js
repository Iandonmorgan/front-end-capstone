import React, { useState } from "react";
import { Navbar, Nav } from 'react-bootstrap';
import { withRouter } from "react-router-dom";


const NavBar = props => {
  const isAuthenticated = () => sessionStorage.getItem("credentials") !== null || localStorage.getItem("credentials") !== null;
  const [userFromState, setHasUser] = useState(isAuthenticated());
  const clearUser = () => {
    sessionStorage.clear();
    localStorage.clear();
    setHasUser(isAuthenticated());
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
