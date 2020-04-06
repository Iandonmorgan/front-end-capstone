import React, { useState, useEffect } from "react";
import APIManager from "../../modules/APIManager";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import SocialUrlCard from "../socialUrls/SocialUrlCard"

const ArtistsDetail = props => {
    const activeUser = JSON.parse(sessionStorage.getItem('credentials'));
    const [artist, setArtist] = useState({ name: "", picUrl: "", url: "", availabilityNotes: "" });
    const [isLoading, setIsLoading] = useState(true);
    const [userFollows, setUserFollows] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);
    const [artists, setArtists] = useState([]);
    const [artistProjects, setArtistProjects] = useState([]);
    const [socialUrls, setSocialUrls] = useState([]);
    const [socialUrlz, setSocialUrlz] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const getArtistProjects = () => {
        APIManager.getAllWithExpand("artistProjects", "artist").then(artistProjects => {
            setArtistProjects(artistProjects);
        });
    };

    const handleCreate = (evt) => {
        setIsLoading(true);
        let newSocialUrl = {};
        if (socialUrlz.url.split("://").length > 1) {
            newSocialUrl = {
                "projectId": props.match.params.projectId,
                "name": socialUrlz.name,
                "url": "https://" + socialUrlz.url.split("://")[1]
            }
        } else if (socialUrlz.url.split("://").length === 1) {
            newSocialUrl = {
                "projectId": props.match.params.projectId,
                "name": socialUrlz.name,
                "url": "https://" + socialUrlz.url.split("://")[0]
            }
        }
        if (socialUrlz.name !== "" && socialUrlz.url !== "") {

            APIManager.post("socialUrls", newSocialUrl).then(() => {
                getSocialUrls();
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

    const handleFieldChange = evt => {
        const stateToChange = { ...socialUrlz };
        stateToChange[evt.target.id] = evt.target.value;
        setSocialUrlz(stateToChange);
    };

    const handleDelete = () => {
        setIsLoading(true);
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        setIsLoading(true);
                        socialUrls.map(socialUrl => {
                            APIManager.delete("socialUrls", socialUrl.id);
                        })
                        artistProjects.map(artistProject => {
                            if (artistProject.artistId === artist.id) {
                                APIManager.delete("artistProjects", artistProject.id);
                            }
                        }
                        );
                        APIManager.delete("artists", artist.id).then(() =>
                            props.history.push("/artists")
                        )
                    }
                },
                {
                    label: 'No',
                    onClick: () => ""
                }
            ]
        });
    };

    const getArtists = () => {
        APIManager.getAll("artists").then(artistsFromAPI => {
            setArtists(artistsFromAPI);
        });
    };

    const getUserFollows = () => {
        let userArtists = [];
        return APIManager.getAllWithUserId("userFollows", activeUser.id).then(follows => {
            for (let i = 0; i < follows.length; i++) {
                APIManager.getById("artists", follows[i].artistId).then(fArtist => {
                    userArtists.push(fArtist.flat());
                    setUserFollows(userArtists.flat());
                })
            }

        }).then(() => {
            getFollowingStatus();
        })
    };
    const getFollowingStatus = () => {
        return APIManager.getByUserIdAndArtistId("userFollows", activeUser.id, artist.id).then(follows => {
            follows.map(follow => {
                if (activeUser.id === follow.userId && follow.artistId === artist.id) {
                    setIsFollowing(true);
                }
            })
        });
    };
    const followArtist = (userFollowObject) => {
        setIsLoading(true);
        confirmAlert({
            title: 'Confirm to follow',
            message: 'Are you sure you want to connect with this artist?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => APIManager.post("userFollows", userFollowObject).then(() =>
                        setIsFollowing(true),
                        getArtists()
                    )
                },
                {
                    label: 'No',
                    onClick: () => ""
                }
            ]
        });
    }
    const unfollowArtist = (userId, artistId) => {
        setIsLoading(true);
        confirmAlert({
            title: 'Confirm to unfollow',
            message: 'Are you sure you want to remove your connection with this artist?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => APIManager.getByUserIdAndArtistId("userFollows", userId, artistId).then(unfollowTarget => unfollowTarget.map(target => {
                        if (target.userId === userId && target.artistId === artistId) {
                            APIManager.delete("userFollows", target.id).then(() => {
                                setIsFollowing(false)
                                getArtists()
                            }
                            )
                        }
                    })
                    )
                },
                {
                    label: 'No',
                    onClick: () => ""
                }
            ]
        });
    }

    const getSocialUrls = () => {
        APIManager.getAllWithArtistId("socialUrls", props.match.params.artistId).then(socialUrls => {
            setSocialUrls(socialUrls);
        });
    };

    useEffect(() => {
        APIManager.get("artists", props.match.params.artistId).then(artist => {
            setArtist({
                name: artist.name,
                picUrl: artist.picUrl,
                url: artist.url,
                id: artist.id,
                availabilityNotes: artist.availabilityNotes
            })
        }).then(() => {
            getUserFollows();
            getSocialUrls();
            getArtistProjects();
            setIsLoading(false);
        })
    }, []);

    let followArtisty = {
        "userId": activeUser.id,
        "artistId": artist.id
    }
    let socialUrlHeader = "";

    if (artist.name !== undefined && artist.picUrl !== undefined && artist.url !== undefined) {
        if (socialUrls.length !== undefined) {
            if (socialUrls.length === 1) {
                socialUrlHeader = <div className="artistDetailsSocialUrlsHeader">Social URL:</div>
            } else if (socialUrls.length > 1) {
                socialUrlHeader = <div className="artistDetailsSocialUrlsHeader">Social URLs:</div>
            } else if (socialUrls.length === 0) {
                socialUrlHeader = <div className="artistDetailsSocialUrlsHeader">Wanna add a social URL?</div>
            } else {
                socialUrlHeader = "";
            }
        }
        getFollowingStatus();
        if (isFollowing) {
            return (
                <>
                    <div className="artistDetail">
                        <div className="artistsCardHeader">
                            <h3><span className="artistsCardDetailTitle">
                                {artist.name}
                            </span></h3>
                            <div className="artist-detail-icon-container">
                                <span data-tooltip="TO ARTISTS"><i className="big arrow circle left icon" id="back-arrow-detail" onClick={() => props.history.push('/artists')}></i></span>
                            </div>
                        </div>
                        <div className="artistDetailsContent">
                            <img className="artistDetailsImage" src={(artist.picUrl)} alt={(artist.name)} />
                            <p><a href={artist.url}>{artist.url}</a></p>
                            <div className="artistDetailsAvailability">Availability Notes: {artist.availabilityNotes}</div>
                            <div align="right" className="subIcon-container">
                                <span data-tooltip="EDIT"><i className="big edit icon artistsDetailsEditIcon" onClick={() => props.history.push(`/artists/${artist.id}/edit`)}></i></span>
                                <span data-tooltip="DELETE"><i className="big trash alternate icon artistsDetailsTrashIcon" disabled={isLoading} onClick={() => handleDelete()}></i></span>
                                <span data-tooltip="UNFOLLOW"><i className="big minus square red icon artistUnFollowIcon" disabled={isLoading} onClick={() => unfollowArtist(activeUser.id, artist.id)}></i></span>
                            </div>
                        </div>
                    </div >
                    <hr />
                    <div className="subArtistDetailsContainer">
                        <div className="artistDetailsSocialUrls">
                            {socialUrlHeader}
                            {socialUrls.map(socialUrl =>
                                <SocialUrlCard
                                    key={socialUrl.id}
                                    socialUrl={socialUrl}
                                    artistId={artist.id}
                                    getSocialUrls={getSocialUrls}
                                    setRefresh={setRefresh}
                                    {...props}
                                />)}
                            <div className="addSocialUrl">
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
                                <span data-tooltip="ADD Social URL" className="addSocialUrlIconContainer">
                                    <i
                                        type="button"
                                        onClick={handleCreate}
                                        id="createSocialUrlBtn"
                                        className="big plus square green icon addSocialUrlIcon"
                                    ></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className="artistDetail">
                        <div className="artistsCardHeader">
                            <h3><span className="artistsCardDetailTitle">
                                {artist.name}
                            </span></h3>
                            <div className="artist-detail-icon-container">
                                <span data-tooltip="TO ARTISTS"><i className="big arrow circle left icon" id="back-arrow-detail" onClick={() => props.history.push('/artists')}></i></span>
                            </div>
                        </div>
                        <div className="artistsCardContent">
                            <img className="artistDetailsImage" src={(artist.picUrl)} alt={(artist.name)} />
                            <p><a href={artist.url}>{artist.url}</a></p>
                            <div className="artistDetailsAvailability">Availability Notes: {artist.availabilityNotes}</div>
                            <div align="right" className="subIcon-container">
                                <span data-tooltip="FOLLOW"><i className="big plus square green icon artistFollowIcon" disabled={isLoading} onClick={() => followArtist(followArtisty)}></i></span>
                            </div>
                        </div>
                    </div >
                    <hr />
                    <div className="subDetailsContainer">
                        <div className="artistDetailsSocialUrls">
                            {socialUrlHeader}
                            {socialUrls.map(socialUrl =>
                                <SocialUrlCard
                                    key={socialUrl.id}
                                    socialUrl={socialUrl}
                                    artistId={artist.id}
                                    getSocialUrls={getSocialUrls}
                                    setRefresh={setRefresh}
                                    {...props}
                                />)}
                            <div className="addSocialUrl">
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
                                <span data-tooltip="ADD Social URL" className="addSocialUrlIconContainer">
                                    <i
                                        type="button"
                                        onClick={handleCreate}
                                        id="createSocialUrlBtn"
                                        className="big plus square green icon addSocialUrlIcon"
                                    ></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    } else {
        return (
            <>
                <div className="artistsCard">
                    <div className="artistsCardContent">
                        <center><h3>ARTISTS CARD NOT FOUND</h3></center>
                    </div>
                </div>
            </>
        )
    }
};

export default ArtistsDetail;