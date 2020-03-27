import React, { useState } from "react";
import ApplicationViews from "../ApplicationViews";
import NavBar from "../navbar/NavBar";
import "../commissionerMordan/CommissionerMordan.css";
import APIManager from "../modules/APIManager";

const CommissionerMordan = () => {
    const isAuthenticated = () =>
        sessionStorage.getItem("credentials") !== null ||
        localStorage.getItem("credentials") !== null;

    const [userFromState, setHasUser] = useState(isAuthenticated());

    const setUser = (user, status) => {
        if (status === true) {
            localStorage.setItem("credentials", JSON.stringify(user));
            sessionStorage.setItem("credentials", JSON.stringify(user));
            setHasUser(isAuthenticated());
        } else if (status === false) {
            sessionStorage.setItem("credentials", JSON.stringify(user));
            setHasUser(isAuthenticated());
        }
    };

    // let userArtists = [];
    //     return APIManager.getAllWithUserId("userFollows", activeUser.id).then(follows => {
    //         for (let i = 0; i < follows.length; i++) {
    //             APIManager.getById("artists", follows[i].artistId).then(fArtist => {
    //                 userArtists.push(fArtist.flat());
    //                 setUserFollows(userArtists.flat());
    //             })
    //         }
    //     });

    const clearUser = () => {
        sessionStorage.clear();
        localStorage.clear();
        setHasUser(isAuthenticated());
    };
    if (userFromState) {
        return (
            <>
                <NavBar hasUser={userFromState} clearUser={clearUser} setUser={setUser} />
                <ApplicationViews hasUser={userFromState} setUser={setUser} />
            </>
        );
    } else {
        return (
            <>
                <ApplicationViews hasUser={userFromState} setUser={setUser} />
            </>
        );
    }
};

export default CommissionerMordan;
