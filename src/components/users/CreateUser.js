import React, { useState } from "react";
import APIManager from "../../modules/APIManager";



const CreateUser = props => {
    const [credentials, setCredentials] = useState({
        email: "",
        username: "",
        picUrl: ""
    });

    const [isChecked, setIsChecked] = useState(false);

    const handleInputFieldChange = event => {
        const stateToChange = { ...credentials };
        stateToChange[event.target.id] = event.target.value;
        setCredentials(stateToChange);
    };
    const handleSignInCheckBox = event => {
        setIsChecked(event.target.checked);
    };
    const handleCreateUserLogin = event => {
        if (credentials.email === "") {
            window.alert("Please complete all input fields");
        } else if (credentials.username === "") {
            window.alert("Please complete all input fields");
        } else {
            /*                                           */
            /*                                           */
            /*                                           */            
            /* A LOT OF CODE TO CLEAN UP IN THIS SECTION */
            /*                                           */
            /*                                           */
            /*                                           */
            event.preventDefault();
            APIManager.getLogin("users", credentials.email).then(r => {
                if (r.length > 0) {
                    window.alert("This email is already taken");
                } else {
                    APIManager.getUsername("users", credentials.username).then(r => {
                        if (r.length > 0) {
                            window.alert("This username is already taken");
                        } else if (isChecked === true && credentials.picUrl !== "") {
                            const newUser = {
                                email: credentials.email,
                                username: credentials.username,
                                picUrl: credentials.picUrl
                            };
                            APIManager.post('users', newUser).then(user => {
                                props.setUser(user, true)
                            })
                            props.setUser();
                            props.history.push("/");
                            if (isChecked === true) {
                                localStorage.setItem("credentials", JSON.stringify(credentials));
                                props.history.push("/dashboard");
                            } else {
                                sessionStorage.setItem("credentials", JSON.stringify(credentials));
                                props.history.push("/dashboard");
                            }
                        } else if (isChecked === false && credentials.picUrl !== "") {
                            const newUser = {
                                email: credentials.email,
                                username: credentials.username,
                                picUrl: credentials.picUrl
                            };
                            APIManager.post('users', newUser).then(user => {
                                props.setUser(user, false)
                            })
                            props.setUser();
                            props.history.push("/dashboard");
                            if (isChecked === true) {
                                localStorage.setItem("credentials", JSON.stringify(credentials));
                                props.history.push("/dashboard");
                            } else {
                                sessionStorage.setItem("credentials", JSON.stringify(credentials));
                                props.history.push("/dashboard");
                            }
                        } else if (credentials.picUrl === "" && isChecked === true) {
                            const newUser = {
                                email: credentials.email,
                                username: credentials.username,
                                picUrl: "https://i.ibb.co/wQHtN4h/batman.jpg"
                            };
                            APIManager.post('users', newUser).then(user => {
                                props.setUser(user, true)
                            })
                            props.setUser();
                            props.history.push("/dashboard");
                            if (isChecked === true) {
                                localStorage.setItem("credentials", JSON.stringify(credentials));
                                props.history.push("/dashboard");
                            } else {
                                sessionStorage.setItem("credentials", JSON.stringify(credentials));
                                props.history.push("/dashboard");
                            }
                        } else {
                            const newUser = {
                                email: credentials.email,
                                username: credentials.username,
                                picUrl: "https://i.ibb.co/wQHtN4h/batman.jpg"
                            };
                            APIManager.post('users', newUser).then(user => {
                                props.setUser(user, false)
                            })
                            props.setUser();
                            props.history.push("/");
                            if (isChecked === true) {
                                localStorage.setItem("credentials", JSON.stringify(credentials));
                                props.history.push("/");
                            } else {
                                sessionStorage.setItem("credentials", JSON.stringify(credentials));
                                props.history.push("/");
                            }
                        }
                    });
                };
            });
        };
    };

    /*                                           */
    /*                                           */
    /*                 CLEAN IT UP!              */
    /*                                           */
    /*                                           */


    return (
        <>
        <div className="logo">
        <img src="https://i.ibb.co/HrvZrtw/logo512.png" alt="Commissioner Mordan Logo"/>
        </div>
        <form className="main-form" onSubmit={handleCreateUserLogin}>
            <fieldset className="fs-form">
                <p className="signInGreeting">create your account</p>
                <div className="create-form">
                    <div className="create-form-input">
                        <label htmlFor="inputEmail">email: </label>
                        <input
                            className="input"
                            onChange={handleInputFieldChange}
                            type="email"
                            id="email"
                            placeholder="email@email.com"
                            required=""
                            autoFocus=""
                        />
                    </div>
                    <div className="create-form-input">
                        <label htmlFor="inputUsername">username: </label>
                        <input
                            className="input"
                            onChange={handleInputFieldChange}
                            type="text"
                            id="username"
                            placeholder="username"
                            required=""
                            autoFocus=""
                        />
                    </div>
                    <div className="create-form-input">
                        <label htmlFor="inputPicUrl">image URL: </label>
                        <input
                            className="input"
                            onChange={handleInputFieldChange}
                            type="text"
                            id="picUrl"
                            placeholder="http://"
                            required=""
                            autoFocus=""
                        />
                    </div>
                </div>
                <div className="create-buttons">
                    <button className="create-btn" type="submit">
                        create account & login
                    </button>
                </div>
                <div className="check-box">
                    <input
                        className="option-checkbox"
                        type="checkbox"
                        onChange={handleSignInCheckBox}
                    >
                    </input>
                    <label className="rememberMe">remember me</label>
                </div>
                <div
                    id="haveAcctLink"
                    className="button"
                    onClick={() => props.history.push("/login")}
                >
                    login using existing account
                    </div>
            </fieldset>
        </form>
        </>
    );
};

export default CreateUser;
