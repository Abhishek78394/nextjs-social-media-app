import React from "react";
import ProfilePic from "./ProfilePic";
import { acceptRequest, addFollowing } from "@/redux/actions/followActions";
import { useDispatch } from "react-redux";
import { acceptRequestApi, addFollowingApi } from "@/api/followApi";

const Popup = ({
  type,
  data,
  onClose,
  handleRemoveFollower,
  handleUnfollow,
  pendingRequests,
  fetchFollower,
}) => {
  const dispatch = useDispatch();
  const title = type === "followers" ? "Followers" : "Followings";

  const handleAction = (itemId) => {
    if (type === "followers") {
      handleRemoveFollower(itemId);
    } else {
      handleUnfollow(itemId);
    }
  };
  const handleAccept = async (userId) => {
    try {
      dispatch(acceptRequest.request());
      const response = await acceptRequestApi(userId);
      dispatch(acceptRequest.success(response));
      fetchFollower();
    } catch (error) {
      console.error("Popup Page error:++", error);
      dispatch(acceptRequest.failure(error));
    }
  };

  const handleAddfollow = async (userId) => {
    try {
      dispatch(addFollowing.request());
      const response = await addFollowingApi(userId);
      dispatch(addFollowing.success(response));
      fetchFollower();
    } catch (error) {
      console.error("Popup Page error:++", error);
      dispatch(addFollowing.failure(error));
    }
  };
  return (
    <div className="popup">
      <div className="popup-content">
        <div className="poptop">
          <button className="close" onClick={onClose}>
            Close
          </button>
          <h2>{title}</h2>
        </div>
        {type === "followers" && pendingRequests?.length > 0 ? (
          <h2>Pending requests</h2>
        ) : null}
        {type === "followers" || pendingRequests?.length > 0 ? (
          <ul>
            {pendingRequests.map((val, index) => (
              <div className="follower" key={val._id}>
                <div className="img">
                  <ProfilePic type={"user"} img={val.follower.avatar} />
                </div>
                <div className="name">
                  <h4>{val.follower.name}</h4>
                  <h6>{val.follower.username}</h6>
                </div>
                <div className="btn">
                  <button
                    onClick={() => handleAccept(val.follower._id)}
                    className={"remove"}
                  >
                    Accept
                  </button>
                </div>
              </div>
            ))}
          </ul>
        ) : null}
        <hr />
        <ul>
          {data.map((item) => (
            <div className="follower" key={item._id}>
              <div className="img">
                <ProfilePic
                  type={"user"}
                  img={
                    type === "followers"
                      ? item.follower.avatar
                      : item.following.avatar
                  }
                />
              </div>
              <div className="name">
                <h4>
                  {type === "followers"
                    ? item.follower.name
                    : item.following.name}
                </h4>
                <h6>
                  {type === "followers"
                    ? item.follower.username
                    : item.following.username}
                </h6>
                <div className="follow">
                  {!item.is_follow_back && (
                    <button onClick={() => handleAddfollow(item.follower._id)}>
                      Follow Back
                    </button>
                  )}
                </div>
              </div>

              <div className="btn">
                <button
                  onClick={() =>
                    handleAction(
                      type === "followers"
                        ? item.follower._id
                        : item.following._id
                    )
                  }
                  className={type === "followers" ? "remove" : "unfollow"}
                >
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

export default Popup;
