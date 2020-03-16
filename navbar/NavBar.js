import React from "react";
import { stack as Menu } from "react-burger-menu";
import { withRouter } from "react-router-dom";
import "./NavBar.css";

const NavBar = props => {
  const handleLogout = () => {
    props.clearUser();
    props.history.push("/");
  };
  return (
    <Menu>
      {props.hasUser ? (
        <a className="menu-item" href="/">
          {" "}
          Dashboard{""}
        </a>
      ) : null}

      {props.hasUser ? (
        <a className="menu-item" href="/artists">
          Artists
        </a>
      ) : null}

      {props.hasUser ? (
        <a className="menu-item" href="/projects">
          Projects
        </a>
      ) : null}

      {props.hasUser ? (
        <a className="menu-item" href="/contacts">
          Contacts
        </a>
      ) : null}

      {props.hasUser ? (
        <a className="menu-item" href="/shoots">
          Shoots
        </a>
      ) : null}

      {props.hasUser ? (
        <a className="menu-item" href="/edits">
          Edits
        </a>
      ) : null}

      {props.hasUser ? (
        <a className="menu-item" onClick={handleLogout} href="/">
          {" "}
          Logout{" "}
        </a>
      ) : null}
    </Menu>
  );
};
export default withRouter(NavBar);
