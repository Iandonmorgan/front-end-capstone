import React from "react";

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
    <>
      <div href="/">Commissioner Mordan</div>
      <a href="/artists">Artists</a>
      <a href="/projects">Projects</a>
      <div className="disabled">Contacts</div>
      <div className="disabled">Shoots</div>
      <div className="disabled">Edits</div>
      <a onClick={handleLogout} href="/">Logout</a>
    </>
  );
};
export default NavBar;
