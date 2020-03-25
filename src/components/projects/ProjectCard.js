import React, { useState, useEffect } from "react";
import APIManager from "../../modules/APIManager";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import DateManager from "../../modules/DateManager";




const ProjectCard = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [statusArray, setStatusArray] = useState([]);

    const handleDelete = () => {
        setIsLoading(true);
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => APIManager.delete("projects", props.project.id).then(() =>
                        props.getProjects()
                    )
                },
                {
                    label: 'No',
                    onClick: () => ""
                }
            ]
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
        getStatuses();
    }, []);

    return (
        <>
            <div className="projectsCard">
                <div className="projectItem">
                    <div className="projectsCardContent" key={props.project.id.toString()} onClick={() => props.history.push(`/projects/${props.project.id}`)} >
                        <div className="projectItemName">
                            {(props.project.name.toUpperCase())}
                        </div>
                        <div className="projectItemDescription">
                            {(props.project.description)}
                        </div>
                        <div className="projectItemDeadline">
                            {(DateManager.monthDayYear(props.project.expectedCompletion))}
                        </div>
                        <div className="projectItemStatus">
                            {(statusArray[props.project.statusId - 1])}
                        </div>
                    </div>
                    {/* <div align="right" className="projectCardSubIcons">
                        <span data-tooltip="DETAILS"><i className="small file alternate icon projectFileIcon" onClick={() => props.history.push(`/projects/${props.project.id}`)}></i></span>
                        <span data-tooltip="EDIT"><i className="small edit icon projectDetailIcon" onClick={() => props.history.push(`/projects/${props.project.id}/edit`)}></i></span>
                        <span data-tooltip="DELETE"><i className="small trash alternate icon projectTrashIcon" disabled={isLoading} onClick={() => handleDelete()}></i></span>
                    </div> */}
                </div>
            </div>
        </>
    );
}

export default ProjectCard;