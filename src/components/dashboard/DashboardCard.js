import React, { useEffect, useState } from "react";
import DashboardProjectList from "./DashboardProjectList";
import APIManager from "../../modules/APIManager";


const DashboardCard = (props) => {
    
    const [userFollows, setUserFollows] = useState([]);
    const [numState, setNumState] = useState(0);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);
    
    const activeUser = JSON.parse(sessionStorage.getItem('credentials'));
    const getUserFollows = () => {
        let userArtists = [];
        return APIManager.getAllWithUserId("userFollows", activeUser.id).then(follows => {
            for (let i = 0; i < follows.length; i++) {
                APIManager.getById("artists", follows[i].artistId).then(fArtist => {
                    userArtists.push(fArtist.flat());
                    setUserFollows(userArtists.flat());
                })
            }
        });
    };
    const getFollowingStatus = () => {
        return APIManager.getByUserIdAndArtistId("userFollows", activeUser.id, props.artist.id).then(follows => {
            if (follows.length > 0) {
                follows.map(follow => {
                    if (activeUser.id === follow.userId && follow.artistId === props.artist.id) {
                        setIsEmpty(false);
                        setIsFollowing(true);
                    }
                })
            }
        });
    };

    useEffect(() => {
        getUserFollows();
        getFollowingStatus();
    }, []);

    if (isFollowing && !isEmpty ) {
        return (
            <>
                <div className="dashboardCard">
                    <div className="dashboardCardContent" onClick={ () => props.history.push(`/artists/${props.artist.id}`) } >
                        <div className="dashboardCardTitle">
                            {props.artist.name}
                        </div>
                        <img className="artistImage" src={ (props.artist.picUrl) } alt={ (props.artist.name) } />
                    </div>
                    <DashboardProjectList
                        key={props.artist.id}
                        artist={props.artist}
                        projects={props.projects}
                        {...props}
                    />
                </div>
            </>
        )
    } else if ( isEmpty && numState === 0 ) {
        setNumState(1);
        return (
            <>
            HELLO WORLD
            </>
        )
    } else {
        return (
            <>
            </>
        )
    }
};

export default DashboardCard;