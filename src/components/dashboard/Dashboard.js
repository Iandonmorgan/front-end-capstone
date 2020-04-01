import React, { useState, useEffect } from "react";
import APIManager from "../../modules/APIManager";
import DashboardCard from "./DashboardCard";



const DashboardList = (props) => {
    const [artists, setArtists] = useState([]);
    const [projects, setProjects] = useState([]);

    const getProjectsAndArtists = () => {
        return APIManager.getAll("projects").then(projectsFromAPI => {
            setProjects(projectsFromAPI);
        }
        ).then(APIManager.getAll("artists").then(artistsFromAPI => {
            // this .sort() method puts artists in alphabetical order on dashboard.
            setArtists(artistsFromAPI.sort(function(a, b) {
                var nameA = a.name.toUpperCase();
                var nameB = b.name.toUpperCase(); 
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
                return 0;
              }));
        })
        );
    };
    useEffect(() => {
        getProjectsAndArtists();
    }, []);

    if (props.hasUser) {
        return (
            <>
                <section className="dashboard-artist-section">
                        {artists.sort().map(artist => (
                            <DashboardCard
                                key={artist.id}
                                artist={artist}
                                projects={projects}
                                {...props}
                            />
                        ))}
                </section >
            </>
        )
    } else {
        return (
            <>
                <div className="dashboard-container">
                    <div className="dashboard-picture">
                        <img
                            src="https://i.ibb.co/HrvZrtw/logo512.png"
                            alt="Commissioner Mordan Logo"
                            className="logo"
                        />
                    </div>
                    <div className="button-container">
                        {!props.hasUser ? (
                            <button
                                id="loginBtn"
                                className="button"
                                onClick={() => {
                                    props.history.push("/login");
                                }}
                            >
                                Sign In
                            </button>
                        ) : null}
                        {!props.hasUser ? (
                            <button
                                id="createUserBtn"
                                className="button"
                                onClick={() => props.history.push("/createuser")}
                            >
                                Create Account
                            </button>
                        ) : null}
                    </div>
                </div>
            </>
        );
    };
};

export default DashboardList;
