import { Route, Redirect } from "react-router-dom";
import React, { useState} from "react";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/users/Login";
import CreateUser from "./components/users/CreateUser";
import NavBar from "./navbar/NavBar";

const ApplicationViews = props => {
  const hasUser = props.hasUser;
  const setUser = props.setUser;
  const isAuthenticated = () => sessionStorage.getItem("credentials") !== null || localStorage.getItem("credentials") !== null;
  const [userFromState, setHasUser] = useState(isAuthenticated());
  const clearUser = () => {
    sessionStorage.clear();
    localStorage.clear();
    setHasUser(isAuthenticated());
  };

  return (
    <React.Fragment>
      <Route
        exact
        path="/"
        render={props => {
          if (hasUser) {
            return (
              <>
                <NavBar hasUser={userFromState} clearUser={clearUser} setUser={setUser} />
                <Dashboard {...props} hasUser={hasUser} />
              </>
            );
            return ;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />

      <Route
        exact
        path="/login"
        render={props => {
          return <Login setUser={setUser} {...props} />;
        }}
      />
      <Route
        exact
        path="/createuser"
        render={props => {
          return <CreateUser setUser={setUser} {...props} />;
        }}
      />
    </React.Fragment>
  );
};
export default ApplicationViews;
