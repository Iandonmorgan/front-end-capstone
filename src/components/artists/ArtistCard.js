import React, { useState, useEffect } from "react";
import APIManager from "../../modules/APIManager";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ArtistCardIcons from './ArtistCardIcons';

const activeUser = JSON.parse(sessionStorage.getItem('credentials'));

const ArtistsCard = (props) => {
    const [userFollows, setUserFollows] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

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
            follows.map(follow => {
                if (activeUser.id === follow.userId && follow.artistId === props.artist.id) {
                    setIsFollowing(true);
                }
            })
        });
    };
    const followArtist = (userFollowObject) => {
        setIsLoading(true);
        confirmAlert({
            title: 'Confirm to follow',
            message: 'Are you sure you want to connect with this artist?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => APIManager.post("userFollows", userFollowObject).then(() => {
                        getFollowingStatus()
                        props.getArtists()
                    }
                    )
                },
                {
                    label: 'No',
                    onClick: () => ""
                }
            ]
        });
    }
    const unfollowArtist = (userId, artistId) => {
        setIsLoading(true);
        confirmAlert({
            title: 'Confirm to unfollow',
            message: 'Are you sure you want to remove your connection with this artist?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => APIManager.getByUserIdAndArtistId("userFollows", userId, artistId).then(unfollowTarget => unfollowTarget.map(target => {
                        if (target.userId === userId && target.artistId === artistId) {
                            APIManager.delete("userFollows", target.id).then(() => {
                                getFollowingStatus()
                                props.getArtists()
                                setIsFollowing(false)
                            }
                            )
                        }
                    })
                    )
                },
                {
                    label: 'No',
                    onClick: () => ""
                }
            ]
        });
    }

    useEffect(() => {
        getUserFollows();
        getFollowingStatus();
    }, []);

    return (
        <div className="artistsCard">
            <div className="artistsCardContent">
                <div className="artistsCardTitle" onClick={() => props.history.push(`/artists/${props.artist.id}`)}>
                    {props.artist.name}
                </div>
                <img className="artistImageCard" src={(props.artist.picUrl)} alt={(props.artist.name)} width="200px" onClick={() => props.history.push(`/artists/${props.artist.id}`)} />
                <div className="subArtistCard">
                    <p className="subcardLink"><a href={props.artist.url} target="_new">view website</a></p>
                    <div className="subcardLinkIcons">
                        <span data-tooltip="DETAILS"><i className="small file alternate icon artistFileIcon" onClick={() => props.history.push(`/artists/${props.artist.id}`)}></i></span>
                        <ArtistCardIcons
                            isFollowing={isFollowing}
                            isLoading={isLoading}
                            followArtist={followArtist}
                            unfollowArtist={unfollowArtist}
                            setIsFollowing={setIsFollowing}
                            artist={props.artist}
                            {...props}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArtistsCard;