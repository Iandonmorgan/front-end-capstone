import React, { useState, useEffect } from "react";
import APIManager from "../../modules/APIManager";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const ArtistsDetail = props => {
    const [artist, setArtist] = useState({ name: "", picUrl: "", url: "", url: "", availabilityNotes: "" });
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
        APIManager.get("artists", props.artistId).then(artist => {
            setArtist({
                name: artist.name,
                picUrl: artist.picUrl,
                url: artist.url,
                id: artist.id,
                availabilityNotes: artist.availabilityNotes
            });
            setIsLoading(false);
        });
    }, [props.artistId]);

    if (artist.name !== undefined && artist.picUrl !== undefined && artist.url !== undefined) {
        return (
            <div className="artistsCard">
                <div className="icon-container">
                    <span data-tooltip="BACK"><i className="big arrow circle left icon" id="back-arrow-detail" onClick={() => props.history.push('/artists')}></i></span>
                    <span data-tooltip="ADD"><i className="big plus square outline icon" id="plusIcon" onClick={() => props.history.push('/artists/new')}></i></span>
                </div>
                <div className="artistsCardContent">
                <h3><span className="artistsCardTitle">
                        {props.artist.name.toUpperCase()}
                    </span></h3>
                        <img className="artistImageCard" src={(props.artist.picUrl)} alt={(props.artist.name)} />
                    <p><a href={props.artist.url}>view website</a></p>
                    <div align="right">
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