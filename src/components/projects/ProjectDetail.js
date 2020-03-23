import React, { useState, useEffect } from "react";
import APIManager from "../../modules/APIManager";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const ProjectDetail = props => {
    const [project, setProject] = useState({ name: "", picUrl: "", url: "", availabilityNotes: "" });
    const [isLoading, setIsLoading] = useState(true);

    const handleDelete = () => {
        setIsLoading(true);
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => APIManager.delete("projects", props.projectId).then(() =>
                        props.history.push("/projects")
                    )
                },
                {
                    label: 'No',
                    onClick: () => ""
                }
            ]
        });
    };

    useEffect(() => {
        APIManager.get("projects", props.match.params.projectId).then(project => {
            setProject({
                name: project.name,
                description: project.description,
                expectedCompletion: project.expectedCompletion,
                id: project.id,
                streetAddress: project.streetAddress,
                statusId: project.statusId,
                isComplete: project.isComplete
            });
            setIsLoading(false);
        });
    }, [props.match.params.projectId]);

    if (project.name !== undefined && project.description !== undefined && project.expectedCompletion !== undefined) {
        return (
            <div className="projectDetail">
                <div className="icon-container">
                    <span data-tooltip="BACK"><i className="big arrow circle left icon" id="back-arrow-detail" onClick={() => props.history.push('/artists')}></i></span>
                    <span data-tooltip="ADD"><i className="big plus square outline icon" id="plusIcon" onClick={() => props.history.push('/artists/new')}></i></span>
                </div>
                <div className="projectsCardContent">
                <h3><span className="projectsCardTitle">
                        {project.name}
                    </span></h3>
                        <img className="projectDetailsImage" src={(project.picUrl)} alt={(project.name)} />
                    <p><a href={project.url}>{project.url}</a></p>
                    <div className="projectDetailsAvailability">Availability Notes: {project.availabilityNotes}</div>
                    <div align="right" className="subIcon-container">
                        <span data-tooltip="EDIT"><i className="big edit icon projectsDetailsEditIcon" onClick={() => props.history.push(`/projects/${project.id}/edit`)}></i></span>
                        <span data-tooltip="DELETE"><i className="big trash alternate icon projectsDetailsTrashIcon" disabled={isLoading} onClick={() => handleDelete()}></i></span>
                    </div>
                </div>
            </div >
        );
    } else {
        return (
            <div className="projectsCard">
                <div className="projectsCardContent">
                    <center><h3>PROJECTS CARD NOT FOUND</h3></center>
                </div>
            </div>
        )
    }
};

export default ProjectDetail;