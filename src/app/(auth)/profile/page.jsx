"use client"
import React, { useEffect, useRef, useState } from "react";
import "./profile.css";
import { useDispatch } from "react-redux";
import {
  requestSent,
  receivedError,
  responseReceived,
} from "@/store/utilsActions";
import { FetchUserApi, UpdateProfilePicApi } from "@/store/api/authApi";
import { fetchUser, UpdateProfilePic } from "@/store/actions/authAction";
import ProfilePic from "./ProfilePic";
import EditProfile from "./EditProfile";

const Page = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const hiddenFileInput = useRef(null);
  const [showPopup, setShowPopup] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        dispatch(requestSent());
        const response = await FetchUserApi();
        dispatch(fetchUser(response));
        setUser(response);
      } catch (error) {
        console.error("Profile Page error:", error);
        dispatch(receivedError(error));
      } finally {
        dispatch(responseReceived());
      }
    };
    fetchUserProfile();
  }, []);

  const handleChange = useRef(
    debounce(async (event) => {
      try {
        event.preventDefault();
        const fileUploaded = event.target.files[0];
        dispatch(requestSent());

        const formData = new FormData();
        formData.append("image", fileUploaded);

        const response = await UpdateProfilePicApi(formData);
        dispatch(UpdateProfilePic(response));

        setUser((prevUser) => ({
          ...prevUser,
          avatar: response.avatar,
        }));
      } catch (error) {
        console.error("Profile Page error:", error);
        dispatch(receivedError(error));
      } finally {
        dispatch(responseReceived());
      }
    }, 500)
  ).current;

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleClosePopup = () => {
    setShowPopup(null);
  };

  const handleOpenPopup = (type) => {
    setShowPopup(type);
  };

  const handleUpdateUser = (updatedUser) => {
    setUser((prevUser) => ({ ...prevUser, ...updatedUser }));
  };

  return (
    <div>
      <div className={`profile ${showPopup ? "blur" : ""} `}></div>
      <div className={`content`}>
        <button className="button-upload" onClick={handleClick}>
          {user && <ProfilePic type={"user"} img={user.avatar} />}
        </button>
        <input
          type="file"
          onChange={handleChange}
          name="image"
          ref={hiddenFileInput}
          style={{ display: "none" }}
        />
        <h1>{user?.name}</h1>
        <h2>{user?.username}</h2>
        <div className="row">
          <div onClick={() => handleOpenPopup("followers")} className="col-1">
            <h1>{user?.followers?.length}</h1>
            <h3>Follower</h3>
          </div>
          <div onClick={() => handleOpenPopup("followings")} className="col-2">
            <h1>{user?.followings?.length}</h1>
            <h3>Following</h3>
          </div>
        </div>
        <button onClick={() => handleOpenPopup("profile")} className="edit">Edit profile</button>
      </div>
      <div className="about">
        <div className="bio">
          <h4>About me</h4>
          <h6>{user?.bio}</h6>
        </div>
      </div>
      <div className="photo">
        <h4>Photos</h4>
        <div className="postBox">
          {user?.posts?.map((post) => (
            <div className="image" key={post._id}>
              <ProfilePic type="post" img={post.image} />
              <p>{post.caption}</p>
            </div>
          ))}
        </div>
      </div>
      {showPopup && (
        <Popup
          type={showPopup}
          data={showPopup === "followers" ? user.followers : user.followings}
          onClose={handleClosePopup}
        />
      )}
      {showPopup === "profile" && (
        <EditProfile
          user={user}
          onClose={handleClosePopup}
          onUpdateUser={handleUpdateUser}
        />
      )}
    </div>
  );
};

export default Page;

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

const Popup = ({ type, data, onClose }) => {
  const title = type === "followers" ? "Followers" : "Followings";
  const handleAction = (itemId) => {
    if (type === "followers") {
      // handleRemoveFollower(itemId);
    } else {
      // handleUnfollow(itemId);
    }
  }
  return (
    <div className="popup">
      <div className="popup-content">
        <div className="poptop">
          <button className="close" onClick={onClose}>
            Close
          </button>
          <h2>{title}</h2>
        </div>
        <ul>
          {data.map((item) => (
            <div className="follower" key={item._id}>
              <div className="img">
                <ProfilePic type={"user"} img={item.avatar} />
              </div>
              <div className="name">
                <h4>{item.name}</h4>
                <h6>{item.username}</h6>
              </div>
              <div className="btn">
                <button onClick={() => handleAction(item._id)} className={type === "followers" ? "remove" : "unfollow"}>
                  {type === "followers" ? "remove" : "unfollow"}
                </button>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};