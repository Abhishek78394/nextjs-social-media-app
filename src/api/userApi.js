import { apiRequest } from "./utils";

export const fetchUserApi = async () => {
    return apiRequest("GET", "/api/user");
  };