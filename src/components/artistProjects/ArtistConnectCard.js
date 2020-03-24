import React, { useState } from "react";
import APIManager from "../../modules/APIManager";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const ArtistConnectCard = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const handleDelete = () => {
        setIsLoading(true);
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to remove the connection to this artist?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => APIManager.delete("artistProjects", props.connect.id).then(() =>
                        props.getArtistProjects()
                    )
                },
                {
                    label: 'No',
                    onClick: () => ""
                }
            ]
        });
    };
    if (props.connect.projectId === props.projectId) {
        return (
            <div className="artistConnectCard">
                <div className="artistConnectCardContent">
                    <img className="artistConnectImageCard" src={(props.connect.artist.picUrl)} alt={(props.connect.artist.name)} width="200px" onClick={() => props.history.push(`/artists/${props.connect.artist.id}`)} />
                    <div className="artistConnectCardTitle" onClick={() => props.history.push(`/artists/${props.connect.artist.id}`)}>
                        {props.connect.artist.name}
                    </div>
                    <div className="subArtistConnectCard">
                        <p className="subcardConnectLink"><a href={props.connect.artist.url} target="_new">view website</a></p>
                        <span data-tooltip="DELETE"><i className="small trash alternate icon artistTrashIcon" disabled={isLoading} onClick={() => handleDelete()}></i></span>
                    </div>
                </div>
            </div>
        );
    } else {
        return "";
    }
}

export default ArtistConnectCard;