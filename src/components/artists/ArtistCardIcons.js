import React, { useState, useEffect } from "react";
import APIManager from "../../modules/APIManager";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const activeUser = JSON.parse(sessionStorage.getItem('credentials'));


const ArtistCardIcons = (props) => {
    let followArtisty = {
        "userId": activeUser.id,
        "artistId": props.artist.id
    }
    const [isLoading, setIsLoading] = useState(true);
    console.log(props);
    if (props.isFollowing) {
        return <div align="right">
            <span data-tooltip="DETAILS"><i className="small file alternate icon artistFileIcon" onClick={() => props.history.push(`/artists/${props.artist.id}`)}></i></span>
            {/* <span data-tooltip="EDIT"><i className="small edit icon artistDetailIcon" onClick={() => props.history.push(`/artists/${props.artist.id}/edit`)}></i></span> */}
            <span data-tooltip="UNFOLLOW"><i className="small minus square red icon artistUnFollowIcon" disabled={isLoading} onClick={() => props.unfollowArtist(activeUser.id, props.artist.id)}></i></span>
        </div>
    } else {
        return <span data-tooltip="FOLLOW"><i className="small plus square green icon artistFollowIcon" disabled={isLoading} onClick={() => props.followArtist(followArtisty)}></i></span>
    }
}
export default ArtistCardIcons;