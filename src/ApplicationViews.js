import { Route } from "react-router-dom";
import React from "react";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/users/Login";
import CreateUser from "./components/users/CreateUser";

const ApplicationViews = props => {
  const hasUser = props.hasUser;
  const setUser = props.setUser;

  return (
    <React.Fragment>
      <Route
        exact
        path="/"
        render={props => {
          return <Dashboard {...props} hasUser={hasUser} />;
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
