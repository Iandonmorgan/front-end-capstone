import React from "react";
import DashboardProjectList from "./DashboardProjectList";

const DashboardCard = (props) => {
    return (
        <>
            <div className="dashboardCard">
                <div className="dashboardCardContent">
                    <div className="dashboardCardTitle">
                        {props.artist.name}
                    </div>
                    <img className="artistImage" src={(props.artist.picUrl)} alt={(props.artist.name)} />
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
};

export default DashboardCard;