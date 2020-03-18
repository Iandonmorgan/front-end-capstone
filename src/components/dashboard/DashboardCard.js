import React, { useState } from "react";
import "./News.css";
import ApiManager from "../../modules/ApiManager";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const activeUser = JSON.parse(sessionStorage.getItem('credentials'));

const firstLetterCase = (str) => {
    let capsTitle = "";
    for (let i = 0; i < str.split(" ").length; i++) {
        capsTitle += str.split(" ")[i].charAt(0).toUpperCase() + str.split(" ")[i].slice(1) + " ";
    }
    return capsTitle;
}

const NewsCard = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    if (props.news.userId === activeUser.id) {
        const handleDelete = () => {
            setIsLoading(true);
            confirmAlert({
                title: 'Confirm to delete',
                message: 'Are you sure you want to delete this?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => ApiManager.delete("articles", props.news.id).then(() =>
                            props.getNews()
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
            <div className="newsCard">
                <div className="newsCardContent">
                    <h3><span className="newsCardArticleTitle">
                        {firstLetterCase(props.news.title)}
                    </span></h3>
                    <p>Synopsis: {props.news.synopsis}</p>
                    <div align="right">
                        <span data-tooltip="DETAILS"><i className="big file alternate icon" id="newsFileIcon" onClick={() => props.history.push(`/news/${props.news.id}`)}></i></span>
                        <span data-tooltip="EDIT"><i className="big edit icon" id="newsDetailIcon" onClick={() => props.history.push(`/news/${props.news.id}/edit`)}></i></span>
                        <span data-tooltip="DELETE"><i id="newsTrashIcon" className="big trash alternate icon" disabled={isLoading} onClick={() => handleDelete()}></i></span>
                    </div>
                </div>
            </div>
        );
    } else {
        return ("");
    }
}

export default NewsCard;