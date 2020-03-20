import React, { useState, useEffect } from "react";
import APIManager from '../../modules/APIManager';

const activeUser = JSON.parse(sessionStorage.getItem('credentials'));

const ArtistEditForm = (props) => {
    const [artist, setArtist] = useState({ name: "", picUrl: "", url: "", availabilityNotes: "" });
    const [isLoading, setIsLoading] = useState(false);


    const handleFieldChange = evt => {
        const stateToChange = { ...artist };
        stateToChange[evt.target.id] = evt.target.value;
        setArtist(stateToChange);
    };

    const updateExistingArtist = evt => {
        evt.preventDefault()
        setIsLoading(true);

        let dateTime = new Date().toLocaleString('en-GB', { timeZone: 'UTC' });

        const editedArtists = {
            id: props.match.params.artistId,
            name: artist.title,
            picUrl: artist.picUrl,
            url: artist.url,
            availabilityNotes: artist.availabilityNotes,
            createdByUserId: activeUser.id,
            timestamp: dateTime
        };

        APIManager.update("artists", editedArtists)
            .then(() => props.history.push("/artists"))
    }

    useEffect(() => {
        APIManager.get("artists", props.match.params.artistId)
            .then(artist => {
                setArtist(artist);
                setIsLoading(false);
            });
    }, [props.match.params.artistId]);

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
                                <textarea
                                    type="text"
                                    rows="2"
                                    cols="40"
                                    required
                                    className="form-control"
                                    onChange={handleFieldChange}
                                    id="name"
                                    value={artist.name}
                                />
                            </p>
                        </div>
                        <div>
                            <label htmlFor="picUrl">picUrl: </label>
                            <p>
                                <textarea
                                    type="text"
                                    rows="6"
                                    cols="50"
                                    required
                                    className="form-control"
                                    onChange={handleFieldChange}
                                    id="picUrl"
                                    value={artist.picUrl}
                                />
                            </p>
                        </div>
                        <div>
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
                        <div>
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
                            onClick={updateExistingArtist}
                            id="artistEditFormBtn"
                            className="ui blue basic button"
                        >Submit</button>
                    </div>
                </fieldset>
            </form>
        </>
    );
}

export default ArtistEditForm