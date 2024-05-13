import { apiRequest } from "./utils";

export const logInApi = async (params) => {
    const { identifier, password } = params;
    return apiRequest("POST", "/api/login", { identifier, password });
  };
  
  export const registerApi = async (params) => {
    const { email, username, password } = params;
    return apiRequest("POST", "/api/sign-up", { email, username, password });
  };

  export const logOutApi = async (params) => {
    return apiRequest("GET", "/api/logout")
  };