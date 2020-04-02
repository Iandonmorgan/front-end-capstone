import React, { useCallback, useState, useEffect } from "react";
import APIManager from '../../modules/APIManager';
import CurrencyManager from '../../modules/CurrencyManager';
import { Dropdown } from 'semantic-ui-react';

const activeUser = JSON.parse(sessionStorage.getItem('credentials'));

const ProjectEditForm = (props) => {
    const [project, setProject] = useState({ name: "", expectedCompletion: "", description: "", budget: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [budgetValue, setBudgetValue] = useState(0);
    const [statusId, setStatusId] = useState(0);
    const [statusOptions, setStatusOptions] = useState([]);

    const handleClear = () => {
        setBudgetValue(0);
    }

    const handleStatusChange = (e, { value }) => {
        setStatusId(value);
    }

    const getStatusOptions = () => {
        return APIManager.getAll("statuses").then(results => {
            let statusOptionsArray = [];
            results.map(result => {
                let statusOption = {
                    key: result.id,
                    text: result.name,
                    value: result.id
                }
                statusOptionsArray.push(statusOption)
            })
            setStatusOptions(statusOptionsArray);
        })
    }

    // CURRENCY MANAGER CODE FROM JOHN TUCKER, GAINESVILLE, FL https://github.com/larkintuckerllc/react-currency-input
    const handleValueChange = useCallback(val => {
        setBudgetValue(val);
    }, []);

    const getProject = () => {
        return APIManager.getById("projects", parseInt(props.match.params.projectId))
            .then(project => {
                setProject(project);
                setBudgetValue(project[0].budget);
                setStatusId(project[0].statusId);
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
        if (project.name !== "" && project.expectedCompletion !== "" && project.description !== "" && project.budget !== "" && statusId && statusId !== "") {
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
                statusId: statusId,
                lastUpdatedTimestamp: dateTime
            };

            APIManager.update("projects", editedProject)
                .then(() => props.history.push(`/projects/${editedProject.id}`))
        } else {
            window.alert("PLEASE COMPLETE ALL FIELDS PRIOR TO SUBMITTING")
        }
    }

    useEffect(() => {
        getStatusOptions()
            .then(() => getProject()
                .then(() => getEditStatus()))
    }, []);

    if (project[0] !== undefined) {
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
                            <label htmlFor="budget">Budget: </label>
                            <div className="budgetContainer">
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
                                <span data-tooltip="CLEAR BUDGET" className="clearBudgetIcon">
                                    <i
                                        type="button"
                                        onClick={handleClear}
                                        id="clearBudgetBtn"
                                        className="small redo green icon clearBudgetBtn"
                                    ></i>
                                </span>
                            </div>
                            <div>
                                <label htmlFor="status">Status: </label>
                                <div>
                                    <Dropdown
                                        search
                                        searchInput={{ type: 'text' }}
                                        options={statusOptions}
                                        selection
                                        id="statusId"
                                        onChange={handleStatusChange}
                                        value={parseInt(statusId)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="alignRight">
                            <button
                                type="button" disabled={isLoading}
                                onClick={updateExistingProject}
                                id="projectEditFormBtn"
                            >SAVE</button>
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