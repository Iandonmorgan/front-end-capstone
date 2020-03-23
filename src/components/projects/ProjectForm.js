import React, { useState } from "react";
import APIManager from '../../modules/APIManager';

const activeUser = JSON.parse(sessionStorage.getItem('credentials'));

const ProjectForm = (props) => {
    const [project, setProject] = useState({ name: "", picUrl: "", url: "", availabilityNotes: "" });
    const [isLoading, setIsLoading] = useState(false);


    const handleFieldChange = evt => {
        const stateToChange = { ...project };
        stateToChange[evt.target.id] = evt.target.value;
        setProject(stateToChange);
    };

    const createNewProject = evt => {
        evt.preventDefault()
        setIsLoading(true);

        let dateTime = new Date().toLocaleString('en-GB', { timeZone: 'UTC' });

        const newProject = {
            name: project.name,
            picUrl: project.picUrl,
            url: project.url,
            availabilityNotes: project.availabilityNotes,
            createdByUserId: activeUser.id,
            timestamp: dateTime
        };

        if (project.name === "" || project.picUrl === "" || project.url === "") {
            window.alert("Please input a name, picUrl, and URL for your project.");
        } else {
            setIsLoading(true);
            APIManager.post("projects", newProject)
                .then(() => props.history.push("/projects"))
        }
    };

    return (
        <>
            <div className="icon-container">
                <i className="big arrow circle left icon" id="back-arrow-detail" onClick={() => props.history.push('/projects')}></i>
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
                                        defaultValue={project.name}
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
                                        defaultValue={project.estimatedCompletion}
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
                                        defaultValue={project.description}
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
                                        defaultValue={project.streetAddress}
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
                                        defaultValue={project.statusId}
                                    />
                                </p>
                            </div>
                        </div>
                        <div className="alignRight">
                            <button
                                type="button" disabled={isLoading}
                                onClick={createNewProject}
                                id="projectEditFormBtn"
                                className="ui blue basic button"
                            >Submit</button>
                        </div>
                    </fieldset>
            </form>
        </>
    );
}

export default ProjectForm