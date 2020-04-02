import React, { useEffect, useState } from "react";
import { Navbar, Nav } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import APIManager from "../modules/APIManager";

const NavBar = props => {
  const [label, setLabel] = useState([]);

  const clearUser = () => {
    sessionStorage.clear();
    localStorage.clear();
  };
  const handleLogout = () => {
    clearUser();
    props.history.push("/");
  };
  const getLabel = () => {
    APIManager.getLabel().then(labelz => {
        setLabel(labelz[0])
    })
}
  useEffect(() => {
    getLabel();
  }, []);
  return (
    <Navbar bg="dark" variant="dark" expand="md" sticky="top">
      <Navbar.Brand href="/"><img className="labelLogo" src={label.logoUrl}/>{label.name}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          <Nav.Link href="/artists">Artists</Nav.Link>
          <Nav.Link href="/projects">Projects</Nav.Link>
          {/* <Nav.Link href="/contacts" className="disabled">Contacts</Nav.Link>
          <Nav.Link href="/shoots" className="disabled">Shoots</Nav.Link>
          <Nav.Link href="/edits" className="disabled">Edits</Nav.Link> */}
          <Nav.Link onClick={handleLogout} href="/">Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default withRouter(NavBar);
