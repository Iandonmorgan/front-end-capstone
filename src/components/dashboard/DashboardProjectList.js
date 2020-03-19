import React, { useState, useEffect } from "react";
import APIManager from "../../modules/APIManager";

let statusArray = [];

const DashboardProjectList = (props) => {
    const [artistProject, setArtistProject] = useState([]);

    const getArtistProjects = (props) => {
        let artistProjects = [];
        APIManager.getAllWithExpand("artistProjects", "project").then(artistProjectz => {
            artistProjects = artistProjectz.filter(project => project.artistId === props.artist.id);
            setArtistProject(artistProjects);
        });
    };

    useEffect(() => {
        getArtistProjects(props);
    }, []);

    return (
        <>
                {artistProject.map(artistProject => (
                <div className="dashboardProjectItem" key={artistProject.id.toString()}>
                    <div className="dashboardProjectItemName">
                        {(artistProject.project.name)}
                    </div>
                    <div className="dashboardProjectItemDetails">
                        {(artistProject.project.details)}
                    </div>
                    <div className="dashboardProjectItemDeadline">
                        {(artistProject.project.expectedCompletion)}
                    </div>
                    <div className="dashboardProjectItemStatus">
                        {(artistProject.project.statusId)}
                    </div>
                    </div>
                )
                )
            }
        </>
    )
};

export default DashboardProjectList;