import { apiRequest } from "./utils";

export const fetchFollowerApi = async () => {
  return apiRequest("GET", "/api/follower/get-follower-list");
};

export const fetchPendingRequestApi = async () => {
  return apiRequest("GET", "/api/follower/get-pending-request");
};

export const acceptRequestApi = async (params) => {
  return apiRequest("PUT", "/api/follower/accept-request" , {requestId : params});
};

export const removeFollowerApi = async (params) => {
  return apiRequest("DELETE", "/api/follower/remove-follwer" , {followerId : params});
};

export const fetchFollowingApi = async () => {
  return apiRequest("GET", "/api/following/get-following-list");
};

export const addFollowingApi = async (params) => {
  return apiRequest("POST", "/api/following/add-following", {followeeId: params});
};
