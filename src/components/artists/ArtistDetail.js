import React, { useState, useEffect } from "react";
import APIManager from "../../modules/APIManager";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


const ArtistsDetail = props => {
    const activeUser = JSON.parse(sessionStorage.getItem('credentials'));
    const [artist, setArtist] = useState({ name: "", picUrl: "", url: "", availabilityNotes: "" });
    const [isLoading, setIsLoading] = useState(true);
    const [userFollows, setUserFollows] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);
    const [artists, setArtists] = useState([]);

    const handleDelete = () => {
        setIsLoading(true);
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => APIManager.delete("artists", props.artistId).then(() =>
                        props.history.push("/artists")
                    )
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
                setIsLoading(false);
                })
    }, []);

    let followArtisty = {
        "userId": activeUser.id,
        "artistId": artist.id
    }

    if (artist.name !== undefined && artist.picUrl !== undefined && artist.url !== undefined) {
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