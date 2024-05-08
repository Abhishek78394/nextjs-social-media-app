import { actionType } from "./actionTypes";


// ================ Utils Actions =================//

export const requestSent = () => {
    return {
        type: actionType.UTILS.REQUEST_SENT
      };
  };

  export const responseReceived = () => {
    return {
        type: actionType.UTILS.RESPONSE_RECEVIED
      };
  };

  export const receivedError = (error) => {
    return {
        type: actionType.UTILS.REQUEST_ERROR,
        payload:error
      };
  };

  export const emptyErrors = () => {
    return {
        type: actionType.UTILS.EMPTY_ERRORS,
      };
  };

  export const numverOfSoleTraders = (soleTraders) => {
    return {
        type: actionType.NO_OF_SOLE_TRADERS,
        payload: soleTraders
      };
  };

  export const urlsAction = (urls) => {
    return {
        type: actionType.URLS,
        payload: urls
      };
  };
