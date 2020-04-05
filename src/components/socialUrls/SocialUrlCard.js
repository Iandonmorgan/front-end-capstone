import React, { useState } from "react";
import APIManager from "../../modules/APIManager";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const SocialUrlCard = (props) => {
    const [isLoading, setIsLoading] = useState(true);

    const handleDelete = () => {
        setIsLoading(true);
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this social URL?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => APIManager.delete("socialUrls", props.socialUrl.id).then(() => {
                        props.getSocialUrls();
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
        setIsLoading(false);
    };
    return (
        <>
            <div className="socialUrlCard">
                <div className="socialUrlUrl">
                    <a href={props.socialUrl.url} target="_blank">{props.socialUrl.name}</a>
                </div>
                <span data-tooltip="DELETE" className="deleteSocialUrlIcon"><i className="small minus square icon red" disabled={isLoading} onClick={() => handleDelete()}></i></span>
            </div>
        </>
    );
}

export default SocialUrlCard;