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
            message: 'Are you sure you want to remove the project connection to this artist?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => APIManager.delete("artistProjects", props.connect.id).then(() => {
                        props.getArtistProjects();
                        props.setRefresh(true);
                        props.setRefresh(false);
                    })
                },
                {
                    label: 'No',
                    onClick: () => ""
                }
            ]
        });
    };
    const handleConnect = (artistId, projectId) => {
        setIsLoading(true);
        const newArtistProject = {
            "artistId": artistId,
            "projectId": projectId
        }
        console.log("INFO", artistId, projectId)
        confirmAlert({
            title: 'Confirm to connect',
            message: 'Are you sure you want to connect the project to this artist?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => APIManager.post("artistProjects", newArtistProject).then(() => {
                        props.getArtistProjects()
                        props.getRefresh();
                    }
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
                    <img className="artistConnectImageCard" src={(props.connect.artist.picUrl)} alt={(props.connect.artist.name)} onClick={() => props.history.push(`/artists/${props.connect.artist.id}`)} />
                    <div className="subArtistConnectCard">
                        <div className="artistConnectCardTitle" onClick={() => props.history.push(`/artists/${props.connect.artist.id}`)}>
                            {props.connect.artist.name}
                        </div>
                        {/* <p className="subcardConnectLink"><a href={props.connect.artist.url} target="_new">view website</a></p> */}
                        <span data-tooltip="REMOVE FROM PROJECT"><i className="small minus square icon red artistRemoveConnectIcon" disabled={isLoading} onClick={() => handleDelete()}></i></span>
                    </div>
                </div>
            </div>
        );
    } else {
        return "";
    }
}

export default ArtistConnectCard;