import React, { useState, useEffect } from "react";
import APIManager from "../../modules/APIManager";

const DashboardProjectList = (props) => {
    const [artistProject, setArtistProject] = useState([]);

    const getArtistProjects = () => {
        let artistProjects = [];
        return APIManager.getAll("artistProjects").then(projects => {
            for (let i = 0; i < projects.length; i++) {
                if (projects[i].artistId === props.artist.id) {
                    APIManager.getAllWithExpand("projects", projects[i].artistId, "project").then(projects => {
                        artistProjects.push(projects.flat());
                    })
                }
            }
            setArtistProject(artistProjects.flat());
        });
    };

    useEffect(() => {
        getArtistProjects();
    }, [props.artist.id]);

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