import axios from "axios";

export const apiRequest = async (method, url, data) => {
    try {
      const response = await axios({
        method,
        url,
        data,
      });
      return response.data.data;
    } catch (error) {
      console.error("API request error:", error);
      throw error.response;
    }
  };