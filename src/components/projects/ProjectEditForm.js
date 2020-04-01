import React, { useCallback, useState, useEffect } from "react";
import APIManager from '../../modules/APIManager';
import CurrencyManager from '../../modules/CurrencyManager';
import StatusDropdown from './StatusDropdown';

const activeUser = JSON.parse(sessionStorage.getItem('credentials'));

const ProjectEditForm = (props) => {
    const [project, setProject] = useState({ name: "", expectedCompletion: "", description: "", budget: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [budgetValue, setBudgetValue] = useState(0);

    const handleValueChange = useCallback(val => {
        // CURRENCY MANAGER CODE FROM JOHN TUCKER, GAINESVILLE, FL https://github.com/larkintuckerllc/react-currency-input
        setBudgetValue(val);
    }, []);

    const getProject = () => {
        APIManager.getById("projects", parseInt(props.match.params.projectId))
            .then(project => {
                setProject(project);
                setBudgetValue(project[0].budget);
                setIsLoading(false);
            });
    };

    const handleFieldChange = evt => {
        const stateToChange = { ...project };
        stateToChange[evt.target.id] = evt.target.value;
        setProject(stateToChange);
    };

    const getEditStatus = () => {
        APIManager.getById("projects", props.match.params.projectId).then(project => {
            if (project[0].userId !== activeUser.id) {
                props.history.push(`/projects/${props.match.params.projectId}`)
            } else {

            }
        });
    };

    const updateExistingProject = evt => {
        evt.preventDefault()
        setIsLoading(true);

        let dateTime = new Date().toLocaleString('en-GB', { timeZone: 'UTC' });


        const editedProject = {
            id: project[0].id,
            name: project.name,
            expectedCompletion: project.expectedCompletion,
            description: project.description,
            budget: budgetValue,
            lastUpdatedByUserId: activeUser.id,
            statusId: project.statusId,
            lastUpdatedTimestamp: dateTime
        };

        APIManager.update("projects", editedProject)
            .then(() => props.history.push(`/projects/${editedProject.id}`))
    }

    useEffect(() => {
        getProject();
        getEditStatus();
    }, []);

    if (project[0] !== undefined) {
        console.log("STATUS ID - - - ", project[0].statusId)
        return (
            <>
                <div className="project-editForm-icon-container">
                    <span data-tooltip="BACK"><i className="big arrow circle left icon" id="back-arrow-detail" onClick={() => props.history.push(`/projects/${project[0].id}`)}></i></span>
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
                                <label htmlFor="expectedCompletion">Target Deadline: </label>
                                <p>
                                    <input
                                        type="date"
                                        rows="1"
                                        cols="20"
                                        required
                                        className="form-control"
                                        defaultValue={project[0].expectedCompletion}
                                        onChange={handleFieldChange}
                                        id="expectedCompletion"
                                    />
                                </p>
                            </div>
                            <div>
                                <label htmlFor="description">Description: </label>
                                <p>
                                    <textarea
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
                                <label htmlFor="budget">Budget: </label>
                                <p>
                                    <CurrencyManager
                                        max={100000000}
                                        onValueChange={handleValueChange}
                                        id="budget"
                                        style={{ textAlign: 'right' }}
                                        defaultValue={project[0].budget}
                                        value={budgetValue}
                                    />
                                </p>
                            </div>
                            <div>
                                <label htmlFor="status">Status: </label>
                                <div>
                                    <StatusDropdown
                                        onChange={handleFieldChange}
                                        id="statusId"
                                        defaultValue={project[0].statusId}
                                    />
                                    {/* <textarea
                                        type="text"
                                        rows="1"
                                        cols="20"
                                        required
                                        className="form-control"
                                        onChange={handleFieldChange}
                                        id="statusId"
                                        defaultValue={project[0].statusId}
                                    /> */}
                                </div>
                            </div>
                        </div>
                        <div className="alignRight">
                            <button
                                type="button" disabled={isLoading}
                                onClick={updateExistingProject}
                                id="projectEditFormBtn"
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