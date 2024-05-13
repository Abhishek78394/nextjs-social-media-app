import { apiRequest } from "./utils";

export const fetchProfileApi = async () => {
    return apiRequest("GET", "/api/profile");
  };

export const updateProfilePicApi = async (params) => {
    return apiRequest("POST", "/api/profile-pic", params);
};

export const updateProfileApi = async (params) => {
  const { email, username, name, gender, phone, bio } = params;
  return apiRequest("PUT", "/api/profile", {
    email,
    username,
    name,
    gender,
    phone,
    bio,
  });
};