import React from "react";
import "./Dashboard.css";

const Dashboard = props => {
    if (props.hasUser) {
        return (
            <>
                <div className="dashboard-container">
                    <div className="dashboard-picture">
                        <img
                            src="https://i.ibb.co/wcxDJFn/detective-512-298985.png"
                            alt="Commissioner Mordan"
                            className="dashboard-photo"
                        />
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className="dashboard-container">
                    <div className="dashboard-picture">
                        <img
                            src="https://i.ibb.co/wcxDJFn/detective-512-298985.png"
                            alt="Commissioner Mordan"
                            className="dashboard-photo"
                        />
                    </div>
                    <div className="button-container">
                        {!props.hasUser ? (
                            <button
                                id="loginBtn"
                                className="button"
                                onClick={() => {
                                    props.history.push("/login");
                                }}
                            >
                                Sign In
                            </button>
                        ) : null}
                        {!props.hasUser ? (
                            <button
                                id="createUserBtn"
                                className="button"
                                onClick={() => props.history.push("/createuser")}
                            >
                                Create Account
                            </button>
                        ) : null}
                    </div>
                </div>
            </>
        );
    };
}
export default Dashboard;
