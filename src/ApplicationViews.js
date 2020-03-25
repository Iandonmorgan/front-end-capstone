import { Route, Redirect } from "react-router-dom";
import React from "react";
import DashboardList from "./components/dashboard/Dashboard";
import Login from "./components/users/Login";
import CreateUser from "./components/users/CreateUser";
import ArtistsList from "./components/artists/ArtistsList";
import ArtistsDetail from "./components/artists/ArtistDetail";
import ArtistsEditForm from "./components/artists/ArtistEditForm";
import ArtistsForm from "./components/artists/ArtistForm";
import ProjectsList from "./components/projects/ProjectsList";
import ProjectDetail from "./components/projects/ProjectDetail";
import ProjectEditForm from "./components/projects/ProjectEditForm";
import ProjectForm from "./components/projects/ProjectForm";
import Welcome from "./components/welcome/Welcome";

const ApplicationViews = props => {
  const hasUser = props.hasUser;
  const setUser = props.setUser;

  return (
    <React.Fragment>
      <Route
        exact
        path="/welcome"
        render={props => {
          if (hasUser) {
            return <Welcome {...props} />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
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
                artist={props.artist}
                {...props}
              />
            );
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
      <Route
        path="/artists/:artistId(\d+)/edit"
        render={props => {
          if (hasUser) {
              return <ArtistsEditForm 
              artistId={props.match.params.artistId}
              {...props}
              />;
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
      <Route
        exact
        path="/projects"
        render={props => {
          if (hasUser) {
            return <ProjectsList {...props} />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
      <Route
        exact
        path="/projects/:projectId(\d+)"
        render={props => {
          if (hasUser) {
            return (
              <ProjectDetail
                project={props.project}
                {...props}
              />
            );
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
      <Route
        path="/projects/:projectId(\d+)/edit"
        render={props => {
          if (hasUser) {
              return <ProjectEditForm 
              projectId={props.match.params.projectId}
              {...props}
              />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
      <Route
        path="/projects/new"
        render={props => {
          if (hasUser) {
            return <ProjectForm {...props} />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
    </React.Fragment>
  );
};
export default ApplicationViews;
