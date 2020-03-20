import { Route, Redirect } from "react-router-dom";

import React from "react";
import DashboardList from "./components/dashboard/Dashboard";
import Login from "./components/users/Login";
import CreateUser from "./components/users/CreateUser";
import ArtistsList from "./components/artists/ArtistsList";
import ArtistsDetail from "./components/artists/ArtistDetail";
import ArtistsEditForm from "./components/artists/ArtistEditForm";
import ArtistsForm from "./components/artists/ArtistForm";

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
        path="/dashboard"
        render={props => {
          return <DashboardList {...props} hasUser={hasUser} />;
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
      <Route
        exact
        path="/artists"
        render={props => {
          if (hasUser) {
            return <ArtistsList {...props} />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
      <Route
        exact
        path="/artists/:artistId(\d+)"
        render={props => {
          if (hasUser) {
            return (
              <ArtistsDetail
                artistId={parseInt(props.match.params.artistId)}
                {...props}
              />
            );
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
      <Route
        path="/artists/:artistsId(\d+)/edit"
        render={props => {
          if (hasUser) {
            return <ArtistsEditForm {...props} />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
      <Route
        path="/artists/new"
        render={props => {
          if (hasUser) {
            return <ArtistsForm {...props} />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
    </React.Fragment>
  );
};
export default ApplicationViews;
