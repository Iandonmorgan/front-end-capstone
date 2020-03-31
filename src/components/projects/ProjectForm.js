import React, { useCallback, useState } from "react";
import APIManager from '../../modules/APIManager';
import CurrencyManager from '../../modules/CurrencyManager';

const activeUser = JSON.parse(sessionStorage.getItem('credentials'));

const ProjectForm = (props) => {
    const [project, setProject] = useState({ name: "", picUrl: "", url: "", availabilityNotes: "" });
    const [isLoading, setIsLoading] = useState(false);

    const [budgetValue, setBudgetValue] = useState(0);
    const handleValueChange = useCallback(val => {
      // CURRENCY MANAGER CODE FROM JOHN TUCKER, GAINESVILLE, FL https://github.com/larkintuckerllc/react-currency-input
      setBudgetValue(val);
    }, []);

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
            expectedCompletion: project.expectedCompletion,
            description: project.description,
            budget: budgetValue,
            statusId: 1,
            isOnTrack: true,
            userId: activeUser.id,
            created_timestamp: dateTime
        };

        if (project.name === "" || project.description === "" || project.expectedCompletion === "") {
            window.alert("Please input a name, description, and estimated completion date for your project.");
        } else {
            setIsLoading(true);
            APIManager.post("projects", newProject)
                .then(() => props.history.push("/projects"))
        }
    };

    return (
        <>
            <div className="project-editForm-icon-container">
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
                                        defaultValue={project.name}
                                        onChange={handleFieldChange}
                                        id="name"
                                    />
                                </p>
                            </div>
                            <div>
                                <label htmlFor="expectedCompletion">Target Deadline: </label>
                                <p>
                                    <input
                                        type="date"
                                        rows="1"
                                        cols="20"
                                        required
                                        className="form-control"
                                        defaultValue={project.expectedCompletion}
                                        onChange={handleFieldChange}
                                        id="expectedCompletion"
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
                                <label htmlFor="budget">Total Budget: </label>
                                <p>
                                    <CurrencyManager
                                        max={100000000}
                                        onValueChange={handleValueChange}
                                        id="budget"
                                        style={{ textAlign: 'right' }}
                                        defaultValue={project.budget}
                                        value={budgetValue}
                                    />
                                </p>
                            </div>
                        </div>
                        <div className="alignRight">
                            <button
                                type="button" disabled={isLoading}
                                onClick={createNewProject}
                                id="projectEditFormBtn"
                            >Submit</button>
                        </div>
                    </fieldset>
            </form>
        </>
    );
}

export default ProjectForm