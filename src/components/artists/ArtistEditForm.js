import React, { useState, useEffect } from "react";
import APIManager from '../../modules/APIManager';

const activeUser = JSON.parse(sessionStorage.getItem('credentials'));

const ArtistEditForm = (props) => {
    const [artist, setArtist] = useState({ name: "", picUrl: "", url: "", availabilityNotes: "" });
    const [isLoading, setIsLoading] = useState(false);

    APIManager.getById("artists", parseInt(props.match.params.artistId))
            .then(artist => {
                setArtist(artist);
                setIsLoading(false);
            });

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
            id: artist[0].id,
            name: artist.title,
            picUrl: artist.picUrl,
            url: artist.url,
            availabilityNotes: artist.availabilityNotes,
            createdByUserId: activeUser.id,
            timestamp: dateTime
        };

        APIManager.update("artists", editedArtist)
            .then(() => props.history.push("/artists"))
    }

    useEffect(() => {
    }, []);

    if (artist[0] !== undefined) {
        return (
            <>
                <div className="icon-container">
                    <span data-tooltip="BACK"><i className="big arrow circle left icon" id="back-arrow-detail" onClick={() => props.history.push('/artists')}></i></span>
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
                                        value={artist[0].name}
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
                                        value={artist[0].picUrl}
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
                                        value={artist[0].url}
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
                                        value={artist[0].availabilityNotes}
                                    />
                                </p>
                            </div>
                        </div>
                        <div className="alignRight">
                            <button
                                type="button" disabled={isLoading}
                                onClick={updateExistingArtist}
                                id="artistEditFormBtn"
                                className="ui blue basic button"
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

export default ArtistEditForm