import React, { useState } from "react";
import APIManager from '../../modules/APIManager';

const activeUser = JSON.parse(sessionStorage.getItem('credentials'));

const ArtistForm = (props) => {
    const [artist, setArtist] = useState({ name: "", picUrl: "", url: "", availabilityNotes: "" });
    const [isLoading, setIsLoading] = useState(false);


    const handleFieldChange = evt => {
        const stateToChange = { ...artist };
        stateToChange[evt.target.id] = evt.target.value;
        setArtist(stateToChange);
    };

    const createNewArtist = evt => {
        evt.preventDefault()
        setIsLoading(true);

        let dateTime = new Date().toLocaleString('en-GB', { timeZone: 'UTC' });

        const newArtist = {
            id: props.match.params.artistId,
            name: artist.name,
            picUrl: artist.picUrl,
            url: artist.url,
            availabilityNotes: artist.availabilityNotes,
            createdByUserId: activeUser.id,
            timestamp: dateTime
        };

        if (artist.name === "" || artist.picUrl === "" || artist.url === "") {
            window.alert("Please input a name, picUrl, and URL for your Artist.");
        } else {
            setIsLoading(true);
            APIManager.post("artists", newArtist)
                .then(() => props.history.push("/artists"))
        }
    };

    return (
        <>
            <div className="icon-container">
                <i className="big arrow circle left icon" id="back-arrow-detail" onClick={() => props.history.push('/artists')}></i>
            </div>
            <form>
                <fieldset className="artistsEditForm">
                    <div className="formgrid">
                        <div className="formgridItem">
                            <label htmlFor="name">Artist: </label>
                            <p>
                                <textarea
                                    type="text"
                                    cols="20"
                                    required
                                    className="form-control"
                                    onChange={handleFieldChange}
                                    id="name"
                                    value={artist.name}
                                />
                            </p>
                        </div>
                        <div className="formgridItem">
                            <label htmlFor="picUrl">picUrl: </label>
                            <p>
                                <textarea
                                    type="text"
                                    rows="1"
                                    cols="50"
                                    required
                                    className="form-control"
                                    onChange={handleFieldChange}
                                    id="picUrl"
                                    value={artist.picUrl}
                                />
                            </p>
                        </div>
                        <div className="formgridItem">
                            <label htmlFor="url">URL: </label>
                            <p>
                                <textarea
                                    type="text"
                                    rows="1"
                                    cols="60"
                                    required
                                    className="form-control"
                                    onChange={handleFieldChange}
                                    id="url"
                                    value={artist.url}
                                />
                            </p>
                        </div>
                        <div className="formgridItem">
                            <label htmlFor="availabilityNotes">Availability Notes: </label>
                            <p>
                                <textarea
                                    type="text"
                                    rows="1"
                                    cols="60"
                                    required
                                    className="form-control"
                                    onChange={handleFieldChange}
                                    id="availabilityNotes"
                                    value={artist.availabilityNotes}
                                />
                            </p>
                        </div>
                    </div>
                    <div className="alignRight">
                        <button
                            type="button" disabled={isLoading}
                            onClick={createNewArtist}
                            id="artistEditFormBtn"
                            className="ui blue basic button"
                        >Submit</button>
                    </div>
                </fieldset>
            </form>
        </>
    );
}

export default ArtistForm