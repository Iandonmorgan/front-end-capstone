import React, { useState, useEffect } from "react";
import APIManager from "../../modules/APIManager";

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
            <div className="dashboardProjectItem">
                {artistProject.map(artistProject => (
                    <>
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
                    </>
                )
                )
                }
            </div>
        </>
    )
};

export default DashboardProjectList;