import React, { useState } from "react";
import APIManager from "../../modules/APIManager";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const ArtistsCard = (props) => {
    const [isLoading, setIsLoading] = useState(true);
        const handleDelete = () => {
            setIsLoading(true);
            confirmAlert({
                title: 'Confirm to delete',
                message: 'Are you sure you want to delete this?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => APIManager.delete("artists", props.artist.id).then(() =>
                            props.getArtists()
                        )
                    },
                    {
                        label: 'No',
                        onClick: () => ""
                    }
                ]
            });
        };
        return (
            <div className="artistsCard">
                <div className="artistsCardContent">
                    <div className="artistsCardTitle">
                        {props.artist.name}
                    </div>
                        <img className="artistImageCard" src={(props.artist.picUrl)} alt={(props.artist.name)} width="200px" />
                    <p><a href={props.artist.url}>view website</a></p>
                    <div align="right">
                        <span data-tooltip="DETAILS"><i className="big file alternate icon artistFileIcon" onClick={() => props.history.push(`/artists/${props.artist.id}`)}></i></span>
                        <span data-tooltip="EDIT"><i className="big edit icon artistDetailIcon" onClick={() => props.history.push(`/artists/${props.artist.id}/edit`)}></i></span>
                        <span data-tooltip="DELETE"><i className="big trash alternate icon artistTrashIcon" disabled={isLoading} onClick={() => handleDelete()}></i></span>
                    </div>
                </div>
            </div>
        );
}

export default ArtistsCard;