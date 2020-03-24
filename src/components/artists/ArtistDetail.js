import React, { useState, useEffect } from "react";
import APIManager from "../../modules/APIManager";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const ArtistsDetail = props => {
    const [artist, setArtist] = useState({ name: "", picUrl: "", url: "", availabilityNotes: "" });
    const [isLoading, setIsLoading] = useState(true);

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

    useEffect(() => {
        APIManager.get("artists", props.match.params.artistId).then(artist => {
            setArtist({
                name: artist.name,
                picUrl: artist.picUrl,
                url: artist.url,
                id: artist.id,
                availabilityNotes: artist.availabilityNotes
            });
            setIsLoading(false);
        });
    }, [props.match.params.artistId]);

    if (artist.name !== undefined && artist.picUrl !== undefined && artist.url !== undefined) {
        return (
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
                        <span data-tooltip="EDIT"><i className="big edit icon artistsDetailsEditIcon" onClick={() => props.history.push(`/artists/${artist.id}/edit`)}></i></span>
                        <span data-tooltip="DELETE"><i className="big trash alternate icon artistsDetailsTrashIcon" disabled={isLoading} onClick={() => handleDelete()}></i></span>
                    </div>
                </div>
            </div >
        );
    } else {
        return (
            <div className="artistsCard">
                <div className="artistsCardContent">
                    <center><h3>ARTISTS CARD NOT FOUND</h3></center>
                </div>
            </div>
        )
    }
};

export default ArtistsDetail;