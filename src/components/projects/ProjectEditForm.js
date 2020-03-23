import React, { useState, useEffect } from "react";
import APIManager from '../../modules/APIManager';

const activeUser = JSON.parse(sessionStorage.getItem('credentials'));

const ProjectEditForm = (props) => {
    const [project, setProject] = useState({ name: "", picUrl: "", url: "", availabilityNotes: "" });
    const [isLoading, setIsLoading] = useState(false);

    const getProject = () => {
        APIManager.getById("projects", parseInt(props.match.params.projectId))
            .then(project => {
                setProject(project);
                setIsLoading(false);
            });
    };

    const handleFieldChange = evt => {
        const stateToChange = { ...project };
        stateToChange[evt.target.id] = evt.target.value;
        setProject(stateToChange);
    };

    const updateExistingProject = evt => {
        evt.preventDefault()
        setIsLoading(true);

        let dateTime = new Date().toLocaleString('en-GB', { timeZone: 'UTC' });


        const editedProject = {
            id: project[0].id,
            name: project.name,
            estimatedCompletion: project.expectedCompletion,
            description: project.description,
            streetAddress: project.streetAddress,
            lastUpdatedByUserId: activeUser.id,
            statusId: project.statusId,
            timestamp: dateTime
        };

        APIManager.update("projects", editedProject)
            .then(() => props.history.push("/projects"))
    }

    useEffect(() => {
        getProject();
    }, []);

    if (project[0] !== undefined) {
        return (
            <>
                <div className="icon-container">
                    <span data-tooltip="BACK"><i className="big arrow circle left icon" id="back-arrow-detail" onClick={() => props.history.push('/projects')}></i></span>
                </div>
                <form>
                    <fieldset className="projectsEditForm">
                        <div className="formgrid">
                            <div>
                                <label htmlFor="name">Project: </label>
                                <p>
                                    <input
                                        type="text"
                                        rows="1"
                                        cols="40"
                                        required
                                        className="form-control"
                                        defaultValue={project[0].name}
                                        onChange={handleFieldChange}
                                        id="name"
                                    />
                                </p>
                            </div>
                            <div>
                                <label htmlFor="estimatedCompletion">Target Deadline: </label>
                                <p>
                                    <input
                                        type="text"
                                        rows="1"
                                        cols="20"
                                        required
                                        className="form-control"
                                        defaultValue={project[0].expectedCompletion}
                                        onChange={handleFieldChange}
                                        id="estimatedCompletion"
                                    />
                                </p>
                            </div>
                            <div>
                                <label htmlFor="description">Description: </label>
                                <p>
                                    <input
                                        type="text"
                                        rows="3"
                                        cols="80"
                                        required
                                        className="form-control"
                                        onChange={handleFieldChange}
                                        id="description"
                                        defaultValue={project[0].description}
                                    />
                                </p>
                            </div>
                            <div>
                                <label htmlFor="streetAddress">Street Address: </label>
                                <p>
                                    <textarea
                                        type="text"
                                        rows="1"
                                        cols="40"
                                        required
                                        className="form-control"
                                        onChange={handleFieldChange}
                                        id="streetAddress"
                                        defaultValue={project[0].streetAddress}
                                    />
                                </p>
                            </div>
                            <div>
                                <label htmlFor="status">Status: </label>
                                <p>
                                    <textarea
                                        type="text"
                                        rows="1"
                                        cols="20"
                                        required
                                        className="form-control"
                                        onChange={handleFieldChange}
                                        id="status"
                                        defaultValue={project[0].statusId}
                                    />
                                </p>
                            </div>
                        </div>
                        <div className="alignRight">
                            <button
                                type="button" disabled={isLoading}
                                onClick={updateExistingProject}
                                id="projectEditFormBtn"
                                className="ui blue basic button"
                            >Submit</button>
                        </div>
                    </fieldset>
                </form>
            </>
        );
    } else {
        return "";
    };
}

export default ProjectEditForm