import React, { useState, useEffect } from "react";
import APIManager from "../../modules/APIManager";
import "./Dashboard.css";
import DashboardCard from "./DashboardCard";


const DashboardList = (props) => {
    const [artists, setArtists] = useState([]);
    const [projects, setProjects] = useState([]);
    
    const getArtists = () => {
        return APIManager.getAll("artists").then(artistsFromAPI => {
            setArtists(artistsFromAPI)
        });
    };
    const getProjects = () => {
        return APIManager.getAll("projects").then(projectsFromAPI => {
            setProjects(projectsFromAPI)
        });
    };

    useEffect(() => {
        getArtists();
        getProjects();
    }, []);

    if (props.hasUser) {
        return (
            <>
                <section className="artist-section">
                    <div className="artist-name">
                        {artists.sort().map(artist =>
                            <DashboardCard
                                key={artist.id}
                                artist={artist}
                                projects={projects}
                                {...props}
                            />
                        )};
                    </div>
                </section >
            </>
        )
    } else {
        return (
            <>
                <div className="dashboard-container">
                    <div className="dashboard-picture">
                        <img
                            src="https://i.ibb.co/wcxDJFn/detective-512-298985.png"
                            alt="Commissioner Mordan"
                            className="dashboard-photo"
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
