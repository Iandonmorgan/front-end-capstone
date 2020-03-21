import React, { useState, useEffect } from "react";
import APIManager from "../../modules/APIManager";
import DateManager from "../../modules/DateManager";

const DashboardProjectList = (props) => {
    const [artistProject, setArtistProject] = useState([]);
    const [statusArray, setStatusArray] = useState([]);

    const getArtistProjects = (props) => {
        let artistProjects = [];
        APIManager.getAllWithExpand("artistProjects", "project").then(artistProjectz => {
            artistProjects = artistProjectz.sort(function(a, b){return new Date(a.project.expectedCompletion) - new Date (b.project.expectedCompletion)}).filter(project => project.artistId === props.artist.id);
            setArtistProject(artistProjects);
        });
    };
    
    const getStatuses = () => {
        let statuses = [];
        const statusFunction = (status) => {
            return status.name
        }
        APIManager.getAll("statuses").then(status => {
            statuses = status.map(statusFunction);
            setStatusArray(statuses);
        });
    };

    useEffect(() => {
        getArtistProjects(props);
        getStatuses();
    });

    return (
        <>
                {artistProject.map(artistProject => (
                <div className="dashboardProjectItem" key={artistProject.id.toString()}>
                    <div className="dashboardProjectItemName">
                        {(artistProject.project.name.toUpperCase())}
                    </div>
                    <div className="dashboardProjectItemDescription">
                        {(artistProject.project.description)}
                    </div>
                    <div className="dashboardProjectItemDeadline">
                        {(DateManager.monthDayYear(artistProject.project.expectedCompletion))}
                    </div>
                    <div className="dashboardProjectItemStatus">
                        {(statusArray[artistProject.project.statusId - 1])}
                    </div>
                    </div>
                )
                )
            }
        </>
    )
};

export default DashboardProjectList;