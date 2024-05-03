import axios from "axios";

export const logInApi = async (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("object.login", params)
      let response = await axios({
        method: "POST",
        url: `/api/login`,
        data: {
          identifier: params.identifier,
          password: params.password,
        }
      })
      resolve(response?.data?.data)
    } catch (error) {
      console.log("error::", error);
      reject(error.response)
    }
  })
}
export const RegisterApi = async (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios({
        method: "POST",
        url: `/api/sign-up`,
        data: {
          email: params.email,
          username: params.username,
          password: params.password,
        }
      })
      resolve(response?.data?.data)
    } catch (error) {
      console.log("error::", error);
      reject(error.response)
    }
  })
}