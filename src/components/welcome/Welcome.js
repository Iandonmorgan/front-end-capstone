import React from "react";

const Welcome = props => {
    return (
        <>
            <div className="logo">
                <img src="https://i.ibb.co/HrvZrtw/logo512.png" alt="Commissioner Mordan logo" />
            </div>
            <div className="welcomeMessage">
                <div className="welcomeMessageChild">
                    Welcome to Commissioner Mordan!
                </div>
                <div className="welcomeMessageChild">
                    It looks like you're new.
                </div>
                <div className="welcomeMessageChild">
                Be sure to follow some artists on the <a href="/artists">Artists page</a>, so your dashboard isn't empty!
                </div>
            </div>

        </>
    );
}

export default Welcome;