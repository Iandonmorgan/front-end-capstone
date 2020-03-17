import React from "react";

const Header = props => {
  const user = JSON.parse(sessionStorage.getItem("credentials"));
  if (props.hasUser) {
    return (
      <>
        <header>
          <div className="userInfo"></div>
          <h1 className="title">
            {"Commissioner Mordan"}
          </h1>
          <div className="userInfo">
            <div className="userDetails">
              <h4 className="userName">{user.username}</h4>
              <picture className="image-cropper">
                <img
                  src={user.picUrl}
                  className="profile-pic"
                  alt="prof-pic"
                />
              </picture>
            </div>
          </div>
        </header>
      </>
    );
  } else {
    return (
      <>
        <header>
          <h1 className="title">
            {"COMMISSIONER MORDAN"}
          </h1>
        </header>
      </>
    );
  }
};

export default Header;
