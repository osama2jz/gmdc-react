import axios from "axios";
import { backendURL } from "./backendURL";
import { getHeader } from "./headers";

export const axiosPost = async (url, data) => {
  console.log("CALLING API INSIDE HELPER FUNCTION: (URL, DATA)", url, data);
  try {
    const apiResponse = await axios({
      method: "post",
      url: `${backendURL}${url}`,
      data: data,
      headers: getHeader(),
    });
    console.log("API RESPONSE INSIDE HELPER FUNCTION: ", apiResponse);
    return apiResponse;
  } catch (e) {
    console.log("THE FOLLOWING ERROR OCCURRED INSIDE HELPER FUNCTION", e);
    return null;
  }
};

export const axiosGet = async (url) => {
  console.log("CALLING API: ", backendURL + url);
  try {
    const apiResponse = await axios({
      method: "get",
      url: `${backendURL}${url}`,
      headers: getHeader(),
    });
    console.log("API RESPONSE: ", apiResponse);
    return apiResponse;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const axiosDelete = async (url) => {
  console.log("CALLING API: ", backendURL + url);
  try {
    const apiResponse = await axios({
      method: "delete",
      url: `${backendURL}${url}`,
      headers: getHeader(),
    });
    console.log("API RESPONSE: ", apiResponse);
    return apiResponse;
  } catch (e) {
    console.log(e);
    return null;
  }
};
