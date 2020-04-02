import React, { useState, useEffect } from "react";
import APIManager from "../../modules/APIManager";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ArtistConnectCard from '../artistProjects/ArtistConnectCard';
import { Dropdown } from 'semantic-ui-react';
import DateManager from "../../modules/DateManager";
import ReferenceUrlCard from "../referenceUrls/ReferenceUrlCard"

const ProjectDetail = props => {
    const activeUser = JSON.parse(sessionStorage.getItem('credentials'));
    const [project, setProject] = useState({ name: "", expectedCompletion: "", description: "", budget: "" });
    const [projectCreator, setProjectCreator] = useState([]);
    const [artist, setArtist] = useState([]);
    const [unattachedArtists, setUnattachedArtists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [artistProjects, setArtistProjects] = useState([]);
    const [editAbility, setEditAbility] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [referenceUrls, setReferenceUrls] = useState([]);
    const [referenceUrlz, setReferenceUrlz] = useState({ name: "", url: "" })

    const handleFieldChange = evt => {
        const stateToChange = { ...referenceUrlz };
        stateToChange[evt.target.id] = evt.target.value;
        setReferenceUrlz(stateToChange);
    };

    const handleCreate = (evt) => {
        setIsLoading(true);
        let newReferenceUrl = {};
        if (referenceUrlz.url.split("://").length > 1) {
            newReferenceUrl = {
                "projectId": props.match.params.projectId,
                "name": referenceUrlz.name,
                "url": "https://" + referenceUrlz.url.split("://")[1]
            }
        } else if (referenceUrlz.url.split("://").length === 1) {
            newReferenceUrl = {
                "projectId": props.match.params.projectId,
                "name": referenceUrlz.name,
                "url": "https://" + referenceUrlz.url.split("://")[0]
            }
        }
        if (referenceUrlz.name !== "" && referenceUrlz.url !== "") {

            APIManager.post("referenceUrls", newReferenceUrl).then(() => {
                getReferenceUrls();
                setRefresh(true);
                setRefresh(false);
                document.getElementById("url").value = "";
                document.getElementById("name").value = "";
            }
            )
        } else {
            window.alert("PLEASE ENTER SITE NAME AND URL");
        }
        setIsLoading(false);
    };

    const getArtistProjects = () => {
        APIManager.getAllWithExpand("artistProjects", "artist").then(artistProjects => {
            setArtistProjects(artistProjects);
        });
    };
    const getProject = () => {
        APIManager.getWithExpand("projects", props.match.params.projectId, "status").then(project => {
            setProject({
                name: project.name,
                description: project.description,
                expectedCompletion: project.expectedCompletion,
                id: project.id,
                budget: project.budget,
                status: project.status.name,
                isOnTrack: project.isOnTrack
            });
            setIsLoading(false);
        });
    };
    const handleDelete = () => {
        setIsLoading(true);
        getArtistProjects();
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this project?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        artistProjects.map(artistProject => {
                            setIsLoading(true);
                            if (artistProject.projectId === project.id) {
                                APIManager.delete("artistProjects", artistProject.id).then(() =>
                                    props.history.push("/projects"))
                            }
                        }
                        );
                        APIManager.delete("projects", project.id).then(() =>
                            props.history.push("/projects"));
                    }
                },
                {
                    label: 'No',
                    onClick: () => ""
                }
            ]
        });
        setIsLoading(false);
    };

    const getUnattachedArtists = () => {
        APIManager.getAll("artists").then(artistsFromAPI => {
            APIManager.getAllWithProjectId("artistProjects", props.match.params.projectId).then(attachedArtists => {
                artistsFromAPI.map(artistFromAPI => {
                    for (let i = 0; i < attachedArtists.length; i++) {
                        if (attachedArtists[i].artistId === artistFromAPI.id) {
                            artistsFromAPI.splice(artistsFromAPI.findIndex(artist => artist.id === artistFromAPI.id), 1);
                        }
                    }
                })
                setUnattachedArtists(artistsFromAPI.sort(function (a, b) {
                    var nameA = a.name.toUpperCase();
                    var nameB = b.name.toUpperCase();
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                }));
            })
        });
    };

    const hasEditAbility = () => {
        APIManager.getById("projects", props.match.params.projectId).then(project => {
            if (project[0].userId === activeUser.id) {
                setEditAbility(true)
            } else {
                setEditAbility(false)
            }
        });
    };

    const getProjectCreator = () => {
        APIManager.getByIdWithExpand("projects", props.match.params.projectId, "user").then(project => {
            setProjectCreator(project[0].user.username);
        })
    }

    const getArtist = () => {
        APIManager.getById("artists", props.UAId).then(artistFromAPI => {
            setArtist(artistFromAPI);
        });
    };
    const getReferenceUrls = () => {
        APIManager.getAllWithProjectId("referenceUrls", props.match.params.projectId).then(referenceUrls => {
            setReferenceUrls(referenceUrls);
        });
    };

    const handleConnect = (artistId, projectId) => {
        setIsLoading(true);
        const newArtistProject = {
            "artistId": artistId,
            "projectId": projectId
        }
        confirmAlert({
            title: 'Confirm to connect',
            message: 'Are you sure you want to connect the project to this artist?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => APIManager.post("artistProjects", newArtistProject).then(() => {
                        getArtistProjects();
                        setRefresh(true);
                        setRefresh(false);
                    }
                    )
                },
                {
                    label: 'No',
                    onClick: () => ""
                }
            ]
        });
    };

    const formatMoney = (amount, decimalCount = 2, decimal = ".", thousands = ",") => {
        try {
            decimalCount = Math.abs(decimalCount);
            decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

            const negativeSign = amount < 0 ? "-" : "";

            let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
            let j = (i.length > 3) ? i.length % 3 : 0;

            return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
        } catch (e) {
        }
    };

    useEffect(() => {
        getArtist();
        getArtistProjects();
        getProject();
        hasEditAbility();
        getUnattachedArtists();
        getReferenceUrls();
        getProjectCreator();
    }, [refresh]);

    let artistConnectHeader = "";
    let referenceUrlHeader = "";
    if (artistProjects.length !== undefined) {
        if (artistProjects.filter(artistProject => artistProject.projectId === project.id).length === 1) {
            artistConnectHeader = <div className="projectDetailsConnectedArtistsHeader">This project is connected to:</div>
        } else if (artistProjects.filter(artistProject => artistProject.projectId === project.id).length > 1) {
            artistConnectHeader = <div className="projectDetailsConnectedArtistsHeader">Artists connected to this project:</div>
        } else {
            artistConnectHeader = "HI";
        }
        if (referenceUrls.length !== undefined) {
            if (referenceUrls.length === 1) {
                referenceUrlHeader = <div className="projectDetailsReferenceUrlsHeader">Reference URL:</div>
            } else if (referenceUrls.length > 1) {
                referenceUrlHeader = <div className="projectDetailsReferenceUrlsHeader">Reference URLs:</div>
            } else if (referenceUrls.length === 0) {
                referenceUrlHeader = <div className="projectDetailsReferenceUrlsHeader">Wanna add a reference URL?</div>
            } else {
                referenceUrlHeader = "";
            }
            if (project.name !== undefined && project.description !== undefined && project.expectedCompletion !== undefined) {
                if (editAbility) {
                    return (
                        <>
                            <div className="projectDetail">
                                <div className="projectCardHeader">
                                    <h3><span className="projectCardTitle">
                                        {project.name}
                                    </span></h3>
                                    <div className="project-detail-icon-container">
                                        <span data-tooltip="TO PROJECTS"><i className="big arrow circle left icon" id="back-arrow-detail" onClick={() => props.history.push('/projects')}></i></span>
                                    </div>
                                </div>
                                <fieldset className="projectDetailsDescription">{project.description}</fieldset>
                                <div className="projectDetailsTopRow">
                                    <div className="projectDetailsExpectedCompletion">Expected Completion: {DateManager.monthDayYear(project.expectedCompletion)}</div>
                                    <div className="projectDetailsCreator">Project Created By: {projectCreator}</div>
                                </div>
                                <div className="projectDetailsBottomRow">
                                    <div className="projectDetailsBudget">Budget: ${formatMoney(project.budget / 100)}</div>
                                    <div className="projectDetailsStatus">Status: {project.status}</div>
                                </div>
                                <div align="right" className="subIcon-container">
                                    <span data-tooltip="EDIT"><i className="big edit icon projectsDetailsEditIcon" onClick={() => props.history.push(`/projects/${project.id}/edit`)}></i></span>
                                    <span data-tooltip="DELETE"><i className="big trash alternate icon projectsDetailsTrashIcon" disabled={isLoading} onClick={() => handleDelete()}></i></span>
                                </div>
                                <hr />
                                <div className="subDetailsContainer">
                                    <div className="projectDetailsReferenceUrls">
                                        {referenceUrlHeader}
                                        {referenceUrls.map(referenceUrl =>
                                            <ReferenceUrlCard
                                                key={referenceUrl.id}
                                                referenceUrl={referenceUrl}
                                                projectId={project.id}
                                                getReferenceUrls={getReferenceUrls}
                                                setRefresh={setRefresh}
                                                {...props}
                                            />)}
                                        <div className="addReferenceUrl">
                                            <input
                                                type="text"
                                                rows="1"
                                                cols="20"
                                                required
                                                placeholder="ENTER SITE NAME"
                                                className="form-control"
                                                onChange={handleFieldChange}
                                                id="name"
                                            />
                                            <input
                                                type="url"
                                                rows="1"
                                                cols="20"
                                                required
                                                placeholder="ENTER SITE URL"
                                                className="form-control urlInput"
                                                onChange={handleFieldChange}
                                                id="url"
                                            />
                                            <span data-tooltip="ADD Reference URL" className="addReferenceUrlIconContainer">
                                                <i
                                                    type="button"
                                                    onClick={handleCreate}
                                                    id="createReferenceUrlBtn"
                                                    className="big plus square green icon addReferenceUrlIcon"
                                                ></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="projectDetailsConnectedArtists">
                                        {artistConnectHeader}
                                        <div className="artistConnectCards">
                                            {artistProjects.map(connectItem =>
                                                <ArtistConnectCard
                                                    key={connectItem.id}
                                                    projectId={project.id}
                                                    connect={connectItem}
                                                    getArtistProjects={getArtistProjects}
                                                    setRefresh={setRefresh}
                                                    {...props}
                                                />)}
                                        </div>
                                        <div className="artistProjectDropdown">
                                            <Dropdown
                                                text='Add Artist'
                                                icon='plus'
                                                floating
                                                labeled
                                                button
                                                className='icon'
                                            >
                                                <Dropdown.Menu>
                                                    <Dropdown.Header content='Unattached Artists' />
                                                    {unattachedArtists.map((option) => (
                                                        <Dropdown.Item
                                                            key={option.id}
                                                            text={option.name}
                                                            value={option.id}
                                                            onClick={() => handleConnect(option.id, project.id)}
                                                        />
                                                    ))}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    );
                } else {
                    return (
                        <>
                            <div className="projectDetail">
                                <div className="projectCardHeader">
                                    <h3><span className="projectCardTitle">
                                        {project.name}
                                    </span></h3>
                                    <div className="project-detail-icon-container">
                                        <span data-tooltip="TO PROJECTS"><i className="big arrow circle left icon" id="back-arrow-detail" onClick={() => props.history.push('/projects')}></i></span>
                                    </div>
                                </div>
                                <fieldset className="projectDetailsDescription">{project.description}</fieldset>
                                <div className="projectDetailsTopRow">
                                    <div className="projectDetailsExpectedCompletion">Expected Completion: {DateManager.monthDayYear(project.expectedCompletion)}</div>
                                    <div className="projectDetailsCreator">Project Created By: {projectCreator}</div>
                                </div>
                                <div className="projectDetailsBottomRow">
                                    <div className="projectDetailsBudget">Budget: ${formatMoney(project.budget / 100)}</div>
                                    <div className="projectDetailsStatus">Status: {project.status}</div>
                                </div>
                                <hr />
                                <div className="subDetailsContainer">
                                    <div className="projectDetailsReferenceUrls">
                                        {referenceUrlHeader}
                                        {referenceUrls.map(referenceUrl =>
                                            <ReferenceUrlCard
                                                key={referenceUrl.id}
                                                referenceUrl={referenceUrl}
                                                projectId={project.id}
                                                getReferenceUrls={getReferenceUrls}
                                                setRefresh={setRefresh}
                                                {...props}
                                            />)}
                                        <div className="addReferenceUrl">
                                            <input
                                                type="text"
                                                rows="1"
                                                cols="20"
                                                required
                                                placeholder="ENTER SITE NAME"
                                                className="form-control"
                                                onChange={handleFieldChange}
                                                id="name"
                                            />
                                            <input
                                                type="url"
                                                rows="1"
                                                cols="20"
                                                required
                                                placeholder="ENTER SITE URL"
                                                className="form-control urlInput"
                                                onChange={handleFieldChange}
                                                id="url"
                                            />
                                            <span data-tooltip="ADD Reference URL" className="addReferenceUrlIconContainer">
                                                <i
                                                    type="button"
                                                    onClick={handleCreate}
                                                    id="createReferenceUrlBtn"
                                                    className="big plus square green icon addReferenceUrlIcon"
                                                ></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="projectDetailsConnectedArtists">
                                        {artistConnectHeader}
                                        <div className="artistConnectCards">
                                            {artistProjects.map(connectItem =>
                                                <ArtistConnectCard
                                                    key={connectItem.id}
                                                    projectId={project.id}
                                                    connect={connectItem}
                                                    getArtistProjects={getArtistProjects}
                                                    setRefresh={setRefresh}
                                                    {...props}
                                                />)}
                                        </div>
                                        <div className="artistProjectDropdown">
                                            <Dropdown
                                                text='Add Artist'
                                                icon='plus'
                                                floating
                                                labeled
                                                button
                                                className='icon'
                                            >
                                                <Dropdown.Menu>
                                                    <Dropdown.Header content='Unattached Artists' />
                                                    {unattachedArtists.map((ua) => (
                                                        <Dropdown.Item
                                                            key={ua.id}
                                                            text={ua.name}
                                                            value={ua.id}
                                                            onClick={() => handleConnect(ua.id, project.id)}
                                                        />
                                                    ))}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    );
                }
            } else {
                return (
                    <div className="projectCard">
                        <div className="projectCardContent">
                            <center><h3>PROJECT CARD NOT FOUND</h3></center>
                        </div>
                    </div>
                )
            }
        }
    }
};

export default ProjectDetail;