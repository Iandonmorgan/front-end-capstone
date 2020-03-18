import React, { useState } from "react";
import "./CreateUser.css";
import APIManager from "../../modules/APIManager";
import keys from "../../keys/keys";


const CreateUser = props => {
    // const [isLoading, setIsLoading] = useState(false);
    // const [image, setImage] = useState({});
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
                                props.history.push("/");
                            } else {
                                sessionStorage.setItem("credentials", JSON.stringify(credentials));
                                props.history.push("/");
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
                            props.history.push("/");
                            if (isChecked === true) {
                                localStorage.setItem("credentials", JSON.stringify(credentials));
                                props.history.push("/");
                            } else {
                                sessionStorage.setItem("credentials", JSON.stringify(credentials));
                                props.history.push("/");
                            }
                        } else if (credentials.picUrl === "" && isChecked === true) {
                            const newUser = {
                                email: credentials.email,
                                username: credentials.username,
                                picUrl: "https://i.pinimg.com/originals/0e/ca/cf/0ecacf1245c5e8c723414ea1a19407cf.jpg"
                            };
                            APIManager.post('users', newUser).then(user => {
                                props.setUser(user, true)
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
                        } else {
                            const newUser = {
                                email: credentials.email,
                                username: credentials.username,
                                picUrl: "https://i.pinimg.com/originals/0e/ca/cf/0ecacf1245c5e8c723414ea1a19407cf.jpg"
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

    return (
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
                            placeholder="Enter Email Address"
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
                            placeholder="Enter username"
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
                            placeholder="http://image.com/image.jpg"
                            required=""
                            autoFocus=""
                        />
                    </div>
                </div>
                <div className="create-buttons">
                    <button className="create-btn" type="submit">
                        create account & login
            </button>
            <div>
                        <input
                            className="check-box"
                            type="checkbox"
                            onChange={handleSignInCheckBox}
                        ></input>
                        <label className="rememberMe">remember me</label>
                    </div>
                </div>
                <p
                        id="haveAcctBtn"
                        className="button"
                        onClick={() => props.history.push("/login")}
                    >
                        login using existing account
                    </p>
            </fieldset>
        </form>
    );
};

export default CreateUser;
