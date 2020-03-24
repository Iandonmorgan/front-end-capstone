import React, { useState, useEffect } from "react";
import APIManager from "../../modules/APIManager";
import DateManager from "../../modules/DateManager";

const DashboardProjectList = (props) => {
    const [artistProject, setArtistProject] = useState([]);
    const [statusArray, setStatusArray] = useState([]);

    const getArtistProjects = (props) => {
        let artistProjects = [];
        APIManager.getAllWithExpand("artistProjects", "project").then(artistProjectz => {
            artistProjects = artistProjectz.sort(function (a, b) { return new Date(a.project.expectedCompletion) - new Date(b.project.expectedCompletion) }).filter(project => project.artistId === props.artist.id);
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
    }, [props]);

    return (
        <>
            {artistProject.map(artistProject => (
                <div className="dashboardProjectLine" key={artistProject.id.toString()} >
                    <div className="dashboardProjectItem" onClick={() => props.history.push(`/projects/${artistProject.projectId}`)} >
                        <div className="projectItemName">
                            {(artistProject.project.name.toUpperCase())}
                        </div>
                        <div className="projectItemDescription">
                            {(artistProject.project.description)}
                        </div>
                        <div className="projectItemDeadline">
                            {(DateManager.monthDayYear(artistProject.project.expectedCompletion))}
                        </div>
                        <div className="projectItemStatus">
                            {(statusArray[artistProject.project.statusId - 1])}
                        </div>
                    </div>
                </div>
            )
            )
            }
        </>
    )
};

export default DashboardProjectList;