import React, { useState, useEffect } from "react";
import APIManager from '../../modules/APIManager';


const ArtistEditForm = (props) => {
    const activeUser = JSON.parse(sessionStorage.getItem('credentials'));
    const [artist, setArtist] = useState({ name: "", picUrl: "", url: "", availabilityNotes: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [userFollows, setUserFollows] = useState([]);
    const [isFollowing, setIsFollowing] = useState(true);

    const getArtist = () => {
        APIManager.get("artists", props.match.params.artistId).then(artist => {
            setArtist({
                name: artist.name,
                picUrl: artist.picUrl,
                url: artist.url,
                id: artist.id,
                availabilityNotes: artist.availabilityNotes
            })
        })
    };

    const getUserFollows = () => {
        let userArtists = [];
        APIManager.getAllWithUserId("userFollows", activeUser.id).then(followz => {
            for (let i = 0; i < followz.length; i++) {
                APIManager.getById("artists", followz[i].artistId).then(fArtist => {
                    userArtists.push(fArtist.flat());
                    setUserFollows(userArtists.flat());
                })
            }

        }).then(() => {
            getFollowingStatus();
        })
    };

    const getFollowingStatus = () => {
        APIManager.getByUserIdAndArtistId("userFollows", activeUser.id, props.artistId).then(follows => {
            if (follows.length === 0) {
                props.history.push(`/artists/${props.artistId}`)
                setIsFollowing(false);
            } else {
                follows.map(follow => {
                    if (activeUser.id === follow.userId && follow.artistId === parseInt(props.artistId)) {
                        setIsFollowing(true);
                    }
                })
            }
        });
    };

    const handleFieldChange = evt => {
        const stateToChange = { ...artist };
        stateToChange[evt.target.id] = evt.target.value;
        setArtist(stateToChange);
    };

    const updateExistingArtist = evt => {
        evt.preventDefault()
        setIsLoading(true);

        let dateTime = new Date().toLocaleString('en-GB', { timeZone: 'UTC' });

        const editedArtist = {
            id: artist.id,
            name: artist.name,
            picUrl: artist.picUrl,
            url: artist.url,
            availabilityNotes: artist.availabilityNotes,
            lastUpdatedByUserId: activeUser.id,
            last_updated_timestamp: dateTime
        };

        APIManager.update("artists", editedArtist)
            .then(() => props.history.push("/artists"))
    }

    useEffect(() => {
        getArtist();
        getUserFollows();
        setIsLoading(false);
    }, []);


    if (artist !== undefined) {
        return (
            <>
            <div className="artistEdit">
                <div className="artist-edit-icon-container">
                    <span data-tooltip="BACK"><i className="big arrow circle left icon" id="back-arrow-detail" onClick={() => props.history.push(`/artists/${artist.id}`)}></i></span>
                </div>
                <form>
                    <fieldset className="artistsEditForm">
                        <div className="formgrid">
                            <div>
                                <label htmlFor="name">Artist: </label>
                                <p>
                                    <input
                                        type="text"
                                        rows="1"
                                        cols="30"
                                        required
                                        className="form-control"
                                        defaultValue={artist.name}
                                        onChange={handleFieldChange}
                                        id="name"
                                        />
                                </p>
                            </div>
                            <div>
                                <label htmlFor="picUrl">picUrl: </label>
                                <p>
                                    <input
                                        type="text"
                                        rows="1"
                                        cols="80"
                                        required
                                        className="form-control"
                                        defaultValue={artist.picUrl}
                                        onChange={handleFieldChange}
                                        id="picUrl"
                                        />
                                </p>
                            </div>
                            <div>
                                <label htmlFor="url">URL: </label>
                                <p>
                                    <input
                                        type="text"
                                        rows="1"
                                        cols="80"
                                        required
                                        className="form-control"
                                        onChange={handleFieldChange}
                                        id="url"
                                        defaultValue={artist.url}
                                        />
                                </p>
                            </div>
                            <div>
                                <label htmlFor="availabilityNotes">Availability Notes: </label>
                                <p>
                                    <textarea
                                        type="text"
                                        rows="3"
                                        cols="60"
                                        required
                                        className="form-control"
                                        onChange={handleFieldChange}
                                        id="availabilityNotes"
                                        defaultValue={artist.availabilityNotes}
                                        />
                                </p>
                            </div>
                        </div>
                        <div className="artistEditFormBtn">
                            <button
                                type="button" disabled={isLoading}
                                onClick={updateExistingArtist}
                                id="artistEditFormBtn"
                                >Submit</button>
                        </div>
                    </fieldset>
                </form>
        </div>
            </>
        );
    } else {
        return (
            <></>
            );
    };
}

export default ArtistEditForm