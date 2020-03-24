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
        APIManager.getWithExpand("projects", props.match.params.projectId, "status").then(project => {
            setProject({
                name: project.name,
                description: project.description,
                expectedCompletion: project.expectedCompletion,
                id: project.id,
                streetAddress: project.streetAddress,
                status: project.status.name,
                isComplete: project.isComplete
            });
            setIsLoading(false);
        });
    }, [props.match.params.projectId]);

    if (project.name !== undefined && project.description !== undefined && project.expectedCompletion !== undefined) {
        return (
            <div className="projectDetail">
                <div className="projectCardHeader">
                    <h3><span className="projectCardTitle">
                        {project.name}
                    </span></h3>
                    <div className="project-detail-icon-container">
                        <span data-tooltip="TO PROJECTS"><i className="big arrow circle left icon" id="back-arrow-detail" onClick={() => props.history.push('/projects')}></i></span>
                    </div>
                </div>
                <div className="projectDetailsExpectedCompletion">Expected Completion: {project.expectedCompletion}</div>
                <div className="projectDetailsAvailability">Description: {project.description}</div>
                <div className="projectDetailsAvailability">Status: {project.status}</div>
                <div align="right" className="subIcon-container">
                    <span data-tooltip="EDIT"><i className="big edit icon projectsDetailsEditIcon" onClick={() => props.history.push(`/projects/${project.id}/edit`)}></i></span>
                    <span data-tooltip="DELETE"><i className="big trash alternate icon projectsDetailsTrashIcon" disabled={isLoading} onClick={() => handleDelete()}></i></span>
                </div>
            </div>
        );
    } else {
    return (
        <div className="projectCard">
            <div className="projectCardContent">
                <center><h3>PROJECT CARD NOT FOUND</h3></center>
            </div>
        </div>
    )
}
};

export default ProjectDetail;