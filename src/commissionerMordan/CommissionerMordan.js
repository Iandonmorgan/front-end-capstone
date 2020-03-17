import React, { useState} from "react";
import ApplicationViews from "../ApplicationViews";
import "../commissionerMordan/CommissionerMordan.css";

const CommissionerMordan = () => {
  const isAuthenticated = () =>
    sessionStorage.getItem("credentials") !== null ||
    localStorage.getItem("credentials") !== null;

  const [userFromState, setHasUser] = useState(isAuthenticated());

  const setUser = (user, status) => {
    if (status === true) {
    localStorage.setItem("credentials", JSON.stringify(user));
    sessionStorage.setItem("credentials", JSON.stringify(user));
    setHasUser(isAuthenticated());
    } else if (status === false) {
      sessionStorage.setItem("credentials", JSON.stringify(user));
      setHasUser(isAuthenticated());
    }
  };

  const clearUser = () => {
    sessionStorage.clear();
    localStorage.clear();
    setHasUser(isAuthenticated());
  };

  return (
    <>
      <ApplicationViews hasUser={userFromState} setUser={setUser} />
    </>
  );
};

export default CommissionerMordan;
