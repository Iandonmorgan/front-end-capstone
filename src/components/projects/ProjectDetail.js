import React, { useState, useEffect } from "react";
import APIManager from "../../modules/APIManager";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ArtistConnectCard from '../artistProjects/ArtistConnectCard';
import { Dropdown } from 'semantic-ui-react';

const ProjectDetail = props => {
    const activeUser = JSON.parse(sessionStorage.getItem('credentials'));
    const [project, setProject] = useState({ name: "", picUrl: "", url: "", availabilityNotes: "" });
    const [artist, setArtist] = useState([]);
    const [unattachedArtists, setUnattachedArtists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [artistProjects, setArtistProjects] = useState([]);
    const [editAbility, setEditAbility] = useState(false);

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
                streetAddress: project.streetAddress,
                status: project.status.name,
                isComplete: project.isComplete
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

    // REFACTOR CODE BELOW TO PULL AND SET THIS INFO SOONER

    const getUnattachedArtists = () => {
        // setUnattachedArtists([{id: 1, name: "Menna", picUrl: "https://i.ibb.co/vck73v1/meredith-200x100.png", url: "https://mennanation.com", availabilityNotes: "Short term availabilities, however given Covid-19 …l need details to confirm availability. All good!"}, {id: 2, name: "Batman", picUrl: "https://i.ibb.co/44VbQfB/batman-200x100.png", url: "https://en.wikipedia.org/wiki/Batman", availabilityNotes: "Batman is always available for crime fighting or r…usic. Few people know about The Bruce Wayne Trio."}, {id: 3, name: "Rory", picUrl: "https://i.ibb.co/F6YKfPw/rory-200x100.png", url: "https://www.instagram.com/eastnashvilleblackdog/", availabilityNotes: "He is very attached to his owner, and since Covid-…to all of the Christmas hits you know and love..."}, {name: "Jazzy Jeff", picUrl: "https://bucket.mn2s.com/wp-content/uploads/2017/05/29135534/DJ-Jazzy-Jeff-MN2S-.png", url: "https://www.djjazzyjeff.com/", availabilityNotes: "Diagnosed with covid-19, please respect Jeff's privacy at this time.", userId: 46}, {name: "Madonna", picUrl: "https://m.media-amazon.com/images/M/MV5BMTA3NDQ3NT…BbWU3MDI1MjQ1OTY@._V1_UX214_CR0,0,214,317_AL_.jpg", url: "ma", availabilityNotes: "asdf", createdByUserId: 1}]);

        APIManager.getAll("artists").then(artistsFromAPI => {
            APIManager.getAllWithProjectId("artistProjects", props.match.params.projectId).then(attachedArtists => {
                artistsFromAPI.map(artistFromAPI => {
                    for (let i=0; i < attachedArtists.length; i ++) {
                        if (attachedArtists[i].artistId === artistFromAPI.id) {
                            artistsFromAPI.splice(artistsFromAPI.findIndex(artist => artist.id === artistFromAPI.id), 1);
                        }
                    }
                })
                setUnattachedArtists(artistsFromAPI.sort(function(a, b) {
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
            //         attachedArtistIdsArray.push(attachedArtist.artistId);
            //     })
            // }).then(() => {
            //     artistsFromAPI.map(artist => {
            //         allArtistIdsArray.push(artist.id)
            //     })
            // }).then(() => {
            //     for (let i = 0; i < allArtistIdsArray.length; i++) {
            //         for (let j = 0; j < attachedArtistIdsArray.length; j++)
            //             if (allArtistIdsArray[i] === attachedArtistIdsArray[j]) {
            //                 allArtistIdsArray.splice(i, 1);
            //             }
            //     }
            //     for (let i = 0; i < allArtistIdsArray.length; i++) {
            //         APIManager.getById("artists", allArtistIdsArray[i]).then(artist => {
            //             unattachedArtistArray.push(artist[0]);
            //             setUnattachedArtists(unattachedArtistArray);
            //             console.log("UNATTACHED ARTIST ARRAY: ", unattachedArtistArray)
            //         })
            //     }
            // })
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

    const getArtist = () => {
        APIManager.getById("artists", props.UAId).then(artistFromAPI => {
            setArtist(artistFromAPI);
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
                        getArtistProjects()
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

    useEffect(() => {
        getArtist();
        getArtistProjects();
        getProject();
        hasEditAbility();
        getUnattachedArtists();
    }, []);

    let artistConnectHeader = "";
    if (artistProjects.length !== undefined) {
        if (artistProjects.filter(artistProject => artistProject.projectId === project.id).length === 1) {
            artistConnectHeader = <div className="projectDetailsConnectedArtistsHeader">This project is connected to:</div>
        } else if (artistProjects.filter(artistProject => artistProject.projectId === project.id).length > 1) {
            artistConnectHeader = <div className="projectDetailsConnectedArtistsHeader">Artists connected to this project:</div>
        } else {
            artistConnectHeader = "";
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
                            <div className="projectDetailsExpectedCompletion">Expected Completion: {project.expectedCompletion}</div>
                            <div className="projectDetailsAvailability">Description: {project.description}</div>
                            <div className="projectDetailsAvailability">Status: {project.status}</div>
                            <div align="right" className="subIcon-container">
                                <span data-tooltip="EDIT"><i className="big edit icon projectsDetailsEditIcon" onClick={() => props.history.push(`/projects/${project.id}/edit`)}></i></span>
                                <span data-tooltip="DELETE"><i className="big trash alternate icon projectsDetailsTrashIcon" disabled={isLoading} onClick={() => handleDelete()}></i></span>
                            </div>
                            <div className="projectDetailsConnectedArtists">
                                {artistConnectHeader}
                                {artistProjects.map(connectItem =>
                                    <ArtistConnectCard
                                        key={connectItem.id}
                                        projectId={project.id}
                                        connect={connectItem}
                                        getArtistProjects={getArtistProjects}
                                        {...props}
                                    />)}
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
                                                console.log("OPTION NAME -- ", option.name),
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
                    </>
                );
            } else {
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
                        <div className="projectDetailsConnectedArtists">
                            {artistConnectHeader}
                            {artistProjects.map(connectItem =>
                                <ArtistConnectCard
                                    key={connectItem.id}
                                    projectId={project.id}
                                    connect={connectItem}
                                    getArtistProjects={getArtistProjects}
                                    {...props}
                                />)}
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
    } else {
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
    }
};

export default ProjectDetail;