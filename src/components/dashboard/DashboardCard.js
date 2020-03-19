import React from "react";
import DashboardProjectList from "./DashboardProjectList";

// const allCaps = (str) => {
//     let caps = "";
//     for (let i = 0; i < str.split("").length; i++) {
//         caps += str.split("")[i].toUpperCase();
//     }
//     return caps;
// }

const DashboardCard = (props) => {
    return (
        <>
            <div className="dashboardCard">
                <span className="dashboardGradient" height="100%">
                </span>
                <div className="dashboardCardContent">
                    <div className="dashboardCardTitle">
                        {props.artist.name}
                        <img className="artistImage" src={(props.artist.picUrl)} alt={(props.artist.name)} />
                    </div>
                    <DashboardProjectList
                        key={props.artist.id}
                        artist={props.artist}
                        projects={props.projects}
                        {...props}
                    />
                </div>
                <hr />
            </div>
        </>
    )
};

export default DashboardCard;