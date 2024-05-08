import axios from "axios";

export const logInApi = async (params) => {
  return new Promise(async (resolve, reject) => {
    try {
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
      console.error("error::", error);
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
      console.error("error::", error);
      reject(error.response)
    }
  })
}

export const FetchUserApi = async (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios({
        method: "GET",
        url: `/api/profile`,
      })
      resolve(response?.data?.data[0])
    } catch (error) {
      console.error("error::", error);
      reject(error.response)
    }
  })
}

export const UpdateProfilePicApi = async (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios({
        method: "POST",
        url: `/api/profile-pic`,
        data: params
      })
      resolve(response?.data?.data)
    } catch (error) {
      console.error("error::", error);
      reject(error.response)
    }
  })
}

export const UpdateProfileApi = async (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios({
        method: "PUT",
        url: `/api/profile`,
        data: {
          email: params.email,
          username: params.username,
          name: params.name,
          gender: params.gender,
          phone: params.phone,
          bio: params.bio,
        }
      })
      resolve(response?.data?.data)
    } catch (error) {
      console.error("error::", error);
      reject(error.response)
    }
  })
}

export const LogOutApi = async (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios({
        method: "GET",
        url: `/api/logout`,
      })
      resolve(response?.data?.data)
    } catch (error) {
      console.error("error::", error);
      reject(error.response)
    }
  })
}