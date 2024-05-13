import {
  ACCEPT_REQUEST_FAILURE,
  ACCEPT_REQUEST_REQUEST,
  ACCEPT_REQUEST_SUCCESS,
  ADD_FOLLOWER_FAILURE,
  ADD_FOLLOWER_REQUEST,
  ADD_FOLLOWER_SUCCESS,
  ADD_FOLLOWING_FAILURE,
  ADD_FOLLOWING_REQUEST,
  ADD_FOLLOWING_SUCCESS,
  FOLLOWER_FAILURE,
  FOLLOWER_REQUEST,
  FOLLOWER_SUCCESS,
  FOLLOWING_FAILURE,
  FOLLOWING_REQUEST,
  FOLLOWING_SUCCESS,
  PENDING_REQUESTS_FAILURE,
  PENDING_REQUESTS_REQUEST,
  PENDING_REQUESTS_SUCCESS,
  REMOVE_FOLLOWER_FAILURE,
  REMOVE_FOLLOWER_REQUEST,
  REMOVE_FOLLOWER_SUCCESS,
  REMOVE_FOLLOWING_FAILURE,
  REMOVE_FOLLOWING_REQUEST,
  REMOVE_FOLLOWING_SUCCESS,
} from "../actionTypes";
import { createFollowerAction } from "./utils";

// Action creators for fetching followers
export const fetchFollowers = createFollowerAction({
  REQUEST: FOLLOWER_REQUEST,
  SUCCESS: FOLLOWER_SUCCESS,
  FAILURE: FOLLOWER_FAILURE,
});

// Action creators for fetching following
export const fetchFollowings = createFollowerAction({
  REQUEST: FOLLOWING_REQUEST,
  SUCCESS: FOLLOWING_SUCCESS,
  FAILURE: FOLLOWING_FAILURE,
});

// Action creators for fetching pending requests
export const fetchPendingRequests = createFollowerAction({
  REQUEST: PENDING_REQUESTS_REQUEST,
  SUCCESS: PENDING_REQUESTS_SUCCESS,
  FAILURE: PENDING_REQUESTS_FAILURE,
});

// Action creators for adding a follower
export const addFollower = createFollowerAction({
  REQUEST: ADD_FOLLOWER_REQUEST,
  SUCCESS: ADD_FOLLOWER_SUCCESS,
  FAILURE: ADD_FOLLOWER_FAILURE,
});

// Action creators for removing a follower
export const removeFollower = createFollowerAction({
  REQUEST: REMOVE_FOLLOWER_REQUEST,
  SUCCESS: REMOVE_FOLLOWER_SUCCESS,
  FAILURE: REMOVE_FOLLOWER_FAILURE,
});

// Action creators for adding following
export const addFollowing = createFollowerAction({
  REQUEST: ADD_FOLLOWING_REQUEST,
  SUCCESS: ADD_FOLLOWING_SUCCESS,
  FAILURE: ADD_FOLLOWING_FAILURE,
});

// Action creators for removing following
export const removeFollowing = createFollowerAction({
  REQUEST: REMOVE_FOLLOWING_REQUEST,
  SUCCESS: REMOVE_FOLLOWING_SUCCESS,
  FAILURE: REMOVE_FOLLOWING_FAILURE,
});

// Action creators for accepting pending request
export const acceptRequest = createFollowerAction({
  REQUEST: ACCEPT_REQUEST_REQUEST,
  SUCCESS: ACCEPT_REQUEST_SUCCESS,
  FAILURE: ACCEPT_REQUEST_FAILURE,
});
