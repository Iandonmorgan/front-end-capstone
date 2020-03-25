import React, { useState } from "react";

const activeUser = JSON.parse(sessionStorage.getItem('credentials'));

const ArtistCardIcons = (props) => {
    let followArtisty = {
        "userId": activeUser.id,
        "artistId": props.artist.id
    }

    if (props.isFollowing) {
        return <span data-tooltip="UNFOLLOW"><i className="small minus square red icon artistUnFollowIcon" disabled={props.isLoading} onClick={() => {props.unfollowArtist(activeUser.id, props.artist.id)}}></i></span>
    } else {
        return <span data-tooltip="FOLLOW"><i className="small plus square green icon artistFollowIcon" disabled={props.isLoading} onClick={() => props.followArtist(followArtisty)}></i></span>
    }
}
export default ArtistCardIcons;