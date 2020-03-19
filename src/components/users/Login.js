import React, { useState } from "react";
import APIManager from "../../modules/APIManager";

const Login = props => {
    const [credentials, setCredentials] = useState({
        email: "",
        username: ""
    });
    const [isChecked, setIsChecked] = useState(false);

    const handleFieldChange = e => {
        const stateToChange = { ...credentials };
        stateToChange[e.target.id] = e.target.value;
        setCredentials(stateToChange);
    };

    const handleCheckBoxChange = e => {
        setIsChecked(e.target.checked);
    };

    // Check for "remember me" button is clicked. If it is, logs user in setting both local and session storage. If not, only session storage.
    // Sets guard by checking if response came back as 200. ** For a later stretch goal of more practical Authentication.
    // NOTE****This is NOT safe NOR best practice to do a GET call to database when authenticating. NOT SECURE.
    // ONLY for purposes of this project and using JSON server. Without Server Side.
    const handleLogin = e => {
        e.preventDefault();
        APIManager.getLogin("users", credentials.email).then(
            response => {
                if (response.length > 0 && isChecked === true) {
                    props.setUser(response[0], true);
                    setCredentials(response[0]);
                    props.history.push("/");
                } else if (response.length > 0 && isChecked === false) {
                    props.setUser(response[0], false);
                    setCredentials(response[0]);
                    props.history.push("/");
                } else {
                    alert("Please type email address associated with your account, or create account.");
                }

            });
    };

    return (
        <>
        <div className="logo">
        <img src="https://i.ibb.co/HrvZrtw/logo512.png" alt="Commissioner Mordan logo"/>
        </div>
        <form
            className="login-form"
            onSubmit={handleLogin}
        >
            <fieldset className="form">
                <p className="signInGreeting">please sign in</p>
                <div className="form-grid">
                    <label htmlFor="inputEmail">email: </label>
                    <input
                        className="login-input"
                        onChange={handleFieldChange}
                        type="email"
                        id="email"
                        placeholder="your@email.com"
                        required=""
                        autoFocus=""
                    />
                </div>
                <div className="button-container">
                    <button 
                        className="login"
                        type="submit"
                    >
                        sign in
                    </button>
                </div>
                <div className="check-box">
                    <input
                        className="option-checkbox"
                        type="checkbox"
                        onChange={handleCheckBoxChange}
                    ></input>
                    <label className="rememberMe">remember me</label>
                </div>
                <div
                        id="createUserLink"
                        onClick={() => props.history.push("/createuser")}
                    >
                        create new account
                    </div>
            </fieldset>
        </form>
        </>
    );
};

export default Login;
