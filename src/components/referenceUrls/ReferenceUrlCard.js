import React, { useState } from "react";
import APIManager from "../../modules/APIManager";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const ReferenceUrlCard = (props) => {
    const [isLoading, setIsLoading] = useState(true);

    const handleDelete = () => {
        setIsLoading(true);
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this reference URL?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => APIManager.delete("referenceUrls", props.referenceUrl.id).then(() => {
                        props.getReferenceUrls();
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
            <div className="referenceUrlCard">
                <div className="referenceUrlUrl">
                    <a href={props.referenceUrl.url} target="_blank">{props.referenceUrl.name}</a>
                </div>
                <span data-tooltip="DELETE" className="deleteReferenceUrlIcon"><i className="small minus square icon red" disabled={isLoading} onClick={() => handleDelete()}></i></span>
            </div>
        </>
    );
}

export default ReferenceUrlCard;