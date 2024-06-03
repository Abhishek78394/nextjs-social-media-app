"use client";
import React, { useEffect, useRef, useState } from "react";
import "./profile.css";
import { useDispatch, useSelector } from "react-redux";
import ProfilePic from "./ProfilePic";
import EditProfile from "./EditProfile";
import { fetchProfile, updateProfilePic } from "@/redux/actions/profileActions";
import { fetchProfileApi, updateProfilePicApi } from "@/api/profileApi";
import {
  fetchFollowerApi,
  fetchFollowingApi,
  fetchPendingRequestApi,
  removeFollowerApi,
} from "@/api/followApi";
import {
  fetchFollowers,
  fetchFollowings,
  fetchPendingRequests,
  removeFollower,
} from "@/redux/actions/followActions";
import Popup from "./Popup";

const Page = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profileData);
  const { followers, following, pendingRequests } = useSelector(
    (state) => state.follow
  );
  const hiddenFileInput = useRef(null);
  const [showPopup, setShowPopup] = useState(null);

 const fetchUserProfile = async () => {
    try {
      dispatch(fetchProfile.request());
      const response = await fetchProfileApi();
      dispatch(fetchProfile.success(response));
    } catch (error) {
      console.error("Profile Page error:++", error);
      dispatch(fetchProfile.failure(error));
    }
  };
  const fetchFollower = async () => {
    try {
      dispatch(fetchFollowers.request());
      const response = await fetchFollowerApi();
      dispatch(fetchFollowers.success(response));
    } catch (error) {
      console.error("Profile Page error:++", error);
      dispatch(fetchFollowers.failure(error));
    }
  };
  const fetchFollowing = async () => {
    try {
      dispatch(fetchFollowings.request());
      const response = await fetchFollowingApi();
      dispatch(fetchFollowings.success(response));
    } catch (error) {
      console.error("Profile Page error:++", error);
      dispatch(fetchFollowings.failure(error));
    }
  };
  const fetchPendingRequest = async () => {
    try {
      dispatch(fetchPendingRequests.request());
      const response = await fetchPendingRequestApi();
      dispatch(fetchPendingRequests.success(response));
    } catch (error) {
      console.error("Profile Page error:++", error);
      dispatch(fetchPendingRequests.failure(error));
    }
  };
  
  useEffect(() => {
    fetchUserProfile();
    fetchFollower();
    fetchFollowing();
    fetchPendingRequest();
  }, []);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleClosePopup = () => {
    setShowPopup(null);
  };

  const handleOpenPopup = (type) => {
    setShowPopup(type);
  };

  const handleInputChange = (event) => {
    handleChange(event);
  };

  const handleRemoveFollower = async (followerId) => {
    try {
      dispatch(removeFollower.request());
      const response = await removeFollowerApi(followerId);
      dispatch(removeFollower.success(response));
    } catch (error) {
      console.error("removeFollower failed:+", error);
      dispatch(removeFollower.failure(error));
    }
  };

  const handleUnfollow = (userId) => {};

  const handleChange = useRef(
    debounce(async (event, user) => {
      try {
        event.preventDefault();
        const fileUploaded = event.target.files[0];
        dispatch(updateProfilePic.request());

        const formData = new FormData();
        formData.append("image", fileUploaded);

        const response = await updateProfilePicApi(formData);
        dispatch(updateProfilePic.success(response));
      } catch (error) {
        console.error("Profile Page error:", error);
        dispatch(updateProfilePic.failure(error));
      }
    }, 500)
  ).current;

  return (
    <div>
      <div className={`profile ${showPopup ? "blur" : ""} `}></div>
      <div className={`content`}>
        <button className="button-upload" onClick={handleClick}>
          {profile && <ProfilePic type={"user"} img={profile.avatar} />}
        </button>
        <input
          type="file"
          onChange={handleInputChange}
          name="image"
          ref={hiddenFileInput}
          style={{ display: "none" }}
        />
        <h1>{profile?.name}</h1>
        <h2>{profile?.username}</h2>
        <div className="row">
          <div onClick={() => handleOpenPopup("followers")} className="col-1">
            <h1>{followers.length}</h1>
            <h3>Follower</h3>
          </div>
          <div onClick={() => handleOpenPopup("followings")} className="col-2">
            <h1>{following.length}</h1>
            <h3>Following</h3>
          </div>
        </div>
        <button onClick={() => handleOpenPopup("profile")} className="edit">
          Edit profile
        </button>
      </div>
      <div className="about">
        <div className="bio">
          <h4>About me</h4>
          <h6>{profile?.bio}</h6>
        </div>
      </div>
      <div className="photo">
        <h4>Photos</h4>
        <div className="postBox"></div>
      </div>
      {showPopup && (
        <Popup
          type={showPopup}
          fetchFollower={fetchFollower}
          pendingRequests={showPopup === "followers" ? pendingRequests : null}
          data={showPopup === "followers" ? followers : following}
          onClose={handleClosePopup}
          handleRemoveFollower={handleRemoveFollower}
          handleUnfollow={handleUnfollow}
        />
      )}
      {showPopup === "profile" && (
        <EditProfile user={profile} onClose={handleClosePopup} />
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

