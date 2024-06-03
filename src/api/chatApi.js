import { apiRequest } from "./utils";

export const sendMessageApi = async (params) => {
    const { message, chat_id } = params;
    return apiRequest("POST", "/api/messages/send", { message, chat_id });
  };

  export const fetchMessageApi = async (params) => {
    const { chatId } = params;
    return apiRequest("GET", `/api/messages/receive/${chatId}`);
  };

  export const chatApi = async (params) => {
    const { receiver_id } = params;
    return apiRequest("POST", "/api/chat", { receiver_id });
  };