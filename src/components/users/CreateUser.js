import React, { useState } from "react";
import "./CreateUser.css";
import APIManager from "../../modules/APIManager";
import keys from "../../../keys";

const CreateUser = props => {
  const [credentials, setCredentials] = useState({
    email: "",
    username: "",
    password: "",
    confirmedPassword: "",
    picUrl: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState({ });
  const [isChecked, setIsChecked] = useState(false);

  const handleInputFieldChange = event => {
    const stateToChange = { ...credentials };
    stateToChange[event.target.id] = event.target.value;
    setCredentials(stateToChange);
  };
  const handleSignInCheckBox = event => {
    setIsChecked(event.target.checked);
  };
  const handleCreateAccountLogin = event => {
    event.preventDefault();
    ApiManager.checkEmail("users", credentials.email).then(r => {
      if (r.length > 0) {
        window.alert("This email is already taken");
      } else if(credentials.password !== credentials.confirmedPassword){
          window.alert('The passwords dont match up')
      } else if (isChecked === true && image.picUrl === "") {
        const newUser = {
          email: credentials.email,
          username: credentials.username,
          password: credentials.password,
          picUrl: "https://pecb.com/conferences/wp-content/uploads/2017/10/no-profile-picture.jpg"
        };
        ApiManager.post('users',newUser).then(user=> {
            props.setUser(user, true)
        })
      } else if(isChecked===false && image.picUrl!==""){
        const newUser = {
            email: credentials.email,
            username: credentials.username,
            password: credentials.password,
            picUrl: image.picUrl
          };
          ApiManager.post('users', newUser).then(user=> {
              props.setUser(user, true)
          })
      }
    });

    props.setUser();
    props.history.push("/");
    if (isChecked === true) {
      localStorage.setItem("credentials", JSON.stringify(credentials));
      props.history.push("/");
    } else {
      sessionStorage.setItem("credentials", JSON.stringify(credentials));
      props.history.push("/");
    }
  };
  const uploadImage = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "photoLab");
    setIsLoading(true);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${keys.cloudinary}/image/upload`,
      {
        method: "POST",
        body: data
      }
    );
    const file = await res.json();
    setImage({ picUrl: file.secure_url });
    setIsLoading(false);
  };

    return (
        <form className="main-form" onSubmit={handleCreateAccountLogin}>
        <fieldset className="fs-form">
            <h3 className="title">Create Your Account</h3>
            <div className="create-form">
            <label htmlFor="inputEmail">Email Address</label>
            <input
                className="input"
                onChange={handleInputFieldChange}
                type="email"
                id="email"
                placeholder="Enter Email Address"
                required=""
                autoFocus=""
            />
            <label htmlFor="inputUsername">Username</label>
            <input
                className="input"
                onChange={handleInputFieldChange}
                type="text"
                id="username"
                placeholder="Enter username"
                required=""
                autoFocus=""
            />

            <label htmlFor="inputPassword">Password</label>
            <input
                className="input"
                onChange={handleInputFieldChange}
                type="password"
                id="password"
                placeholder="Create Your Password"
                required=""
                autoFocus=""
            />
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
                className="input"
                onChange={handleInputFieldChange}
                type="password"
                id="confirmedPassword"
                placeholder="Re-enter Password"
                required=""
                autoFocus=""
            />
            <label htmlFor="eventImage">Please upload a profile picture</label>
            <input
                name="file"
                id="picUrl"
                type="file"
                className="file-upload"
                placeholder="Upload an Image"
                data-cloudinary-field="image_id"
                onChange={uploadImage}
                data-form-data="{ 'transformation': {'crop':'limit','tags':'samples','width':3000,'height':2000}}"
            />
            </div>
            <div className="create-buttons">
            <div>
                <label className="check-box-name">Remember Me</label>
                <input
                className="check-box"
                type="checkbox"
                onChange={handleSignInCheckBox}
                ></input>
            </div>
            <div className="newPhoto">
                {isLoading ?(
                    <h3> Loading...</h3>
                ): (
                    <>
                    <img src={image.picUrl} style={{width: '300px'}} alt="upload-photos"/>
                    </>
                )}
                </div>
            <button className="create-btn" type="submit">
                Join
            </button>
        
            </div>
        </fieldset>
        </form>
    );
    };

export default CreateUser;
