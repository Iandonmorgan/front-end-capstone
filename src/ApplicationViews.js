import { Route, Redirect } from "react-router-dom";

import React, { useState } from "react";
import DashboardList from "./components/dashboard/Dashboard";
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
          if (hasUser) {
            return (
              <>
                <DashboardList {...props} hasUser={hasUser} />
              </>
            );
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />

      <Route
        path="/login"
        render={props => {
          return <Login setUser={setUser} {...props} />;
        }}
      />
      <Route
        path="/createuser"
        render={props => {
          return <CreateUser setUser={setUser} {...props} />;
        }}
      />
    </React.Fragment>
  );
};
export default ApplicationViews;
