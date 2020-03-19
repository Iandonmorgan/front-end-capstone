import React from "react";
import DashboardProjectList from "./DashboardProjectList";

const allCaps = (str) => {
    let caps = "";
    for (let i = 0; i < str.split("").length; i++) {
        caps += str.split("")[i].toUpperCase();
    }
    return caps;
}

const DashboardCard = (props) => {
    return (
        <>
            <div className="dashboardCard">
                <div className="dashboardCardContent">
                    <div className="dashboardCardTitle">
                        <img src={(props.artist.picUrl)} alt={(props.artist.name)} />
                        {allCaps(props.artist.name)}
                    </div>
                        <DashboardProjectList
                            key={props.artist.id}
                            artist={props.artist}
                            {...props}
                        />
                </div>
            </div>
        </>
    )
};

export default DashboardCard;